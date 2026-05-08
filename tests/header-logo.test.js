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

assert(mainJs.includes('navbar__logo-text">MAGANDA'), 'header logo text missing');
assert(!mainJs.includes('navbar__logo-divider'), 'header logo red divider should be removed');
assert(!mainJs.includes('navbar__logo-est'), 'header KUR. 2026 text should be removed');
assert(!mainJs.includes('KUR. 2026'), 'header KUR. 2026 label should be removed');
assert(!styleCss.includes('.navbar__logo-divider'), 'unused logo divider styles should be removed');
assert(!styleCss.includes('.navbar__logo-est'), 'unused logo establishment styles should be removed');

console.log('header logo is simplified');
