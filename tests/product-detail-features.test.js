const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const productHtml = fs.readFileSync(path.join(root, 'product.html'), 'utf8');
const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
const productCss = fs.readFileSync(path.join(root, 'css', 'product.css'), 'utf8');

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

[
  ['product.html', productHtml, 'pp-gallery-thumbs'],
  ['product.html', productHtml, 'pp-zoom-modal'],
  ['product.html', productHtml, 'data-info-panel="fitFinder"'],
  ['js/main.js', mainJs, 'initProductGallery'],
  ['js/main.js', mainJs, 'getProductSizeStock'],
  ['js/main.js', mainJs, 'initFitFinder'],
  ['js/main.js', mainJs, 'fitFinder:'],
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
  ['css/product.css', productCss, '.pp-gallery-thumb'],
  ['css/product.css', productCss, '.pp-size-stock'],
  ['css/product.css', productCss, '.pp-size-tools'],
  ['css/product.css', productCss, '.pp-fit-finder'],
  ['css/product.css', productCss, '.pp-care-icon'],
  ['css/product.css', productCss, '.pp-care-icon--dark'],
  ['css/product.css', productCss, '.pp-desc-section']
].forEach(([file, source, needle]) => assertIncludes(source, needle, file));

[
  ['product.html', productHtml, 'id="pp-model-info"'],
  ['product.html', productHtml, 'id="pp-fit-finder"'],
  ['product.html', productHtml, 'data-info-panel="material"'],
  ['product.html', productHtml, 'data-info-panel="care"'],
  ['js/main.js', mainJs, 'dis yuzey'],
  ['js/main.js', mainJs, 'Maksimum 30 derecede yika'],
  ['js/main.js', mainJs, 'Bilgilerini sec'],
  ['js/main.js', mainJs, 'Tukendi']
].forEach(([file, source, needle]) => assertNotIncludes(source, needle, file));

console.log('product detail feature hooks present');
