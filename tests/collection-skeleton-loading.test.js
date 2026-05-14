const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
const collectionCss = fs.readFileSync(path.join(root, 'css', 'collection.css'), 'utf8');
const pages = ['araba.html', 'motor.html', 'drop.html'];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertIncludes(source, needle, label) {
  assert(source.includes(needle), `${label} missing: ${needle}`);
}

function assertBefore(source, first, second, label) {
  const firstIndex = source.indexOf(first);
  const secondIndex = source.indexOf(second);
  assert(firstIndex !== -1 && secondIndex !== -1 && firstIndex < secondIndex, `${label} expected ${first} before ${second}`);
}

assertIncludes(mainJs, 'initCollectionSkeletonLoading', 'js/main.js');
assertIncludes(mainJs, 'collection__grid--loading', 'js/main.js');
assertIncludes(mainJs, 'product-card--loading', 'js/main.js');
assertIncludes(mainJs, 'data-skeleton-ready', 'js/main.js');
assertIncludes(mainJs, 'new Image()', 'js/main.js');
assertBefore(mainJs, 'initCollectionSkeletonLoading();', 'initFilters();', 'js/main.js');

[
  '.collection__grid--loading',
  '.product-card--loading',
  '.product-card--loading::after',
  '.product-card--loading .product-card__image::before',
  '@media (prefers-reduced-motion: reduce)'
].forEach((needle) => assertIncludes(collectionCss, needle, 'css/collection.css'));

pages.forEach((file) => {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assertIncludes(html, '<link rel="stylesheet" href="css/collection.css">', file);
  assertIncludes(html, '<script src="js/main.js"></script>', file);
  assertIncludes(html, 'class="collection__grid"', file);
});

console.log('collection skeleton loading hooks present');
