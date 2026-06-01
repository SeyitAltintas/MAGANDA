/* ═══════════════════════════════════════════
   NMAGANDA — collection.js
   Araba & Motor ürün sayfaları için JS
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── NAVBAR SCROLL ──────────────────── */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    var scrolled = false;
    window.addEventListener('scroll', function () {
      var shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        navbar.classList.toggle('navbar--scrolled', scrolled);
      }
    }, { passive: true });
  }

  /* ─── HAMBURGER MENU ─────────────────── */
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var menu = document.getElementById('mobileMenu');
    if (!hamburger || !menu) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('navbar__hamburger--active');
      menu.classList.toggle('mobile-menu--active');
      document.body.style.overflow = menu.classList.contains('mobile-menu--active') ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('navbar__hamburger--active');
        menu.classList.remove('mobile-menu--active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── SCROLL ANIMATIONS ─────────────── */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ─── SMOOTH SCROLL ──────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── DROP FORM ──────────────────────── */
  function initDropForm() {
    var form = document.getElementById('dropForm');
    var success = document.getElementById('dropSuccess');
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      success.classList.add('drop__success--show');
    });
  }

  /* ─── INIT ───────────────────────────── */
  function init() {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initDropForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
