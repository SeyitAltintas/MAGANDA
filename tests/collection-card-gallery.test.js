const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
const collectionCss = fs.readFileSync(path.join(root, 'css', 'collection.css'), 'utf8');

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`${label} missing: ${needle}`);
  }
}

[
  ['js/main.js', mainJs, 'initCollectionCardGalleries'],
  ['js/main.js', mainJs, 'buildCardGallery'],
  ['js/main.js', mainJs, 'data-card-gallery-dir'],
  ['js/main.js', mainJs, 'data-card-gallery-thumb'],
  ['js/main.js', mainJs, 'product-card-gallery__thumb--active'],
  ['js/main.js', mainJs, 'data-stop-card'],
  ['js/main.js', mainJs, "card.setAttribute('data-gallery'"],
  ['js/main.js', mainJs, 'initCollectionCardGalleries();'],
  ['css/collection.css', collectionCss, '.product-card-gallery-nav'],
  ['css/collection.css', collectionCss, '.product-card-gallery__arrow'],
  ['css/collection.css', collectionCss, '.product-card-gallery'],
  ['css/collection.css', collectionCss, '.product-card-gallery__thumb'],
  ['css/collection.css', collectionCss, '.product-card-gallery__thumb--active'],
  ['css/collection.css', collectionCss, 'border-color: var(--color-red)']
].forEach(([file, source, needle]) => assertIncludes(source, needle, file));

console.log('collection card gallery hooks present');
