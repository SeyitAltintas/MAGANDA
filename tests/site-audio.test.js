const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const audioJsPath = path.join(root, 'js', 'site-audio.js');
const musicPath = path.join(root, 'assets', 'music', 'gta4song.mp3');
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

assert(fs.existsSync(musicPath), 'music file missing: assets/music/gta4song.mp3');
assert(fs.existsSync(audioJsPath), 'site audio script missing: js/site-audio.js');

const audioJs = fs.readFileSync(audioJsPath, 'utf8');
const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
const styleCss = fs.readFileSync(path.join(root, 'css', 'style.css'), 'utf8');

[
  'assets/music/gta4song.mp3',
  'new Audio',
  'const startAtSeconds = 20',
  'audio.loop = true',
  'audio.currentTime = startAtSeconds',
  'audio.play()',
  "window.addEventListener('scroll'",
  'startAudio',
  '{ once: true',
  'toggleAudio',
  'siteAudioToggle',
  'let wantsAudio = true',
  'MUSIC ON',
  'MUSIC OFF',
  'aria-pressed'
].forEach((needle) => assert(audioJs.includes(needle), `site-audio.js missing: ${needle}`));

[
  'footer__audio-btn',
  'id="siteAudioToggle"',
  'MUSIC ON'
].forEach((needle) => assert(mainJs.includes(needle), `main.js missing audio control hook: ${needle}`));

assert(!mainJs.includes('navbar__audio-btn'), 'main.js should not render the audio control in the navbar');

[
  '.footer__audio-btn',
  '.footer__audio-btn.is-playing',
  '.footer__audio-label',
  'width: fit-content',
  'height: 18px',
  'font-size: 9px'
].forEach((needle) => assert(styleCss.includes(needle), `style.css missing audio control style: ${needle}`));

assert(!styleCss.includes('.navbar__audio-btn'), 'style.css should not keep navbar audio button styles');

htmlFiles.forEach((file) => {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assert(html.includes('<script src="js/site-audio.js"></script>'), `${file} missing site audio script`);
});

console.log('site audio hooks present');
