/* ═══════════════════════════════════════════
   NMAGANDA — drop.js
   Countdown Timer + Stock Bar + Social Proof
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. COUNTDOWN TIMER
     Hedef: sayfanın yüklendiği andan 7 gün sonra.
     Tarih localStorage'a kaydedilir; her yüklemede
     aynı hedef kullanılır (sıfırlanmaz).
  ────────────────────────────────────────── */
  const STORAGE_KEY = 'maganda_drop_target';
  const SEVEN_DAYS  = 7 * 24 * 60 * 60 * 1000;

  function getTargetDate() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const ts = parseInt(stored, 10);
      if (!isNaN(ts) && ts > Date.now()) return ts;
    }
    const target = Date.now() + SEVEN_DAYS;
    localStorage.setItem(STORAGE_KEY, String(target));
    return target;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function initCountdown() {
    const section  = document.getElementById('dropCountdown');
    if (!section) return;

    const numDays  = document.getElementById('cdDays');
    const numHrs   = document.getElementById('cdHours');
    const numMins  = document.getElementById('cdMinutes');
    const numSecs  = document.getElementById('cdSeconds');
    const target   = getTargetDate();

    function tick() {
      const diff = target - Date.now();

      if (diff <= 0) {
        section.classList.add('drop-countdown--expired');
        return; // timer bitti, interval temizlenir aşağıda
      }

      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000)  / 60000);
      const secs  = Math.floor((diff % 60000)    / 1000);

      numDays.textContent  = pad(days);
      numHrs.textContent   = pad(hours);
      numMins.textContent  = pad(mins);
      numSecs.textContent  = pad(secs);
    }

    tick();
    const id = setInterval(() => {
      const remaining = target - Date.now();
      if (remaining <= 0) {
        clearInterval(id);
        section.classList.add('drop-countdown--expired');
        return;
      }
      tick();
    }, 1000);
  }

  /* ──────────────────────────────────────────
     2. STOCK BARS
     Badge değerine göre doluluk oranı ve renk sınıfı.
  ────────────────────────────────────────── */
  const BADGE_MAP = {
    'SON 5 ADET'      : { pct: 15, cls: 'red'    },
    'SON 2 ADET'      : { pct: 15, cls: 'red'    }, // "SON N ADET" pattern
    'TÜKENMEK ÜZERE'  : { pct: 30, cls: 'orange' },
    'SINIRLI'         : { pct: 55, cls: 'yellow' },
    'TÜKENDİ'         : { pct: 100, cls: 'gray'  },
  };

  const DEFAULT_STOCK = { pct: 80, cls: 'green' };

  function resolveBadge(badge) {
    if (!badge) return DEFAULT_STOCK;
    // "SON N ADET" gibi badge'leri yakala
    if (/^SON\s+\d+\s+ADET$/i.test(badge.trim())) {
      return { pct: 15, cls: 'red' };
    }
    return BADGE_MAP[badge.trim()] || DEFAULT_STOCK;
  }

  function getStockText(badge) {
    const cleanBadge = badge.trim();
    const limitedMatch = cleanBadge.match(/^SON\s+(\d+)\s+ADET$/i);
    if (limitedMatch) return `Son ${limitedMatch[1]} ürün`;
    if (cleanBadge === 'TÜKENMEK ÜZERE') return 'Tükenmek üzere';
    if (cleanBadge === 'SINIRLI') return 'Sınırlı stok';
    if (cleanBadge === 'TÜKENDİ') return 'Tükendi';
    return 'Stokta';
  }

  function buildStockBar(card) {
    const badge  = card.getAttribute('data-badge') || '';
    const config = resolveBadge(badge);
    const info   = card.querySelector('.product-card__info');
    if (!info) return;

    // Wrapper
    const stockEl = document.createElement('div');
    stockEl.className = 'product-card__stock';
    stockEl.innerHTML = `
      <div class="product-card__stock-row">
      <div class="product-card__stock-bar-wrap">
        <div
          class="product-card__stock-bar product-card__stock-bar--${config.cls}"
          style="width: 0%;"
          role="progressbar"
          aria-valuenow="${config.pct}"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Stok doluluk oranı: ${config.pct}%"
        ></div>
      </div>
      <span class="product-card__stock-label">${getStockText(badge)}</span>
      </div>
      <div class="product-card__stock-meta">
        <span class="product-card__stock-viewers" id="viewers-${Math.random().toString(36).slice(2)}">
          <em>—</em> kişi bu ürünü şu an inceliyor
        </span>
        <span class="product-card__stock-pct">${config.pct}%</span>
      </div>
    `;

    info.appendChild(stockEl);

    // Bar animasyonu: kısa bir gecikme ile CSS transition tetiklenir
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const bar = stockEl.querySelector('.product-card__stock-bar');
        if (bar) bar.style.width = config.pct + '%';
      });
    });
  }

  function initStockBars() {
    const cards = document.querySelectorAll('.product-card[data-badge]');
    cards.forEach(buildStockBar);

    // Badge'i olmayan kartlara da default bar ekle
    document.querySelectorAll('.product-card:not([data-badge])').forEach(card => {
      card.setAttribute('data-badge', '');
      buildStockBar(card);
    });
  }

  /* ──────────────────────────────────────────
     3. SOCIAL PROOF — "X kişi şu an inceliyor"
     5-23 arası rastgele, 8-15 saniyede bir değişir.
  ────────────────────────────────────────── */
  function randomViewer() {
    return Math.floor(Math.random() * (23 - 5 + 1)) + 5;
  }

  function randomInterval() {
    // 8000 ms - 15000 ms
    return Math.floor(Math.random() * (15000 - 8000 + 1)) + 8000;
  }

  function updateViewer(spanEl) {
    const em = spanEl.querySelector('em');
    if (!em) return;
    em.textContent = randomViewer();

    // Kademeli bir blink efekti
    spanEl.style.opacity = '0.4';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        spanEl.style.transition = 'opacity 0.4s';
        spanEl.style.opacity    = '1';
      });
    });
  }

  function scheduleViewer(spanEl) {
    // İlk değeri hemen yaz, sonra periyodik güncelle
    updateViewer(spanEl);
    const delay = randomInterval();
    setTimeout(() => {
      updateViewer(spanEl);
      scheduleViewer(spanEl); // özyinelemeli rastgele zamanlama
    }, delay);
  }

  function initSocialProof() {
    const viewers = document.querySelectorAll('.product-card__stock-viewers');
    viewers.forEach(scheduleViewer);
  }

  /* ──────────────────────────────────────────
     INIT — DOM hazır olunca çalıştır
  ────────────────────────────────────────── */
  function init() {
    initCountdown();
    initStockBars();
    initSocialProof();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
