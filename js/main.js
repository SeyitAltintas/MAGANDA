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
    carLink.addEventListener('mouseenter', function () {
      hero.setAttribute('data-active', 'car');
      if (carVideo) carVideo.play();
      if (motoVideo) motoVideo.pause();
    });

    // Moto Linki Hover
    motoLink.addEventListener('mouseenter', function () {
      hero.setAttribute('data-active', 'moto');
      if (motoVideo) motoVideo.play();
      if (carVideo) carVideo.pause();
    });

    // İkisinden de çıkıldığında
    var linksContainer = hero.querySelector('.cinematic-hero__links');
    linksContainer.addEventListener('mouseleave', function () {
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

  /* --- COLLECTION FILTERS ─────────────── */
  function initFilters() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var grid = document.querySelector('.collection__grid');
    var filters = document.querySelector('.collection__filters');
    var productCards = grid ? Array.prototype.slice.call(grid.querySelectorAll('.product-card')) : [];

    if (!filterBtns.length || !productCards.length || !grid || !filters) return;

    var state = {
      category: 'all',
      minPrice: '',
      maxPrice: '',
      sort: 'featured'
    };

    var parsePrice = function (card) {
      var priceEl = card.querySelector('.product-card__price');
      if (!priceEl) return 0;
      return Number(priceEl.textContent.replace(/[^\d]/g, '')) || 0;
    };

    productCards.forEach(function (card, index) {
      card.dataset.originalIndex = String(index);
      card.dataset.priceValue = String(parsePrice(card));
    });

    if (!document.querySelector('.collection-filter-panel')) {
      filters.insertAdjacentHTML('afterend',
        '<div class="collection-filter-panel" data-animate>' +
        '<div class="collection-filter-panel__controls">' +
        '<div class="collection-filter-panel__dropdown">' +
        '<button class="collection-filter-panel__dropdown-toggle" type="button" aria-expanded="false">Fiyat</button>' +
        '<div class="collection-filter-panel__dropdown-menu">' +
        '<label class="collection-filter-panel__price">' +
        '<span>₺</span>' +
        '<input class="collection-filter-panel__input" id="priceMin" type="text" inputmode="numeric" autocomplete="off" placeholder="En düşük">' +
        '</label>' +
        '<label class="collection-filter-panel__price">' +
        '<span>₺</span>' +
        '<input class="collection-filter-panel__input" id="priceMax" type="text" inputmode="numeric" autocomplete="off" placeholder="En yüksek">' +
        '</label>' +
        '<button class="collection-filter-panel__price-reset" type="button" aria-label="Fiyat filtresini temizle">×</button>' +
        '</div>' +
        '</div>' +
        '<label class="collection-filter-panel__sort">' +
        '<span>Sıralama ölçütü:</span>' +
        '<select class="collection-filter-panel__select" id="collectionSort">' +
        '<option value="featured">Öne çıkan</option>' +
        '<option value="relevance">En alakalı</option>' +
        '<option value="best-selling">En çok satan</option>' +
        '<option value="alpha-asc">Alfabetik olarak, A-Z</option>' +
        '<option value="alpha-desc">Alfabetik olarak, Z-A</option>' +
        '<option value="price-asc">Fiyat, düşükten yükseğe</option>' +
        '<option value="price-desc">Fiyat, yüksekten düşüğe</option>' +
        '<option value="date-asc">Tarih, eskiden yeniye</option>' +
        '<option value="date-desc">Tarih, yeniden eskiye</option>' +
        '</select>' +
        '</label>' +
        '</div>' +
        '</div>');
    }

    var minInput = document.getElementById('priceMin');
    var maxInput = document.getElementById('priceMax');
    var sortSelect = document.getElementById('collectionSort');
    var resetBtn = document.querySelector('.collection-filter-panel__price-reset');
    var priceDropdown = document.querySelector('.collection-filter-panel__dropdown');
    var priceToggle = document.querySelector('.collection-filter-panel__dropdown-toggle');

    var cleanPriceValue = function (value) {
      return String(value || '').replace(/[^\d]/g, '');
    };

    var formatPriceInput = function (input) {
      var digits = cleanPriceValue(input.value);
      input.value = digits ? Number(digits).toLocaleString('tr-TR') : '';
      return digits;
    };

    var getName = function (card) {
      var nameEl = card.querySelector('.product-card__name');
      return nameEl ? nameEl.textContent.trim().toLocaleLowerCase('tr-TR') : '';
    };

    var getOriginalIndex = function (card) {
      return Number(card.dataset.originalIndex) || 0;
    };

    var getBestSellingScore = function (card) {
      var badge = (card.getAttribute('data-badge') || '').toLocaleLowerCase('tr-TR');
      return badge.indexOf('çok satan') !== -1 ? 1 : 0;
    };

    var sortCards = function (cards) {
      return cards.slice().sort(function (a, b) {
        var priceA = Number(a.dataset.priceValue) || 0;
        var priceB = Number(b.dataset.priceValue) || 0;

        if (state.sort === 'best-selling') {
          return getBestSellingScore(b) - getBestSellingScore(a) || getOriginalIndex(a) - getOriginalIndex(b);
        }
        if (state.sort === 'alpha-asc') return getName(a).localeCompare(getName(b), 'tr');
        if (state.sort === 'alpha-desc') return getName(b).localeCompare(getName(a), 'tr');
        if (state.sort === 'price-asc') return priceA - priceB || getOriginalIndex(a) - getOriginalIndex(b);
        if (state.sort === 'price-desc') return priceB - priceA || getOriginalIndex(a) - getOriginalIndex(b);
        if (state.sort === 'date-desc') return getOriginalIndex(b) - getOriginalIndex(a);
        return getOriginalIndex(a) - getOriginalIndex(b);
      });
    };

    var applyFilters = function () {
      var min = state.minPrice === '' ? null : Number(state.minPrice);
      var max = state.maxPrice === '' ? null : Number(state.maxPrice);

      sortCards(productCards).forEach(function (card) {
        var price = Number(card.dataset.priceValue) || 0;
        var categoryMatches = state.category === 'all' || card.getAttribute('data-category') === state.category;
        var minMatches = min === null || price >= min;
        var maxMatches = max === null || price <= max;
        var visible = categoryMatches && minMatches && maxMatches;

        grid.appendChild(card);
        card.style.display = visible ? 'block' : 'none';
        if (visible) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = null;
        }
      });
    };

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        state.category = this.getAttribute('data-filter') || 'all';
        applyFilters();
      });
    });

    if (minInput) {
      minInput.addEventListener('input', function () {
        state.minPrice = formatPriceInput(minInput);
        applyFilters();
      });
    }

    if (maxInput) {
      maxInput.addEventListener('input', function () {
        state.maxPrice = formatPriceInput(maxInput);
        applyFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        state.sort = sortSelect.value;
        applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        state.minPrice = '';
        state.maxPrice = '';
        if (minInput) minInput.value = '';
        if (maxInput) maxInput.value = '';
        applyFilters();
      });
    }

    if (priceDropdown && priceToggle) {
      var setPriceDropdown = function (open) {
        priceDropdown.classList.toggle('is-open', open);
        priceToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      };

      priceToggle.addEventListener('click', function () {
        setPriceDropdown(!priceDropdown.classList.contains('is-open'));
      });

      document.addEventListener('click', function (e) {
        if (!priceDropdown.contains(e.target)) setPriceDropdown(false);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setPriceDropdown(false);
      });
    }

    applyFilters();
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
          bgTexts.forEach(function (text) {
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
    window.dispatchEvent(new Event('maganda_cart_updated'));
  }

  window.addEventListener('maganda_cart_updated', function () {
    cart = JSON.parse(localStorage.getItem('maganda_cart')) || [];
    if (typeof updateCartUI === 'function') {
      updateCartUI();
    }
  });

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
      checkoutBtn.addEventListener('click', function () {
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
  window.changeQtyDrawer = changeQtyDrawer;

  /* ─── UPSELL: DOM'dan dinamik oku ─────── */
  function getUpsellProducts() {
    // Sayfadaki tüm product-card'ları oku, sepetteki isimleri háriç tut
    var cartNames = cart.map(function (i) { return i.name; });
    var cards = Array.from(document.querySelectorAll('.product-card'));
    var candidates = [];

    cards.forEach(function (card) {
      var nameEl = card.querySelector('.product-card__name');
      var priceEl = card.querySelector('.product-card__price');
      var imgEl = card.querySelector('.product-card__image');
      var badge = card.getAttribute('data-badge') || '';

      if (!nameEl || !priceEl) return;
      var name = nameEl.textContent.trim();
      if (cartNames.indexOf(name) !== -1) return; // sepette var, önerme
      if (badge === 'TÜKENDİ') return;            // tükenmiş, önerme

      var priceNum = parseInt((priceEl.textContent || '0').replace('₺', '').replace(/\./g, ''), 10) || 0;
      var imgUrl = imgEl
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

    var fill = bar.querySelector('.cart-shipping-bar__fill');
    var labelRemain = bar.querySelector('.cart-shipping-bar__remain');

    var pct = Math.min(100, (total / SHIPPING_THRESHOLD) * 100);
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
        + '<button class="cart-upsell__add" onclick="(function(){window.addToCartGlobal(\'' + safeName + '\',' + p.price + ',\'' + p.image + '\')})()">Ekle +₺' + p.price.toLocaleString('tr-TR') + '</button>'
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
    var totalEl = document.getElementById('cartTotal');
    var countEl = document.getElementById('cartCount');
    var headerCountEl = document.getElementById('cartDrawerCount');

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
        '<p class="cart-drawer__empty-title">Henüz hiçbir şey yok</p>',
        '<p class="cart-drawer__empty-sub">Sınırlı stoklar seni bekliyor.<br>Koleksiyona bir göz at.</p>',
        '<a href="drop.html" class="cart-drawer__empty-cta">Koleksiyona göz at →</a>',
        '</div>'
      ].join('');
      if (totalEl) totalEl.textContent = '₺0';
      updateShippingBar(0);
      return;
    }

    var total = 0;
    var itemsHTML = '<div class="cart-items-list">';

    cart.forEach(function (item) {
      var qty = item.quantity || 1;
      var linePrice = item.price * qty;
      total += linePrice;

      var imgStyle = item.image ? 'background-image:url(' + item.image + ');background-size:cover;background-position:center;' : '';
      var sizeLabel = item.size || '—';

      itemsHTML += '<div class="cart-item">'
        + '<div class="cart-item__img" style="' + imgStyle + '"></div>'
        + '<div class="cart-item__info">'
        + '<span class="cart-item__name">' + item.name + '</span>'
        + '<div class="cart-item__meta">'
        + '<span class="cart-item__size">BEDEN: ' + sizeLabel + '</span>'
        + '<span class="cart-item__unit-price">₺' + item.price.toLocaleString('tr-TR') + ' / adet</span>'
        + '</div>'
        + '<div class="cart-item__qty-row">'
        + '<div class="cart-item__qty">'
        + '<button class="cart-item__qty-btn" onclick="changeQtyDrawer(' + item.id + ', -1)" aria-label="Azalt"' + (qty <= 1 ? ' disabled' : '') + '>−</button>'
        + '<span class="cart-item__qty-val">' + qty + '</span>'
        + '<button class="cart-item__qty-btn" onclick="changeQtyDrawer(' + item.id + ', 1)" aria-label="Artır"' + (qty >= 10 ? ' disabled' : '') + '>+</button>'
        + '</div>'
        + '<span class="cart-item__line-price">₺' + linePrice.toLocaleString('tr-TR') + '</span>'
        + '</div>'
        + '<button class="cart-item__remove" onclick="removeFromCartGlobal(' + item.id + ')" aria-label="Kaldır">'
        + '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
        + '</button>'
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
  function getCardImageUrl(card) {
    var imgEl = card ? card.querySelector('.product-card__image') : null;
    if (!imgEl) return '';
    return (imgEl.style.backgroundImage || '').replace(/url\(["']?/, '').replace(/["']?\)$/, '');
  }

  function setCardImage(card, imageUrl) {
    var imgEl = card ? card.querySelector('.product-card__image') : null;
    if (!imgEl || !imageUrl) return;
    imgEl.style.backgroundImage = 'url("' + String(imageUrl).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '")';
  }

  function buildCardGallery(card, pageImages) {
    var primary = getCardImageUrl(card);
    var fromData = (card.getAttribute('data-gallery') || '').split('|').filter(Boolean);
    var gallery = fromData.length > 1 ? fromData : [primary].concat(pageImages.filter(function (image) {
      return image && image !== primary;
    }).slice(0, 3));

    return gallery.filter(function (image, index, list) {
      return image && list.indexOf(image) === index;
    });
  }

  function initCollectionCardGalleries() {
    var cards = Array.from(document.querySelectorAll('.collection__grid .product-card'));
    if (!cards.length) return;

    var pageImages = cards.map(getCardImageUrl).filter(Boolean);

    cards.forEach(function (card) {
      var imageEl = card.querySelector('.product-card__image');
      var infoEl = card.querySelector('.product-card__info');
      if (!imageEl || !infoEl || card.querySelector('.product-card-gallery')) return;

      var gallery = buildCardGallery(card, pageImages);
      if (gallery.length < 2) return;

      var activeIndex = 0;
      card.setAttribute('data-gallery', gallery.join('|'));

      imageEl.insertAdjacentHTML('beforeend',
        '<div class="product-card-gallery-nav" data-stop-card aria-label="Kart gorsel gecisi">' +
        '<button class="product-card-gallery__arrow product-card-gallery__arrow--prev" type="button" data-stop-card data-card-gallery-dir="prev" aria-label="Onceki gorsel">&lsaquo;</button>' +
        '<button class="product-card-gallery__arrow product-card-gallery__arrow--next" type="button" data-stop-card data-card-gallery-dir="next" aria-label="Sonraki gorsel">&rsaquo;</button>' +
        '</div>'
      );

      imageEl.insertAdjacentHTML('beforeend',
        '<div class="product-card-gallery" data-stop-card aria-label="Urun kucuk gorselleri">' +
        gallery.map(function (image, index) {
          return '<button class="product-card-gallery__thumb' + (index === 0 ? ' product-card-gallery__thumb--active' : '') + '" type="button" data-stop-card data-card-gallery-thumb="' + index + '" aria-label="Kart gorseli ' + (index + 1) + '" aria-current="' + (index === 0 ? 'true' : 'false') + '" style="background-image:url(&quot;' + escapeAttr(image) + '&quot;)"></button>';
        }).join('') +
        '</div>'
      );

      function syncCardGallery() {
        setCardImage(card, gallery[activeIndex]);
        card.querySelectorAll('[data-card-gallery-thumb]').forEach(function (thumb, index) {
          thumb.classList.toggle('product-card-gallery__thumb--active', index === activeIndex);
          thumb.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
        });
      }

      card.querySelectorAll('[data-card-gallery-dir]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var direction = btn.getAttribute('data-card-gallery-dir') === 'prev' ? -1 : 1;
          activeIndex = (activeIndex + direction + gallery.length) % gallery.length;
          syncCardGallery();
        });
      });

      card.querySelectorAll('[data-card-gallery-thumb]').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          activeIndex = Number(thumb.getAttribute('data-card-gallery-thumb')) || 0;
          syncCardGallery();
        });
      });
    });
  }

  function initProductCards() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-stop-card]')) return;
      var card = e.target.closest('.product-card');
      if (!card) return;

      var imgStyle = (card.querySelector('.product-card__image') || {}).style;
      var imgUrl = imgStyle
        ? (imgStyle.backgroundImage || '').replace(/url\(["']?/, '').replace(/["']?\)$/, '')
        : '';
      var name = (card.querySelector('.product-card__name') || {}).textContent || '';
      var price = (card.querySelector('.product-card__price') || {}).textContent || '';
      var series = (card.querySelector('.product-card__tag') || {}).textContent || '';
      var badge = card.getAttribute('data-badge') || '';
      var gallery = card.getAttribute('data-gallery') || '';

      var params = new URLSearchParams({
        name: name.trim(),
        price: price.trim(),
        series: series.trim(),
        badge: badge,
        img: imgUrl
      });
      if (gallery) params.set('gallery', gallery);

      window.location.href = 'product.html?' + params.toString();
    });
  }

  function parsePriceValue(value) {
    var normalized = String(value || '')
      .replace(/\u20BA/g, '')
      .replace(/₺/g, '')
      .replace(/\./g, '')
      .replace(/,/g, '')
      .replace(/[^\d]/g, '');
    return parseInt(normalized, 10) || 0;
  }

  function formatPrice(value) {
    var amount = parsePriceValue(value);
    return amount.toLocaleString('tr-TR') + ' ₺';
  }

  /* ─── ÜRÜN DETAY SAYFASI (product.html) ─────── */
  function initProductPage() {
    if (!document.getElementById('productPage')) return;

    // Skeleton loader'ı hemen göster
    if (typeof window.showProductSkeleton === 'function') window.showProductSkeleton();

    var params = new URLSearchParams(window.location.search);
    var name = params.get('name') || 'ÜRÜN';
    var price = formatPrice(params.get('price') || '₺0');
    var series = params.get('series') || '';
    var badge = params.get('badge') || '';
    var imgUrl = params.get('img') || '';
    var galleryImages = (params.get('gallery') || '').split('|').filter(Boolean);

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
    setBackgroundImage(imgEl, imgUrl);
    var productGalleryApi = initProductGallery(imgUrl, name, galleryImages);

    // Badge
    var badgeEl = document.getElementById('pp-badge');
    if (badgeEl) { badgeEl.textContent = badge; badgeEl.style.display = badge ? '' : 'none'; }

    // Meta bilgiler
    var nameEl = document.getElementById('pp-name');
    var priceEl = document.getElementById('pp-price');
    var seriesEl = document.getElementById('pp-series');
    var descEl = document.getElementById('pp-desc');
    if (nameEl) nameEl.textContent = name;
    if (priceEl) priceEl.textContent = price;
    if (seriesEl) seriesEl.textContent = series;
    if (descEl) descEl.textContent = descriptions[Math.floor(Math.random() * descriptions.length)];

    // Veri doldu — skeleton'ı kaldır
    if (typeof window.hideProductSkeleton === 'function') window.hideProductSkeleton();

    var activeDescription = descEl ? descEl.textContent : descriptions[0];
    initProductInfoTabs(activeDescription);
    initProductFavorite(name, price);
    updateProductLimitedBadge(name, series, badge);
    updateProductDeliveryDate();
    renderProductReviews(name, series, imgUrl);
    renderProductQuestions(name, series);
    renderRelatedProducts(name, series);
    initProductColorOptions(name, productGalleryApi);


    function initProductInfoTabs(activeDescription) {
      var links = Array.from(document.querySelectorAll('[data-info-panel]'));
      var panel = document.getElementById('ppInfoPanel');
      var overlay = document.getElementById('ppInfoPanelOverlay');
      var closeBtn = document.getElementById('ppInfoPanelClose');
      var titleEl = document.getElementById('ppInfoPanelTitle');
      var bodyEl = document.getElementById('ppInfoPanelBody');
      if (!links.length || !panel || !overlay || !titleEl || !bodyEl) return;

      var content = {
        desc: {
          title: 'ÜRÜN AÇIKLAMASI',
          body: [
            '<div class="pp-desc-section pp-desc-section--intro">',
            '<span class="pp-desc-eyebrow">MAGANDA DROP</span>',
            '<p><strong>' + name + '</strong>, MAGANDA ruhunu günlük kullanıma taşıyan sınırlı üretim bir parça olarak tasarlandı.</p>',
            '<p>' + activeDescription + '</p>',
            '</div>',
            '<div class="pp-desc-section pp-desc-section--model">',
            '<h3>Model Bilgisi</h3>',
            '<p>' + getProductModelInfo(series) + '</p>',
            '</div>',
            '<div class="pp-desc-section">',
            '<h3>Ürün İçeriği ve Özellikleri</h3>',
            '<ul class="pp-desc-list">',
            '<li><span>Ana kumaş</span><strong>%100 pamuk hissi veren tok ve premium yapı</strong></li>',
            '<li><span>Üretim</span><strong>Türkiye üretimi kalite standardı</strong></li>',
            '<li><span>Kalıp</span><strong>Rahat hareket alanı sunan regular/oversize duruş</strong></li>',
            '<li><span>Dış yüzey</span><strong>Orta ağırlıkta kumaş, formunu koruyan premium tutuş</strong></li>',
            '<li><span>Dikiş</span><strong>Günlük kullanıma uygun dayanıklı konstrüksiyon</strong></li>',
            '<li><span>Baskı</span><strong>Uzun ömürlü tutunma için seçilmiş yüzey uygulaması</strong></li>',
            '</ul>',
            '</div>',
            '<div class="pp-desc-section">',
            '<h3>Bakım Bilgileri</h3>',
            '<ul class="pp-care-list">',
            getCareIconItem('max30derece', 'Maksimum 30 °C sıcaklıkta yıkayın'),
            getCareIconItem('kurutemizlemeyapma', 'Kuru temizleme yaptırmayın'),
            getCareIconItem('sererekkurut', 'Sererek kurut'),
            getCareIconItem('tamburlukurutmayapma', 'Tamburlu kurutma yapmayın'),
            getCareIconItem('ortasicakliktautule', 'Orta sıcaklıkta ütüleyin'),
            getCareIconItem('agarticikullanma', 'Ağartıcı kullanmayın'),
            '</ul>',
            '</div>'
          ].join('')
        },
        shipping: {
          title: 'KARGO & İADE',
          body: [
            '<p>Siparişler ödeme onayından sonra genellikle <strong>1-2 iş günü</strong> içinde hazırlanır ve kargoya teslim edilir.</p>',
            '<ul>',
            '<li>1000₺ ve üzeri siparişlerde ücretsiz kargo</li>',
            '<li>Kargo takip bilgisi sipariş sonrasında paylaşılır</li>',
            '<li>Kullanılmamış ve etiketi çıkarılmamış ürünlerde 14 gün içinde iade</li>',
            '<li>İade edilecek ürünün orijinal paketinde gönderilmesi gerekir</li>',
            '</ul>',
            '<p>Drop ve sınırlı üretim ürünlerde stok tekrar etmeyebilir; beden değişimi stok durumuna bağlıdır.</p>'
          ].join('')
        },
        sizeGuide: {
          title: 'BEDEN REHBERİ',
          body: [
            '<table class="pp-size-guide-table">',
            '<thead>',
            '<tr><th>BEDEN</th><th>GÖĞÜS (cm)</th><th>BEL (cm)</th><th>BOY (cm)</th></tr>',
            '</thead>',
            '<tbody>',
            '<tr><td>XS</td><td>82-86</td><td>66-70</td><td>160-165</td></tr>',
            '<tr><td>S</td><td>88-92</td><td>72-76</td><td>165-170</td></tr>',
            '<tr><td>M</td><td>94-98</td><td>78-82</td><td>170-175</td></tr>',
            '<tr><td>L</td><td>100-104</td><td>84-88</td><td>175-180</td></tr>',
            '<tr><td>XL</td><td>106-110</td><td>90-94</td><td>180-185</td></tr>',
            '<tr><td>XXL</td><td>112-118</td><td>96-102</td><td>185-190</td></tr>',
            '</tbody>',
            '</table>'
          ].join('')
        },
        fitFinder: {
          title: 'BEDEN ÖNERİCİ',
          body: [
            '<div class="pp-fit-finder">',
            '<div class="pp-fit-finder__head">',
            '<span class="pp-fit-finder__label">BEDEN ÖNERİCİ</span>',
            '<span class="pp-fit-finder__result" id="pp-fit-result">Bilgilerini seç</span>',
            '</div>',
            '<div class="pp-fit-finder__controls">',
            '<label class="pp-fit-field">BOY<select id="pp-fit-height"><option value="">Seç</option><option value="short">160-170</option><option value="mid">171-180</option><option value="tall">181+</option></select></label>',
            '<label class="pp-fit-field">KİLO<select id="pp-fit-weight"><option value="">Seç</option><option value="light">55-70</option><option value="regular">71-85</option><option value="heavy">86+</option></select></label>',
            '<label class="pp-fit-field">KALIP<select id="pp-fit-preference"><option value="regular">Regular</option><option value="oversize">Oversize</option></select></label>',
            '</div>',
            '<p class="pp-fit-finder__note">Öneri, seçilen beden butonunu otomatik işaretler. Daha bol duruş için oversize seç.</p>',
            '</div>'
          ].join('')
        }
      };

      function openPanel(type) {
        var item = content[type] || content.desc;
        titleEl.textContent = item.title;
        bodyEl.innerHTML = item.body;
        if (type === 'fitFinder') initFitFinder();
        panel.classList.add('pp-info-panel--active');
        overlay.classList.add('pp-info-panel-overlay--active');
        panel.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
      }

      function closePanel() {
        panel.classList.remove('pp-info-panel--active');
        overlay.classList.remove('pp-info-panel-overlay--active');
        panel.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
      }

      links.forEach(function (link) {
        link.addEventListener('click', function () {
          openPanel(link.getAttribute('data-info-panel'));
        });
      });

      overlay.addEventListener('click', closePanel);
      if (closeBtn) closeBtn.addEventListener('click', closePanel);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && panel.classList.contains('pp-info-panel--active')) closePanel();
      });
    }

    function initProductFavorite(productName, productPrice) {
      var favoriteBtn = document.getElementById('pp-favorite-btn');
      if (!favoriteBtn) return;

      var key = 'maganda_favorites';
      var favoriteId = productName + '|' + productPrice;
      var favorites = [];
      var favoriteItem = {
        id: favoriteId,
        name: productName,
        price: productPrice,
        series: series,
        badge: badge,
        img: imgUrl
      };

      try {
        favorites = JSON.parse(localStorage.getItem(key)) || [];
      } catch (e) {
        favorites = [];
      }

      function syncButton() {
        var active = favorites.some(function (item) {
          return (typeof item === 'string' ? item : item.id) === favoriteId;
        });
        favoriteBtn.classList.toggle('pp-favorite-btn--active', active);
        favoriteBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
      }

      syncButton();

      favoriteBtn.addEventListener('click', function () {
        var index = favorites.findIndex(function (item) {
          return (typeof item === 'string' ? item : item.id) === favoriteId;
        });
        if (index === -1) {
          favorites.push(favoriteItem);
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

    function renderProductReviews(productName, productSeries, productImage) {
      var summaryEl = document.getElementById('pp-review-summary');
      var listEl = document.getElementById('pp-review-list');
      var formEl = document.getElementById('pp-review-form');
      if (!summaryEl || !listEl) return;

      var filterState = { rating: 'all', sort: 'featured' };
      var demoReviews = buildDemoReviews(productName, productSeries, productImage);

      function sync() {
        var allReviews = demoReviews.concat(getStoredReviews(productName));
        renderReviewSummary(allReviews);
        renderReviewList(applyReviewState(allReviews));
      }

      function renderReviewSummary(reviews) {
        var total = reviews.length;
        var average = total ? reviews.reduce(function (sum, item) { return sum + item.rating; }, 0) / total : 0;
        var rounded = Math.round(average * 10) / 10;
        var counts = [5, 4, 3, 2, 1].map(function (rating) {
          return {
            rating: rating,
            count: reviews.filter(function (item) { return item.rating === rating; }).length
          };
        });

        summaryEl.innerHTML =
          '<span class="pp-review-summary__eyebrow">Müşteri Değerlendirmeleri</span>' +
          '<div class="pp-review-score">' + rounded.toFixed(1).replace('.', ',') + '</div>' +
          '<div class="pp-review-stars" aria-label="' + rounded.toFixed(1) + ' puan">' + renderStars(Math.round(average)) + '</div>' +
          '<p class="pp-review-count">' + total + ' değerlendirme · ' + reviews.filter(function (item) { return item.text; }).length + ' yorum</p>' +
          '<div class="pp-review-ai-summary">' +
          '<span>Yapay zeka özeti</span>' +
          '<p>Yorumlarda en çok kumaş kalitesi, kalıbın rahatlığı ve ürünün fotoğraflardaki gibi gelmesi öne çıkıyor. Beden konusunda kararsız kalanlar genelde normal bedeninden memnun kalmış.</p>' +
          '</div>' +
          '<div class="pp-rating-bars">' + counts.map(function (item) {
            var width = total ? Math.round((item.count / total) * 100) : 0;
            return '<div class="pp-rating-row">' +
              '<span>' + item.rating + ' yıldız</span>' +
              '<div class="pp-rating-bar"><span style="width:' + width + '%"></span></div>' +
              '<strong>' + item.count + '</strong>' +
              '</div>';
          }).join('') + '</div>';
      }

      function renderReviewList(reviews) {
        if (!reviews.length) {
          listEl.innerHTML = '<div class="pp-review-empty">Bu filtrede yorum bulunamadı.</div>';
          return;
        }

        listEl.innerHTML = reviews.map(function (item) {
          var imageHtml = item.image ? '<button class="pp-review-photo" type="button" style="background-image:url(&quot;' + escapeAttr(item.image) + '&quot;)" aria-label="Yorum görseli"></button>' : '';
          return '<article class="pp-review-card">' +
            '<div class="pp-review-card__top">' +
            '<div>' +
            '<strong class="pp-review-user">' + escapeHtml(item.user) + '</strong>' +
            '<span class="pp-review-meta">' + escapeHtml(item.date) + ' · Beden ' + escapeHtml(item.size) + ' · ' + escapeHtml(item.fit) + '</span>' +
            '</div>' +
            '<span class="pp-review-card__stars">' + renderStars(item.rating) + '</span>' +
            '</div>' +
            '<p class="pp-review-text">' + escapeHtml(item.text) + '</p>' +
            imageHtml +
            '<div class="pp-review-votes" aria-label="Yorum oylama">' +
            '<button class="pp-review-vote" type="button" data-review-vote="like" aria-pressed="false" aria-label="Yorumu beğen">👍</button>' +
            '<button class="pp-review-vote" type="button" data-review-vote="dislike" aria-pressed="false" aria-label="Yorumu beğenme">👎</button>' +
            '</div>' +
            '</article>';
        }).join('');

        listEl.querySelectorAll('.pp-review-vote').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var active = btn.getAttribute('aria-pressed') === 'true';
            var group = btn.closest('.pp-review-votes');
            if (group) {
              group.querySelectorAll('.pp-review-vote').forEach(function (item) {
                item.setAttribute('aria-pressed', 'false');
                item.classList.remove('is-active');
              });
            }
            if (!active) {
              btn.setAttribute('aria-pressed', 'true');
              btn.classList.add('is-active');
            }
          });
        });
      }

      function applyReviewState(reviews) {
        var filtered = reviews.filter(function (item) {
          if (filterState.rating === 'all') return true;
          if (filterState.rating === 'photo') return Boolean(item.image);
          if (filterState.rating === 'low') return item.rating <= 3;
          return item.rating === Number(filterState.rating);
        });

        return filtered.sort(function (a, b) {
          if (filterState.sort === 'newest') return b.timestamp - a.timestamp;
          if (filterState.sort === 'highest') return b.rating - a.rating;
          if (filterState.sort === 'lowest') return a.rating - b.rating;
          return (b.featuredScore || 0) - (a.featuredScore || 0);
        });
      }

      initReviewFilters(filterState, sync);
      initReviewForm(productName, sync);
      sync();

      if (formEl) formEl.setAttribute('data-ready', 'true');
    }

    function initReviewFilters(filterState, onChange) {
      var filters = Array.from(document.querySelectorAll('[data-rating-filter]'));
      var sortEl = document.getElementById('pp-review-sort');

      filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterState.rating = btn.getAttribute('data-rating-filter') || 'all';
          filters.forEach(function (item) { item.classList.remove('is-active'); });
          btn.classList.add('is-active');
          onChange();
        });
      });

      if (sortEl) {
        sortEl.addEventListener('change', function () {
          filterState.sort = sortEl.value;
          onChange();
        });
      }
    }

    function initReviewForm(productName, onSubmit) {
      var form = document.getElementById('pp-review-form');
      var ratingEl = document.getElementById('pp-review-rating');
      var sizeEl = document.getElementById('pp-review-size');
      var fitEl = document.getElementById('pp-review-fit');
      var textEl = document.getElementById('pp-review-text');
      if (!form || !ratingEl || !sizeEl || !fitEl || !textEl) return;

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var text = textEl.value.trim();
        if (!text) return;

        var reviews = getStoredReviews(productName);
        reviews.unshift({
          id: 'user-' + Date.now(),
          user: 'MAGANDA Müşterisi',
          rating: Number(ratingEl.value) || 5,
          size: sizeEl.value,
          fit: fitEl.value,
          text: text,
          date: 'Az önce',
          timestamp: Date.now(),
          featuredScore: 90,
          image: ''
        });
        localStorage.setItem(getReviewStorageKey(productName), JSON.stringify(reviews));
        textEl.value = '';
        ratingEl.value = '5';
        window.toast && window.toast('Yorumun eklendi', 'success');
        onSubmit();
      });
    }

    function getReviewStorageKey(productName) {
      return 'maganda_product_reviews_' + productHash(productName);
    }

    function getStoredReviews(productName) {
      try {
        return JSON.parse(localStorage.getItem(getReviewStorageKey(productName))) || [];
      } catch (e) {
        return [];
      }
    }

    function buildDemoReviews(productName, productSeries, productImage) {
      var seed = productHash(productName);
      var names = ['Emir K.', 'Berk A.', 'Deniz T.', 'Mert S.', 'Can Y.'];
      var texts = [
        'Kumaşı beklediğimden tok duruyor, yıkama sonrası formu bozulmadı.',
        'Kalıp tam istediğim gibi. Günlük kullanımda rahat, görüntüsü sert.',
        'Paketleme özenliydi. Ürün fotoğraftakinden daha premium hissettiriyor.',
        'Beden konusunda kararsızdım ama önerilen beden doğru geldi.',
        'Drop hissi güçlü, detayları sade ama dikkat çekiyor.'
      ];
      var fallbackImages = [
        productImage,
        'assets/products/maganda_hoodie_black_1777846105084.png',
        'assets/products/maganda_tshirt_car_1777846004490.png'
      ].filter(Boolean);

      return names.map(function (user, index) {
        var rating = Math.max(3, 5 - ((seed + index) % 3 === 0 ? 1 : 0));
        return {
          id: 'demo-' + index,
          user: user,
          rating: rating,
          size: ['S', 'M', 'L', 'XL'][index % 4],
          fit: index % 2 === 0 ? 'Tam kalıp' : 'Biraz bol',
          text: texts[(seed + index) % texts.length],
          date: (index + 2) + ' gün önce',
          timestamp: Date.now() - ((index + 2) * 86400000),
          featuredScore: 100 - index * 8,
          image: index < 2 ? fallbackImages[index % fallbackImages.length] : ''
        };
      });
    }

    function renderStars(rating) {
      var full = Math.max(0, Math.min(5, Number(rating) || 0));
      var html = '';
      for (var i = 1; i <= 5; i++) {
        html += '<span class="' + (i <= full ? 'is-filled' : '') + '">★</span>';
      }
      return html;
    }

    function renderProductQuestions(productName, productSeries) {
      var listEl = document.getElementById('pp-question-list');
      var searchEl = document.getElementById('pp-question-search');
      if (!listEl) return;

      var isMoto = String(productSeries || productName || '').toLowerCase().indexOf('moto') !== -1;
      var questions = [
        {
          q: 'Kalıp regular mı oversize mı?',
          a: isMoto ? 'Motosiklet serisinde rahat hareket için regular ile hafif oversize arası bir duruş kullanıyoruz.' : 'Ürün regular duruşlu; daha bol görünüm için bir beden büyük tercih edebilirsiniz.',
          date: '3 gün önce'
        },
        {
          q: 'Kumaş kalınlığı mevsimlik mi?',
          a: 'Orta ağırlıkta, günlük kullanıma uygun tok pamuk hissi veren kumaş yapısına sahiptir.',
          date: '5 gün önce'
        },
        {
          q: 'Kargo kaç günde gelir?',
          a: 'Siparişler genellikle 1-2 iş günü içinde hazırlanır, teslimat adresine göre 2-4 iş günü aralığında ulaşır.',
          date: '1 hafta önce'
        },
        {
          q: 'Beden değişimi yapabiliyor muyum?',
          a: 'Kullanılmamış ve etiketi çıkarılmamış ürünlerde 14 gün içinde iade veya stok uygunsa beden değişimi yapılabilir.',
          date: '2 hafta önce'
        }
      ];

      function draw(items) {
        if (!items.length) {
          listEl.innerHTML = '<div class="pp-question-empty">Aramana uygun soru bulunamadı.</div>';
          return;
        }

        listEl.innerHTML = items.map(function (item) {
          return '<article class="pp-question-card">' +
            '<div class="pp-question-card__q">' +
            '<span>Soru</span>' +
            '<p>' + escapeHtml(item.q) + '</p>' +
            '</div>' +
            '<div class="pp-question-card__a">' +
            '<span>MAGANDA Satıcısı · ' + escapeHtml(item.date) + '</span>' +
            '<p>' + escapeHtml(item.a) + '</p>' +
            '</div>' +
            '</article>';
        }).join('');
      }

      if (searchEl) {
        searchEl.addEventListener('input', function () {
          var term = searchEl.value.trim().toLocaleLowerCase('tr-TR');
          draw(questions.filter(function (item) {
            return !term || (item.q + ' ' + item.a).toLocaleLowerCase('tr-TR').indexOf(term) !== -1;
          }));
        });
      }

      draw(questions);
    }

    function renderRelatedProducts(productName, productSeries) {
      var relatedGrid = document.getElementById('pp-related-grid');
      if (!relatedGrid) return;

      var catalog = [
        { name: 'V8 OBSESSION HOODIE', price: '\u20BA1799', series: 'Araba Serisi', img: 'assets/img/V8 OBSESSION HOODIE/siyah/ön.png', badge: 'YENI DROP', gallery: 'assets/img/V8 OBSESSION HOODIE/siyah/ön.png|assets/img/V8 OBSESSION HOODIE/siyah/arka.png|assets/img/V8 OBSESSION HOODIE/siyah/arkaveön.png|assets/img/V8 OBSESSION HOODIE/siyah/doku.png|assets/img/V8 OBSESSION HOODIE/siyah/model.png|assets/img/V8 OBSESSION HOODIE/siyah/modelarka.png' },
        { name: 'DRIFT KING OVERSIZE T-SHIRT', price: '\u20BA699', series: 'Araba Serisi', img: 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png', badge: 'COK SATAN', gallery: 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/arka.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/arkaveön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/kumasdetay.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelarka.png' },
        { name: 'V8 OBSESSION HOODIE - SIYAH', price: '\u20BA1499', series: 'Araba Serisi', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80' },
        { name: 'MIDNIGHT RUN TRACK JACKET', price: '\u20BA1899', series: 'Araba Serisi', img: 'assets/products/track_jacket.png' },
        { name: 'GEARHEAD CARGO PANTS', price: '\u20BA1299', series: 'Araba Serisi', img: 'assets/products/cargo_pants.png' },
        { name: 'RIDE OR DIE LEATHER JACKET', price: '\u20BA3499', series: 'Motosiklet Serisi', img: 'assets/products/leather_jacket.png' },
        { name: 'STREET FIGHTER HOODIE', price: '\u20BA1499', series: 'Motosiklet Serisi', img: 'assets/products/street_fighter_hoodie.png' },
        { name: 'APEX CHASER LONG SLEEVE', price: '\u20BA899', series: 'Motosiklet Serisi', img: 'assets/products/apex_longsleeve.png' },
        { name: 'DROP #01: THE MANIFESTO HOODIE', price: '\u20BA1999', series: 'Drop Özel', img: 'assets/products/manifesto_hoodie.png', badge: 'DROP' },
        { name: 'DROP #02: REDLINE TECHNICAL PANTS', price: '\u20BA1599', series: 'Drop Özel', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80', badge: 'DROP' },
        { name: 'DROP #03: SHADOW REFLECTIVE JACKET', price: '\u20BA2499', series: 'Drop Özel', img: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80', badge: 'DROP' }
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
        if (item.gallery) params.set('gallery', item.gallery);

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
    function getCareIconItem(name, label) {
      return '<li>' +
        '<span class="pp-care-icon-wrap">' +
        '<img class="pp-care-icon pp-care-icon--light" src="assets/img/' + name + '.png" alt="">' +
        '<img class="pp-care-icon pp-care-icon--dark" src="assets/img/' + name + 'siyah.png" alt="">' +
        '</span>' +
        '<span>' + label + '</span>' +
        '</li>';
    }

    function productHash(value) {
      var hash = 0;
      String(value || '').split('').forEach(function (char) {
        hash = ((hash << 5) - hash) + char.charCodeAt(0);
        hash |= 0;
      });
      return Math.abs(hash);
    }

    function getNamedProductGallery(productName) {
      var normalizedName = String(productName || '').trim().toLocaleUpperCase('tr-TR');
      if (normalizedName === 'V8 OBSESSION HOODIE') {
        return getProductColorGalleries(productName).siyah || [];
      }
      if (normalizedName === 'DRIFT KING OVERSIZE T-SHIRT') {
        return getProductColorGalleries(productName).siyah || [];
      }
      return [];
    }

    function getProductColorGalleries(productName) {
      var normalizedName = String(productName || '').trim().toLocaleUpperCase('tr-TR');
      if (normalizedName === 'V8 OBSESSION HOODIE') {
        var v8Base = 'assets/img/V8 OBSESSION HOODIE/';
        return {
          siyah: [
            v8Base + 'siyah/ön.png',
            v8Base + 'siyah/arka.png',
            v8Base + 'siyah/arkaveön.png',
            v8Base + 'siyah/doku.png',
            v8Base + 'siyah/model.png',
            v8Base + 'siyah/modelarka.png'
          ],
          beyaz: [
            v8Base + 'beyaz/ChatGPT Image 11 May 2026 14_03_56.png',
            v8Base + 'beyaz/ChatGPT Image 11 May 2026 14_16_31.png',
            v8Base + 'beyaz/ChatGPT Image 11 May 2026 14_18_00.png',
            v8Base + 'beyaz/ChatGPT Image 11 May 2026 14_20_37.png',
            v8Base + 'beyaz/ChatGPT Image 11 May 2026 14_21_50.png',
            v8Base + 'beyaz/ChatGPT Image 11 May 2026 14_26_53.png'
          ]
        };
      }
      if (normalizedName !== 'DRIFT KING OVERSIZE T-SHIRT') return {};

      var base = 'assets/img/DRIFT KING OVERSİZE T-SHIRT/';
      return {
        siyah: [
          base + 'siyah/ön.png',
          base + 'siyah/arka.png',
          base + 'siyah/arkaveön.png',
          base + 'siyah/kumasdetay.png',
          base + 'siyah/modelön.png',
          base + 'siyah/modelarka.png'
        ],
        beyaz: [
          base + 'beyaz/ChatGPT Image 11 May 2026 13_48_20.png',
          base + 'beyaz/ChatGPT Image 11 May 2026 13_49_51.png',
          base + 'beyaz/ChatGPT Image 11 May 2026 13_53_19.png',
          base + 'beyaz/ChatGPT Image 11 May 2026 13_55_33.png',
          base + 'beyaz/ChatGPT Image 11 May 2026 13_57_08.png',
          base + 'beyaz/ChatGPT Image 11 May 2026 13_59_21.png'
        ]
      };
    }

    function buildProductGallery(primaryImage, productName, galleryImages) {
      var fallbackImages = [
        'assets/products/maganda_hoodie_black_1777846105084.png',
        'assets/products/maganda_tshirt_car_1777846004490.png',
        'assets/products/maganda_hoodie_acid_1777846208954.png',
        'assets/products/maganda_sweatpants_redline_1777846482324.png'
      ];
      var customGallery = (galleryImages && galleryImages.length ? galleryImages : getNamedProductGallery(productName)).filter(Boolean);
      if (customGallery.length) return customGallery;
      var base = primaryImage || fallbackImages[productHash(productName) % fallbackImages.length];
      var alternates = fallbackImages.filter(function (image) { return image !== base; });
      return [
        base,
        alternates[0] || base,
        alternates[1] || base
      ];
    }

    function setBackgroundImage(element, imageUrl) {
      if (!element || !imageUrl) return;
      element.style.backgroundImage = 'url("' + String(imageUrl).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '")';
    }

    function setProductImage(imageUrl) {
      setBackgroundImage(imgEl, imageUrl);
      var zoomImage = document.getElementById('pp-zoom-image');
      setBackgroundImage(zoomImage, imageUrl);
    }

    function initProductGallery(primaryImage, productName, galleryImages) {
      var navEl = document.getElementById('pp-gallery-nav');
      var thumbsEl = document.getElementById('pp-gallery-thumbs');
      var zoomModal = document.getElementById('pp-zoom-modal');
      var zoomClose = document.getElementById('pp-zoom-close');
      if (!navEl) return null;

      var gallery = buildProductGallery(primaryImage, productName, galleryImages);
      var activeIndex = 0;
      var activeImage = gallery[activeIndex];
      setProductImage(activeImage);

      function updateGalleryThumbs() {
        if (!thumbsEl) return;
        thumbsEl.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb, index) {
          thumb.classList.toggle('pp-gallery-thumb--active', index === activeIndex);
          thumb.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
        });
      }

      if (thumbsEl) {
        function renderGalleryThumbs() {
          thumbsEl.innerHTML = gallery.map(function (image, index) {
          return '<button class="pp-gallery-thumb' + (index === activeIndex ? ' pp-gallery-thumb--active' : '') + '" type="button" data-gallery-thumb="' + index + '" aria-label="Ürün görseli ' + (index + 1) + '" aria-current="' + (index === activeIndex ? 'true' : 'false') + '" style="background-image:url(&quot;' + escapeAttr(image) + '&quot;)"></button>';
          }).join('');

          thumbsEl.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
            thumb.addEventListener('click', function () {
              activeIndex = Number(thumb.getAttribute('data-gallery-thumb')) || 0;
              activeImage = gallery[activeIndex];
              setProductImage(activeImage);
              updateGalleryThumbs();
            });
          });
        }

        renderGalleryThumbs();
      }

      navEl.querySelectorAll('[data-gallery-nav]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var direction = btn.getAttribute('data-gallery-nav') === 'prev' ? -1 : 1;
          activeIndex = (activeIndex + direction + gallery.length) % gallery.length;
          activeImage = gallery[activeIndex];
          setProductImage(activeImage);
          updateGalleryThumbs();
        });
      });

      function closeZoom() {
        if (!zoomModal) return;
        zoomModal.classList.remove('pp-zoom-modal--active');
        zoomModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
      }

      if (zoomClose) zoomClose.addEventListener('click', closeZoom);
      if (zoomModal) {
        zoomModal.addEventListener('click', function (event) {
          if (event.target === zoomModal) closeZoom();
        });
      }
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && zoomModal && zoomModal.classList.contains('pp-zoom-modal--active')) closeZoom();
      });

      return {
        setGallery: function (nextGallery) {
          gallery = (nextGallery || []).filter(Boolean);
          activeIndex = 0;
          activeImage = gallery[activeIndex];
          setProductImage(activeImage);
          if (thumbsEl) {
            thumbsEl.innerHTML = gallery.map(function (image, index) {
              return '<button class="pp-gallery-thumb' + (index === activeIndex ? ' pp-gallery-thumb--active' : '') + '" type="button" data-gallery-thumb="' + index + '" aria-label="Ürün görseli ' + (index + 1) + '" aria-current="' + (index === activeIndex ? 'true' : 'false') + '" style="background-image:url(&quot;' + escapeAttr(image) + '&quot;)"></button>';
            }).join('');

            thumbsEl.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
              thumb.addEventListener('click', function () {
                activeIndex = Number(thumb.getAttribute('data-gallery-thumb')) || 0;
                activeImage = gallery[activeIndex];
                setProductImage(activeImage);
                updateGalleryThumbs();
              });
            });
          }
        }
      };
    }

    function initProductColorOptions(productName, galleryApi) {
      var colorOptions = document.getElementById('pp-color-options');
      var colorDivider = document.getElementById('pp-color-divider');
      var colorButtons = Array.from(document.querySelectorAll('[data-product-color]'));
      var galleries = getProductColorGalleries(productName);
      var colors = Object.keys(galleries);
      if (!colorOptions || !galleryApi || !colors.length) return;

      colorOptions.hidden = false;
      if (colorDivider) colorDivider.hidden = false;

      function setActiveColor(color) {
        colorButtons.forEach(function (button) {
          var isActive = button.getAttribute('data-product-color') === color;
          button.classList.toggle('pp-color-swatch--active', isActive);
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      }

      colorButtons.forEach(function (button) {
        var color = button.getAttribute('data-product-color');
        button.hidden = !galleries[color];
        button.addEventListener('click', function () {
          if (!galleries[color]) return;
          galleryApi.setGallery(galleries[color]);
          setActiveColor(color);
        });
      });

      galleryApi.setGallery(galleries.siyah || galleries[colors[0]]);
      setActiveColor(galleries.siyah ? 'siyah' : colors[0]);
    }

    function getProductSizeStock(productName) {
      var seed = productHash(productName);
      var stockMap = {};
      sizes.forEach(function (size, index) {
        stockMap[size] = (seed + index * 3) % 7;
      });
      if (Object.keys(stockMap).every(function (size) { return stockMap[size] === 0; })) stockMap.M = 3;
      return stockMap;
    }

    function getProductModelInfo(productSeries) {
      var isMoto = String(productSeries || '').toLowerCase().indexOf('moto') !== -1;
      return isMoto ? 'Model 178 cm / 74 kg / M beden giyiyor.' : 'Model 183 cm / 78 kg / L beden giyiyor.';
    }

    function initFitFinder() {
      var heightEl = document.getElementById('pp-fit-height');
      var weightEl = document.getElementById('pp-fit-weight');
      var prefEl = document.getElementById('pp-fit-preference');
      var resultEl = document.getElementById('pp-fit-result');
      if (!heightEl || !weightEl || !prefEl || !resultEl) return;

      function recommendSize() {
        if (!heightEl.value || !weightEl.value) {
          resultEl.textContent = 'Bilgilerini seç';
          return;
        }
        var score = 1;
        if (heightEl.value === 'mid') score += 1;
        if (heightEl.value === 'tall') score += 2;
        if (weightEl.value === 'regular') score += 1;
        if (weightEl.value === 'heavy') score += 2;
        if (prefEl.value === 'oversize') score += 1;
        var recommended = sizes[Math.min(sizes.length - 1, Math.max(0, score))];
        resultEl.textContent = '\u00d6nerilen beden: ' + recommended;
        var matchBtn = sizesEl && sizesEl.querySelector('[data-size="' + recommended + '"]');
        if (matchBtn && !matchBtn.disabled) matchBtn.click();
      }

      [heightEl, weightEl, prefEl].forEach(function (select) {
        select.addEventListener('change', recommendSize);
      });
    }

    var backLink = document.getElementById('pp-back');
    if (backLink) {
      var ref = document.referrer || '';
      var colName = ref.indexOf('araba') !== -1 ? 'ARABA KOLEKSİYONU'
        : ref.indexOf('motor') !== -1 ? 'MOTOSİKLET KOLEKSİYONU'
          : ref.indexOf('drop') !== -1 ? 'DROP KOLEKSİYONU'
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
    var sizeStock = getProductSizeStock(name);

    if (sizesEl) {
      sizes.forEach(function (s) {
        var stock = sizeStock[s];
        var btn = document.createElement('button');
        btn.className = 'pp-size-btn';
        btn.dataset.size = s;
        btn.disabled = stock <= 0;
        if (stock > 0 && stock <= 2) btn.classList.add('pp-size-btn--low');
        btn.innerHTML = '<span class="pp-size-btn__label">' + s + '</span>' +
          '<span class="pp-size-stock">' + (stock <= 0 ? 'Tükendi' : stock <= 2 ? 'Son ' + stock : 'Stokta') + '</span>';
        btn.addEventListener('click', function () {
          if (btn.disabled) return;
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
    var qtyPlus = document.getElementById('pp-qty-plus');
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

    // Sepete Ekle / Simdi Al
    var addBtn = document.getElementById('pp-add-btn');
    var buyNowBtn = document.getElementById('pp-buy-now-btn');
    var sizeWarn = document.getElementById('pp-size-warn');
    function warnMissingSize() {
      if (sizesEl) {
        sizesEl.classList.add('pp-sizes--warn');
        setTimeout(function () { sizesEl.classList.remove('pp-sizes--warn'); }, 700);
      }
      if (sizeWarn) {
        sizeWarn.style.opacity = '1';
        setTimeout(function () { sizeWarn.style.opacity = '0'; }, 2500);
      }
    }

    function createProductCartItem() {
      return {
        id: Date.now(),
        name: name,
        price: parsePriceValue(price),
        size: selectedSize,
        quantity: currentQty,
        image: imgUrl
      };
    }
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        if (!selectedSize) {
          warnMissingSize();
          return;
        }

        var productCartItem = createProductCartItem();
        var existingItem = cart.find(function (item) {
          return item.name === name && item.size === selectedSize;
        });

        if (existingItem) {
          existingItem.quantity = Math.min(existingItem.quantity + currentQty, 10);
        } else {
          cart.push(productCartItem);
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

      if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function () {
          if (!selectedSize) {
            warnMissingSize();
            return;
          }

          localStorage.setItem('maganda_buy_now', JSON.stringify([createProductCartItem()]));
          window.location.href = 'checkout.html?buyNow=1';
        });
      }

      // TÜKENDİ durumu kontrolü (Ürün zaten bitmişse buton tıklanamaz)
      if (badge && badge.toUpperCase() === 'TÜKENDİ') {
        addBtn.disabled = true;
        addBtn.textContent = 'TÜKENDİ';
        addBtn.style.backgroundColor = 'var(--color-gray-dark)';
        addBtn.style.color = 'var(--color-gray-light)';
        addBtn.style.cursor = 'not-allowed';
        if (buyNowBtn) {
          buyNowBtn.disabled = true;
          buyNowBtn.style.opacity = '0.45';
          buyNowBtn.style.cursor = 'not-allowed';
        }
      }
    }

    // Beden Rehberi toggle logic removed as it's now handled by the info panel
  }

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem('maganda_favorites')) || [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(items) {
    localStorage.setItem('maganda_favorites', JSON.stringify(items));
  }

  function normalizeFavorite(item) {
    if (typeof item === 'string') {
      var parts = item.split('|');
      return {
        id: item,
        name: parts[0] || 'Favori ürün',
        price: parts[1] || '',
        series: '',
        badge: '',
        img: ''
      };
    }
    return {
      id: item.id || ((item.name || '') + '|' + (item.price || '')),
      name: item.name || 'Favori ürün',
      price: item.price || '',
      series: item.series || '',
      badge: item.badge || '',
      img: item.img || item.image || ''
    };
  }

  function escapeAttr(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function initFavoritesPage() {
    var grid = document.getElementById('favoritesGrid');
    var empty = document.getElementById('favoritesEmpty');
    var count = document.getElementById('favoritesCount');
    if (!grid) return;

    function render() {
      var favorites = getFavorites().map(normalizeFavorite);
      if (count) count.textContent = favorites.length + ' ÜRÜN';

      if (!favorites.length) {
        grid.innerHTML = '';
        if (empty) {
          empty.hidden = false;
          if (!empty.dataset.rendered) {
            empty.dataset.rendered = '1';
            empty.innerHTML =
              '<div class="fav-empty-anim" aria-hidden="true">' +
              '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.4" width="80" height="80">' +
              '<path class="fav-empty-heart" d="M40 65 C10 45 5 20 20 12 C30 6 40 16 40 16 C40 16 50 6 60 12 C75 20 70 45 40 65Z" stroke-linecap="round" stroke-linejoin="round"/>' +
              '</svg>' +
              '</div>' +
              '<span class="favorites-empty__mark">MAGANDA</span>' +
              '<h2 class="favorites-empty__title">HENÜZ FAVORİN YOK</h2>' +
              '<p class="favorites-empty__text">Beğendiğin ürünleri ürün detay sayfasından favorilerine ekleyebilirsin.<br>Koleksiyona göz at ve ilk ürünü seç.</p>' +
              '<div class="fav-empty-actions">' +
              '<a href="drop.html" class="favorites-empty__btn">DROP ÜRÜNLER</a>' +
              '<a href="araba.html" class="favorites-empty__btn">ARABA KOLEKSİYONU</a>' +
              '<a href="motor.html" class="favorites-empty__btn">MOTOSİKLET KOLEKSİYONU</a>' +
              '</div>';
          }
        }
        return;
      }


      if (empty) empty.hidden = true;
      grid.innerHTML = favorites.map(function (item) {
        var params = new URLSearchParams({
          name: item.name,
          price: item.price,
          series: item.series,
          badge: item.badge,
          img: item.img
        });
        var imgStyle = item.img ? 'background-image:url(&quot;' + escapeAttr(item.img) + '&quot;); background-size:cover; background-position:center;' : '';
        var id = escapeAttr(item.id);
        return '<article class="product-card favorite-card" data-favorite-id="' + id + '">' +
          '<div class="product-card__image" style="' + imgStyle + '"></div>' +
          '<div class="product-card__corner"></div>' +
          '<div class="product-card__info">' +
          '<p class="product-card__tag">' + escapeHtml(item.series || 'MAGANDA') + '</p>' +
          '<h3 class="product-card__name">' + escapeHtml(item.name) + '</h3>' +
          '<div class="product-card__row">' +
          '<span class="product-card__price">' + escapeHtml(item.price) + '</span>' +
          '<a class="favorite-card__detail" href="product.html?' + params.toString() + '" data-stop-card>DETAY</a>' +
          '</div>' +
          '<button class="favorite-card__remove" type="button" data-stop-card data-remove-favorite="' + id + '">FAVORİDEN KALDIR</button>' +
          '</div>' +
          '</article>';
      }).join('');
    }

    grid.addEventListener('click', function (e) {
      var removeBtn = e.target.closest('[data-remove-favorite]');
      if (!removeBtn) return;
      var id = removeBtn.getAttribute('data-remove-favorite');
      var filtered = getFavorites().filter(function (item) {
        return (typeof item === 'string' ? item : item.id) !== id;
      });
      saveFavorites(filtered);
      window.toast && window.toast('Favorilerden kaldırıldı', 'info');
      render();
    });

    render();
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
      '</a>' +
      '<ul class="navbar__links" id="navLinks">' +
      '<li><a href="index.html" class="navbar__link">ANA SAYFA</a></li>' +
      '<li><a href="araba.html" class="navbar__link">ARABA</a></li>' +
      '<li><a href="motor.html" class="navbar__link">MOTOSİKLET</a></li>' +
      '<li><a href="drop.html" class="navbar__link">DROP ÜRÜNLER</a></li>' +
      '<li class="navbar__dropdown">' +
      '<button type="button" class="navbar__link navbar__dropdown-toggle" aria-haspopup="true" aria-expanded="false">BİZE ULAŞIN</button>' +
      '<div class="navbar__dropdown-menu" role="menu">' +
      '<a href="iletisim.html" class="navbar__dropdown-link" role="menuitem">İLETİŞİM</a>' +
      '<a href="hakkimizda.html" class="navbar__dropdown-link" role="menuitem">HAKKIMIZDA</a>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '<div class="navbar__actions">' +
      '<button class="navbar__theme-btn" id="themeToggle" aria-label="Temayı değiştir">' +
      '<span class="theme-icon-dark" aria-hidden="true">🌙</span>' +
      '<span class="theme-icon-light" aria-hidden="true">☀️</span>' +
      '</button>' +
      '<a href="login.html" class="navbar__icon-btn navbar__auth-btn" id="navAuthLink" aria-label="Hesabım">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
      '<span class="navbar__auth-name" id="navAuthName"></span>' +
      '</a>' +
      '<a href="favoriler.html" class="navbar__icon-btn navbar__favorite-btn" aria-label="Favorilerim">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="23" height="23">' +
      '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>' +
      '</svg>' +
      '</a>' +
      '<button class="navbar__cart-btn" id="cartOpenBtn" aria-label="Sepet">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">' +
      '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>' +
      '<line x1="3" y1="6" x2="21" y2="6"></line>' +
      '<path d="M16 10a4 4 0 0 1-8 0"></path>' +
      '</svg>' +
      '<span class="navbar__cart-badge" id="cartCount">0</span>' +
      '</button>' +
      '</div>' +
      '</div>' +
      '</nav>';

    var noise = document.querySelector('.noise-overlay');
    if (noise) {
      noise.insertAdjacentHTML('afterend', html);
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }

    // auth.js script'ini dinamik yükle (henüz yüklenmemişse)
    if (!document.querySelector('script[src*="auth.js"]')) {
      var authScript = document.createElement('script');
      authScript.src = 'js/auth.js';
      document.head.appendChild(authScript);
    }

    // search.js ve skeleton.js modüllerini dinamik yükle
    if (!document.querySelector('script[src*="search.js"]')) {
      var searchScript = document.createElement('script');
      searchScript.src = 'js/search.js';
      searchScript.onload = function () {
        if (typeof window.initSearch === 'function') window.initSearch();
      };
      document.head.appendChild(searchScript);
    }

    if (!document.querySelector('script[src*="skeleton.js"]')) {
      var skelScript = document.createElement('script');
      skelScript.src = 'js/skeleton.js';
      document.head.appendChild(skelScript);
    }

    var dropdown = document.querySelector('.navbar__dropdown');
    var dropdownToggle = document.querySelector('.navbar__dropdown-toggle');

    if (dropdown && dropdownToggle) {
      var setDropdown = function (open) {
        dropdown.classList.toggle('is-open', open);
        dropdownToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      };

      dropdown.addEventListener('mouseenter', function () { setDropdown(true); });
      dropdown.addEventListener('mouseleave', function () { setDropdown(false); });
      dropdown.addEventListener('focusin', function () { setDropdown(true); });
      dropdown.addEventListener('focusout', function () {
        setTimeout(function () {
          setDropdown(dropdown.contains(document.activeElement));
        }, 0);
      });
      dropdownToggle.addEventListener('click', function (e) {
        e.preventDefault();
        setDropdown(!dropdown.classList.contains('is-open'));
      });
      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) setDropdown(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setDropdown(false);
      });
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
      '<button class="footer__audio-btn" id="siteAudioToggle" type="button" aria-label="Muzigi ac" aria-pressed="false">' +
      '<span class="footer__audio-dot" aria-hidden="true"></span>' +
      '<span class="footer__audio-label">MUSIC OFF</span>' +
      '</button>' +
      '</div>' +
      '<div class="footer__col">' +
      '<a href="index.html" class="footer__link">Ana Sayfa</a>' +
      '<a href="araba.html" class="footer__link">Araba</a>' +
      '<a href="motor.html" class="footer__link">Motosiklet</a>' +
      '<a href="drop.html" class="footer__link">Drop Ürünler</a>' +
      '<a href="favoriler.html" class="footer__link">Favorilerim</a>' +
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

  function initCartDrawerWidget() {
    if (document.getElementById('cartDrawer')) return;

    var html =
      '<div class="cart-overlay" id="cartOverlay"></div>' +
      '<div class="cart-drawer" id="cartDrawer">' +
      '<div class="cart-drawer__header">' +
      '<div>' +
      '<span class="cart-drawer__title">Sepet</span>' +
      '<span class="cart-drawer__count" id="cartDrawerCount"></span>' +
      '</div>' +
      '<button class="cart-drawer__close" id="cartCloseBtn" type="button" aria-label="Sepeti kapat">&times;</button>' +
      '</div>' +
      '<div class="cart-shipping-bar" id="cartShippingBar">' +
      '<div class="cart-shipping-bar__label">' +
      '<span>Ücretsiz kargo</span>' +
      '<strong>&#8378;<span class="cart-shipping-bar__remain">1000</span> kald&#305;</strong>' +
      '</div>' +
      '<div class="cart-shipping-bar__track">' +
      '<div class="cart-shipping-bar__fill cart-shipping-bar__fill--red" style="width:0%"></div>' +
      '</div>' +
      '<p class="cart-shipping-bar__achieved">Ücretsiz kargo kazandın!</p>' +
      '</div>' +
      '<div class="cart-drawer__body" id="cartItems"></div>' +
      '<div class="cart-drawer__footer">' +
      '<div class="cart-drawer__total">' +
      '<span>Tahmini toplam:</span>' +
      '<span class="cart-drawer__total-amount" id="cartTotal">&#8378;0</span>' +
      '</div>' +
      '<button class="cart-drawer__checkout" id="checkoutBtn" type="button">Ödemeye geç →</button>' +
      '</div>' +
      '</div>';

    var script = document.querySelector('script[src="js/main.js"]') || document.querySelector('script');
    if (script) {
      script.insertAdjacentHTML('beforebegin', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }

  function initFooterPaymentStrip() {
    var footer = document.querySelector('.footer');
    if (!footer || document.querySelector('.footer-payment-strip')) return;

    var logoGroups = [
      {
        label: 'Kart ve güvenli ödeme logoları',
        logos: [
          ['masterpass.png', 'Masterpass'],
          ['visa.png', 'Visa'],
          ['troy.png', 'Troy']
        ]
      },
      {
        label: 'Banka ve taksit logoları',
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
    strip.setAttribute('aria-label', 'Ödeme ve banka logoları');

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

  /* ─── SİPARİŞ TAKİP SİMÜLASYONU ─── */
  function initOrderTracking() {
    var orderList = document.getElementById('orderList');
    if (!orderList) return;

    var STATUSES = [
      { key: 'preparing', label: 'Hazırlanıyor', icon: '📦', color: '#f59e0b' },
      { key: 'shipped', label: 'Kargoya Verildi', icon: '🚚', color: '#3b82f6' },
      { key: 'transit', label: 'Dağıtımda', icon: '⚡', color: '#8b5cf6' },
      { key: 'delivered', label: 'Teslim Edildi', icon: '✅', color: '#10b981' }
    ];

    function getStatusForOrder(orderId) {
      var digits = String(orderId).replace(/\D/g, '');
      var idx = parseInt(digits.slice(-2) || '0', 10) % STATUSES.length;
      return { status: STATUSES[idx], idx: idx };
    }

    function buildTrackingHTML(orderId) {
      var result = getStatusForOrder(orderId);
      var status = result.status;
      var statusIdx = result.idx;

      var stepsHTML = STATUSES.map(function (s, i) {
        var done = i <= statusIdx;
        var active = i === statusIdx;
        return '<div class="track-step' + (done ? ' track-step--done' : '') + (active ? ' track-step--active' : '') + '">' +
          '<div class="track-step__dot"></div>' +
          '<span class="track-step__label">' + s.label + '</span>' +
          '</div>' + (i < STATUSES.length - 1 ? '<div class="track-line' + (i < statusIdx ? ' track-line--done' : '') + '"></div>' : '');
      }).join('');

      return '<div class="order-tracking">' +
        '<div class="order-tracking__badge" style="--track-color:' + status.color + '">' +
        '<span class="order-tracking__icon">' + status.icon + '</span>' +
        '<strong>' + status.label + '</strong>' +
        '</div>' +
        '<div class="order-tracking__steps">' + stepsHTML + '</div>' +
        '</div>';
    }

    // MutationObserver: sipariş listesi render edildikten sonra tracking ekle
    var observer = new MutationObserver(function () {
      var cards = orderList.querySelectorAll('.order-card:not([data-tracked])');
      cards.forEach(function (card) {
        card.setAttribute('data-tracked', '1');
        var idEl = card.querySelector('.order-card__id');
        var orderId = idEl ? idEl.textContent : String(Date.now());
        card.insertAdjacentHTML('beforeend', buildTrackingHTML(orderId));
      });
    });

    observer.observe(orderList, { childList: true, subtree: false });
    // Sayfa yüklendiğinde zaten varsa da çalıştır
    var existingCards = orderList.querySelectorAll('.order-card:not([data-tracked])');
    existingCards.forEach(function (card) {
      card.setAttribute('data-tracked', '1');
      var idEl = card.querySelector('.order-card__id');
      var orderId = idEl ? idEl.textContent : String(Date.now());
      card.insertAdjacentHTML('beforeend', buildTrackingHTML(orderId));
    });
  }

  function init() {
    document.body.classList.remove('no-scroll');
    initHeaderWidget();
    initCartDrawerWidget();
    initFooterBrandWidget();
    initFooterWidget();
    initToast();        // En önce — window.toast hazır olsun
    initTheme();
    initCinematicHero();
    initNavbar();

    initCart();
    initSmoothScroll();
    initFilters();
    initScrollAnimations();
    initParallax();
    if (document.getElementById('maganda-sequence') && typeof window.initScrollSequence === 'function') {
      window.initScrollSequence();
    }
    initDropForm();
    initCollectionCardGalleries();
    initProductCards();
    initProductPage();
    initFavoritesPage();
    initFooterPaymentStrip();
    initOrderTracking();

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
