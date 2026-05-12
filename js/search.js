/* ═══════════════════════════════════════════
   MAGANDA — search.js
   Gelişmiş Arama: live dropdown, fuzzy eşleşme, klavye navigasyonu
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── ÜRÜN KATALOĞu (static, tüm koleksiyonlar) ─── */
  var CATALOG = [
    {
        "name": "V8 OBSESSION HOODIE",
        "price": 1799,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/V8 OBSESSION HOODIE/siyah/ön.png",
        "badge": "YENİ DROP",
        "gallery": "assets/img/V8 OBSESSION HOODIE/siyah/ön.png|assets/img/V8 OBSESSION HOODIE/siyah/arka.png|assets/img/V8 OBSESSION HOODIE/siyah/arkaveön.png|assets/img/V8 OBSESSION HOODIE/siyah/doku.png|assets/img/V8 OBSESSION HOODIE/siyah/model.png|assets/img/V8 OBSESSION HOODIE/siyah/modelarka.png"
    },
    {
        "name": "DRIFT KING OVERSIZE T-SHIRT",
        "price": 699,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png",
        "badge": "ÇOK SATAN",
        "gallery": "assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/arka.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/arkaveön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/kumasdetay.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelarka.png"
    },
    {
        "name": "MIDNIGHT RUN SWEATPANTS",
        "price": 1899,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/MIDNIGHT RUN SWEATPANTS/siyah/ChatGPT Image 11 May 2026 16_39_41.png",
        "badge": "",
        "gallery": "assets/img/MIDNIGHT RUN SWEATPANTS/siyah/ChatGPT Image 11 May 2026 16_39_41.png|assets/img/MIDNIGHT RUN SWEATPANTS/siyah/ChatGPT Image 11 May 2026 16_40_41.png|assets/img/MIDNIGHT RUN SWEATPANTS/siyah/ChatGPT Image 11 May 2026 16_42_36.png|assets/img/MIDNIGHT RUN SWEATPANTS/siyah/ChatGPT Image 11 May 2026 16_44_36.png|assets/img/MIDNIGHT RUN SWEATPANTS/siyah/ChatGPT Image 11 May 2026 16_45_48.png|assets/img/MIDNIGHT RUN SWEATPANTS/siyah/ChatGPT Image 11 May 2026 16_48_27.png"
    },
    {
        "name": "GEARHEAD JOGGERS",
        "price": 1299,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/GEARHEAD JOGGERS/siyah/ChatGPT Image 11 May 2026 16_48_00.png",
        "badge": "SINIRLI",
        "gallery": "assets/img/GEARHEAD JOGGERS/siyah/ChatGPT Image 11 May 2026 16_48_00.png|assets/img/GEARHEAD JOGGERS/siyah/ChatGPT Image 11 May 2026 16_49_46.png|assets/img/GEARHEAD JOGGERS/siyah/ChatGPT Image 11 May 2026 16_51_22.png|assets/img/GEARHEAD JOGGERS/siyah/ChatGPT Image 11 May 2026 17_09_27.png|assets/img/GEARHEAD JOGGERS/siyah/ChatGPT Image 11 May 2026 17_19_13.png|assets/img/GEARHEAD JOGGERS/siyah/ChatGPT Image 11 May 2026 23_12_28.png"
    },
    {
        "name": "TOKYO NIGHTS LONG SLEEVE",
        "price": 899,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/TOKYO NIGHTS LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 10_19_02.png",
        "badge": "",
        "gallery": "assets/img/TOKYO NIGHTS LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 10_19_02.png|assets/img/TOKYO NIGHTS LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 10_20_20.png|assets/img/TOKYO NIGHTS LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 10_21_31.png|assets/img/TOKYO NIGHTS LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 10_24_36.png|assets/img/TOKYO NIGHTS LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 10_27_26.png|assets/img/TOKYO NIGHTS LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 10_31_24.png"
    },
    {
        "name": "TRACK DAY CARBON CAP",
        "price": 499,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/TRACK DAY CARBON CAP/siyah/ChatGPT Image 12 May 2026 10_24_09.png",
        "badge": "",
        "gallery": "assets/img/TRACK DAY CARBON CAP/siyah/ChatGPT Image 12 May 2026 10_24_09.png|assets/img/TRACK DAY CARBON CAP/siyah/ChatGPT Image 12 May 2026 10_25_22.png|assets/img/TRACK DAY CARBON CAP/siyah/ChatGPT Image 12 May 2026 10_26_35.png|assets/img/TRACK DAY CARBON CAP/siyah/ChatGPT Image 12 May 2026 10_29_27.png|assets/img/TRACK DAY CARBON CAP/siyah/ChatGPT Image 12 May 2026 10_35_06.png"
    },
    {
        "name": "APEX Predator Hoodie",
        "price": 1699,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_27_01.png",
        "badge": "YENİ",
        "gallery": "assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_27_01.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_29_39.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_31_06.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_33_43.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_40_40.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_49_04.png"
    },
    {
        "name": "SPEED HUNTER BEANIE",
        "price": 399,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_05_42.png",
        "badge": "",
        "gallery": "assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_05_42.png|assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_06_40.png|assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_07_56.png"
    },
    {
        "name": "Altın Elbiseli Adam 3 İplik Oversize Hoodie",
        "price": 1799,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/Altın Elbiseli Adam 3 İplik Oversize Hoodie/siyah/ChatGPT Image 12 May 2026 12_27_27.png",
        "badge": "YENİ",
        "gallery": "assets/img/Altın Elbiseli Adam 3 İplik Oversize Hoodie/siyah/ChatGPT Image 12 May 2026 12_27_27.png|assets/img/Altın Elbiseli Adam 3 İplik Oversize Hoodie/siyah/ChatGPT Image 12 May 2026 12_29_42.png"
    },
    {
        "name": "CBR 600RR Baskılı Regular Fit Motorcu Tişörtü",
        "price": 749,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_56_21.png",
        "badge": "ÇOK SATAN",
        "gallery": "assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_56_21.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_00_24.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_01_49.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_03_15.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_05_55.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_07_32.png"
    },
    {
        "name": "MT-07 Baskılı Regular Fit Motorcu Tişörtü",
        "price": 699,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/MT-07 Baskılı Regular Fit Motorcu Tişörtü/siyah/ön.png",
        "badge": "",
        "gallery": "assets/img/MT-07 Baskılı Regular Fit Motorcu Tişörtü/siyah/ön.png|assets/img/MT-07 Baskılı Regular Fit Motorcu Tişörtü/siyah/kumasdetay.png|assets/img/MT-07 Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_07_41.png|assets/img/MT-07 Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_40_34.png|assets/img/MT-07 Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_43_06.png"
    },
    {
        "name": "RIDE OR DIE TRACK PANTS",
        "price": 1899,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/RIDE OR DIE TRACK PANTS/siyah/ChatGPT Image 12 May 2026 12_18_54.png",
        "badge": "SINIRLI",
        "gallery": "assets/img/RIDE OR DIE TRACK PANTS/siyah/ChatGPT Image 12 May 2026 12_18_54.png|assets/img/RIDE OR DIE TRACK PANTS/siyah/ChatGPT Image 12 May 2026 12_19_50.png|assets/img/RIDE OR DIE TRACK PANTS/siyah/ChatGPT Image 12 May 2026 12_22_33.png"
    },
    {
        "name": "S1000RR Baskılı Regular Fit Motorcu Tişörtü",
        "price": 749,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_39_20.png",
        "badge": "",
        "gallery": "assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_39_20.png|assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_44_30.png|assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_46_30.png|assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_48_06.png|assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_49_45.png"
    },
    {
        "name": "The Evolution Motorcu Tişört",
        "price": 699,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/The Evolution Motorcu Tişört/siyah/ChatGPT Image 12 May 2026 12_13_18.png",
        "badge": "",
        "gallery": "assets/img/The Evolution Motorcu Tişört/siyah/ChatGPT Image 12 May 2026 12_13_18.png|assets/img/The Evolution Motorcu Tişört/siyah/ChatGPT Image 12 May 2026 12_14_43.png|assets/img/The Evolution Motorcu Tişört/siyah/ChatGPT Image 12 May 2026 12_20_39.png|assets/img/The Evolution Motorcu Tişört/siyah/ChatGPT Image 12 May 2026 12_24_16.png"
    },
    {
        "name": "DROP #01: V8 OBSESSION HOODIE",
        "price": 1999,
        "category": "Drop",
        "page": "drop.html",
        "img": "assets/img/V8 OBSESSION HOODIE/siyah/ön.png",
        "badge": "SON 5 ADET",
        "gallery": "assets/img/V8 OBSESSION HOODIE/siyah/ön.png|assets/img/V8 OBSESSION HOODIE/siyah/arka.png|assets/img/V8 OBSESSION HOODIE/siyah/arkaveön.png|assets/img/V8 OBSESSION HOODIE/siyah/doku.png|assets/img/V8 OBSESSION HOODIE/siyah/model.png|assets/img/V8 OBSESSION HOODIE/siyah/modelarka.png"
    },
    {
        "name": "DROP #02: APEX PREDATOR HOODIE",
        "price": 1899,
        "category": "Drop",
        "page": "drop.html",
        "img": "assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_27_01.png",
        "badge": "SINIRLI",
        "gallery": "assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_27_01.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_29_39.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_31_06.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_33_43.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_40_40.png|assets/img/APEX Predator Hoodie/siyah/ChatGPT Image 12 May 2026 10_49_04.png"
    },
    {
        "name": "DROP #03: DRIFT KING T-SHIRT",
        "price": 899,
        "category": "Drop",
        "page": "drop.html",
        "img": "assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png",
        "badge": "ÇOK SATAN",
        "gallery": "assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/ön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/arka.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/arkaveön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/kumasdetay.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelön.png|assets/img/DRIFT KING OVERSİZE T-SHIRT/siyah/modelarka.png"
    },
    {
        "name": "DROP #04: CBR 600RR MOTORCU TİŞÖRTÜ",
        "price": 899,
        "category": "Drop",
        "page": "drop.html",
        "img": "assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_56_21.png",
        "badge": "SON 2 ADET",
        "gallery": "assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_56_21.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_00_24.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_01_49.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_03_15.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_05_55.png|assets/img/CBR 600RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 12_07_32.png"
    },
    {
        "name": "DROP #05: S1000RR MOTORCU TİŞÖRTÜ",
        "price": 899,
        "category": "Drop",
        "page": "drop.html",
        "img": "assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_39_20.png",
        "badge": "SINIRLI",
        "gallery": "assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_39_20.png|assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_44_30.png|assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_46_30.png|assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_48_06.png|assets/img/S1000RR Baskılı Regular Fit Motorcu Tişörtü/siyah/ChatGPT Image 12 May 2026 11_49_45.png"
    },
    {
        "name": "DROP #06: RIDE OR DIE TRACK PANTS",
        "price": 1999,
        "category": "Drop",
        "page": "drop.html",
        "img": "assets/img/RIDE OR DIE TRACK PANTS/siyah/ChatGPT Image 12 May 2026 12_18_54.png",
        "badge": "SON 1 ADET",
        "gallery": "assets/img/RIDE OR DIE TRACK PANTS/siyah/ChatGPT Image 12 May 2026 12_18_54.png|assets/img/RIDE OR DIE TRACK PANTS/siyah/ChatGPT Image 12 May 2026 12_19_50.png|assets/img/RIDE OR DIE TRACK PANTS/siyah/ChatGPT Image 12 May 2026 12_22_33.png"
    },
    {
        "name": "DROP #07: ALTIN ELBİSELİ ADAM HOODIE",
        "price": 1999,
        "category": "Drop",
        "page": "drop.html",
        "img": "assets/img/Altın Elbiseli Adam 3 İplik Oversize Hoodie/siyah/ChatGPT Image 12 May 2026 12_27_27.png",
        "badge": "YENİ DROP",
        "gallery": "assets/img/Altın Elbiseli Adam 3 İplik Oversize Hoodie/siyah/ChatGPT Image 12 May 2026 12_27_27.png|assets/img/Altın Elbiseli Adam 3 İplik Oversize Hoodie/siyah/ChatGPT Image 12 May 2026 12_29_42.png"
    },
    {
        "name": "DROP #08: SPEED HUNTER BEANIE",
        "price": 499,
        "category": "Drop",
        "page": "drop.html",
        "img": "assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_05_42.png",
        "badge": "TÜKENMEK ÜZERE",
        "gallery": "assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_05_42.png|assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_06_40.png|assets/img/SPEED HUNTER BEANIE/gri/ChatGPT Image 12 May 2026 12_07_56.png"
    },
    {
        "name": "CAFE RACER VINTAGE T-SHIRT",
        "price": 749,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/CAFE RACER VINTAGE T-SHIRT/siyah/ChatGPT Image 12 May 2026 15_08_31 (1).png",
        "badge": "YENİ",
        "gallery": "assets/img/CAFE RACER VINTAGE T-SHIRT/siyah/ChatGPT Image 12 May 2026 15_08_31 (1).png|assets/img/CAFE RACER VINTAGE T-SHIRT/siyah/ChatGPT Image 12 May 2026 15_08_31 (2).png|assets/img/CAFE RACER VINTAGE T-SHIRT/siyah/ChatGPT Image 12 May 2026 15_08_31 (3).png|assets/img/CAFE RACER VINTAGE T-SHIRT/siyah/ChatGPT Image 12 May 2026 15_08_31 (4).png|assets/img/CAFE RACER VINTAGE T-SHIRT/siyah/ChatGPT Image 12 May 2026 15_08_31 (5).png|assets/img/CAFE RACER VINTAGE T-SHIRT/siyah/ChatGPT Image 12 May 2026 15_08_32 (6).png"
    },
    {
        "name": "APEX CHASER LONG SLEEVE",
        "price": 899,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/APEX CHASER LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 15_12_33 (1).png",
        "badge": "YENİ",
        "gallery": "assets/img/APEX CHASER LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 15_12_33 (1).png|assets/img/APEX CHASER LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 15_12_34 (2).png|assets/img/APEX CHASER LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 15_12_34 (3).png|assets/img/APEX CHASER LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 15_12_34 (4).png|assets/img/APEX CHASER LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 15_12_35 (5).png|assets/img/APEX CHASER LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 15_12_35 (6).png|assets/img/APEX CHASER LONG SLEEVE/siyah/ChatGPT Image 12 May 2026 15_12_35 (7).png"
    },
    {
        "name": "BURN RUBBER CAP",
        "price": 499,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/BURN RUBBER CAP/siyah/ChatGPT Image 12 May 2026 15_17_21.png",
        "badge": "SINIRLI",
        "gallery": "assets/img/BURN RUBBER CAP/siyah/ChatGPT Image 12 May 2026 15_17_21.png|assets/img/BURN RUBBER CAP/siyah/ChatGPT Image 12 May 2026 15_21_15 (1).png|assets/img/BURN RUBBER CAP/siyah/ChatGPT Image 12 May 2026 15_21_15 (2).png|assets/img/BURN RUBBER CAP/siyah/ChatGPT Image 12 May 2026 15_21_16 (3).png"
    },
    {
        "name": "BUILT FOR THE OBSESSED HOODIE",
        "price": 1799,
        "category": "Motor",
        "page": "motor.html",
        "img": "assets/img/BUILT FOR THE OBSESSED HOODIE/siyah/ChatGPT Image 12 May 2026 15_28_22 (1).png",
        "badge": "YENİ",
        "gallery": "assets/img/BUILT FOR THE OBSESSED HOODIE/siyah/ChatGPT Image 12 May 2026 15_28_22 (1).png|assets/img/BUILT FOR THE OBSESSED HOODIE/siyah/ChatGPT Image 12 May 2026 15_28_23 (2).png|assets/img/BUILT FOR THE OBSESSED HOODIE/siyah/ChatGPT Image 12 May 2026 15_28_23 (3).png|assets/img/BUILT FOR THE OBSESSED HOODIE/siyah/ChatGPT Image 12 May 2026 15_28_26 (4).png|assets/img/BUILT FOR THE OBSESSED HOODIE/siyah/ChatGPT Image 12 May 2026 15_28_26 (5).png|assets/img/BUILT FOR THE OBSESSED HOODIE/siyah/ChatGPT Image 12 May 2026 15_28_29 (6).png"
    },
    {
        "name": "REDLINE TRACKSUIT",
        "price": 1899,
        "category": "Araba",
        "page": "araba.html",
        "img": "assets/img/REDLINE TRACKSUIT/siyah/ChatGPT Image 12 May 2026 15_30_16 (1).png",
        "badge": "YENİ",
        "gallery": "assets/img/REDLINE TRACKSUIT/siyah/ChatGPT Image 12 May 2026 15_30_16 (1).png|assets/img/REDLINE TRACKSUIT/siyah/ChatGPT Image 12 May 2026 15_30_17 (2).png|assets/img/REDLINE TRACKSUIT/siyah/ChatGPT Image 12 May 2026 15_30_20 (3).png|assets/img/REDLINE TRACKSUIT/siyah/ChatGPT Image 12 May 2026 15_30_20 (4).png|assets/img/REDLINE TRACKSUIT/siyah/ChatGPT Image 12 May 2026 15_30_21 (5).png|assets/img/REDLINE TRACKSUIT/siyah/ChatGPT Image 12 May 2026 15_30_22 (6).png"
    }
];

  /* ─── FUZZY ARAMA SKORU ─── */
  function score(text, query) {
    text = text.toLocaleLowerCase('tr-TR');
    query = query.toLocaleLowerCase('tr-TR');
    if (text === query) return 100;
    if (text.startsWith(query)) return 90;
    if (text.includes(query)) return 70;
    // Kelime kelime eşleştir
    var words = query.split(' ');
    var matched = words.filter(function (w) { return text.includes(w); }).length;
    if (matched === words.length) return 60;
    if (matched > 0) return 30 * (matched / words.length);
    return 0;
  }

  function search(query) {
    if (!query || query.length < 2) return [];
    return CATALOG
      .map(function (p) {
        return { product: p, score: score(p.name + ' ' + p.category, query) };
      })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 6)
      .map(function (r) { return r.product; });
  }

  /* ─── ARAMA WIDGET OLUŞTUR ─── */
  function buildSearchWidget() {
    // Açma butonu (navbar'a eklenir)
    var btn = document.createElement('button');
    btn.id = 'searchOpenBtn';
    btn.className = 'navbar__icon-btn navbar__search-btn';
    btn.setAttribute('aria-label', 'Ürün ara');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>';

    // Overlay + Modal
    var overlay = document.createElement('div');
    overlay.id = 'searchOverlay';
    overlay.className = 'search-overlay';

    var modal = document.createElement('div');
    modal.id = 'searchModal';
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Ürün ara');

    modal.innerHTML =
      '<div class="search-modal__top">' +
        '<div class="search-modal__field">' +
          '<svg class="search-modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' +
          '<input id="searchInput" class="search-modal__input" type="search" placeholder="Ürün, kategori ara…" autocomplete="off" spellcheck="false">' +
          '<button id="searchClearBtn" class="search-modal__clear" type="button" aria-label="Temizle" hidden>✕</button>' +
        '</div>' +
        '<button id="searchCloseBtn" class="search-modal__close" type="button" aria-label="Kapat">ESC</button>' +
      '</div>' +
      '<div id="searchResults" class="search-results" role="listbox" aria-label="Arama sonuçları"></div>' +
      '<div id="searchEmpty" class="search-empty" hidden>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
        '<p>Sonuç bulunamadı. <br><span>Farklı bir kelime dene.</span></p>' +
      '</div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    return { btn: btn, overlay: overlay, modal: modal };
  }

  /* ─── ÜRÜN LINKI ─── */
  function buildProductUrl(p) {
    var params = new URLSearchParams({
      name: p.name,
      price: '₺' + p.price.toLocaleString('tr-TR'),
      series: p.category + ' Serisi',
      badge: p.badge || '',
      img: p.img
    });
    if (p.gallery) params.set('gallery', p.gallery);
    return 'product.html?' + params.toString();
  }

  /* ─── SONUÇLARI RENDER ET ─── */
  function renderResults(results, query) {
    var container = document.getElementById('searchResults');
    var emptyEl   = document.getElementById('searchEmpty');
    if (!container) return;

    if (!results.length) {
      container.innerHTML = '';
      emptyEl && (emptyEl.hidden = false);
      return;
    }

    emptyEl && (emptyEl.hidden = true);

    var q = query.toLocaleLowerCase('tr-TR');
    container.innerHTML = results.map(function (p, i) {
      var highlighted = p.name.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>');
      return '<a class="search-result-item" href="' + buildProductUrl(p) + '" role="option" tabindex="-1" data-index="' + i + '">' +
        '<div class="search-result-item__img" style="background-image:url(\'' + p.img + '\');background-size:cover;background-position:center"></div>' +
        '<div class="search-result-item__info">' +
          '<span class="search-result-item__name">' + highlighted + '</span>' +
          '<span class="search-result-item__meta">' + p.category + (p.badge ? ' · ' + p.badge : '') + '</span>' +
        '</div>' +
        '<span class="search-result-item__price">₺' + p.price.toLocaleString('tr-TR') + '</span>' +
      '</a>';
    }).join('');
  }

  /* ─── ANA INIT ─── */
  window.initSearch = function () {
    var widgets = buildSearchWidget();
    var overlay = widgets.overlay;
    var btn = widgets.btn;

    // Arama butonunu navbar'a ekle (tema toggle'dan önce)
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn && themeBtn.parentNode) {
      themeBtn.parentNode.insertBefore(btn, themeBtn);
    }

    var input     = document.getElementById('searchInput');
    var clearBtn  = document.getElementById('searchClearBtn');
    var closeBtn  = document.getElementById('searchCloseBtn');
    var resultsEl = document.getElementById('searchResults');
    var focusedIdx = -1;

    function openSearch() {
      overlay.classList.add('search-overlay--active');
      document.body.classList.add('no-scroll');
      setTimeout(function () { input && input.focus(); }, 60);
    }

    function closeSearch() {
      overlay.classList.remove('search-overlay--active');
      document.body.classList.remove('no-scroll');
      if (input) input.value = '';
      if (resultsEl) resultsEl.innerHTML = '';
      var emptyEl = document.getElementById('searchEmpty');
      if (emptyEl) emptyEl.hidden = true;
      if (clearBtn) clearBtn.hidden = true;
      focusedIdx = -1;
    }

    btn.addEventListener('click', openSearch);
    overlay.addEventListener('click', function (e) {
      if (!document.getElementById('searchModal').contains(e.target)) closeSearch();
    });
    closeBtn && closeBtn.addEventListener('click', closeSearch);
    clearBtn && clearBtn.addEventListener('click', function () {
      input.value = '';
      input.focus();
      resultsEl.innerHTML = '';
      var emptyEl = document.getElementById('searchEmpty');
      if (emptyEl) emptyEl.hidden = true;
      clearBtn.hidden = true;
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('search-overlay--active')) {
        closeSearch();
        return;
      }
      // Klavye navigasyonu
      if (!overlay.classList.contains('search-overlay--active')) return;
      var items = Array.from(resultsEl.querySelectorAll('.search-result-item'));
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusedIdx = Math.min(focusedIdx + 1, items.length - 1);
        items.forEach(function (el, i) { el.classList.toggle('is-focused', i === focusedIdx); });
        items[focusedIdx].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusedIdx = Math.max(focusedIdx - 1, -1);
        if (focusedIdx === -1) {
          items.forEach(function (el) { el.classList.remove('is-focused'); });
          input.focus();
        } else {
          items.forEach(function (el, i) { el.classList.toggle('is-focused', i === focusedIdx); });
          items[focusedIdx].focus();
        }
      }
    });

    // Arama inputu
    var debounceTimer;
    input && input.addEventListener('input', function () {
      var q = input.value.trim();
      clearBtn && (clearBtn.hidden = !q);
      focusedIdx = -1;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        renderResults(search(q), q);
      }, 160);
    });

    // Kısayol: "/" tuşu ile aç
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !overlay.classList.contains('search-overlay--active') &&
          document.activeElement.tagName !== 'INPUT' &&
          document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearch();
      }
    });
  };

})();
