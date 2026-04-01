/* ========================================
   form.js — Client-side Form Validation
   + Web3Forms AJAX submission
   ======================================== */

(function () {
  'use strict';

  // Pre-select course from URL param
  var params = new URLSearchParams(window.location.search);
  var courseParam = params.get('course');
  if (courseParam) {
    var courseSelect = document.getElementById('course');
    if (courseSelect) {
      var options = courseSelect.options;
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === courseParam) {
          courseSelect.value = courseParam;
          break;
        }
      }
    }
  }

  function showFormMessage(form, type, text) {
    var existing = form.parentNode.querySelector('.form-status');
    if (existing) existing.remove();
    var msg = document.createElement('div');
    msg.className = 'form-status';
    msg.setAttribute('role', 'alert');
    if (type === 'success') {
      msg.style.cssText = 'padding:16px 24px;background:rgba(118,191,65,0.1);border:1px solid rgba(118,191,65,0.3);border-radius:8px;color:#5a9a30;font-weight:600;margin-bottom:24px;';
    } else {
      msg.style.cssText = 'padding:16px 24px;background:rgba(220,53,69,0.1);border:1px solid rgba(220,53,69,0.3);border-radius:8px;color:#DC3545;font-weight:600;margin-bottom:24px;';
    }
    msg.textContent = text;
    form.parentNode.insertBefore(msg, form);
    msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Form validation and Web3Forms submission
  var forms = document.querySelectorAll('.form[data-validate]');

  forms.forEach(function (form) {
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;

      // Clear previous errors
      form.querySelectorAll('.form__error').forEach(function (el) {
        el.classList.remove('visible');
      });
      form.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });

      // Validate required fields
      form.querySelectorAll('[required]').forEach(function (field) {
        var value = field.value.trim();
        var errorEl = field.parentElement.querySelector('.form__error');

        if (!value) {
          isValid = false;
          field.classList.add('error');
          if (errorEl) {
            errorEl.textContent = 'This field is required.';
            errorEl.classList.add('visible');
          }
          return;
        }

        if (field.type === 'email') {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            isValid = false;
            field.classList.add('error');
            if (errorEl) {
              errorEl.textContent = 'Please enter a valid email address.';
              errorEl.classList.add('visible');
            }
          }
        }

        if (field.type === 'tel') {
          var phonePattern = /^[\d\s\+\-\(\)]{7,20}$/;
          if (!phonePattern.test(value)) {
            isValid = false;
            field.classList.add('error');
            if (errorEl) {
              errorEl.textContent = 'Please enter a valid phone number.';
              errorEl.classList.add('visible');
            }
          }
        }
      });

      if (!isValid) {
        var firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Submit via Web3Forms
      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending\u2026';
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form)
      })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          showFormMessage(form, 'success', '\u2713 Thank you! Your message has been sent. We\'ll be in touch shortly.');
          form.reset();
        } else {
          showFormMessage(form, 'error', 'Sorry, something went wrong. Please try again or email us directly.');
        }
      })
      .catch(function () {
        showFormMessage(form, 'error', 'Sorry, something went wrong. Please try again or email us directly.');
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
    });

    // Clear error styling on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('error');
        var errorEl = field.parentElement.querySelector('.form__error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  });
})();


(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);

  // Show success/error message from form submission redirect
  var status = params.get('status');
  if (status) {
    var form = document.querySelector('.form');
    if (form) {
      var msg = document.createElement('div');
      msg.setAttribute('role', 'alert');
      if (status === 'success') {
        msg.style.cssText = 'padding: 16px 24px; background: rgba(118,191,65,0.1); border: 1px solid rgba(118,191,65,0.3); border-radius: 8px; color: #5a9a30; font-weight: 600; margin-bottom: 24px;';
        msg.textContent = 'Thank you! Your enquiry has been submitted. We\'ll be in touch shortly.';
      } else {
        msg.style.cssText = 'padding: 16px 24px; background: rgba(220,53,69,0.1); border: 1px solid rgba(220,53,69,0.3); border-radius: 8px; color: #DC3545; font-weight: 600; margin-bottom: 24px;';
        msg.textContent = 'Sorry, there was a problem submitting your form. Please try again or contact us directly.';
      }
      form.parentNode.insertBefore(msg, form);
    }
  }

  // Pre-select course from URL param
  var courseParam = params.get('course');
  if (courseParam) {
    var courseSelect = document.getElementById('course');
    if (courseSelect) {
      var options = courseSelect.options;
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === courseParam) {
          courseSelect.value = courseParam;
          break;
        }
      }
    }
  }

  // Form validation
  var forms = document.querySelectorAll('.form[data-validate]');

  forms.forEach(function (form) {
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', function (e) {
      var isValid = true;

      // Clear previous errors
      form.querySelectorAll('.form__error').forEach(function (el) {
        el.classList.remove('visible');
      });
      form.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });

      // Validate required fields
      form.querySelectorAll('[required]').forEach(function (field) {
        var value = field.value.trim();
        var errorEl = field.parentElement.querySelector('.form__error');

        if (!value) {
          isValid = false;
          field.classList.add('error');
          if (errorEl) {
            errorEl.textContent = 'This field is required.';
            errorEl.classList.add('visible');
          }
          return;
        }

        // Email validation
        if (field.type === 'email') {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            isValid = false;
            field.classList.add('error');
            if (errorEl) {
              errorEl.textContent = 'Please enter a valid email address.';
              errorEl.classList.add('visible');
            }
          }
        }

        // Phone validation
        if (field.type === 'tel') {
          var phonePattern = /^[\d\s\+\-\(\)]{7,20}$/;
          if (!phonePattern.test(value)) {
            isValid = false;
            field.classList.add('error');
            if (errorEl) {
              errorEl.textContent = 'Please enter a valid phone number.';
              errorEl.classList.add('visible');
            }
          }
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Focus first error field
        var firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
      }
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('error');
        var errorEl = field.parentElement.querySelector('.form__error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  });
})();
