/* ═══════════════════════════════════════════
   MAGANDA — search.js
   Gelişmiş Arama: live dropdown, fuzzy eşleşme, klavye navigasyonu
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── ÜRÜN KATALOĞu (static, tüm koleksiyonlar) ─── */
  var CATALOG = [
    // Araba
    { name: 'V8 OBSESSION HOODIE', price: 1799, category: 'Araba', page: 'araba.html', img: 'assets/img/V8 OBSESSION HOODIE/siyah/ön.png', badge: 'YENİ DROP', gallery: 'assets/img/V8 OBSESSION HOODIE/siyah/ön.png|assets/img/V8 OBSESSION HOODIE/siyah/arka.png|assets/img/V8 OBSESSION HOODIE/siyah/arkaveön.png|assets/img/V8 OBSESSION HOODIE/siyah/doku.png|assets/img/V8 OBSESSION HOODIE/siyah/model.png|assets/img/V8 OBSESSION HOODIE/siyah/modelarka.png' },
    { name: 'V8 OBSESSION HOODIE — SİYAH', price: 1499, category: 'Araba', page: 'araba.html', img: 'assets/products/maganda_hoodie_black_1777846105084.png', badge: 'YENİ' },
    { name: 'DRIFT KING OVERSIZE T-SHIRT', price: 699, category: 'Araba', page: 'araba.html', img: 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png', badge: 'ÇOK SATAN', gallery: 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/arka.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/arkaveön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/kumasdetay.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelarka.png' },
    { name: 'MIDNIGHT RUN SWEATPANTS', price: 1899, category: 'Araba', page: 'araba.html', img: 'assets/products/maganda_sweatpants_neon_1777846349061.png', badge: '' },
    { name: 'GEARHEAD JOGGERS', price: 1299, category: 'Araba', page: 'araba.html', img: 'assets/products/maganda_sweatpants_redline_1777846482324.png', badge: 'SINIRLI' },
    { name: 'TOKYO NIGHTS LONG SLEEVE', price: 899, category: 'Araba', page: 'araba.html', img: 'assets/products/maganda_longsleeve_tokyo_1777846775576.png', badge: '' },
    { name: 'TRACK DAY CARBON CAP', price: 499, category: 'Araba', page: 'araba.html', img: 'assets/products/maganda_cap_carbon_1777846506524.png', badge: '' },
    { name: 'APEX PREDATOR HOODIE', price: 1699, category: 'Araba', page: 'araba.html', img: 'assets/products/maganda_hoodie_acid_1777846208954.png', badge: '' },
    { name: 'SPEED HUNTER BEANIE', price: 399, category: 'Araba', page: 'araba.html', img: 'assets/products/maganda_beanie_skull_1777846540448.png', badge: '' },
    // Motor
    { name: 'IRON RIDER HOODIE — ANTRASIT', price: 1599, category: 'Motor', page: 'motor.html', img: 'assets/products/maganda_hoodie_acid_1777846208954.png', badge: 'YENİ' },
    { name: 'ASPHALT ANGEL T-SHIRT', price: 749, category: 'Motor', page: 'motor.html', img: 'assets/products/maganda_tshirt_car_1777846004490.png', badge: '' },
    { name: 'NIGHT SHIFT JOGGERS', price: 1199, category: 'Motor', page: 'motor.html', img: 'assets/products/maganda_sweatpants_redline_1777846482324.png', badge: '' },
    { name: 'CAFÉ RACER SNAPBACK', price: 549, category: 'Motor', page: 'motor.html', img: 'assets/products/maganda_cap_carbon_1777846506524.png', badge: 'ÇOK SATAN' },
    { name: 'THROTTLE QUEEN CREWNECK', price: 1399, category: 'Motor', page: 'motor.html', img: 'assets/products/maganda_hoodie_black_1777846105084.png', badge: '' },
    // Drop
    { name: 'DROP #01: THE MANIFESTO HOODIE', price: 1999, category: 'Drop', page: 'drop.html', img: 'assets/products/maganda_hoodie_black_1777846105084.png', badge: 'SON 5 ADET' },
    { name: 'DROP #02: REDLINE TRACKSUIT', price: 1599, category: 'Drop', page: 'drop.html', img: 'assets/products/maganda_sweatpants_redline_1777846482324.png', badge: 'TÜKENMEK ÜZERE' },
    { name: 'DROP #03: SHADOW REFLECTIVE HOODIE', price: 2499, category: 'Drop', page: 'drop.html', img: 'assets/products/maganda_hoodie_acid_1777846208954.png', badge: 'SINIRLI' },
    { name: 'DROP #04: OBSESSED ACID WASH TEE', price: 899, category: 'Drop', page: 'drop.html', img: 'assets/products/maganda_tshirt_car_1777846004490.png', badge: 'SON 2 ADET' }
  ];

  /* ─── FUZZY ARAMA SKORU ─── */
  function score(text, query) {
    text = text.toLocaleLowerCase('tr-TR');
    query = query.toLocaleLowerCase('tr-TR');
    if (text === query) return 100;
    if (text.startsWith(query)) return 90;
    if (text.includes(query)) return 70;
    // Kelime kelime eşleştir
    var words = query.split(' ');
    var matched = words.filter(function (w) { return text.includes(w); }).length;
    if (matched === words.length) return 60;
    if (matched > 0) return 30 * (matched / words.length);
    return 0;
  }

  function search(query) {
    if (!query || query.length < 2) return [];
    return CATALOG
      .map(function (p) {
        return { product: p, score: score(p.name + ' ' + p.category, query) };
      })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 6)
      .map(function (r) { return r.product; });
  }

  /* ─── ARAMA WIDGET OLUŞTUR ─── */
  function buildSearchWidget() {
    // Açma butonu (navbar'a eklenir)
    var btn = document.createElement('button');
    btn.id = 'searchOpenBtn';
    btn.className = 'navbar__icon-btn navbar__search-btn';
    btn.setAttribute('aria-label', 'Ürün ara');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>';

    // Overlay + Modal
    var overlay = document.createElement('div');
    overlay.id = 'searchOverlay';
    overlay.className = 'search-overlay';

    var modal = document.createElement('div');
    modal.id = 'searchModal';
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Ürün ara');

    modal.innerHTML =
      '<div class="search-modal__top">' +
        '<div class="search-modal__field">' +
          '<svg class="search-modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' +
          '<input id="searchInput" class="search-modal__input" type="search" placeholder="Ürün, kategori ara…" autocomplete="off" spellcheck="false">' +
          '<button id="searchClearBtn" class="search-modal__clear" type="button" aria-label="Temizle" hidden>✕</button>' +
        '</div>' +
        '<button id="searchCloseBtn" class="search-modal__close" type="button" aria-label="Kapat">ESC</button>' +
      '</div>' +
      '<div id="searchResults" class="search-results" role="listbox" aria-label="Arama sonuçları"></div>' +
      '<div id="searchEmpty" class="search-empty" hidden>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
        '<p>Sonuç bulunamadı. <br><span>Farklı bir kelime dene.</span></p>' +
      '</div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    return { btn: btn, overlay: overlay, modal: modal };
  }

  /* ─── ÜRÜN LINKI ─── */
  function buildProductUrl(p) {
    var params = new URLSearchParams({
      name: p.name,
      price: '₺' + p.price.toLocaleString('tr-TR'),
      series: p.category + ' Serisi',
      badge: p.badge || '',
      img: p.img
    });
    if (p.gallery) params.set('gallery', p.gallery);
    return 'product.html?' + params.toString();
  }

  /* ─── SONUÇLARI RENDER ET ─── */
  function renderResults(results, query) {
    var container = document.getElementById('searchResults');
    var emptyEl   = document.getElementById('searchEmpty');
    if (!container) return;

    if (!results.length) {
      container.innerHTML = '';
      emptyEl && (emptyEl.hidden = false);
      return;
    }

    emptyEl && (emptyEl.hidden = true);

    var q = query.toLocaleLowerCase('tr-TR');
    container.innerHTML = results.map(function (p, i) {
      var highlighted = p.name.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>');
      return '<a class="search-result-item" href="' + buildProductUrl(p) + '" role="option" tabindex="-1" data-index="' + i + '">' +
        '<div class="search-result-item__img" style="background-image:url(\'' + p.img + '\');background-size:cover;background-position:center"></div>' +
        '<div class="search-result-item__info">' +
          '<span class="search-result-item__name">' + highlighted + '</span>' +
          '<span class="search-result-item__meta">' + p.category + (p.badge ? ' · ' + p.badge : '') + '</span>' +
        '</div>' +
        '<span class="search-result-item__price">₺' + p.price.toLocaleString('tr-TR') + '</span>' +
      '</a>';
    }).join('');
  }

  /* ─── ANA INIT ─── */
  window.initSearch = function () {
    var widgets = buildSearchWidget();
    var overlay = widgets.overlay;
    var btn = widgets.btn;

    // Arama butonunu navbar'a ekle (tema toggle'dan önce)
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn && themeBtn.parentNode) {
      themeBtn.parentNode.insertBefore(btn, themeBtn);
    }

    var input     = document.getElementById('searchInput');
    var clearBtn  = document.getElementById('searchClearBtn');
    var closeBtn  = document.getElementById('searchCloseBtn');
    var resultsEl = document.getElementById('searchResults');
    var focusedIdx = -1;

    function openSearch() {
      overlay.classList.add('search-overlay--active');
      document.body.classList.add('no-scroll');
      setTimeout(function () { input && input.focus(); }, 60);
    }

    function closeSearch() {
      overlay.classList.remove('search-overlay--active');
      document.body.classList.remove('no-scroll');
      if (input) input.value = '';
      if (resultsEl) resultsEl.innerHTML = '';
      var emptyEl = document.getElementById('searchEmpty');
      if (emptyEl) emptyEl.hidden = true;
      if (clearBtn) clearBtn.hidden = true;
      focusedIdx = -1;
    }

    btn.addEventListener('click', openSearch);
    overlay.addEventListener('click', function (e) {
      if (!document.getElementById('searchModal').contains(e.target)) closeSearch();
    });
    closeBtn && closeBtn.addEventListener('click', closeSearch);
    clearBtn && clearBtn.addEventListener('click', function () {
      input.value = '';
      input.focus();
      resultsEl.innerHTML = '';
      var emptyEl = document.getElementById('searchEmpty');
      if (emptyEl) emptyEl.hidden = true;
      clearBtn.hidden = true;
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('search-overlay--active')) {
        closeSearch();
        return;
      }
      // Klavye navigasyonu
      if (!overlay.classList.contains('search-overlay--active')) return;
      var items = Array.from(resultsEl.querySelectorAll('.search-result-item'));
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusedIdx = Math.min(focusedIdx + 1, items.length - 1);
        items.forEach(function (el, i) { el.classList.toggle('is-focused', i === focusedIdx); });
        items[focusedIdx].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusedIdx = Math.max(focusedIdx - 1, -1);
        if (focusedIdx === -1) {
          items.forEach(function (el) { el.classList.remove('is-focused'); });
          input.focus();
        } else {
          items.forEach(function (el, i) { el.classList.toggle('is-focused', i === focusedIdx); });
          items[focusedIdx].focus();
        }
      }
    });

    // Arama inputu
    var debounceTimer;
    input && input.addEventListener('input', function () {
      var q = input.value.trim();
      clearBtn && (clearBtn.hidden = !q);
      focusedIdx = -1;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        renderResults(search(q), q);
      }, 160);
    });

    // Kısayol: "/" tuşu ile aç
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !overlay.classList.contains('search-overlay--active') &&
          document.activeElement.tagName !== 'INPUT' &&
          document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearch();
      }
    });
  };

})();
