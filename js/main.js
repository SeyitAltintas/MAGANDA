/* ═══════════════════════════════════════════
   MAGANDA — main.js
   Modüler yapı: her özellik ayrı fonksiyon
   ═══════════════════════════════════════════ */

// Tema flasini onlemek icin sayfa yuklenmeden once temayi uygula
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



    /* --- TEMA YONETIMI -------------------- */
  function initTheme() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('maganda_theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('maganda_theme', 'light');
      }
    });
  }
/* ─── CINEMATIC HERO ─────────────────── */
  function initCinematicHero() {
    var hero = document.getElementById('cinematicHero');
    if (!hero) return;

    var carLink = hero.querySelector('[data-target="car"]');
    var motoLink = hero.querySelector('[data-target="moto"]');
    var carVideo = document.getElementById('cineVideoCar');
    var motoVideo = document.getElementById('cineVideoMoto');

    if (!carLink || !motoLink) return;

    // Araba Linki Hover
    carLink.addEventListener('mouseenter', function() {
      hero.setAttribute('data-active', 'car');
      if (carVideo) carVideo.play();
      if (motoVideo) motoVideo.pause();
    });

    // Moto Linki Hover
    motoLink.addEventListener('mouseenter', function() {
      hero.setAttribute('data-active', 'moto');
      if (motoVideo) motoVideo.play();
      if (carVideo) carVideo.pause();
    });

    // İkisinden de çıkıldığında
    var linksContainer = hero.querySelector('.cinematic-hero__links');
    linksContainer.addEventListener('mouseleave', function() {
      hero.setAttribute('data-active', 'none');
      if (carVideo) carVideo.pause();
      if (motoVideo) motoVideo.pause();
    });
  }

  /* ─── NAVBAR SCROLL ──────────────────── */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Sayfa zaten force-scrolled ise en başta scrolled olarak ayarla
    var isForceScrolled = document.body.classList.contains('force-scrolled-nav');
    var scrolled = isForceScrolled || window.scrollY > 50;
    if (scrolled) navbar.classList.add('navbar--scrolled');

    window.addEventListener('scroll', function () {
      var shouldBeScrolled = isForceScrolled || window.scrollY > 50;
      if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        navbar.classList.toggle('navbar--scrolled', scrolled);
      }
    }, { passive: true });
  }

  /* --- SMOOTH SCROLL ──────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── SCROLL ANIMATIONS ─────────────── */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ─── MANIFESTO STAGGER ─────────────── */
  function initManifestoStagger() {
    var body = document.querySelector('[data-stagger]');
    if (!body) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var lines = entry.target.querySelectorAll('[data-animate]');
          lines.forEach(function (line, i) {
            setTimeout// Tema flasini onlemek icin sayfa yuklenmeden once temayi uygula
(function () {
  var saved = localStorage.getItem('maganda_theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
(function () {
              line.classList.add('is-visible');
            }, i * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(body);
  }

  /* ─── SCROLL PARALLAX ──────────────────── */
  function initParallax() {
    var bgTexts = document.querySelectorAll('.bg-text-parallax');
    var ticking = false;

    if (!bgTexts.length) return;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame// Tema flasini onlemek icin sayfa yuklenmeden once temayi uygula
(function () {
  var saved = localStorage.getItem('maganda_theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
(function () {
          var scrollY = window.scrollY;

          // Background Text Parallax
          bgTexts.forEach(function(text) {
            var parent = text.parentElement;
            var rect = parent.getBoundingClientRect();
            // Sadece ekrandaysa hesapla
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              // Y ekseninde ters yöne kaydırma efekti (-50% base'den başlatıp scrolla göre hareket)
              var moveY = -50 + (rect.top * 0.05);
              text.style.transform = 'translate(-50%, ' + moveY + '%)';
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }




  /* ─── CART DRAWER ────────────────────── */
  var cart = JSON.parse(localStorage.getItem('maganda_cart')) || [];

  function saveCart() {
    localStorage.setItem('maganda_cart', JSON.stringify(cart));
  }

  function initCart() {
    var cartOverlay = document.getElementById('cartOverlay');
    var cartDrawer = document.getElementById('cartDrawer');
    var cartOpenBtn = document.getElementById('cartOpenBtn');

    var cartCloseBtn = document.getElementById('cartCloseBtn');

    if (!cartOverlay || !cartDrawer) return;

    function openCart() {
      cartOverlay.classList.add('cart-overlay--active');
      cartDrawer.classList.add('cart-drawer--active');
      document.body.classList.add('no-scroll');
    }

    function closeCart() {
      cartOverlay.classList.remove('cart-overlay--active');
      cartDrawer.classList.remove('cart-drawer--active');
      document.body.classList.remove('no-scroll');
    initTheme();
    }

    if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCart);

    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return alert('Sepetiniz boş.');
        window.location.href = 'checkout.html';
      });
    }

    // İlk açılışta sepeti güncelle
    updateCartUI();
  }

  function addToCart(name, price, image) {
    // Check if item already exists
    var existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: Date.now(), name: name, price: price, image: image || '', quantity: 1 });
    }
    saveCart();
    updateCartUI();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    window.toast && window.toast('Ürün sepetten kaldırıldı', 'info');
  }

  // Miktar değiştir (drawer için)
  function changeQtyDrawer(id, delta) {
    var item = cart.find(function (i) { return i.id === id; });
    if (!item) return;
    item.quantity = Math.max(1, Math.min(10, (item.quantity || 1) + delta));
    saveCart();
    updateCartUI();
  }

  // HTML'den tetiklenebilmesi için global
  window.removeFromCartGlobal = removeFromCart;
  window.changeQtyDrawer      = changeQtyDrawer;

  /* ─── UPSELL: DOM'dan dinamik oku ─────── */
  function getUpsellProducts() {
    // Sayfadaki tüm product-card'ları oku, sepetteki isimleri háriç tut
    var cartNames = cart.map(function (i) { return i.name; });
    var cards = Array.from(document.querySelectorAll('.product-card'));
    var candidates = [];

    cards.forEach(function (card) {
      var nameEl  = card.querySelector('.product-card__name');
      var priceEl = card.querySelector('.product-card__price');
      var imgEl   = card.querySelector('.product-card__image');
      var badge   = card.getAttribute('data-badge') || '';

      if (!nameEl || !priceEl) return;
      var name = nameEl.textContent.trim();
      if (cartNames.indexOf(name) !== -1) return; // sepette var, önerme
      if (badge === 'TÜKENDİ') return;            // tükenmiş, önerme

      var priceNum = parseInt((priceEl.textContent || '0').replace('₺', '').replace(/\./g, ''), 10) || 0;
      var imgUrl   = imgEl
        ? (imgEl.style.backgroundImage || '').replace(/url\(["']?/, '').replace(/["']?\)$/, '')
        : '';

      candidates.push({ name: name, price: priceNum, image: imgUrl });
    });

    // Fiyata göre azalan sırala, ilk 2'yi al
    candidates.sort(function (a, b) { return b.price - a.price; });
    return candidates.slice(0, 2);
  }


  /* ─── FREE SHIPPING BAR ──────────────── */
  var SHIPPING_THRESHOLD = 1000;
  function updateShippingBar(total) {
    var bar = document.getElementById('cartShippingBar');
    if (!bar) return;

    var fill        = bar.querySelector('.cart-shipping-bar__fill');
    var labelRemain = bar.querySelector('.cart-shipping-bar__remain');

    var pct       = Math.min(100, (total / SHIPPING_THRESHOLD) * 100);
    var remaining = SHIPPING_THRESHOLD - total;

    if (total >= SHIPPING_THRESHOLD) {
      bar.classList.add('cart-shipping-bar--achieved');
      fill && (fill.style.width = '100%');
      fill && (fill.className = 'cart-shipping-bar__fill cart-shipping-bar__fill--green');
    } else {
      bar.classList.remove('cart-shipping-bar--achieved');
      fill && (fill.style.width = pct + '%');
      if (total < 500) {
        fill && (fill.className = 'cart-shipping-bar__fill cart-shipping-bar__fill--red');
      } else {
        fill && (fill.className = 'cart-shipping-bar__fill cart-shipping-bar__fill--orange');
      }
      // HTML'de zaten ₺ işareti var; sadece sayıyı yaz
      if (labelRemain) labelRemain.textContent = remaining.toLocaleString('tr-TR');
    }
  }

  /* ─── UPSELL HTML ────────────────────── */
  function buildUpsellHTML() {
    var products = getUpsellProducts();
    if (products.length === 0) return '';

    var html = '<div class="cart-upsell"><p class="cart-upsell__title">Bunları da beğenebilirsin</p><div class="cart-upsell__items">';
    products.forEach(function (p) {
      var imgStyle = p.image ? 'background-image:url(' + p.image + ');background-size:cover;background-position:center;' : '';
      var safeName = p.name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      html += '<div class="cart-upsell__item">'
        + '<div class="cart-upsell__img" style="' + imgStyle + '"></div>'
        + '<div class="cart-upsell__info">'
        + '<span class="cart-upsell__name">' + p.name + '</span>'
        + '<button class="cart-upsell__add" onclick="(function(){window.addToCartGlobal(\'' + safeName + '\',' + p.price + ',\'' + p.image + '\')})()">EKLE +₺' + p.price.toLocaleString('tr-TR') + '</button>'
        + '</div></div>';
    });
    html += '</div></div>';
    return html;
  }

  // Global addToCart erişimi için
  window.addToCartGlobal = function (name, price, image) {
    addToCart(name, price, image);
  };

  /* ─── CART UI ────────────────────────── */
  function updateCartUI() {
    var itemsContainer = document.getElementById('cartItems');
    var totalEl        = document.getElementById('cartTotal');
    var countEl        = document.getElementById('cartCount');
    var headerCountEl  = document.getElementById('cartDrawerCount');

    var totalQty = cart.reduce(function (acc, i) { return acc + (i.quantity || 1); }, 0);
    if (countEl) countEl.textContent = totalQty;
    if (headerCountEl) headerCountEl.textContent = totalQty > 0 ? '(' + totalQty + ')' : '';

    if (!itemsContainer) return;

    if (cart.length === 0) {
      itemsContainer.innerHTML = [
        '<div class="cart-drawer__empty">',
          '<svg class="cart-drawer__empty-icon" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">',
            '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>',
            '<line x1="3" y1="6" x2="21" y2="6"/>',
            '<path d="M16 10a4 4 0 0 1-8 0"/>',
          '</svg>',
          '<p class="cart-drawer__empty-title">HENÜz HİÇBİR ŞEY YOK</p>',
          '<p class="cart-drawer__empty-sub">Sınırlı stoklar seni bekliyor.<br>Koleksiyona bir göz at.</p>',
          '<a href="drop.html" class="cart-drawer__empty-cta">KOLEKSİYONA GÖZAT →</a>',
        '</div>'
      ].join('');
      if (totalEl) totalEl.textContent = '₺0';
      updateShippingBar(0);
      return;
    }

    var total = 0;
    var itemsHTML = '<div class="cart-items-list">';

    cart.forEach(function (item) {
      var qty       = item.quantity || 1;
      var linePrice = item.price * qty;
      total += linePrice;

      var imgStyle  = item.image ? 'background-image:url(' + item.image + ');background-size:cover;background-position:center;' : '';
      var sizeLabel = item.size || '—';

      itemsHTML += '<div class="cart-item">'
        + '<div class="cart-item__img" style="' + imgStyle + '"></div>'
        + '<div class="cart-item__info">'
        +   '<span class="cart-item__name">' + item.name + '</span>'
        +   '<div class="cart-item__meta">'
        +     '<span class="cart-item__size">BEDEN: ' + sizeLabel + '</span>'
        +     '<span class="cart-item__unit-price">₺' + item.price.toLocaleString('tr-TR') + ' / adet</span>'
        +   '</div>'
        +   '<div class="cart-item__qty-row">'
        +     '<div class="cart-item__qty">'
        +       '<button class="cart-item__qty-btn" onclick="changeQtyDrawer(' + item.id + ', -1)" aria-label="Azalt"' + (qty <= 1 ? ' disabled' : '') + '>−</button>'
        +       '<span class="cart-item__qty-val">' + qty + '</span>'
        +       '<button class="cart-item__qty-btn" onclick="changeQtyDrawer(' + item.id + ', 1)" aria-label="Artır"' + (qty >= 10 ? ' disabled' : '') + '>+</button>'
        +     '</div>'
        +     '<span class="cart-item__line-price">₺' + linePrice.toLocaleString('tr-TR') + '</span>'
        +   '</div>'
        +   '<button class="cart-item__remove" onclick="removeFromCartGlobal(' + item.id + ')" aria-label="Kaldır">'
        +     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
        +   '</button>'
        + '</div>'
        + '</div>';
    });

    itemsHTML += '</div>';
    itemsHTML += buildUpsellHTML();

    itemsContainer.innerHTML = itemsHTML;

    if (totalEl) totalEl.textContent = '₺' + total.toLocaleString('tr-TR');
    updateShippingBar(total);
  }


  /* ─── DROP FORM ──────────────────────── */
  function initDropForm() {
    var form = document.getElementById('dropForm');
    var success = document.getElementById('dropSuccess');
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      success.classList.add('drop__success--show');
      window.toast && window.toast('Listeye eklendin. Hoş geldin, MAGANDA.', 'success');
    });
  }

  /* ─── ÜRÜN KARTLARI → product.html yönlendirme ── */
  function initProductCards() {
    document.addEventListener('click', function (e) {
      var card = e.target.closest('.product-card');
      if (!card) return;

      var imgStyle = (card.querySelector('.product-card__image') || {}).style;
      var imgUrl = imgStyle
        ? (imgStyle.backgroundImage || '').replace(/url\(["']?/, '').replace(/["']?\)$/, '')
        : '';
      var name   = (card.querySelector('.product-card__name') || {}).textContent || '';
      var price  = (card.querySelector('.product-card__price') || {}).textContent || '';
      var series = (card.querySelector('.product-card__tag') || {}).textContent || '';
      var badge  = card.getAttribute('data-badge') || '';

      var params = new URLSearchParams({
        name:   name.trim(),
        price:  price.trim(),
        series: series.trim(),
        badge:  badge,
        img:    imgUrl
      });

      window.location.href = 'product.html?' + params.toString();
    });
  }

  /* ─── ÜRÜN DETAY SAYFASI (product.html) ─────── */
  function initProductPage() {
    if (!document.getElementById('productPage')) return;

    var params  = new URLSearchParams(window.location.search);
    var name    = params.get('name')   || 'ÜRÜN';
    var price   = params.get('price')  || '₺0';
    var series  = params.get('series') || '';
    var badge   = params.get('badge')  || '';
    var imgUrl  = params.get('img')    || '';

    var sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    var descriptions = [
      'Piston sesi ruhunda, yol izi kalbinde. Bu parça, garaj kokusunu her gün üzerinde taşıyanlar için tasarlandı. Asfaltta bıraktığın her izin giysiye yansıması.',
      'Gece yarısı pistten dönerken soyunma odasına giren adam gibi: Sessiz, emin ve fark yaratan. MAGANDA kalitesiyle dokunuşunu hissedeceksin.',
      'Turbo çarptığında hissettirdiği güç — bunu beze de işledik. Maksimum konfor, sıfır taviz. Petrolhead DNA\'sı her iplikte saklı.',
      'RPM\'in kırmızı çizgisine kadar çıktığında bile rahat olacaksın. Türkiye\'nin en gözü pek sürücüleri için üretildi. Fark yaratmak için giyilir.'
    ];

    // Sayfa başlığı
    document.title = 'MAGANDA — ' + name;

    // Görsel
    var imgEl = document.getElementById('pp-img');
    if (imgEl && imgUrl) imgEl.style.backgroundImage = 'url(' + imgUrl + ')';

    // Badge
    var badgeEl = document.getElementById('pp-badge');
    if (badgeEl) { badgeEl.textContent = badge; badgeEl.style.display = badge ? '' : 'none'; }

    // Meta bilgiler
    var nameEl   = document.getElementById('pp-name');
    var priceEl  = document.getElementById('pp-price');
    var seriesEl = document.getElementById('pp-series');
    var descEl   = document.getElementById('pp-desc');
    if (nameEl)   nameEl.textContent   = name;
    if (priceEl)  priceEl.textContent  = price;
    if (seriesEl) seriesEl.textContent = series;
    if (descEl)   descEl.textContent   = descriptions[Math.floor(Math.random() * descriptions.length)];

    var activeDescription = descEl ? descEl.textContent : descriptions[0];
    initProductInfoTabs(activeDescription);
    initProductFavorite(name, price);
    updateProductLimitedBadge(name, series, badge);
    updateProductDeliveryDate();
    renderRelatedProducts(name, series);



    function initProductInfoTabs(activeDescription) {
      var tabDesc = document.getElementById('pp-tab-desc');
      if (tabDesc) tabDesc.textContent = activeDescription;

      var tabs = document.getElementById('pp-tabs');
      if (!tabs) return;

      var buttons = Array.from(tabs.querySelectorAll('.pp-tabs__btn'));
      var panels = Array.from(tabs.querySelectorAll('.pp-tabs__panel'));

      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          var target = button.getAttribute('data-tab');

          buttons.forEach(function (btn) {
            var active = btn === button;
            btn.classList.toggle('pp-tabs__btn--active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
          });

          panels.forEach(function (panel) {
            panel.classList.toggle('pp-tabs__panel--active', panel.getAttribute('data-panel') === target);
          });
        });
      });
    }

    function initProductFavorite(productName, productPrice) {
      var favoriteBtn = document.getElementById('pp-favorite-btn');
      if (!favoriteBtn) return;

      var key = 'maganda_favorites';
      var favoriteId = productName + '|' + productPrice;
      var favorites = [];

      try {
        favorites = JSON.parse(localStorage.getItem(key)) || [];
      } catch (e) {
        favorites = [];
      }

      function syncButton() {
        var active = favorites.indexOf(favoriteId) !== -1;
        favoriteBtn.classList.toggle('pp-favorite-btn--active', active);
        favoriteBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
        favoriteBtn.textContent = active ? 'FAVORİLERDE' : 'FAVORİLERE EKLE';
      }

      syncButton();

      favoriteBtn.addEventListener('click', function () {
        var index = favorites.indexOf(favoriteId);
        if (index === -1) {
          favorites.push(favoriteId);
          window.toast && window.toast('Favorilere eklendi', 'success');
        } else {
          favorites.splice(index, 1);
          window.toast && window.toast('Favorilerden kaldırıldı', 'info');
        }
        localStorage.setItem(key, JSON.stringify(favorites));
        syncButton();
      });
    }

    function updateProductLimitedBadge(productName, productSeries, productBadge) {
      var limitedBadge = document.getElementById('pp-limited-badge');
      if (!limitedBadge) return;

      var text = [productName, productSeries, productBadge].join(' ').toUpperCase();
      limitedBadge.textContent = text.indexOf('DROP') !== -1 ? 'SINIRLI DROP' : 'SINIRLI ÜRETİM';
    }

    function updateProductDeliveryDate() {
      var deliveryEl = document.getElementById('pp-delivery-date');
      if (!deliveryEl) return;

      var start = new Date();
      var end = new Date();
      start.setDate(start.getDate() + 2);
      end.setDate(end.getDate() + 4);

      var formatter = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long' });
      deliveryEl.textContent = formatter.format(start) + ' - ' + formatter.format(end) + ' arası teslim';
    }

    function renderRelatedProducts(productName, productSeries) {
      var relatedGrid = document.getElementById('pp-related-grid');
      if (!relatedGrid) return;

      var catalog = [
        { name: 'V8 OBSESSION HOODIE - SIYAH', price: '\u20BA1499', series: 'Araba Serisi', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80' },
        { name: 'MIDNIGHT RUN TRACK JACKET', price: '\u20BA1899', series: 'Araba Serisi', img: 'assets/products/track_jacket.png' },
        { name: 'GEARHEAD CARGO PANTS', price: '\u20BA1299', series: 'Araba Serisi', img: 'assets/products/cargo_pants.png' },
        { name: 'RIDE OR DIE LEATHER JACKET', price: '\u20BA3499', series: 'Motosiklet Serisi', img: 'assets/products/leather_jacket.png' },
        { name: 'STREET FIGHTER HOODIE', price: '\u20BA1499', series: 'Motosiklet Serisi', img: 'assets/products/street_fighter_hoodie.png' },
        { name: 'APEX CHASER LONG SLEEVE', price: '\u20BA899', series: 'Motosiklet Serisi', img: 'assets/products/apex_longsleeve.png' },
        { name: 'DROP #01: THE MANIFESTO HOODIE', price: '\u20BA1999', series: 'Drop Ozel', img: 'assets/products/manifesto_hoodie.png', badge: 'DROP' },
        { name: 'DROP #02: REDLINE TECHNICAL PANTS', price: '\u20BA1599', series: 'Drop Ozel', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80', badge: 'DROP' },
        { name: 'DROP #03: SHADOW REFLECTIVE JACKET', price: '\u20BA2499', series: 'Drop Ozel', img: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80', badge: 'DROP' }
      ];

      var normalizedSeries = (productSeries || '').toLowerCase();
      var sameSeries = catalog.filter(function (item) {
        return item.name !== productName && item.series.toLowerCase().indexOf(normalizedSeries.split(' ')[0]) !== -1;
      });
      var fallback = catalog.filter(function (item) { return item.name !== productName; });
      var related = (sameSeries.length >= 3 ? sameSeries : fallback).slice(0, 3);

      relatedGrid.innerHTML = related.map(function (item) {
        var params = new URLSearchParams({
          name: item.name,
          price: item.price,
          series: item.series,
          badge: item.badge || '',
          img: item.img
        });

        return '<a class="pp-related-card" href="product.html?' + params.toString() + '">' +
          '<div class="pp-related-card__img" style="background-image:url(&quot;' + item.img + '&quot;)"></div>' +
          '<div class="pp-related-card__body">' +
          '<span class="pp-related-card__tag">' + item.series + '</span>' +
          '<h3 class="pp-related-card__name">' + item.name + '</h3>' +
          '<span class="pp-related-card__price">' + item.price + '</span>' +
          '</div>' +
          '</a>';
      }).join('');
    }

    // Breadcrumb — referrer'a göre geri link
    var backLink = document.getElementById('pp-back');
    if (backLink) {
      var ref = document.referrer || '';
      var colName = ref.indexOf('araba') !== -1 ? 'ARABA KOLEKSİYONU'
                  : ref.indexOf('motor') !== -1  ? 'MOTOSİKLET KOLEKSİYONU'
                  : ref.indexOf('drop')  !== -1  ? 'DROP KOLEKSİYONU'
                  : 'KOLEKSİYON';
      var colHref = ref && (ref.indexOf('araba') !== -1 || ref.indexOf('motor') !== -1 || ref.indexOf('drop') !== -1)
                  ? ref : 'index.html';
      backLink.href = colHref;
      var colEl = document.getElementById('pp-back-label');
      if (colEl) colEl.textContent = colName;
    }

    // Beden seçici
    var sizesEl = document.getElementById('pp-sizes');
    var selectedSize = '';
    var currentQty = 1;

    if (sizesEl) {
      sizes.forEach(function (s) {
        var btn = document.createElement('button');
        btn.className = 'pp-size-btn';
        btn.textContent = s;
        btn.addEventListener('click', function () {
          selectedSize = s;
          sizesEl.querySelectorAll('.pp-size-btn').forEach(function (b) {
            b.classList.remove('pp-size-btn--active');
          });
          btn.classList.add('pp-size-btn--active');
          sizesEl.classList.remove('pp-sizes--warn');
          var warn = document.getElementById('pp-size-warn');
          if (warn) warn.style.opacity = '0';
        });
        sizesEl.appendChild(btn);
      });
    }

    // Adet
    var qtyValEl = document.getElementById('pp-qty-val');
    var qtyMinus = document.getElementById('pp-qty-minus');
    var qtyPlus  = document.getElementById('pp-qty-plus');
    if (qtyMinus) qtyMinus.disabled = true;

    if (qtyMinus) {
      qtyMinus.addEventListener('click', function () {
        if (currentQty > 1) {
          currentQty--;
          if (qtyValEl) qtyValEl.textContent = currentQty;
          qtyMinus.disabled = currentQty <= 1;
          if (qtyPlus) qtyPlus.disabled = false;
        }
      });
    }
    if (qtyPlus) {
      qtyPlus.addEventListener('click', function () {
        if (currentQty < 10) {
          currentQty++;
          if (qtyValEl) qtyValEl.textContent = currentQty;
          qtyPlus.disabled = currentQty >= 10;
          if (qtyMinus) qtyMinus.disabled = false;
        }
      });
    }

    // Sepete Ekle
    var addBtn   = document.getElementById('pp-add-btn');
    var sizeWarn = document.getElementById('pp-size-warn');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        if (!selectedSize) {
          if (sizesEl) {
            sizesEl.classList.add('pp-sizes--warn');
            setTimeout(function () { sizesEl.classList.remove('pp-sizes--warn'); }, 700);
          }
          if (sizeWarn) {
            sizeWarn.style.opacity = '1';
            setTimeout(function () { sizeWarn.style.opacity = '0'; }, 2500);
          }
          return;
        }

        var priceNum = parseInt(price.replace('₺', '').replace(/\./g, '').trim(), 10) || 0;
        var existingItem = cart.find(function (item) {
          return item.name === name && item.size === selectedSize;
        });

        if (existingItem) {
          existingItem.quantity = Math.min(existingItem.quantity + currentQty, 10);
        } else {
          cart.push({
            id: Date.now(),
            name: name,
            price: priceNum,
            size: selectedSize,
            quantity: currentQty,
            image: imgUrl
          });
        }

        saveCart();
        updateCartUI();
        window.toast && window.toast('✓ ' + name + ' sepete eklendi', 'success');

        addBtn.textContent = 'EKLENDİ ✓';
        addBtn.classList.add('pp-add-btn--success');
        setTimeout(function () {
          addBtn.textContent = 'SEPETE EKLE';
          addBtn.classList.remove('pp-add-btn--success');
        }, 1800);
      });

      // TÜKENDİ durumu kontrolü (Ürün zaten bitmişse buton tıklanamaz)
      if (badge && badge.toUpperCase() === 'TÜKENDİ') {
        addBtn.disabled = true;
        addBtn.textContent = 'TÜKENDİ';
        addBtn.style.backgroundColor = 'var(--color-gray-dark)';
        addBtn.style.color = 'var(--color-gray-light)';
        addBtn.style.cursor = 'not-allowed';
      }
    }

    // Beden Rehberi toggle (accordion)
    var sgToggle = document.getElementById('pp-size-guide-toggle');
    var sgPanel  = document.getElementById('pp-size-guide-panel');
    if (sgToggle && sgPanel) {
      sgToggle.addEventListener('click', function () {
        var open = sgPanel.classList.toggle('pp-size-guide-panel--open');
        sgToggle.textContent = open ? 'Beden Rehberini Kapat ↑' : 'Beden Rehberi →';
      });
    }
  }

  /* ─── TOAST BİLDİRİM SİSTEMİ ─────────── */
  function initToast() {
    var container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toastContainer';
    document.body.appendChild(container);

    var activeToasts = [];
    var MAX_TOASTS = 3;

    window.toast = function (msg, type) {
      // En eski toast'u kaldır (max 3)
      if (activeToasts.length >= MAX_TOASTS) {
        dismissToast(activeToasts[0]);
      }

      var id = Date.now() + Math.random();
      var el = document.createElement('div');
      el.className = 'toast toast--' + (type || 'info');
      el.innerHTML =
        '<span class="toast__msg">' + msg + '</span>' +
        '<button class="toast__close" aria-label="Kapat">✕</button>';

      container.appendChild(el);
      activeToasts.push({ id: id, el: el });

      el.querySelector('.toast__close').addEventListener('click', function () {
        dismissToast({ id: id, el: el });
      });

      el._timer = setTimeout(function () {
        dismissToast({ id: id, el: el });
      }, 3000);
    };

    function dismissToast(t) {
      clearTimeout(t.el._timer);
      t.el.classList.add('toast--exit');
      setTimeout(function () {
        if (t.el.parentNode) t.el.parentNode.removeChild(t.el);
        activeToasts = activeToasts.filter(function (x) { return x.id !== t.id; });
      }, 320);
    }
  }

  /* ─── INIT ALL ───────────────────────── */
  function initHeaderWidget() {
    if (document.getElementById('navbar')) return;

    var navClass = document.body.classList.contains('force-scrolled-nav')
      ? 'navbar navbar--scrolled'
      : 'navbar';

    var html =
      '<nav class="' + navClass + '" id="navbar">' +
        '<div class="navbar__inner">' +
          '<a href="index.html" class="navbar__logo">' +
            '<span class="navbar__logo-text">MAGANDA</span>' +
            '<span class="navbar__logo-divider"></span>' +
            '<span class="navbar__logo-est">KUR. 2026</span>' +
          '</a>' +
          '<ul class="navbar__links" id="navLinks">' +
            '<li><a href="index.html" class="navbar__link">ANA SAYFA</a></li>' +
            '<li><a href="araba.html" class="navbar__link">ARABA</a></li>' +
            '<li><a href="motor.html" class="navbar__link">MOTOSİKLET</a></li>' +
            '<li><a href="drop.html" class="navbar__link">DROP ÜRÜNLER</a></li>' +
            '<li><a href="hakkimizda.html" class="navbar__link">HAKKIMIZDA</a></li>' +
            '<li><a href="iletisim.html" class="navbar__link">BİZE ULAŞIN</a></li>' +
          '</ul>' +
          '<button class="navbar__theme-btn" id="themeToggle" aria-label="Temayı değiştir">' +
            '<span class="theme-icon-dark" aria-hidden="true">🌙</span>' +
            '<span class="theme-icon-light" aria-hidden="true">☀️</span>' +
          '</button>' +
          '<button class="navbar__cart-btn" id="cartOpenBtn" aria-label="Sepet">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">' +
              '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>' +
              '<line x1="3" y1="6" x2="21" y2="6"></line>' +
              '<path d="M16 10a4 4 0 0 1-8 0"></path>' +
            '</svg>' +
            '<span class="navbar__cart-badge" id="cartCount">0</span>' +
          '</button>' +
        '</div>' +
      '</nav>';

    var noise = document.querySelector('.noise-overlay');
    if (noise) {
      noise.insertAdjacentHTML('afterend', html);
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }
  }

  function initFooterBrandWidget() {
    if (document.querySelector('.footer-brand-band')) return;

    var html =
      '<section class="footer-brand-band" aria-label="MAGANDA">' +
        '<span class="footer-brand-band__text">MAGANDA</span>' +
      '</section>';
    var anchor = document.getElementById('cartOverlay') || document.querySelector('script');
    if (anchor) {
      anchor.insertAdjacentHTML('beforebegin', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }

  function initFooterWidget() {
    if (document.querySelector('.footer')) return;

    var html =
      '<footer class="footer">' +
        '<div class="footer__grid">' +
          '<div class="footer__col">' +
            '<span class="footer__logo">MAGANDA</span>' +
            '<p class="footer__tagline">SINIR TANIMAYANLARA..</p>' +
          '</div>' +
          '<div class="footer__col">' +
            '<a href="index.html" class="footer__link">Ana Sayfa</a>' +
            '<a href="araba.html" class="footer__link">Araba</a>' +
            '<a href="motor.html" class="footer__link">Motosiklet</a>' +
            '<a href="drop.html" class="footer__link">Drop Ürünler</a>' +
            '<a href="hakkimizda.html" class="footer__link">Hakkımızda</a>' +
            '<a href="iletisim.html" class="footer__link">İletişim</a>' +
          '</div>' +
          '<div class="footer__col">' +
            '<div class="footer__social">' +
              '<a href="#" class="footer__social-link" aria-label="Instagram">' +
                '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>' +
              '</a>' +
              '<a href="#" class="footer__social-link" aria-label="TikTok">' +
                '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>' +
              '</a>' +
              '<a href="#" class="footer__social-link" aria-label="YouTube">' +
                '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>' +
              '</a>' +
            '</div>' +
            '<span class="footer__badge">TÜRKİYE\'DE ÜRETİLDİ</span>' +
          '</div>' +
        '</div>' +
        '<div class="footer__bar">' +
          '<span>© 2026 MAGANDA. Tüm hakları saklıdır.</span>' +
          '<a href="#">Gizlilik Politikası</a>' +
        '</div>' +
      '</footer>';

    var brandBand = document.querySelector('.footer-brand-band');
    var anchor = document.getElementById('cartOverlay') || document.querySelector('script');
    if (brandBand) {
      brandBand.insertAdjacentHTML('afterend', html);
    } else if (anchor) {
      anchor.insertAdjacentHTML('beforebegin', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }

  function initFooterPaymentStrip() {
    var footer = document.querySelector('.footer');
    if (!footer || document.querySelector('.footer-payment-strip')) return;

    var logoGroups = [
      {
        label: 'Kart ve guvenli odeme logolari',
        logos: [
          ['masterpass.png', 'Masterpass'],
          ['visa.png', 'Visa'],
          ['troy.png', 'Troy']
        ]
      },
      {
        label: 'Banka ve taksit logolari',
        logos: [
          ['qnb.png', 'QNB'],
          ['paraf.png', 'Paraf'],
          ['world.png', 'World'],
          ['bonus-card.png', 'Bonus Card'],
          ['axess.png', 'Axess'],
          ['advantage.png', 'Advantage'],
          ['maximum.png', 'Maximum'],
          ['bankkart.png', 'Bankkart']
        ]
      }
    ];

    var strip = document.createElement('div');
    strip.className = 'footer-payment-strip';
    strip.setAttribute('aria-label', 'Odeme ve banka logolari');

    var logoGroup = document.createElement('div');
    logoGroup.className = 'footer-payment-strip__group';

    logoGroups.forEach(function (group) {
      var row = document.createElement('div');
      row.className = 'footer-payment-strip__row';
      row.setAttribute('aria-label', group.label);

      group.logos.forEach(function (logo) {
        var img = document.createElement('img');
        img.className = 'footer-payment-strip__logo';
        img.src = 'assets/odemeyontemleri/' + logo[0];
        img.alt = logo[1];
        img.loading = 'lazy';
        row.appendChild(img);
      });

      logoGroup.appendChild(row);
    });

    strip.appendChild(logoGroup);
    footer.insertAdjacentElement('afterend', strip);
  }
  function init() {
    document.body.classList.remove('no-scroll');
    initHeaderWidget();
    initFooterBrandWidget();
    initFooterWidget();
    initToast();        // En önce — window.toast hazır olsun
    initTheme();
    initCinematicHero();
    initNavbar();

    initCart();
    initSmoothScroll();
    initScrollAnimations();
    initManifestoStagger();
    initParallax();
    initDropForm();
    initProductCards();
    initProductPage();
    initFooterPaymentStrip();

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


