const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
const styleCss = fs.readFileSync(path.join(root, 'css', 'style.css'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

[
  '<span class="navbar__logo-text"><span class="navbar__logo-initial">N</span>MAGANDA</span>',
  '<span class="footer-brand-band__text">NMAGANDA</span>',
  '<span class="footer__logo">NMAGANDA</span>',
  '© 2026 NMAGANDA. Tüm hakları saklıdır.'
].forEach((needle) => assert(mainJs.includes(needle), `visible brand text missing: ${needle}`));

[
  'brand-logo',
  'brand-logo__n',
  'brand-logo__name',
  'brand-logo-n',
  'paint-order: stroke fill',
  '-webkit-text-stroke: 0.055em currentColor'
].forEach((needle) => {
  assert(!styleCss.includes(needle), `brand logo CSS should be plain text, remove: ${needle}`);
  assert(!mainJs.includes(needle), `brand logo markup should be plain text, remove: ${needle}`);
});

console.log('brand rename visible text is plain NMAGANDA');
