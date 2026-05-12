const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const productHtml = fs.readFileSync(path.join(root, 'product.html'), 'utf8');
const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
const checkoutJs = fs.readFileSync(path.join(root, 'js', 'checkout.js'), 'utf8');
const productCss = fs.readFileSync(path.join(root, 'css', 'product.css'), 'utf8');
const carHtml = fs.readFileSync(path.join(root, 'araba.html'), 'utf8');
const motorHtml = fs.readFileSync(path.join(root, 'motor.html'), 'utf8');
const dropHtml = fs.readFileSync(path.join(root, 'drop.html'), 'utf8');
const searchJs = fs.readFileSync(path.join(root, 'js', 'search.js'), 'utf8');

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`${label} missing: ${needle}`);
  }
}

function assertNotIncludes(source, needle, label) {
  if (source.includes(needle)) {
    throw new Error(`${label} should not include: ${needle}`);
  }
}

function assertBefore(source, first, second, label) {
  const firstIndex = source.indexOf(first);
  const secondIndex = source.indexOf(second);
  if (firstIndex === -1 || secondIndex === -1 || firstIndex > secondIndex) {
    throw new Error(`${label} expected "${first}" before "${second}"`);
  }
}

[
  ['araba.html', carHtml, 'V8 OBSESSION HOODIE'],
  ['araba.html', carHtml, 'assets/img/V8 OBSESSION HOODIE/siyah/ön.png'],
  ['araba.html', carHtml, 'assets/img/V8 OBSESSION HOODIE/siyah/modelarka.png'],
  ['araba.html', carHtml, 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png'],
  ['araba.html', carHtml, 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/kumasdetay.png'],
  ['araba.html', carHtml, 'data-gallery='],
  ['araba.html', carHtml, '9 ÜRÜN'],
  ['araba.html', carHtml, 'assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_27_01.png'],
  ['araba.html', carHtml, 'assets/img/MIDNIGHT RUN SWEATPANTS/siyah/ChatGPT Image 11 May 2026 16_39_41.png'],
  ['araba.html', carHtml, 'assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_05_42.png'],
  ['araba.html', carHtml, 'REDLINE TRACKSUIT'],
  ['motor.html', motorHtml, '10 ÜRÜN'],
  ['motor.html', motorHtml, 'CAFE RACER VINTAGE T-SHIRT'],
  ['motor.html', motorHtml, 'APEX CHASER LONG SLEEVE'],
  ['motor.html', motorHtml, 'BURN RUBBER CAP'],
  ['motor.html', motorHtml, 'BUILT FOR THE OBSESSED HOODIE'],
  ['motor.html', motorHtml, 'Altın Elbiseli Adam 3 İplik Oversize Hoodie'],
  ['motor.html', motorHtml, 'CBR 600RR Baskılı Regular Fit Motorcu Tişörtü'],
  ['motor.html', motorHtml, 'assets/img/MT-07 Baskılı Regular Fit Motorcu Tişörtü/siyah/ön.png'],
  ['drop.html', dropHtml, '8 ÜRÜN'],
  ['drop.html', dropHtml, 'DROP #04: CBR 600RR MOTORCU TİŞÖRTÜ'],
  ['drop.html', dropHtml, 'assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_39_20.png'],
  ['js/search.js', searchJs, 'V8 OBSESSION HOODIE'],
  ['js/search.js', searchJs, 'assets/img/V8 OBSESSION HOODIE/siyah/ön.png'],
  ['js/search.js', searchJs, 'assets/img/V8 OBSESSION HOODIE/siyah/modelarka.png'],
  ['js/search.js', searchJs, 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png'],
  ['js/search.js', searchJs, 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelön.png'],
  ['js/search.js', searchJs, 'APEX Predator Hoodie'],
  ['js/search.js', searchJs, 'CBR 600RR Baskılı Regular Fit Motorcu Tişörtü'],
  ['js/search.js', searchJs, 'S1000RR Baskılı Regular Fit Motorcu Tişörtü'],
  ['js/search.js', searchJs, 'assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_05_42.png'],
  ['js/search.js', searchJs, 'CAFE RACER VINTAGE T-SHIRT'],
  ['js/search.js', searchJs, 'APEX CHASER LONG SLEEVE'],
  ['js/search.js', searchJs, 'BURN RUBBER CAP'],
  ['js/search.js', searchJs, 'BUILT FOR THE OBSESSED HOODIE'],
  ['js/search.js', searchJs, 'REDLINE TRACKSUIT'],
  ['product.html', productHtml, 'pp-gallery-nav'],
  ['product.html', productHtml, 'pp-gallery-thumbs'],
  ['product.html', productHtml, 'pp-color-options'],
  ['product.html', productHtml, 'data-product-color="siyah"'],
  ['product.html', productHtml, 'data-product-color="beyaz"'],
  ['product.html', productHtml, 'data-product-color="gri"'],
  ['product.html', productHtml, 'data-product-color="krem-bej"'],
  ['product.html', productHtml, 'data-gallery-nav="prev"'],
  ['product.html', productHtml, 'data-gallery-nav="next"'],
  ['product.html', productHtml, 'pp-zoom-modal'],
  ['product.html', productHtml, 'data-info-panel="fitFinder"'],
  ['product.html', productHtml, 'pp-reviews'],
  ['product.html', productHtml, 'pp-review-summary'],
  ['product.html', productHtml, 'pp-review-list'],
  ['product.html', productHtml, 'pp-review-form'],
  ['product.html', productHtml, 'pp-questions'],
  ['product.html', productHtml, 'pp-question-list'],
  ['product.html', productHtml, 'id="pp-buy-now-btn"'],
  ['product.html', productHtml, 'ŞİMDİ AL'],
  ['js/main.js', mainJs, 'initProductGallery'],
  ['js/main.js', mainJs, 'getProductSizeStock'],
  ['js/main.js', mainJs, 'getSelectedSizeStock'],
  ['js/main.js', mainJs, 'stock > 2 ? 10 : stock'],
  ['js/main.js', mainJs, 'syncProductQtyControls'],
  ['js/main.js', mainJs, 'Math.min(10, getSelectedSizeStock())'],
  ['js/main.js', mainJs, 'initFitFinder'],
  ['js/main.js', mainJs, 'renderProductReviews'],
  ['js/main.js', mainJs, 'initReviewFilters'],
  ['js/main.js', mainJs, 'initReviewForm'],
  ['js/main.js', mainJs, 'renderProductQuestions'],
  ['js/main.js', mainJs, 'localStorage'],
  ['js/main.js', mainJs, 'Müşteri Değerlendirmeleri'],
  ['js/main.js', mainJs, 'MAGANDA Satıcısı'],
  ['js/main.js', mainJs, 'Yapay zeka özeti'],
  ['js/main.js', mainJs, 'pp-review-ai-summary'],
  ['js/main.js', mainJs, 'pp-review-vote'],
  ['js/main.js', mainJs, 'data-review-vote="like"'],
  ['js/main.js', mainJs, 'data-review-vote="dislike"'],
  ['js/main.js', mainJs, 'pp-question-search'],
  ['js/main.js', mainJs, 'buyNowBtn'],
  ['js/main.js', mainJs, 'maganda_buy_now'],
  ['js/main.js', mainJs, "window.location.href = 'checkout.html?buyNow=1'"],
  ['js/main.js', mainJs, "backLink.addEventListener('click'"],
  ['js/main.js', mainJs, 'window.history.back()'],
  ['js/checkout.js', checkoutJs, 'maganda_buy_now'],
  ['js/checkout.js', checkoutJs, "get('buyNow') === '1'"],
  ['js/checkout.js', checkoutJs, 'getCheckoutItems'],
  ['js/checkout.js', checkoutJs, 'clearBuyNowItem'],
  ['js/main.js', mainJs, 'fitFinder:'],
  ['js/main.js', mainJs, "params.get('gallery')"],
  ['js/main.js', mainJs, 'getCollectionBackHref'],
  ['js/main.js', mainJs, "params.set('from', collectionBackHref)"],
  ['js/main.js', mainJs, "params.get('from')"],
  ['js/main.js', mainJs, 'setBackgroundImage'],
  ['js/main.js', mainJs, 'url(&quot;'],
  ['js/main.js', mainJs, 'data-gallery-nav'],
  ['js/main.js', mainJs, 'data-gallery-thumb'],
  ['js/main.js', mainJs, 'pp-gallery-thumb--active'],
  ['js/main.js', mainJs, 'updateGalleryThumbs'],
  ['js/main.js', mainJs, 'V8 OBSESSION HOODIE'],
  ['js/main.js', mainJs, 'DRIFT KING OVERSIZE T-SHIRT'],
  ['js/main.js', mainJs, 'CAFE RACER VINTAGE T-SHIRT'],
  ['js/main.js', mainJs, 'APEX CHASER LONG SLEEVE'],
  ['js/main.js', mainJs, 'BURN RUBBER CAP'],
  ['js/main.js', mainJs, 'BUILT FOR THE OBSESSED HOODIE'],
  ['js/main.js', mainJs, 'REDLINE TRACKSUIT'],
  ['js/main.js', mainJs, 'var MAGANDA_PRODUCT_CATALOG = [];'],
  ['js/main.js', mainJs, 'var MAGANDA_PRODUCT_CATALOG = ['],
  ['js/main.js', mainJs, 'MAGANDA_PRODUCT_CATALOG || []'],
  ['js/main.js', mainJs, 'APEX Predator Hoodie'],
  ['js/main.js', mainJs, 'SPEED HUNTER BEANIE'],
  ['js/main.js', mainJs, 'CBR 600RR Baskılı Regular Fit Motorcu Tişörtü'],
  ['js/main.js', mainJs, 'S1000RR Baskılı Regular Fit Motorcu Tişörtü'],
  ['js/main.js', mainJs, '"colors": {'],
  ['js/main.js', mainJs, '"krem-bej": ['],
  ['js/main.js', mainJs, 'assets/img/V8 OBSESSION HOODIE/beyaz/ChatGPT Image 11 May 2026 14_03_56.png'],
  ['js/main.js', mainJs, 'assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelarka.png'],
  ['js/main.js', mainJs, 'initProductColorOptions'],
  ['js/main.js', mainJs, 'getProductColorGalleries'],
  ['js/main.js', mainJs, 'ChatGPT Image 11 May 2026 13_48_20.png'],
  ['js/main.js', mainJs, 'data-product-color'],
  ['js/main.js', mainJs, 'Bakım Bilgileri'],
  ['js/main.js', mainJs, 'getCareIconItem'],
  ['js/main.js', mainJs, 'max30derece'],
  ['js/main.js', mainJs, 'siyah.png'],
  ['js/main.js', mainJs, 'agarticikullanma'],
  ['js/main.js', mainJs, 'Model Bilgisi'],
  ['js/main.js', mainJs, 'Dış yüzey'],
  ['js/main.js', mainJs, 'Ağartıcı kullanmayın'],
  ['js/main.js', mainJs, 'Bilgilerini seç'],
  ['js/main.js', mainJs, 'Tükendi'],
  ['js/main.js', mainJs, 'pp-desc-section'],
  ['css/product.css', productCss, '.pp-gallery-nav'],
  ['css/product.css', productCss, '.pp-gallery-arrow'],
  ['css/product.css', productCss, '.pp-image-frame'],
  ['css/product.css', productCss, '.pp-gallery-thumbs'],
  ['css/product.css', productCss, '.pp-gallery-thumb'],
  ['css/product.css', productCss, '.pp-gallery-thumb--active'],
  ['css/product.css', productCss, '.pp-color-options'],
  ['css/product.css', productCss, '.pp-color-swatch'],
  ['css/product.css', productCss, '.pp-color-swatch--active'],
  ['css/product.css', productCss, '.pp-color-swatch__dot--gray'],
  ['css/product.css', productCss, '.pp-color-swatch__dot--cream'],
  ['css/product.css', productCss, 'border-color: var(--color-red)'],
  ['css/product.css', productCss, '.pp-size-stock'],
  ['css/product.css', productCss, '.pp-size-tools'],
  ['css/product.css', productCss, '.pp-fit-finder'],
  ['css/product.css', productCss, '.pp-care-icon'],
  ['css/product.css', productCss, '.pp-care-icon--dark'],
  ['css/product.css', productCss, '.pp-desc-section'],
  ['css/product.css', productCss, '.pp-reviews'],
  ['css/product.css', productCss, '.pp-review-card'],
  ['css/product.css', productCss, '.pp-review-ai-summary'],
  ['css/product.css', productCss, '.pp-rating-bar'],
  ['css/product.css', productCss, '.pp-review-vote'],
  ['css/product.css', productCss, '.pp-review-form'],
  ['css/product.css', productCss, '.pp-questions'],
  ['css/product.css', productCss, '.pp-question-card'],
  ['css/product.css', productCss, '.pp-buy-actions'],
  ['css/product.css', productCss, '.pp-buy-now-btn']
].forEach(([file, source, needle]) => assertIncludes(source, needle, file));

[
  ['product.html', productHtml, 'id="pp-model-info"'],
  ['product.html', productHtml, 'id="pp-fit-finder"'],
  ['product.html', productHtml, 'pp-zoom-trigger'],
  ['product.html', productHtml, 'data-info-panel="material"'],
  ['product.html', productHtml, 'data-info-panel="care"'],
  ['product.html', productHtml, 'pp-question-form'],
  ['js/main.js', mainJs, 'pp-review-helpful'],
  ['js/main.js', mainJs, 'Faydalı'],
  ['css/product.css', productCss, '.pp-review-helpful'],
  ['css/product.css', productCss, '.pp-zoom-trigger'],
  ['js/main.js', mainJs, 'slideProductImage'],
  ['js/main.js', mainJs, 'preloadProductImage'],
  ['js/main.js', mainJs, 'pp-img--sliding-next'],
  ['js/main.js', mainJs, 'pp-img--sliding-prev'],
  ['css/product.css', productCss, '.pp-img::after'],
  ['css/product.css', productCss, '@keyframes ppSlideInNext'],
  ['css/product.css', productCss, '@keyframes ppSlideInPrev'],
  ['js/main.js', mainJs, 'cart = [createProductCartItem()]'],
  ['js/main.js', mainJs, 'assets/products/manifesto_hoodie.png'],
  ['js/main.js', mainJs, 'assets/products/leather_jacket.png'],
  ['js/main.js', mainJs, 'images.unsplash.com'],
  ['js/main.js', mainJs, 'dis yuzey'],
  ['js/main.js', mainJs, 'Maksimum 30 derecede yika'],
  ['js/main.js', mainJs, 'Bilgilerini sec'],
  ['js/main.js', mainJs, 'Tukendi']
].forEach(([file, source, needle]) => assertNotIncludes(source, needle, file));

assertBefore(mainJs, 'syncProductBackLink();', 'initProductGallery(imgUrl, name, galleryImages)', 'js/main.js');

console.log('product detail feature hooks present');
