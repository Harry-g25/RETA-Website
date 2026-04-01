/* ========================================
   nav.js — Mobile Navigation Toggle
   ======================================== */

(function () {
  'use strict';

  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const overlay = document.querySelector('.nav__overlay');
  const header = document.querySelector('.header');

  if (!toggle || !navList) return;

  // Toggle mobile menu
  toggle.addEventListener('click', function () {
    const isOpen = navList.classList.contains('open');
    navList.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isOpen);

    if (overlay) {
      overlay.classList.toggle('active');
    }

    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close when overlay clicked
  if (overlay) {
    overlay.addEventListener('click', function () {
      navList.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      navList.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });

  // Close menu when a link is clicked
  navList.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navList.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Header scroll shadow
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // Set active nav link based on current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navList.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
