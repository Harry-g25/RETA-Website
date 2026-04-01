/* ========================================
   theme.js — Light/Dark Theme Toggle
   ======================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'reta-theme';
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  var iconSun = toggle.querySelector('.theme-toggle__icon--sun');
  var iconMoon = toggle.querySelector('.theme-toggle__icon--moon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (iconSun && iconMoon) {
      iconSun.style.display = theme === 'dark' ? 'block' : 'none';
      iconMoon.style.display = theme === 'dark' ? 'none' : 'block';
    }
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Load saved theme or respect system preference
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  // Toggle on click
  toggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // Listen for system preference changes (if no manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
