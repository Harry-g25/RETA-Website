/* ========================================
   faq.js — Accordion Toggle
   ======================================== */

(function () {
  'use strict';

  var items = document.querySelectorAll('.accordion__item');

  items.forEach(function (item) {
    var trigger = item.querySelector('.accordion__trigger');
    var content = item.querySelector('.accordion__content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('active');

      // Close all other items
      items.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          var otherContent = other.querySelector('.accordion__content');
          if (otherContent) otherContent.style.maxHeight = null;
          var otherTrigger = other.querySelector('.accordion__trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
