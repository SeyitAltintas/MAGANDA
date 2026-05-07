/* ═══════════════════════════════════════════
   MAGANDA — scroll-sequence.js
   Canvas tabanlı scroll-driven image sequence
   192 frame: assets/sequence/frame001.jpg–frame192.jpg
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  var TOTAL_FRAMES = 192;
  var SECTION_ID = 'maganda-sequence';

  var images = [];
  var loadedCount = 0;
  var currentFrame = 0;
  var rafPending = false;

  /* ─── LOADER ───────────────────────────── */
  function buildLoader(section) {
    var loader = document.createElement('div');
    loader.className = 'seq-loader';
    loader.id = 'seqLoader';
    loader.innerHTML =
      '<span class="seq-loader__brand">MAGANDA</span>' +
      '<span class="seq-loader__sep">/ / /</span>' +
      '<div class="seq-loader__bar-wrap">' +
      '<div class="seq-loader__bar" id="seqBar"></div>' +
      '</div>' +
      '<span class="seq-loader__label" id="seqLabel">192 kare yükleniyor...</span>';
    section.appendChild(loader);
    return loader;
  }

  function updateLoader(count) {
    var bar = document.getElementById('seqBar');
    var label = document.getElementById('seqLabel');
    if (bar) bar.style.width = ((count / TOTAL_FRAMES) * 100) + '%';
    if (label) label.textContent = count + ' / ' + TOTAL_FRAMES + ' sahne';
  }

  function hideLoader(loader) {
    loader.style.transition = 'opacity 0.8s ease';
    loader.style.opacity = '0';
    setTimeout(function () {
      loader.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 800);
  }

  /* ─── CANVAS ───────────────────────────── */
  function buildCanvas(section) {
    var canvas = document.createElement('canvas');
    canvas.id = 'seq-canvas';
    section.appendChild(canvas);
    return canvas;
  }

  function resizeCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  function renderFrame(canvas, index) {
    var ctx = canvas.getContext('2d');
    var img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    var dpr = window.devicePixelRatio || 1;
    var cw = canvas.width / dpr;
    var ch = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cw, ch);

    /* cover fit — kenardan kenara doldur */
    var imgRatio = img.naturalWidth / img.naturalHeight;
    var canvasRatio = cw / ch;
    var dw, dh, dx, dy;

    if (imgRatio > canvasRatio) {
      dh = ch; dw = ch * imgRatio;
      dx = (cw - dw) / 2; dy = 0;
    } else {
      dw = cw; dh = cw / imgRatio;
      dx = 0; dy = (ch - dh) / 2;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  /* ─── TEXT OVERLAYS ─────────────────────── */
  var OVERLAYS = [
    {
      rangeStart: 0.0,
      rangeEnd: 0.31,
      className: 'seq-text--center',
      html: '<p class="seq-text__title">ÖZEL SERİ</p>' +
        '<p class="seq-text__sub">MAGANDA imzasıyla sınırlı üretim.</p>'
    },
    {
      rangeStart: 0.34,
      rangeEnd: 0.54,
      html: '<p class="seq-text__title">ATÖLYE KESİMİ</p>' +
        '<p class="seq-text__sub">Keskin siluet. Temiz duruş.</p>'
    },
    {
      rangeStart: 0.58,
      rangeEnd: 0.76,
      html: '<p class="seq-text__title">GECE FORMU</p>' +
        '<p class="seq-text__sub">Siyah zemin. Net karakter.</p>'
    },
    {
      rangeStart: 0.80,
      rangeEnd: 0.95,
      html: '<p class="seq-text__title">İMZA DROP</p>' +
        '<p class="seq-text__sub seq-text__sub--accent">Az adet. Uzun etki.</p>'
    }
  ];

  function buildOverlays(section) {
    var wrapper = document.createElement('div');
    wrapper.className = 'seq-overlays';

    OVERLAYS.forEach(function (ov) {
      var el = document.createElement('div');
      el.className = 'seq-text' + (ov.className ? ' ' + ov.className : '');
      el.dataset.rangeStart = String(ov.rangeStart);
      el.dataset.rangeEnd = String(ov.rangeEnd);
      el.innerHTML = ov.html;
      wrapper.appendChild(el);
    });

    section.appendChild(wrapper);
    return wrapper.querySelectorAll('.seq-text');
  }

  function updateOverlays(textNodes, progress) {
    for (var i = 0; i < textNodes.length; i++) {
      var node = textNodes[i];
      var start = parseFloat(node.dataset.rangeStart);
      var end = parseFloat(node.dataset.rangeEnd);
      var fadeW = (end - start) * 0.18;

      var opacity = 0;
      if (progress >= start && progress <= end) {
        if (progress < start + fadeW) {
          opacity = (progress - start) / fadeW;
        } else if (progress > end - fadeW) {
          opacity = (end - progress) / fadeW;
        } else {
          opacity = 1;
        }
      }
      opacity = Math.max(0, Math.min(1, opacity));

      var yOffset = opacity < 1 ? (1 - opacity) * 22 : 0;
      node.style.opacity = opacity;
      node.style.transform = 'translateY(' + yOffset + 'px)';
    }
  }

  function updateSequenceNavbar(section) {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var rect = section.getBoundingClientRect();
    var navHeight = navbar.offsetHeight || 0;
    var isSequenceActive = rect.top <= navHeight && rect.bottom > navHeight;
    navbar.classList.toggle('navbar--sequence', isSequenceActive);
  }

  /* ─── PRELOAD ───────────────────────────── */
  function preloadImages(onProgress, onComplete) {
    document.body.classList.add('no-scroll');

    for (var i = 1; i <= TOTAL_FRAMES; i++) {
      var img = new Image();
      img.src = 'assets/Gif/ezgif-frame-' + String(i).padStart(3, '0') + '.jpg';

      /* Her ikisinde de sayacı artır — yükleme her zaman tamamlanır */
      (function (image) {
        function onDone() {
          loadedCount++;
          onProgress(loadedCount);
          if (loadedCount === TOTAL_FRAMES) onComplete();
        }
        image.onload = onDone;
        image.onerror = onDone;
      })(img);

      images.push(img);
    }
  }

  /* ─── SCROLL ENGINE ─────────────────────── */
  function initScroll(section, canvas, textNodes) {
    window.addEventListener('scroll', function () {
      if (rafPending) return;
      rafPending = true;

      requestAnimationFrame(function () {
        rafPending = false;

        var rect = section.getBoundingClientRect();
        var scrollable = section.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;

        updateSequenceNavbar(section);

        var scrolled = Math.max(0, -rect.top);
        var progress = Math.min(1, Math.max(0, scrolled / scrollable));

        var frameIndex = Math.min(
          Math.round(progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );

        if (frameIndex !== currentFrame) {
          currentFrame = frameIndex;
          renderFrame(canvas, frameIndex);
        }

        updateOverlays(textNodes, progress);
      });
    }, { passive: true });
  }

  /* ─── INIT ──────────────────────────────── */
  function initScrollSequence() {
    var section = document.getElementById(SECTION_ID);
    if (!section) return;

    var loader = buildLoader(section);
    var canvas = buildCanvas(section);
    resizeCanvas(canvas);

    var textNodes = buildOverlays(section);

    updateSequenceNavbar(section);

    window.addEventListener('resize', function () {
      resizeCanvas(canvas);
      renderFrame(canvas, currentFrame);
      updateSequenceNavbar(section);
    });

    preloadImages(
      function (count) { updateLoader(count); },
      function () {
        hideLoader(loader);
        renderFrame(canvas, 0);
        initScroll(section, canvas, textNodes);
      }
    );
  }

  window.initScrollSequence = initScrollSequence;
})();
