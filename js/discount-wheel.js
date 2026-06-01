(function () {
  'use strict';

  var PRIZE_KEY = 'maganda_discount_wheel_prize';
  var DATE_KEY = 'maganda_discount_wheel_date';
  var SPIN_MS = 3800;
  var SEGMENT_DEG = 60;

  var prizes = [
    { label: '%5 indirim', code: 'NMAGANDA5', detail: 'Sepette kullanabileceğin hızlı başlangıç kodu.' },
    { label: '%10 indirim', code: 'NMAGANDA10', detail: 'Garajdan çıkmadan önce iyi bir avantaj.' },
    { label: '%15 indirim', code: 'REDLINE15', detail: 'Redline ruhuna yakışan daha sert bir kod.' },
    { label: '%20 drop kodu', code: 'DROP20', detail: 'Drop ürünlerde kullanmak için sakla.' },
    { label: 'Ücretsiz kargo', code: 'KARGOBIZDEN', detail: 'Kargo tarafını NMAGANDA üstlensin.' },
    { label: 'Sticker hediyesi', code: 'STICKER', detail: 'Sipariş notunda bu kodu belirt.' }
  ];

  var spinning = false;

  function getTodayKey() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return now.getFullYear() + '-' + month + '-' + day;
  }

  function readStoredPrize() {
    try {
      var raw = localStorage.getItem(PRIZE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  function getTodaysPrize() {
    try {
      if (localStorage.getItem(DATE_KEY) !== getTodayKey()) return null;
      return readStoredPrize();
    } catch (err) {
      return null;
    }
  }

  function saveTodaysPrize(prize) {
    var payload = {
      label: prize.label,
      code: prize.code,
      detail: prize.detail,
      date: getTodayKey()
    };

    try {
      localStorage.setItem(PRIZE_KEY, JSON.stringify(payload));
      localStorage.setItem(DATE_KEY, payload.date);
    } catch (err) {
      // The visible result still works when storage is unavailable.
    }

    return payload;
  }

  function buildWheelModal() {
    if (document.getElementById('discountWheelModal')) return;

    var html =
      '<div class="discount-wheel__modal" id="discountWheelModal" aria-hidden="true">' +
        '<div class="discount-wheel__backdrop" data-wheel-close></div>' +
        '<section class="discount-wheel__panel" role="dialog" aria-modal="true" aria-labelledby="discountWheelTitle">' +
          '<button class="discount-wheel__close" type="button" aria-label="Kapat" data-wheel-close>&times;</button>' +
          '<div class="discount-wheel__copy">' +
            '<span class="discount-wheel__eyebrow">NMAGANDA GARAGE BONUS</span>' +
            '<h2 class="discount-wheel__title" id="discountWheelTitle">İndirim çarkını çevir</h2>' +
            '<p class="discount-wheel__text">Bugünkü kodunu kap. Her gün bir şans, her dilim kazandırır.</p>' +
          '</div>' +
          '<div class="discount-wheel__stage">' +
            '<div class="discount-wheel__pointer" aria-hidden="true"></div>' +
            '<div class="discount-wheel__disc" id="discountWheelDisc" aria-hidden="true">' +
              '<span style="--i:0">%5</span>' +
              '<span style="--i:1">%10</span>' +
              '<span style="--i:2">%15</span>' +
              '<span style="--i:3">DROP</span>' +
              '<span style="--i:4">KARGO</span>' +
              '<span style="--i:5">STICKER</span>' +
            '</div>' +
            '<button class="discount-wheel__spin" id="discountWheelSpin" type="button">ÇARKI ÇEVİR</button>' +
          '</div>' +
          '<div class="discount-wheel__result" id="discountWheelResult" hidden>' +
            '<span class="discount-wheel__result-label" id="discountWheelPrizeLabel"></span>' +
            '<strong class="discount-wheel__code" id="discountWheelPrizeCode"></strong>' +
            '<p class="discount-wheel__result-detail" id="discountWheelPrizeDetail"></p>' +
            '<button class="discount-wheel__copy-btn" id="discountWheelCopy" type="button">Kodu kopyala</button>' +
          '</div>' +
        '</section>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', html);
  }

  function renderWheelLauncher() {
    if (document.getElementById('discountWheelLauncher')) return;

    buildWheelModal();

    var launcher =
      '<button class="discount-wheel__launcher" id="discountWheelLauncher" type="button" aria-haspopup="dialog">' +
        '<span class="discount-wheel__launcher-wheel" aria-hidden="true"></span>' +
        '<span class="discount-wheel__launcher-arrow" aria-hidden="true"></span>' +
      '</button>';

    document.body.insertAdjacentHTML('beforeend', launcher);

    var launcherEl = document.getElementById('discountWheelLauncher');
    var modal = document.getElementById('discountWheelModal');
    var spinBtn = document.getElementById('discountWheelSpin');
    var copyBtn = document.getElementById('discountWheelCopy');

    launcherEl.addEventListener('click', function () {
      openModal(modal);
    });

    modal.querySelectorAll('[data-wheel-close]').forEach(function (el) {
      el.addEventListener('click', function () {
        closeModal(modal);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal(modal);
      }
    });

    spinBtn.addEventListener('click', spinWheel);
    copyBtn.addEventListener('click', copyPrizeCode);
  }

  function openModal(modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    var stored = getTodaysPrize();
    if (stored) {
      showResult(stored, true);
    }

    var spinBtn = document.getElementById('discountWheelSpin');
    if (spinBtn) spinBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function spinWheel() {
    if (spinning) return;

    var stored = getTodaysPrize();
    if (stored) {
      showResult(stored, true);
      return;
    }

    var disc = document.getElementById('discountWheelDisc');
    var spinBtn = document.getElementById('discountWheelSpin');
    var index = Math.floor(Math.random() * prizes.length);
    var prize = prizes[index];
    var targetRotation = 360 * 6 + (360 - (index * SEGMENT_DEG + SEGMENT_DEG / 2));

    spinning = true;
    spinBtn.disabled = true;
    spinBtn.textContent = 'DÖNÜYOR...';
    disc.style.transform = 'rotate(' + targetRotation + 'deg)';

    window.setTimeout(function () {
      var saved = saveTodaysPrize(prize);
      spinning = false;
      showResult(saved, false);
      renderCheckoutReminder();
    }, SPIN_MS);
  }

  function showResult(prize, alreadyWon) {
    var result = document.getElementById('discountWheelResult');
    var label = document.getElementById('discountWheelPrizeLabel');
    var code = document.getElementById('discountWheelPrizeCode');
    var detail = document.getElementById('discountWheelPrizeDetail');
    var spinBtn = document.getElementById('discountWheelSpin');

    if (!result || !label || !code || !detail || !spinBtn) return;

    label.textContent = alreadyWon ? 'Bugünkü kodun hazır' : prize.label + ' kazandın';
    code.textContent = prize.code;
    detail.textContent = prize.detail || 'Kodu checkout ekranında hatırlatacağız.';
    result.hidden = false;
    spinBtn.disabled = true;
    spinBtn.textContent = 'BUGÜNLÜK HAK KULLANILDI';
  }

  function copyPrizeCode() {
    var codeEl = document.getElementById('discountWheelPrizeCode');
    if (!codeEl) return;

    var code = codeEl.textContent.trim();
    var done = function () {
      if (window.toast) window.toast('Kupon kodu kopyalandı', 'success');
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done).catch(function () {
        selectCode(codeEl);
      });
    } else {
      selectCode(codeEl);
    }
  }

  function selectCode(codeEl) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(codeEl);
    selection.removeAllRanges();
    selection.addRange(range);
    if (window.toast) window.toast('Kod seçildi, kopyalayabilirsin', 'info');
  }

  function renderCheckoutReminder() {
    var mount = document.getElementById('discountWheelCheckoutReminder');
    if (!mount) return;

    var prize = getTodaysPrize();
    if (!prize) {
      mount.innerHTML = '';
      mount.hidden = true;
      return;
    }

    mount.hidden = false;
    mount.innerHTML =
      '<div class="co-summary__row co-summary__row--coupon">' +
        '<span>Kazandığın kod</span>' +
        '<strong>' + prize.code + '</strong>' +
      '</div>' +
      '<p class="co-summary__coupon-note">Kodu ödeme notunda veya kampanya alanında kullan.</p>';
  }

  function initDiscountWheel() {
    renderWheelLauncher();
    renderCheckoutReminder();
  }

  window.MagandaDiscountWheel = {
    renderCheckoutReminder: renderCheckoutReminder,
    getTodaysPrize: getTodaysPrize
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDiscountWheel);
  } else {
    initDiscountWheel();
  }
})();
