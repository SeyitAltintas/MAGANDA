const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFiles = [
  'araba.html',
  'checkout.html',
  'drop.html',
  'favoriler.html',
  'hakkimizda.html',
  'hesabim.html',
  'iletisim.html',
  'index.html',
  'login.html',
  'motor.html',
  'product.html',
  'register.html'
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const wheelJsPath = path.join(root, 'js', 'discount-wheel.js');
const wheelCssPath = path.join(root, 'css', 'discount-wheel.css');

assert(fs.existsSync(wheelJsPath), 'discount wheel script missing: js/discount-wheel.js');
assert(fs.existsSync(wheelCssPath), 'discount wheel stylesheet missing: css/discount-wheel.css');

const wheelJs = fs.readFileSync(wheelJsPath, 'utf8');
const wheelCss = fs.readFileSync(wheelCssPath, 'utf8');
const checkoutHtml = fs.readFileSync(path.join(root, 'checkout.html'), 'utf8');
const checkoutJs = fs.readFileSync(path.join(root, 'js', 'checkout.js'), 'utf8');

[
  'maganda_discount_wheel_prize',
  'maganda_discount_wheel_date',
  'renderWheelLauncher',
  'renderCheckoutReminder',
  'discount-wheel__launcher',
  'discount-wheel__launcher-wheel',
  'discount-wheel__launcher-arrow',
  'discount-wheel__modal',
  'Kodu kopyala',
  'navigator.clipboard.writeText',
  'NMAGANDA5',
  'NMAGANDA10',
  'REDLINE15',
  'DROP20',
  'KARGOBIZDEN',
  'STICKER'
].forEach((needle) => assert(wheelJs.includes(needle), `discount-wheel.js missing: ${needle}`));

assert(!wheelJs.includes('if (isCheckoutPage() || document.getElementById(\'discountWheelLauncher\')) return;'), 'launcher should not be hidden on checkout');
assert(!wheelJs.includes('function isCheckoutPage'), 'checkout-only launcher guard should be removed');

[
  '.discount-wheel__launcher',
  '.discount-wheel__modal',
  '.discount-wheel__disc',
  '.discount-wheel__result',
  '@media (max-width: 640px)',
  'conic-gradient',
  '#e10600',
  'left: 0',
  'top: 50%',
  'translateY(-50%)',
  'border-radius: 0 999px 999px 0',
  'width: 29px',
  'height: 58px',
  '.discount-wheel__launcher-wheel',
  '.discount-wheel__launcher-arrow',
  'border-left: 4px solid #fff'
].forEach((needle) => assert(wheelCss.includes(needle), `discount-wheel.css missing: ${needle}`));

assert(!wheelJs.includes('discount-wheel__launcher-text'), 'launcher should not include text');

assert(checkoutHtml.includes('id="discountWheelCheckoutReminder"'), 'checkout reminder mount missing');
assert(checkoutHtml.includes('id="checkoutCouponCode"'), 'checkout coupon input missing');
assert(checkoutHtml.includes('class="co-coupon-box"'), 'checkout coupon UI container missing');
assert(checkoutHtml.includes('Kupon kodu'), 'checkout coupon label missing');
assert(checkoutHtml.includes('type="button"'), 'checkout coupon button should be UI-only');
assert(checkoutJs.includes('discountWheelCheckoutReminder'), 'checkout.js should keep the reminder near summary rendering');

htmlFiles.forEach((file) => {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assert(html.includes('<link rel="stylesheet" href="css/discount-wheel.css">'), `${file} missing discount wheel CSS`);
  assert(html.includes('<script src="js/discount-wheel.js"></script>'), `${file} missing discount wheel script`);
});

console.log('discount wheel hooks present');
