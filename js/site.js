/**
 * Evolution Technology — site.js
 * Theme toggle · Contact form · Nav UX · Scroll behaviour
 */
(function () {
  'use strict';

  /* =========================================================
     1. THEME TOGGLE
     ========================================================= */
  function initTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function update(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('et-theme', theme);
      var icon = btn.querySelector('i') || btn;
      if (icon.tagName === 'I') {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      update(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* =========================================================
     2. CONTACT FORM
     ========================================================= */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var submitBtn = form.querySelector('[type="submit"]');
    var feedbackEl = document.getElementById('form-feedback');

    function showFeedback(msg, type) {
      if (!feedbackEl) return;
      feedbackEl.className = 'et-form-feedback alert alert-' + (type === 'success' ? 'success' : 'danger');
      feedbackEl.textContent = msg;
      feedbackEl.hidden = false;
      feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideFeedback() {
      if (feedbackEl) feedbackEl.hidden = true;
    }

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      var span = submitBtn.querySelector('.btn-text');
      var spinner = submitBtn.querySelector('.spinner-border');
      if (span) span.hidden = loading;
      if (spinner) spinner.hidden = !loading;
    }

    /* --- Client-side validation --- */
    function validate() {
      var name = (form.querySelector('[name="name"]') || {}).value || '';
      var email = (form.querySelector('[name="email"]') || {}).value || '';
      var message = (form.querySelector('[name="message"]') || {}).value || '';
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name.trim()) return 'Please enter your name.';
      if (!email.trim() || !emailRe.test(email.trim())) return 'Please enter a valid email address.';
      if (!message.trim() || message.trim().length < 10) return 'Please enter a message (at least 10 characters).';
      return null;
    }

    /* --- Formspree POST --- */
    function submitFormspree(endpoint, data) {
      return fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      }).then(function (res) {
        if (!res.ok) return res.json().then(function (j) { throw new Error((j.errors || []).map(function (e) { return e.message; }).join(', ') || 'Submission failed.'); });
        return res.json();
      });
    }

    /* --- mailto fallback --- */
    function submitMailto() {
      var cfg = (typeof ET_CONFIG !== 'undefined' && ET_CONFIG) || {};
      var to = cfg.contactEmail || 'contact@evolutiontechnology.ly';
      var name = (form.querySelector('[name="name"]') || {}).value || '';
      var email = (form.querySelector('[name="email"]') || {}).value || '';
      var company = (form.querySelector('[name="company"]') || {}).value || '';
      var service = (form.querySelector('[name="service"]') || {}).value || '';
      var message = (form.querySelector('[name="message"]') || {}).value || '';
      var subject = encodeURIComponent('Contact from ' + name + (company ? ' (' + company + ')' : ''));
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        (company ? 'Company: ' + company + '\n' : '') +
        (service ? 'Service: ' + service + '\n' : '') +
        '\nMessage:\n' + message
      );
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideFeedback();

      var error = validate();
      if (error) { showFeedback(error, 'error'); return; }

      var cfg = (typeof ET_CONFIG !== 'undefined' && ET_CONFIG) || {};
      var endpoint = cfg.formspreeEndpoint || '';

      if (endpoint) {
        setLoading(true);
        submitFormspree(endpoint, new FormData(form))
          .then(function () {
            var t = window.ET && window.ET.lang && window.ET.lang.t;
            var msg = t ? t('pages.contact.form.success') : 'Thank you! Your message has been sent.';
            showFeedback(msg, 'success');
            form.reset();
          })
          .catch(function (err) {
            var t = window.ET && window.ET.lang && window.ET.lang.t;
            var msg = t ? t('pages.contact.form.error') : 'Something went wrong. Please try again.';
            showFeedback(msg + (err.message ? ' (' + err.message + ')' : ''), 'error');
          })
          .finally(function () { setLoading(false); });
      } else {
        submitMailto();
      }
    });
  }

  /* =========================================================
     3. MOBILE NAV — collapse on link click
     ========================================================= */
  function initMobileNav() {
    var toggler = document.querySelector('.navbar-toggler');
    var collapseEl = document.getElementById('et-nav');
    if (!toggler || !collapseEl) return;

    collapseEl.addEventListener('click', function (e) {
      var link = e.target.closest('a.nav-link, a.dropdown-item');
      if (!link) return;
      // Only collapse if mobile menu is open (Bootstrap adds 'show')
      if (!collapseEl.classList.contains('show')) return;
      // Let Bootstrap handle dropdowns; for plain links close immediately
      if (link.classList.contains('dropdown-toggle')) return;
      if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        var bsCollapse = bootstrap.Collapse.getInstance(collapseEl) ||
          new bootstrap.Collapse(collapseEl, { toggle: false });
        bsCollapse.hide();
      } else {
        collapseEl.classList.remove('show');
        toggler.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =========================================================
     4. ACTIVE NAV LINK
     ========================================================= */
  function initActiveNav() {
    var page = document.body.dataset.page || '';
    if (!page) return;
    // i18n.js renders the nav; use MutationObserver to catch it
    var header = document.getElementById('site-header');
    if (!header) return;

    function markActive() {
      var links = header.querySelectorAll('a.nav-link[data-page], a.dropdown-item[data-page]');
      links.forEach(function (link) {
        if (link.dataset.page === page) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
          // Also mark parent dropdown toggle active
          var dropdown = link.closest('.dropdown');
          if (dropdown) {
            var toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) toggle.classList.add('active');
          }
        }
      });
    }

    // Run now in case header already rendered
    markActive();

    // Watch for header injection by i18n.js
    var observer = new MutationObserver(function () {
      markActive();
    });
    observer.observe(header, { childList: true, subtree: true });
  }

  /* =========================================================
     5. SMOOTH SCROLL for anchor links
     ========================================================= */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* =========================================================
     6. SCROLL-TO-TOP BUTTON (optional element)
     ========================================================= */
  function initScrollTop() {
    var btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.hidden = window.scrollY < 400;
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================================
     7. NAVBAR SHRINK on scroll
     ========================================================= */
  function initNavShrink() {
    var nav = document.querySelector('.et-navbar');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      nav.classList.toggle('et-navbar--scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    initTheme();
    initContactForm();
    initMobileNav();
    initActiveNav();
    initSmoothScroll();
    initScrollTop();
    initNavShrink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
