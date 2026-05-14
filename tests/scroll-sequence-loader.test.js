const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sequenceJs = fs.readFileSync(path.join(root, 'js', 'scroll-sequence.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(root, 'css', 'style.css'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(!sequenceJs.includes('seq-loader'), 'scroll sequence should not render loader UI');
assert(!sequenceJs.includes('seqBar'), 'scroll sequence should not update a loader progress bar');
assert(!sequenceJs.includes('buildLoader'), 'scroll sequence should not build a loader');
assert(!sequenceJs.includes('updateLoader'), 'scroll sequence should not update a loader');
assert(!sequenceJs.includes('hideLoader'), 'scroll sequence should not hide a loader');
assert(!sequenceJs.includes('seq-loader__label'), 'scroll sequence loader should not render a loading label');
assert(!sequenceJs.includes('seqLabel'), 'scroll sequence loader should not update a loading label');
assert(!sequenceJs.includes('kare y'), 'scroll sequence loader should not show frame loading copy');
assert(!sequenceJs.includes('sahne'), 'scroll sequence loader should not show scene progress copy');
assert(!indexHtml.includes('<body class="no-scroll">'), 'index page should not lock scrolling for a sequence loader');
assert(!styleCss.includes('.seq-loader'), 'style.css should not keep sequence loader styles');

console.log('scroll sequence loader removed');
