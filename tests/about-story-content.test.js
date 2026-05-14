const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const aboutHtml = fs.readFileSync(path.join(root, 'hakkimizda.html'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

[
  'assets/img/hakkimizdaresim.png',
  'MAGANDA, araba ve motosiklet kültürünün içinden çıkan yerli bir giyim markası.',
  'İlk fikir, hazır kalıpların bize uymadığını fark ettiğimizde ortaya çıktı.',
  'Bugün amacımız, günlük hayatta giyilebilir ama karakteri olan parçalar üretmek.',
  'YERLİ ÜRETİM. GERÇEK TUTKU.'
].forEach((needle) => assert(aboutHtml.includes(needle), `about story missing: ${needle}`));

[
  'sınırları reddeden küçük bir garajda başladı',
  'bir isyan ve bir yaşam tarzı',
  'egzoz sesi gibi yüksek ve tavizsiz'
].forEach((needle) => assert(!aboutHtml.includes(needle), `about story should be more realistic, remove: ${needle}`));

console.log('about story content updated');
