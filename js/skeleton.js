/* ═══════════════════════════════════════════
   MAGANDA — skeleton.js
   Skeleton Loader: ürün kartları ve product page için
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── PRODUCT PAGE SKELETON ─── */
  // product.html yüklendiğinde URL parametreleri parse edilirken
  // kısa bir gecikme oluşabilir. Bu fonksiyon sayfa içeriğini
  // skeleton ile önce doldurur, sonra gerçek veriyle değiştirir.
  window.showProductSkeleton = function () {
    var targets = {
      'pp-img':   'skeleton-box pp-img--skeleton',
      'pp-name':  'skeleton-line skeleton-line--title',
      'pp-price': 'skeleton-line skeleton-line--price',
      'pp-series':'skeleton-line skeleton-line--meta',
      'pp-desc':  'skeleton-line skeleton-line--desc'
    };

    Object.keys(targets).forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !el.dataset.skeletonReady) {
        el.classList.add('is-skeleton');
      }
    });
  };

  window.hideProductSkeleton = function () {
    document.querySelectorAll('.is-skeleton').forEach(function (el) {
      el.classList.remove('is-skeleton');
    });
  };

  /* ─── KOLEKSİYON GRID SKELETON ─── */
  // Koleksiyon sayfaları yüklenirken product-card yerlerine
  // skeleton placeholder'lar koyar.
  window.showCollectionSkeleton = function (gridSelector, count) {
    var grid = document.querySelector(gridSelector || '.collection__grid');
    if (!grid || grid.querySelector('.product-card')) return; // gerçek ürünler varsa çalıştırma

    count = count || 8;
    var html = '';
    for (var i = 0; i < count; i++) {
      html +=
        '<div class="product-card product-card--skeleton">' +
          '<div class="product-card__image skeleton-box"></div>' +
          '<div class="product-card__info">' +
            '<div class="skeleton-line skeleton-line--title"></div>' +
            '<div class="skeleton-line skeleton-line--meta"></div>' +
            '<div class="skeleton-line skeleton-line--price"></div>' +
          '</div>' +
        '</div>';
    }
    grid.innerHTML = html;
  };

  window.hideCollectionSkeleton = function () {
    document.querySelectorAll('.product-card--skeleton').forEach(function (el) {
      el.parentNode && el.parentNode.removeChild(el);
    });
  };

  /* ─── CART DRAWER SKELETON ─── */
  window.showCartSkeleton = function () {
    var container = document.getElementById('cartItems');
    if (!container) return;
    var html = '';
    for (var i = 0; i < 3; i++) {
      html +=
        '<div class="cart-item cart-item--skeleton">' +
          '<div class="cart-item__img skeleton-box"></div>' +
          '<div class="cart-item__info" style="flex:1;display:flex;flex-direction:column;gap:8px">' +
            '<div class="skeleton-line skeleton-line--title"></div>' +
            '<div class="skeleton-line skeleton-line--meta"></div>' +
            '<div class="skeleton-line skeleton-line--price"></div>' +
          '</div>' +
        '</div>';
    }
    container.innerHTML = '<div class="cart-items-list">' + html + '</div>';
  };

})();
