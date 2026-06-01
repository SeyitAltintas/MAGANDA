# NMAGANDA — Built For The Obsessed

> Türk yerli petrolhead giyim markası. Hız, özgürlük, aidiyet. Sadece tutkunlar anlar.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🏎️ Proje Hakkında

**NMAGANDA**, araba ve motosiklet tutkunlarına yönelik tasarlanmış, sınırlı sayıda üretilen (drop) giyim ürünlerini sunan bir e-ticaret platformudur. Proje, herhangi bir JavaScript framework'ü veya backend altyapısı kullanılmadan tamamen **Vanilla HTML, CSS ve JavaScript** ile geliştirilmiştir.

Tüm durum yönetimi tarayıcının `localStorage` API'si üzerinden sağlanmaktadır; bu sayede sıfır sunucu maliyetiyle tam işlevsel bir alışveriş deneyimi sunulmaktadır.

---

## ✨ Özellikler

| Özellik | Açıklama |
|---|---|
| 🎬 **Cinematic Hero** | Hover ile tetiklenen araba/motosiklet video geçişleri |
| 🎞️ **Scroll Sequence** | Canvas tabanlı frame-by-frame animasyon sekansı |
| 🛒 **Cart Drawer** | Animasyonlu, sürüklemesiz sepet çekmecesi |
| 💳 **Checkout Akışı** | Adres, kargo seçimi ve banka kartı doğrulama |
| 🔍 **Fuzzy Search** | Gerçek zamanlı arama (klavye kısayolu: `/`) |
| 🌙 **Dark / Light Mode** | CSS değişkenleri tabanlı tema geçişi |
| ❤️ **Favoriler** | localStorage ile senkronize istek listesi |
| 📦 **Skeleton Loader** | Ürün, koleksiyon ve sepet için yükleme iskeletleri |
| 👤 **Kullanıcı Paneli** | Mock auth, adres & kart yönetimi, sipariş takibi |
| 📱 **Responsive** | Mobil uyumlu tasarım |

---

## 📁 Proje Yapısı

```text
NMAGANDA/
├── index.html           # Ana sayfa (Cinematic Hero, Drop Ürünler)
├── araba.html           # Araba koleksiyonu
├── motor.html           # Motosiklet koleksiyonu
├── drop.html            # Drop koleksiyonu & erken erişim
├── product.html         # Ürün detay (URL parametrelerinden dinamik)
├── checkout.html        # Ödeme akışı
├── hesabim.html         # Kullanıcı paneli
├── favoriler.html       # İstek listesi
├── login.html           # Giriş yap
├── register.html        # Kayıt ol
├── hakkimizda.html      # Hakkımızda
├── iletisim.html        # İletişim
│
├── css/
│   ├── style.css        # Global stiller, CSS değişkenleri, tema
│   ├── checkout.css     # Ödeme sayfası
│   ├── auth.css         # Giriş / Kayıt
│   ├── collection.css   # Koleksiyon sayfaları
│   └── product.css      # Ürün detay sayfası
│
├── js/
│   ├── main.js          # Global çekirdek: tema, sepet, animasyonlar
│   ├── checkout.js      # Form doğrulama, sepet özeti, kart akışı
│   ├── auth.js          # Mock kimlik doğrulama simülasyonu
│   ├── collection.js    # Koleksiyon filtreleme & sıralama
│   ├── drop.js          # Geri sayım & erken erişim formu
│   ├── search.js        # Fuzzy search motoru & live dropdown
│   ├── skeleton.js      # Skeleton loader modülü
│   └── scroll-sequence.js # Canvas scroll animasyon sekansı
│
└── assets/
    ├── img/             # Genel görseller
    ├── products/        # Ürün görselleri
    ├── video/           # Hero video dosyaları
    ├── Gif/             # GIF animasyonlar
    ├── fonts/           # Lokal font dosyaları
    └── odemeyontemleri/ # Ödeme yöntemi ikonları
```

---

## 🧠 Mimari Kararlar

### State Management
Aktif bir veritabanı olmadığından tüm durum bilgisi `localStorage`'da tutulur:

| Key | Tip | Açıklama |
|---|---|---|
| `maganda_theme` | `string` | `'light'` veya `'dark'` |
| `maganda_cart` | `Array` | Sepet ürünleri |
| `maganda_favorites` | `Array` | Favori ürünler |
| `maganda_user` | `Object` | Oturum bilgisi (mock) |
| `maganda_addresses` | `Array` | Kayıtlı teslimat adresleri |
| `maganda_cards` | `Array` | Kayıtlı banka/kredi kartları |

### Ürün Yönlendirme
Statik bir ürün veritabanı olmadığından ürün detay sayfasına yönlendirme **URL Query Parametreleri** üzerinden sağlanır:

```
product.html?name=ARABA+TSHIRT&price=850&img=assets/products/tshirt1.jpg
```

### Tema Sistemi
Tema renkleri `css/style.css` içindeki CSS Custom Properties ile yönetilir:
- **Dark Mode** → `:root` değişkenleri (varsayılan)
- **Light Mode** → `[data-theme="light"]` bloğu

---

## 🚀 Başlangıç

Bu proje saf HTML/CSS/JS tabanlı olduğundan herhangi bir kurulum veya derleme adımı gerektirmez.

### Gereksinimler
- Modern bir web tarayıcısı (Chrome, Firefox, Edge, Safari)
- VS Code + [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) eklentisi *(önerilen)*

### Çalıştırma

```bash
# 1. Repoyu klonla
git clone https://github.com/SeyitAltintas/NMAGANDA.git
cd NMAGANDA

# 2. Live Server ile aç (VS Code)
#    index.html dosyasına sağ tıkla → "Open with Live Server"
```

> **Not:** Dosyaları doğrudan `file://` protokolüyle açmak yerine bir yerel sunucu üzerinden açmanız (Live Server gibi) önerilir; aksi hâlde bazı varlık yükleme sorunları yaşanabilir.

---

## 🔧 Geliştirici Notları

### 🎥 Video Varlıkları (Assets) Hakkında
Projedeki yüksek çözünürlüklü Hero videoları (örn. `car-side.mp4`), GitHub'ın 100MB dosya boyutu limitini aştığı için bu repoya **dahil edilmemiştir**. Projeyi lokalinizde çalıştırdığınızda:
- Videoların olmaması sistemi **bozmaz**. Yerleşik CSS arka plan (fallback) renkleri otomatik olarak devreye girer.
- Kendi videolarınızı test etmek isterseniz; `assets/video/` dizinine `car-side.mp4` ve `moto-side.mp4` adında videolar kopyalayarak cinematic hero bölümünü aktifleştirebilirsiniz.

### Yeni Ürün Eklerken
1. `js/search.js` içindeki `CATALOG` dizisini güncelle.
2. Ürün görselini `assets/products/` dizinine ekle.
3. İlgili koleksiyon HTML dosyasına (`araba.html`, `motor.html`, `drop.html`) kart bloğu ekle.

### Yeni Sayfa Eklerken
Her yeni sayfada global bağımlılıkları eklemeyi unutma:
```html
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>
```

### Arama Motoru Puanlama Mantığı
```
Tam eşleşme        → 100 puan
Başlangıç eşleşme  →  90 puan
İçerik eşleşmesi   →  70 puan
Kelime eşleşmesi   → 30–60 puan
```

Klavye kısayolu: **`/`** tuşu ile arama çubuğunu aç.

---

## 🗺️ Sayfa Bağımlılıkları

```
Tüm Sayfalar ──────── css/style.css
                └──── js/main.js

checkout.html ─────── css/checkout.css
                └──── js/checkout.js

login.html / register.html
              ─────── css/auth.css
                └──── js/auth.js

araba.html / motor.html
              ─────── css/collection.css
                └──── js/collection.js

drop.html ─────────── css/collection.css
                └──── js/drop.js

product.html ──────── css/product.css

index.html ────────── js/scroll-sequence.js
```

> ⚠️ Navbar, Footer veya Cart Drawer değişikliklerini **tüm** `.html` dosyalarına uygulamayı unutma.

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---

<div align="center">
  <strong>NMAGANDA — Sadece Tutkunlar Anlar.</strong>
</div>
