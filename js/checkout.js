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

  var cart        = JSON.parse(localStorage.getItem('maganda_cart')) || [];
  var currentStep = 0;
  var isGuest     = false;
  var selectedAddressId = null;

  function saveCart() {
    localStorage.setItem('maganda_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('maganda_cart_updated'));
  }

  window.addEventListener('maganda_cart_updated', function() {
    cart = JSON.parse(localStorage.getItem('maganda_cart')) || [];
    if (typeof renderCart === 'function') {
      renderCart();
    }
  });

  /* ───────────────────────────────────────────
     ADIM YÖNETİMİ (0-3)
  ─────────────────────────────────────────── */
  window.goToStep = function (n) {
    if (n < 0 || n > 3) return;
    currentStep = n;

    // Adım 2 (Adres) veya Adım 3 (Ödeme) girilince içeriği render et
    if (n === 2) renderAddressStep();
    if (n === 3) renderPaymentStep();

    var navIds  = [null, 'navStep1', 'navStep2', 'navStep3'];
    var cardIds = [null, 'card1', 'card2', 'card3'];

    navIds.forEach(function (id, i) {
      var navEl  = document.getElementById(id);
      var cardEl = document.getElementById(cardIds[i]);
      if (!navEl || !cardEl) return;
      navEl.classList.remove('active', 'done');
      cardEl.classList.remove('active', 'done');
      if (i < n) {
        navEl.classList.add('done');
        cardEl.classList.add('done');
      } else if (i === n) {
        navEl.classList.add('active');
        cardEl.classList.add('active');
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  function initStepNavigation() {
    var navIds = [null, 'navStep1', 'navStep2', 'navStep3'];
    navIds.forEach(function (id, idx) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', function () {
          if (idx <= currentStep) goToStep(idx);
        });
      }
    });
  }

  /* ─────────────────────────────────────────
     SEPET RENDER
  ───────────────────────────────────────── */
  function renderCart() {
    var listEl         = document.getElementById('checkoutCartItems');
    var summaryItemsEl = document.getElementById('summaryItemList');
    var subtotalEl     = document.getElementById('summarySubtotal');
    var totalEl        = document.getElementById('summaryTotal');
    if (!listEl) return;

    if (cart.length === 0) {
      listEl.innerHTML = '<p class="cart-empty">Sepetiniz boş.</p>';
      if (summaryItemsEl) summaryItemsEl.innerHTML = '';
      if (subtotalEl) subtotalEl.textContent = '₺0';
      if (totalEl)    totalEl.textContent    = '₺0';
      return;
    }

    var listHtml    = '';
    var summaryHtml = '';
    var total       = 0;

    cart.forEach(function (item) {
      var qty       = item.quantity || 1;
      var lineTotal = item.price * qty;
      total += lineTotal;
      var imgStyle = item.image ? 'background-image:url(' + item.image + ');background-size:cover;background-position:center;' : '';

      listHtml +=
        '<div class="ci">' +
          '<div class="ci__img" style="' + imgStyle + '"></div>' +
          '<div class="ci__info">' +
            '<span class="ci__name">' + (item.name || '') + '</span>' +
            (item.size ? '<span class="ci__unit">Beden: ' + item.size + '</span>' : '') +
            '<span class="ci__total">₺' + lineTotal.toLocaleString('tr-TR') + '</span>' +
          '</div>' +
          '<div class="ci__right">' +
            '<div class="ci__qty">' +
              '<button type="button" class="ci__qty-btn" onclick="changeQty(\'' + item.id + '\',-1)">−</button>' +
              '<span class="ci__qty-val">' + qty + '</span>' +
              '<button type="button" class="ci__qty-btn" onclick="changeQty(\'' + item.id + '\',1)">+</button>' +
            '</div>' +
            '<button type="button" class="ci__remove" onclick="removeItem(\'' + item.id + '\')" title="Ürünü Sil">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="pointer-events:none"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>';

      summaryHtml +=
        '<div class="co-summary__item">' +
          '<span class="co-summary__item-name">' + (item.name || '') + (qty > 1 ? ' ×' + qty : '') + '</span>' +
          '<span>₺' + lineTotal.toLocaleString('tr-TR') + '</span>' +
        '</div>';
    });

    listEl.innerHTML = listHtml;
    if (summaryItemsEl) summaryItemsEl.innerHTML = summaryHtml;

    var FREE_SHIPPING = 1000;
    var shipping      = total >= FREE_SHIPPING ? 0 : 49;
    var finalTotal    = total + shipping;

    if (subtotalEl) subtotalEl.textContent = '₺' + total.toLocaleString('tr-TR');
    if (totalEl)    totalEl.textContent    = '₺' + finalTotal.toLocaleString('tr-TR');

    var shipEl = document.getElementById('summaryShipping');
    if (shipEl) shipEl.textContent = shipping === 0 ? 'Ücretsiz' : '₺' + shipping;
  }

  /* ───────────────────────────────────────────
     ADIM 0: HESAP SEÇİMİ
  ─────────────────────────────────────────── */
  function initCheckoutAuth() {
    var container = document.getElementById('checkoutAuthStep');
    if (!container) return;

    var auth    = window.MagandaAuth;
    var session = auth ? auth.getSession() : null;

    if (session) {
      container.innerHTML =
        '<div class="co-auth-step__logged">' +
          '<span class="co-auth-step__logged-icon">✔</span>' +
          '<div>' +
            '<span class="co-auth-step__logged-name">' + session.name + '</span> olarak giriş yaptın.' +
            '<br><small style="color:var(--color-muted)">' + session.email + '</small>' +
          '</div>' +
        '</div>';
      setTimeout(function () { goToStep(1); }, 800);
    } else {
      container.innerHTML =
        '<p class="co-auth-step__title">Nasıl devam etmek istersin?</p>' +
        '<a href="login.html?redirect=checkout.html" class="co-auth-step__option">' +
          '<div class="co-auth-step__option-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          '</div>' +
          '<div class="co-auth-step__option-body">' +
            '<span class="co-auth-step__option-name">GİRİŞ YAP / KAYIT OL</span>' +
            '<span class="co-auth-step__option-desc">Adres &amp; kart otomatik dolar, sipariş geçmişin kaydedilir.</span>' +
          '</div>' +
          '<svg class="co-auth-step__option-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
        '</a>' +
        '<button class="co-auth-step__option" id="guestCheckoutBtn" type="button">' +
          '<div class="co-auth-step__option-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>' +
          '</div>' +
          '<div class="co-auth-step__option-body">' +
            '<span class="co-auth-step__option-name">MİSAFİR OLARAK DEVAM ET</span>' +
            '<span class="co-auth-step__option-desc">Üye olmadan satın al. Sipariş geçmişi kaydedilmez.</span>' +
          '</div>' +
          '<svg class="co-auth-step__option-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
        '</button>';

      var guestBtn = document.getElementById('guestCheckoutBtn');
      if (guestBtn) {
        guestBtn.addEventListener('click', function () {
          isGuest = true;
          goToStep(1);
        });
      }
    }
  }

  /* ───────────────────────────────────────────
     ADIM 2: ADRES ADIMI RENDER
  ─────────────────────────────────────────── */
  function renderAddressStep() {
    var container = document.getElementById('addressStepContent');
    if (!container) return;

    var auth    = window.MagandaAuth;
    var session = auth ? auth.getSession() : null;

    if (!isGuest && session && auth.getAddresses) {
      var addresses = auth.getAddresses();
      if (addresses.length > 0) {
        var defaultAddr = addresses.find(function (a) { return a.isDefault; }) || addresses[0];
        if (!selectedAddressId) selectedAddressId = defaultAddr.id;

        var html = '<p class="co-addr-label">Kayıtlı adreslerinden birini seç:</p>' +
                   '<div class="co-addr-list">';

        addresses.forEach(function (a) {
          var isSel = (a.id === selectedAddressId);
          html +=
            '<label class="co-addr-card' + (isSel ? ' is-selected' : '') + '" data-id="' + a.id + '">' +
              '<input type="radio" name="selectedAddr" value="' + a.id + '"' + (isSel ? ' checked' : '') + ' style="display:none">' +
              '<div class="co-addr-card__check">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>' +
              '</div>' +
              '<div class="co-addr-card__body">' +
                '<strong>' + (a.name || '') + '</strong>' +
                '<span>' + (a.phone || '') + '</span>' +
                '<span>' + (a.line || '') + '</span>' +
                '<span>' + [(a.district || ''), (a.city || '')].filter(Boolean).join(' / ') + '</span>' +
              '</div>' +
              (a.isDefault ? '<span class="co-addr-card__badge">Varsayılan</span>' : '') +
            '</label>';
        });

        html += '</div>' +
          '<a href="hesabim.html" class="co-addr-add-link" target="_blank">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
            ' Hesabımda yeni adres ekle' +
          '</a>';

        container.innerHTML = html;

        container.querySelectorAll('.co-addr-card').forEach(function (card) {
          card.addEventListener('click', function () {
            container.querySelectorAll('.co-addr-card').forEach(function (c) { c.classList.remove('is-selected'); });
            card.classList.add('is-selected');
            selectedAddressId = parseInt(card.getAttribute('data-id'), 10);
          });
        });
        return;
      }
    }

    // Misafir veya kayıtlı adres yoksa → manuel form
    container.innerHTML =
      '<form id="addressForm" novalidate>' +
        '<div class="field-row">' +
          '<div class="field"><label for="fname" class="field__label">Ad <span class="req">*</span></label>' +
            '<input type="text" id="fname" class="field__input" placeholder="Adınız" autocomplete="given-name">' +
            '<span class="field__error" id="fnameErr"></span></div>' +
          '<div class="field"><label for="lname" class="field__label">Soyad <span class="req">*</span></label>' +
            '<input type="text" id="lname" class="field__input" placeholder="Soyadınız" autocomplete="family-name">' +
            '<span class="field__error" id="lnameErr"></span></div>' +
        '</div>' +
        '<div class="field"><label for="phone" class="field__label">Telefon <span class="req">*</span></label>' +
          '<input type="tel" id="phone" class="field__input" placeholder="05XX XXX XX XX" autocomplete="tel" maxlength="11">' +
          '<span class="field__error" id="phoneErr"></span></div>' +
        '<div class="field"><label for="address" class="field__label">Açık Adres <span class="req">*</span></label>' +
          '<textarea id="address" class="field__input field__textarea" placeholder="Mahalle, cadde, sokak, no, daire…" rows="3"></textarea>' +
          '<span class="field__error" id="addressErr"></span></div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="city" class="field__label">İl <span class="req">*</span></label>' +
            '<input type="text" id="city" class="field__input" placeholder="İstanbul" autocomplete="address-level1">' +
            '<span class="field__error" id="cityErr"></span></div>' +
          '<div class="field"><label for="district" class="field__label">İlçe <span class="req">*</span></label>' +
            '<input type="text" id="district" class="field__input" placeholder="Kadıköy" autocomplete="address-level2">' +
            '<span class="field__error" id="districtErr"></span></div>' +
        '</div>' +
      '</form>';

    bindLiveValidation();
  }

  window.changeQty = function (id, delta) {
    var item = cart.find(function (i) { return String(i.id) === String(id); });
    if (!item) return;
    item.quantity = (item.quantity || 1) + delta;
    if (item.quantity < 1) item.quantity = 1;
    saveCart();
    renderCart();
  };

  window.removeItem = function (id) {
    cart = cart.filter(function (i) { return String(i.id) !== String(id); });
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
    if (inp) inp.classList.remove('is-error', 'is-ok');
    if (err) err.textContent = '';
  }

  function bindLiveClear(inputId, errId) {
    var inp = document.getElementById(inputId);
    if (!inp) return;
    inp.addEventListener('input', function () { clearState(inputId, errId); });
  }

  /* ─────────────────────────────────────────
     ADRES VALIDASYONU
  ───────────────────────────────────────── */
  function validateAddress() {
    var auth    = window.MagandaAuth;
    var session = auth ? auth.getSession() : null;

    // Kayıtlı adres seçici varsa
    if (!isGuest && session && auth.getAddresses && auth.getAddresses().length > 0) {
      if (!selectedAddressId) {
        var firstCard = document.querySelector('.co-addr-card');
        if (firstCard) { firstCard.click(); return true; }
        return false;
      }
      return true;
    }

    // Manuel form validasyonu
    var ok = true;
    var fname = (document.getElementById('fname') || {}).value;
    if (!fname || fname.trim().length < 2) {
      showError('fname', 'fnameErr', 'Ad en az 2 karakter olmalı.'); ok = false;
    } else { showOk('fname', 'fnameErr'); }

    var lname = (document.getElementById('lname') || {}).value;
    if (!lname || lname.trim().length < 2) {
      showError('lname', 'lnameErr', 'Soyad en az 2 karakter olmalı.'); ok = false;
    } else { showOk('lname', 'lnameErr'); }

    var phone = (document.getElementById('phone') || {}).value.replace(/\s/g, '');
    if (!/^(05[0-9]{9}|5[0-9]{9})$/.test(phone)) {
      showError('phone', 'phoneErr', 'Geçerli bir telefon numarası girin.'); ok = false;
    } else { showOk('phone', 'phoneErr'); }

    var address = (document.getElementById('address') || {}).value;
    if (!address || address.trim().length < 10) {
      showError('address', 'addressErr', 'Lütfen tam adresinizi girin.'); ok = false;
    } else { showOk('address', 'addressErr'); }

    var city = (document.getElementById('city') || {}).value;
    if (!city || city.trim().length < 2) {
      showError('city', 'cityErr', 'İl boş bırakılamaz.'); ok = false;
    } else { showOk('city', 'cityErr'); }

    var district = (document.getElementById('district') || {}).value;
    if (!district || district.trim().length < 2) {
      showError('district', 'districtErr', 'İlçe boş bırakılamaz.'); ok = false;
    } else { showOk('district', 'districtErr'); }

    return ok;
  }

  /* ───────────────────────────────────────────
     ADIM 3: ÖDEME ADIMI RENDER
  ─────────────────────────────────────────── */
  var selectedCardId = null;

  function renderPaymentStep() {
    var container = document.getElementById('paymentStepContent');
    if (!container) return;

    var auth    = window.MagandaAuth;
    var session = auth ? auth.getSession() : null;

    if (!isGuest && session && auth.getCards) {
      var cards = auth.getCards();
      if (cards.length > 0) {
        var defaultCard = cards.find(function (c) { return c.isDefault; }) || cards[0];
        if (!selectedCardId) selectedCardId = defaultCard.id;

        var html = '<p class="co-addr-label">Kayıtlı kartlarından birini seç:</p>' +
                   '<div class="co-addr-list">';

        cards.forEach(function (c) {
          var isSel = (c.id === selectedCardId);
          html +=
            '<label class="co-addr-card' + (isSel ? ' is-selected' : '') + '" data-id="' + c.id + '">' +
              '<input type="radio" name="selectedCard" value="' + c.id + '"' + (isSel ? ' checked' : '') + ' style="display:none">' +
              '<div class="co-addr-card__check">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>' +
              '</div>' +
              '<div class="co-addr-card__body">' +
                '<strong>' + (c.maskedNum || '•••• •••• •••• ••••') + '</strong>' +
                '<span>' + (c.name || '') + '</span>' +
                '<span>SKT: ' + (c.exp || '') + '</span>' +
              '</div>' +
              (c.isDefault ? '<span class="co-addr-card__badge">Varsayılan</span>' : '') +
            '</label>';
        });

        html += '</div>' +
          '<a href="hesabim.html" class="co-addr-add-link" target="_blank">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
            ' Hesabımda yeni kart ekle' +
          '</a>' +
          '<div class="field" style="margin-top:1.5rem"><label class="field__label">Seçili Kart CVV <span class="req">*</span></label>' +
          '<input type="text" id="cardCvv" class="field__input" placeholder="•••" autocomplete="cc-csc" maxlength="4" inputmode="numeric">' +
          '<span class="field__error" id="cardCvvErr"></span></div>';

        container.innerHTML = html;

        container.querySelectorAll('.co-addr-card').forEach(function (card) {
          card.addEventListener('click', function () {
            container.querySelectorAll('.co-addr-card').forEach(function (c) { c.classList.remove('is-selected'); });
            card.classList.add('is-selected');
            selectedCardId = parseInt(card.getAttribute('data-id'), 10);
          });
        });
        bindLiveClear('cardCvv', 'cardCvvErr');
        return;
      }
    }

    // Manuel Form
    container.innerHTML =
      '<div class="card-icons">' +
        '<span class="card-icon">VISA</span>' +
        '<span class="card-icon">MC</span>' +
        '<span class="card-icon">TROY</span>' +
      '</div>' +
      '<form id="paymentForm" novalidate>' +
        '<div class="field">' +
          '<label for="cardName" class="field__label">Kart Üzerindeki İsim <span class="req">*</span></label>' +
          '<input type="text" id="cardName" class="field__input" placeholder="ADI SOYADI" autocomplete="cc-name" style="text-transform:uppercase">' +
          '<span class="field__error" id="cardNameErr"></span>' +
        '</div>' +
        '<div class="field">' +
          '<label for="cardNum" class="field__label">Kart Numarası <span class="req">*</span></label>' +
          '<input type="text" id="cardNum" class="field__input" placeholder="XXXX  XXXX  XXXX  XXXX" autocomplete="cc-number" maxlength="19" inputmode="numeric">' +
          '<span class="field__error" id="cardNumErr"></span>' +
        '</div>' +
        '<div class="field-row">' +
          '<div class="field">' +
            '<label for="cardExp" class="field__label">Son Kullanma <span class="req">*</span></label>' +
            '<input type="text" id="cardExp" class="field__input" placeholder="AA/YY" autocomplete="cc-exp" maxlength="5" inputmode="numeric">' +
            '<span class="field__error" id="cardExpErr"></span>' +
          '</div>' +
          '<div class="field">' +
            '<label for="cardCvv" class="field__label">CVV <span class="req">*</span></label>' +
            '<input type="text" id="cardCvv" class="field__input" placeholder="•••" autocomplete="cc-csc" maxlength="4" inputmode="numeric">' +
            '<span class="field__error" id="cardCvvErr"></span>' +
          '</div>' +
        '</div>' +
      '</form>';

    initCardMask();
    ['cardName','cardNum','cardExp','cardCvv'].forEach(function(id) { bindLiveClear(id, id+'Err'); });
  }

  function validatePayment() {
    var ok = true;
    var auth    = window.MagandaAuth;
    var session = auth ? auth.getSession() : null;

    if (!isGuest && session && auth.getCards && auth.getCards().length > 0) {
      if (!selectedCardId) {
        var firstCard = document.querySelector('.co-addr-card');
        if (firstCard) { firstCard.click(); }
        else { return false; }
      }
      var cvv = (document.getElementById('cardCvv') || {}).value;
      if (!/^\d{3,4}$/.test(cvv)) {
        showError('cardCvv', 'cardCvvErr', 'CVV 3 veya 4 haneli olmalı.'); ok = false;
      } else { showOk('cardCvv', 'cardCvvErr'); }
      return ok;
    }

    var cardName = (document.getElementById('cardName') || {}).value;
    if (!cardName || cardName.trim().split(' ').length < 2 || cardName.trim().length < 5) {
      showError('cardName', 'cardNameErr', 'Lütfen kart üzerindeki tam adı girin.'); ok = false;
    } else { showOk('cardName', 'cardNameErr'); }

    var rawNum = (document.getElementById('cardNum') || {}).value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(rawNum)) {
      showError('cardNum', 'cardNumErr', 'Kart numarası 16 haneli olmalı.'); ok = false;
    } else { showOk('cardNum', 'cardNumErr'); }

    var exp   = (document.getElementById('cardExp') || {}).value;
    var expRe = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expRe.test(exp)) {
      showError('cardExp', 'cardExpErr', 'Geçerli format: AA/YY (örn. 03/27).'); ok = false;
    } else {
      var parts    = exp.split('/');
      var expYear  = parseInt('20' + parts[1], 10);
      var expMonth = parseInt(parts[0], 10);
      var now      = new Date();
      if (expYear < now.getFullYear() || (expYear === now.getFullYear() && expMonth < now.getMonth() + 1)) {
        showError('cardExp', 'cardExpErr', 'Kartın son kullanma tarihi geçmiş.'); ok = false;
      } else { showOk('cardExp', 'cardExpErr'); }
    }

    var cvvManual = (document.getElementById('cardCvv') || {}).value;
    if (!/^\d{3,4}$/.test(cvvManual)) {
      showError('cardCvv', 'cardCvvErr', 'CVV 3 veya 4 haneli olmalı.'); ok = false;
    } else { showOk('cardCvv', 'cardCvvErr'); }

    return ok;
  }

  /* ─────────────────────────────────────────
     KART NUMARASI FORMATLAMA
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
        this.value = val.length >= 3 ? val.substring(0, 2) + '/' + val.substring(2) : val;
      });
    }
    var cardCvvInp = document.getElementById('cardCvv');
    if (cardCvvInp) {
      cardCvvInp.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').substring(0, 4);
      });
    }
  }

  /* ───────────────────────────────────────────
     SİPARİŞ TAMAMLA
  ─────────────────────────────────────────── */
  function completeOrder() {
    if (cart.length === 0) { goToStep(1); return; }
    var total = cart.reduce(function (acc, i) { return acc + (i.price * (i.quantity || 1)); }, 0);

    if (!isGuest && window.MagandaAuth && window.MagandaAuth.isLoggedIn()) {
      window.MagandaAuth.addOrder({
        items: cart.map(function (i) { return { name: i.name, quantity: i.quantity || 1, price: i.price }; }),
        total: total
      });
    }

    localStorage.removeItem('maganda_cart');
    var successEl = document.getElementById('successScreen');
    if (successEl) successEl.classList.add('active');
  }

  /* ─────────────────────────────────────────
     BUTTON BINDING
  ───────────────────────────────────────── */
  function bindButtons() {
    var toStep2Btn = document.getElementById('toStep2Btn');
    if (toStep2Btn) {
      toStep2Btn.addEventListener('click', function () {
        if (cart.length === 0) { alert('Sepetinizde ürün yok.'); return; }
        goToStep(2);
      });
    }

    var toStep3Btn = document.getElementById('toStep3Btn');
    if (toStep3Btn) {
      toStep3Btn.addEventListener('click', function () {
        if (validateAddress()) goToStep(3);
      });
    }

    var submitBtn = document.getElementById('submitOrderBtn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        if (validatePayment()) completeOrder();
      });
    }
  }

  /* ─────────────────────────────────────────
     CANLI TEMİZLEMELER
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

  /* ───────────────────────────────────────────
     INIT
  ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initCheckoutAuth();
    renderCart();
    bindButtons();
    bindLiveValidation();
    initCardMask();
    initStepNavigation();
    goToStep(1);
  });

})();
