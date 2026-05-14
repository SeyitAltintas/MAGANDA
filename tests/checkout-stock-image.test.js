const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
const checkoutJs = fs.readFileSync(path.join(root, 'js', 'checkout.js'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

[
  'window.MagandaProductStock',
  'getProductSizeStock',
  'getProductMaxQty',
  'stock > 2 ? 10 : stock'
].forEach((needle) => assert(mainJs.includes(needle), `main.js missing shared stock API: ${needle}`));

[
  'getCheckoutItemMaxQty',
  'window.MagandaProductStock.getProductMaxQty',
  'Math.min(maxQty',
  'qtyPlusDisabled',
  'disabled',
  'background-image:url(&quot;',
  'escapeAttr(item.image)'
].forEach((needle) => assert(checkoutJs.includes(needle), `checkout.js missing checkout stock/image behavior: ${needle}`));

assert(!checkoutJs.includes('background-image:url(\' + item.image + \')'), 'checkout image URL should not be unquoted');

console.log('checkout stock limits and image URLs are wired');
