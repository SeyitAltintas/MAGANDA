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
  '<span class="brand-logo__n">N</span><span class="brand-logo__name">MAGANDA</span>',
  'aria-label="NMAGANDA"',
  '© 2026 NMAGANDA. Tüm hakları saklıdır.'
].forEach((needle) => assert(mainJs.includes(needle), `visible brand text missing: ${needle}`));

[
  '.brand-logo__n',
  'html[data-theme="light"] body .navbar.navbar--scrolled .brand-logo__n',
  'html body .navbar:not(.navbar--scrolled) .brand-logo__n'
].forEach((needle) => assert(styleCss.includes(needle), `brand logo color rule missing: ${needle}`));

console.log('brand rename visible text and logo color treatment verified');
