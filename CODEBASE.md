# MAGANDA - Codebase Overview

## Proje Mimarisi
Bu proje, modern framework'ler (React, Vue vb.) kullanılmadan geliştirilmiş Vanilla HTML, CSS ve JavaScript tabanlı bir e-ticaret (MPA - Multi Page Application) uygulamasıdır. Veri yönetimi (sepet, tema, favoriler) tamamen tarayıcının `localStorage` API'si üzerinden sağlanmaktadır.

## Dizin Yapısı
```text
MAGANDA/
├── index.html           # Ana sayfa (Cinematic Hero, Featured Products)
├── araba.html           # Araba koleksiyonu
├── motor.html           # Motor koleksiyonu
├── drop.html            # Drop koleksiyonu ve erken erişim formu
├── product.html         # Ürün detay sayfası (Veriyi URL'den dinamik okur)
├── checkout.html        # Ödeme, kargo ve sipariş tamamlanma süreci
├── hesabim.html         # Kullanıcı paneli
├── login.html           # Giriş yap
├── register.html        # Kayıt ol
├── favoriler.html       # İstek listesi ve favori ürünler
├── hakkimizda.html      # Kurumsal bilgiler
├── iletisim.html        # İletişim formu
├── css/                 # Stil Dosyaları
│   ├── style.css        # Temel/Global stiller (Reset, Header, Footer, Grid vb.)
│   ├── checkout.css     # Ödeme sayfası özel stilleri
│   ├── auth.css         # Giriş/Kayıt sayfaları stilleri
│   ├── collection.css   # Koleksiyon sayfası stilleri
│   └── product.css      # Ürün detay sayfası stilleri
├── js/                  # JavaScript Dosyaları
│   ├── main.js          # Global mantık, tema, sepet işlemleri ve animasyonlar
│   ├── checkout.js      # Ödeme form doğrulama, sepet özeti ve banka kartı akışı
│   ├── auth.js          # Kimlik doğrulama simülasyonu
│   ├── collection.js    # Koleksiyon sayfasına özel filtreleme/sıralama
│   ├── drop.js          # Drop sayfası sayaç ve form etkileşimleri
│   ├── search.js        # Gelişmiş arama modülü (fuzzy search, live dropdown, klavye nav)
│   └── skeleton.js      # Skeleton loader modülü (product page, koleksiyon, sepet)
└── assets/              # Medya, görsel ve videolar
```

## Dosya Bağımlılıkları (File Dependencies)

Her HTML sayfası, global stilleri ve scriptleri temel alıp ihtiyacına göre ek alt dosyalar çağırır. Sayfalarda kod değişikliği yaparken bağımlılık sırasına dikkat edilmelidir.

- **Global Bağımlılıklar (Tüm sayfalarda ortaktır):**
  - `<link rel="stylesheet" href="css/style.css">`
  - `<script src="js/main.js"></script>`

- **Özel Sayfa Bağımlılıkları:**
  - `checkout.html` ➔ `css/checkout.css` & `js/checkout.js`
  - `login.html` & `register.html` ➔ `css/auth.css` & `js/auth.js`
  - `araba.html` & `motor.html` ➔ `css/collection.css` & `js/collection.js`
  - `drop.html` ➔ `css/collection.css` & `js/drop.js`
  - `product.html` ➔ `css/product.css`

> **⚠️ Önemli Kural:** Ortak yapıların (Navbar, Footer, Cart Drawer vb.) değiştirilmesi durumunda ilgili HTML bloklarının *tüm* `.html` dosyalarında güncellenmesi gerekir.

## Durum Yönetimi (State Management)
Sistem aktif bir veritabanı kullanmadığından durumlar tarayıcıda tutulmaktadır. 

| `localStorage` Key | Tip | Açıklama |
|--------------------|-----|----------|
| `maganda_theme` | String | Tema tercihi (`'light'` veya `'dark'`) |
| `maganda_cart` | Array | Sepetteki ürünlerin tutulduğu JSON objesi |
| `maganda_favorites` | Array | Favorilere eklenen ürünler |
| `maganda_user` | Object | Oturum açmış kullanıcının mock verileri |
| `maganda_addresses` | Array | Kullanıcının kayıtlı teslimat adresleri |
| `maganda_cards` | Array | Kullanıcının kayıtlı banka/kredi kartları |

## Geliştirme ve Mimari Yönergeleri

### 1. Tema Yönetimi (Dark/Light Mode)
Tema renkleri, `css/style.css` içerisinde CSS Değişkenleri (Custom Properties) olarak kurgulanmıştır.
- Varsayılan (Dark) renkler `:root` sözdiziminde tanımlıdır.
- Light Mode renkleri `[data-theme="light"]` pseudo-selector'ü içindedir.
Renk değişikliği yapılacaksa bu iki yapı içerisindeki değişkenler üzerinden gidilmelidir.

### 2. Ürün Yönlendirme Mantığı
Ürün veritabanı bulunmadığı için ürün detayına gidiş URL Query Parametreleri (GET method) üzerinden gerçekleşmektedir.
Örnek Yönlendirme:
`product.html?name=ARABA+TSHIRT&price=850&img=assets/tshirt1.jpg`
`product.html` yüklendiğinde, `js/main.js` bu parametreleri yakalar ve DOM elementlerine (Görsel, Başlık, Fiyat) anında yansıtır.

### 3. Kod Kalitesi Kuralları
- **Performans:** Scroll ve hover tetikleyicilerinde animasyonlar için `IntersectionObserver` yapısı kullanılmalıdır. Klasik scroll event listener kullanıldığında `passive: true` belirtilmeli ve `requestAnimationFrame` optimizasyonu yapılmalıdır.
- **Temiz Kod (Clean Code):** Gereksiz `console.log` bırakılmamalı, fonksiyon isimlendirmeleri (örn. `addToCart`, `updateCartUI`) işlevini net yansıtmalıdır.

### 4. Yeni Modüllerin Entegrasyon Kuralları
- **`search.js`**: `initHeaderWidget()` tarafından dinamik olarak yüklenir. `window.initSearch()` fonksiyonunu export eder. Navbar'a otomatik arama butonu ekler. Kısayol: `/` tuşu.
- **`skeleton.js`**: Yine `initHeaderWidget()` tarafından yüklenir. Global `window.showProductSkeleton()`, `window.hideProductSkeleton()`, `window.showCollectionSkeleton()` fonksiyonlarını export eder.
- **Sipariş Takibi**: `main.js` içindeki `initOrderTracking()` fonksiyonu `hesabim.html`'deki `#orderList` elementini `MutationObserver` ile izler ve her sipariş kartına otomatik takip görseli ekler.

### 5. Arama Kataloğu
`js/search.js` içindeki `CATALOG` dizisi tüm ürünleri statik olarak barındırır. Yeni ürün eklendiğinde bu dizi de güncellenmelidir. Fuzzy arama skoru mantığı:
- Tam eşleşme: 100 puan
- Başlangıç eşleşmesi: 90 puan
- İçerik eşleşmesi: 70 puan
- Kelime bazlı kısmi eşleşme: 30–60 puan

## Çalıştırma (Local Development)
Herhangi bir build/compile adımına (Node.js/NPM) ihtiyaç yoktur.
Projeyi geliştirmek veya önizlemek için ana dizindeki `index.html`'i bir Live Server aracı (VS Code Live Server eklentisi gibi) ile çalıştırmanız yeterlidir.
