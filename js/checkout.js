(function () {
  var saved = localStorage.getItem('maganda_theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     CART STATE (localStorage'dan oku)
  ───────────────────────────────────────── */
  var cart = JSON.parse(localStorage.getItem('maganda_cart')) || [];
  var currentStep = 1;

  function saveCart() {
    localStorage.setItem('maganda_cart', JSON.stringify(cart));
  }

  /* ─────────────────────────────────────────
     ADIM YÖNETİMİ
  ───────────────────────────────────────── */
  window.goToStep = function (n) {
    if (n < 1 || n > 3) return;
    currentStep = n;

    for (var i = 1; i <= 3; i++) {
      var card = document.getElementById('card' + i);
      var navStep = document.getElementById('navStep' + i);
      if (!card || !navStep) continue;

      card.classList.remove('active', 'done');
      navStep.classList.remove('active', 'done');

      if (i < n) {
        card.classList.add('done');
        navStep.classList.add('done');
      } else if (i === n) {
        card.classList.add('active');
        navStep.classList.add('active');
        // Aktif karta yumuşakça kaydır
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Adım göstergesine tıklanarak geri gidilebilsin
  function initStepNavigation() {
    for (var i = 1; i <= 3; i++) {
      (function(step) {
        var el = document.getElementById('navStep' + step);
        if (el) {
          el.addEventListener('click', function() {
            // Sadece tamamlanmış veya aktif adımlara gidebilir
            if (step <= currentStep) {
              goToStep(step);
            }
          });
        }
      })(i);
    }
  }

  /* ─────────────────────────────────────────
     SEPET RENDER (Adım 1 + Sağ Panel Özet)
  ───────────────────────────────────────── */
  function renderCart() {
    var listEl = document.getElementById('checkoutCartItems');
    var summaryItemsEl = document.getElementById('summaryItemList');
    var subtotalEl = document.getElementById('summarySubtotal');
    var totalEl = document.getElementById('summaryTotal');

    if (!listEl) return;

    if (cart.length === 0) {
      listEl.innerHTML = '<p class="cart-empty">Sepetiniz boş.</p>';
      if (summaryItemsEl) summaryItemsEl.innerHTML = '';
      if (subtotalEl) subtotalEl.textContent = '₺0';
      if (totalEl) totalEl.textContent = '₺0';
      return;
    }

    var listHtml = '';
    var summaryHtml = '';
    var total = 0;

    cart.forEach(function (item) {
      var qty = item.quantity || 1;
      var lineTotal = item.price * qty;
      total += lineTotal;

      var imgStyle = item.image ? 'background-image:url(' + item.image + ');background-size:cover;background-position:center;' : '';

      listHtml += `
        <div class="ci">
          <div class="ci__img" style="${imgStyle}"></div>
          <div class="ci__info">
            <span class="ci__name">${item.name}</span>
            <span class="ci__unit">Birim: ₺${item.price.toLocaleString('tr-TR')}</span>
          </div>
          <div class="ci__actions">
            <span class="ci__total">₺${lineTotal.toLocaleString('tr-TR')}</span>
            <div class="ci__qty">
              <button class="ci__qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Azalt">−</button>
              <span class="ci__qty-val">${qty}</span>
              <button class="ci__qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Artır">+</button>
            </div>
            <button class="ci__remove" onclick="removeItem(${item.id})">Kaldır</button>
          </div>
        </div>
      `;


      summaryHtml += `
        <div class="co-summary__item">
          <span class="co-summary__item-name">${item.name}</span>
          <span>${qty}x ₺${lineTotal.toLocaleString('tr-TR')}</span>
        </div>
      `;
    });

    listEl.innerHTML = listHtml;
    if (summaryItemsEl) summaryItemsEl.innerHTML = summaryHtml;

    var SHIPPING_THRESHOLD = 1000;
    var SHIPPING_COST = 149.90;
    var shipping = (total > 0 && total < SHIPPING_THRESHOLD) ? SHIPPING_COST : 0;
    var finalTotal = total + shipping;

    var shippingEl = document.getElementById('summaryShipping');
    if (shippingEl) {
      if (shipping === 0) {
        shippingEl.textContent = 'Ücretsiz';
        shippingEl.className = 'co-summary__free';
      } else {
        shippingEl.textContent = '₺' + shipping.toLocaleString('tr-TR');
        shippingEl.className = '';
      }
    }

    if (subtotalEl) subtotalEl.textContent = '₺' + total.toLocaleString('tr-TR');
    if (totalEl) totalEl.textContent = '₺' + finalTotal.toLocaleString('tr-TR');
  }

  window.changeQty = function (id, delta) {
    var item = cart.find(function (i) { return i.id === id; });
    if (!item) return;
    item.quantity = (item.quantity || 1) + delta;
    if (item.quantity < 1) item.quantity = 1;
    saveCart();
    renderCart();
  };

  window.removeItem = function (id) {
    cart = cart.filter(function (i) { return i.id !== id; });
    saveCart();
    renderCart();
  };

  /* ─────────────────────────────────────────
     FORM VALIDASYON YARDIMCILARI
  ───────────────────────────────────────── */
  function showError(inputId, errId, msg) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (!inp || !err) return;
    inp.classList.add('is-error');
    inp.classList.remove('is-ok');
    err.textContent = msg;
  }

  function showOk(inputId, errId) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (!inp || !err) return;
    inp.classList.remove('is-error');
    inp.classList.add('is-ok');
    err.textContent = '';
  }

  function clearState(inputId, errId) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (inp) { inp.classList.remove('is-error', 'is-ok'); }
    if (err) { err.textContent = ''; }
  }

  // Canlı temizleme: kullanıcı yazmaya başlayınca hata gider
  function bindLiveClear(inputId, errId) {
    var inp = document.getElementById(inputId);
    if (!inp) return;
    inp.addEventListener('input', function () { clearState(inputId, errId); });
  }

  /* ─────────────────────────────────────────
     ADRES FORMU VALİDASYONU
  ───────────────────────────────────────── */
  function validateAddress() {
    var ok = true;

    var fname = (document.getElementById('fname') || {}).value;
    if (!fname || fname.trim().length < 2) {
      showError('fname', 'fnameErr', 'Ad en az 2 karakter olmalı.');
      ok = false;
    } else { showOk('fname', 'fnameErr'); }

    var lname = (document.getElementById('lname') || {}).value;
    if (!lname || lname.trim().length < 2) {
      showError('lname', 'lnameErr', 'Soyad en az 2 karakter olmalı.');
      ok = false;
    } else { showOk('lname', 'lnameErr'); }

    var phone = (document.getElementById('phone') || {}).value.replace(/\s/g, '');
    var phoneRe = /^(05[0-9]{9}|5[0-9]{9})$/;
    if (!phoneRe.test(phone)) {
      showError('phone', 'phoneErr', 'Geçerli bir telefon numarası girin (05XX XXX XXXX).');
      ok = false;
    } else { showOk('phone', 'phoneErr'); }

    var address = (document.getElementById('address') || {}).value;
    if (!address || address.trim().length < 10) {
      showError('address', 'addressErr', 'Lütfen tam adresinizi girin (en az 10 karakter).');
      ok = false;
    } else { showOk('address', 'addressErr'); }

    var city = (document.getElementById('city') || {}).value;
    if (!city || city.trim().length < 2) {
      showError('city', 'cityErr', 'İl boş bırakılamaz.');
      ok = false;
    } else { showOk('city', 'cityErr'); }

    var district = (document.getElementById('district') || {}).value;
    if (!district || district.trim().length < 2) {
      showError('district', 'districtErr', 'İlçe boş bırakılamaz.');
      ok = false;
    } else { showOk('district', 'districtErr'); }

    return ok;
  }

  /* ─────────────────────────────────────────
     ÖDEME FORMU VALİDASYONU
  ───────────────────────────────────────── */
  function validatePayment() {
    var ok = true;

    var cardName = (document.getElementById('cardName') || {}).value;
    if (!cardName || cardName.trim().split(' ').length < 2 || cardName.trim().length < 5) {
      showError('cardName', 'cardNameErr', 'Lütfen kart üzerindeki tam adı girin.');
      ok = false;
    } else { showOk('cardName', 'cardNameErr'); }

    var rawNum = (document.getElementById('cardNum') || {}).value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(rawNum)) {
      showError('cardNum', 'cardNumErr', 'Kart numarası 16 haneli olmalı.');
      ok = false;
    } else { showOk('cardNum', 'cardNumErr'); }

    var exp = (document.getElementById('cardExp') || {}).value;
    var expRe = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expRe.test(exp)) {
      showError('cardExp', 'cardExpErr', 'Geçerli format: AA/YY (örn. 03/27).');
      ok = false;
    } else {
      var parts = exp.split('/');
      var expMonth = parseInt(parts[0], 10);
      var expYear = parseInt('20' + parts[1], 10);
      var now = new Date();
      var curYear = now.getFullYear();
      var curMonth = now.getMonth() + 1;
      if (expYear < curYear || (expYear === curYear && expMonth < curMonth)) {
        showError('cardExp', 'cardExpErr', 'Kartın son kullanma tarihi geçmiş.');
        ok = false;
      } else { showOk('cardExp', 'cardExpErr'); }
    }

    var cvv = (document.getElementById('cardCvv') || {}).value;
    if (!/^\d{3,4}$/.test(cvv)) {
      showError('cardCvv', 'cardCvvErr', 'CVV 3 veya 4 haneli olmalı.');
      ok = false;
    } else { showOk('cardCvv', 'cardCvvErr'); }

    return ok;
  }

  /* ─────────────────────────────────────────
     KART NUMARASI FORMATLAMA (live mask)
  ───────────────────────────────────────── */
  function initCardMask() {
    var cardNumInp = document.getElementById('cardNum');
    if (cardNumInp) {
      cardNumInp.addEventListener('input', function () {
        var val = this.value.replace(/\D/g, '').substring(0, 16);
        this.value = val.replace(/(.{4})/g, '$1 ').trim();
      });
    }

    var cardExpInp = document.getElementById('cardExp');
    if (cardExpInp) {
      cardExpInp.addEventListener('input', function () {
        var val = this.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 3) {
          this.value = val.substring(0, 2) + '/' + val.substring(2);
        } else {
          this.value = val;
        }
      });
    }

    var cardCvvInp = document.getElementById('cardCvv');
    if (cardCvvInp) {
      cardCvvInp.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').substring(0, 4);
      });
    }
  }

  /* ─────────────────────────────────────────
     SİPARİŞ TAMAMLA
  ───────────────────────────────────────── */
  function completeOrder() {
    if (cart.length === 0) {
      goToStep(1);
      return;
    }
    localStorage.removeItem('maganda_cart');
    var successEl = document.getElementById('successScreen');
    if (successEl) successEl.classList.add('active');
  }

  /* ─────────────────────────────────────────
     BUTTON BINDING
  ───────────────────────────────────────── */
  function bindButtons() {
    // Adım 1 → 2
    var toStep2Btn = document.getElementById('toStep2Btn');
    if (toStep2Btn) {
      toStep2Btn.addEventListener('click', function () {
        if (cart.length === 0) {
          alert('Sepetinizde ürün yok.');
          return;
        }
        goToStep(2);
      });
    }

    // Adım 2 → 3 (Adres validasyonuyla)
    var toStep3Btn = document.getElementById('toStep3Btn');
    if (toStep3Btn) {
      toStep3Btn.addEventListener('click', function () {
        if (validateAddress()) {
          goToStep(3);
        }
      });
    }

    // Adım 3 → Tamamla (Ödeme validasyonuyla)
    var submitBtn = document.getElementById('submitOrderBtn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        if (validatePayment()) {
          completeOrder();
        }
      });
    }
  }

  /* ─────────────────────────────────────────
     CANLI TEMİZLEMELER (hata mesajını sil)
  ───────────────────────────────────────── */
  function bindLiveValidation() {
    var pairs = [
      ['fname','fnameErr'], ['lname','lnameErr'], ['phone','phoneErr'],
      ['address','addressErr'], ['city','cityErr'], ['district','districtErr'],
      ['cardName','cardNameErr'], ['cardNum','cardNumErr'],
      ['cardExp','cardExpErr'], ['cardCvv','cardCvvErr']
    ];
    pairs.forEach(function (p) { bindLiveClear(p[0], p[1]); });
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    renderCart();
    bindButtons();
    bindLiveValidation();
    initCardMask();
    initStepNavigation();
    goToStep(1);
  });

})();
