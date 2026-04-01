/* ========================================
   cookie.js — Cookie Consent Banner
   ======================================== */

(function () {
  'use strict';

  var banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  // Check if already accepted
  if (localStorage.getItem('reta-cookies-accepted')) return;

  // Show banner
  banner.classList.add('visible');

  var acceptBtn = banner.querySelector('[data-cookie-accept]');
  var declineBtn = banner.querySelector('[data-cookie-decline]');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('reta-cookies-accepted', 'true');
      banner.classList.remove('visible');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      localStorage.setItem('reta-cookies-accepted', 'false');
      banner.classList.remove('visible');
    });
  }
})();
