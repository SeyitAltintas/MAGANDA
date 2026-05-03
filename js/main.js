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

  /* ─── HAMBURGER MENU ─────────────────── */
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var menu = document.getElementById('mobileMenu');
    if (!hamburger || !menu) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('navbar__hamburger--active');
      menu.classList.toggle('mobile-menu--active');
      document.body.style.overflow = menu.classList.contains('mobile-menu--active') ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('navbar__hamburger--active');
        menu.classList.remove('mobile-menu--active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── SMOOTH SCROLL ──────────────────── */
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
    var mobileCartOpenBtn = document.getElementById('mobileCartOpenBtn');
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
    if (mobileCartOpenBtn) mobileCartOpenBtn.addEventListener('click', openCart);
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
  function init() {
    document.body.classList.remove('no-scroll');
    initToast();        // En önce — window.toast hazır olsun
    initTheme();
    initCinematicHero();
    initNavbar();
    initMobileMenu();
    initCart();
    initSmoothScroll();
    initScrollAnimations();
    initManifestoStagger();
    initParallax();
    initDropForm();
    initProductCards();
    initProductPage();
    
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


