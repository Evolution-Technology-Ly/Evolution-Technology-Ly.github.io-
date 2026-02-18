/**
 * Evolution Technology — i18n.js
 * Translation engine + header/footer rendering.
 * No frameworks. No dependencies beyond config.js.
 */

(function () {
  'use strict';

  /* ── Page map (relative paths — works on file:// and HTTP alike) ────────── */
  var RELATIVE_PATHS = {
    home:          'index.html',
    about:         'about.html',
    services:      'services.html',
    contact:       'contact.html',
    architecture:  'services/architecture.html',
    development:   'services/development.html',
    modernization: 'services/modernization.html',
    consulting:    'services/consulting.html',
  };

  /* ── Root-relative prefix ('' for root pages, '../' for services/ pages) ── */
  function getDepth() {
    var servicePages = ['architecture', 'development', 'modernization', 'consulting'];
    return servicePages.indexOf(document.body.dataset.page || 'home') !== -1 ? '../' : '';
  }

  /* ── Language detection ─────────────────────────────────────────────────── */
  function detectLang() {
    var params = new URLSearchParams(window.location.search);
    var lang = params.get('lang')
            || localStorage.getItem('et-lang')
            || (ET_CONFIG && ET_CONFIG.defaultLang)
            || 'en';
    var supported = (ET_CONFIG && ET_CONFIG.languages) || ['en', 'ar'];
    if (supported.indexOf(lang) === -1) lang = 'en';
    return lang;
  }

  /* ── Build page URL with lang param (relative, works on file:// + HTTP) ─── */
  function pageUrl(pageName, lang) {
    var path = getDepth() + (RELATIVE_PATHS[pageName] || 'index.html');
    var defaultLang = (ET_CONFIG && ET_CONFIG.defaultLang) || 'en';
    return lang === defaultLang ? path : path + '?lang=' + lang;
  }

  /* ── Switch language ────────────────────────────────────────────────────── */
  function switchLang(lang) {
    localStorage.setItem('et-lang', lang);
    var params = new URLSearchParams(window.location.search);
    var defaultLang = (ET_CONFIG && ET_CONFIG.defaultLang) || 'en';
    if (lang === defaultLang) {
      params.delete('lang');
    } else {
      params.set('lang', lang);
    }
    var q = params.toString();
    window.location.search = q;
  }

  /* ── Dot-notation key resolver ──────────────────────────────────────────── */
  function resolve(translations, key) {
    return key.split('.').reduce(function (obj, k) {
      return obj && obj[k] !== undefined ? obj[k] : null;
    }, translations);
  }

  /* ── Render a {title, body} step item ──────────────────────────────────── */
  function renderStepItem(item) {
    if (item && typeof item === 'object' && item.title) {
      return '<li><strong class="et-step-title">' + escHtml(item.title) + '</strong>'
           + (item.body ? '<span class="et-step-body"> — ' + escHtml(item.body) + '</span>' : '')
           + '</li>';
    }
    return '<li>' + escHtml(String(item)) + '</li>';
  }

  /* ── Safe HTML escape for user-supplied strings ─────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Apply all data-i18n* attributes ────────────────────────────────────── */
  function applyTranslations(translations, lang) {
    /* data-i18n → innerHTML (allows <em> etc. in JSON values) */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = resolve(translations, el.dataset.i18n);
      if (val !== null && typeof val === 'string') el.innerHTML = val;
    });

    /* data-i18n-placeholder → placeholder attribute */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = resolve(translations, el.dataset.i18nPlaceholder);
      if (val !== null) el.placeholder = val;
    });

    /* data-i18n-label → aria-label attribute */
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      var val = resolve(translations, el.dataset.i18nLabel);
      if (val !== null) el.setAttribute('aria-label', val);
    });

    /* data-i18n-title → title attribute */
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var val = resolve(translations, el.dataset.i18nTitle);
      if (val !== null) el.setAttribute('title', val);
    });

    /* data-i18n-href → page href with lang param */
    document.querySelectorAll('[data-i18n-href]').forEach(function (el) {
      el.href = pageUrl(el.dataset.i18nHref, lang);
    });

    /* data-i18n-list → renders <li> items from JSON string array */
    document.querySelectorAll('[data-i18n-list]').forEach(function (el) {
      var arr = resolve(translations, el.dataset.i18nList);
      if (Array.isArray(arr)) {
        el.innerHTML = arr.map(function (item) {
          return '<li>' + escHtml(String(item)) + '</li>';
        }).join('');
      }
    });

    /* data-i18n-steps → renders <li> items for step lists
       Handles both string arrays and {title, body} object arrays */
    document.querySelectorAll('[data-i18n-steps]').forEach(function (el) {
      var arr = resolve(translations, el.dataset.i18nSteps);
      if (Array.isArray(arr)) {
        el.innerHTML = arr.map(renderStepItem).join('');
      }
    });

    /* data-i18n-paras → renders multiple <p> from JSON string array */
    document.querySelectorAll('[data-i18n-paras]').forEach(function (el) {
      var arr = resolve(translations, el.dataset.i18nParas);
      if (Array.isArray(arr)) {
        el.innerHTML = arr.map(function (p) {
          return '<p class="et-detail-body">' + escHtml(String(p)) + '</p>';
        }).join('');
      }
    });
  }

  /* ── Render header ──────────────────────────────────────────────────────── */
  function renderHeader(translations, lang) {
    var t = function (k) { return resolve(translations, k) || ''; };
    var isAr = lang === 'ar';
    var altLang = isAr ? 'en' : 'ar';
    var altLangLabel = t('nav.switchLang') || (isAr ? 'English' : 'عربي');
    var altLangTitle = isAr ? 'Switch to English' : 'التبديل إلى العربية';
    var currentPage = document.body.dataset.page || 'home';
    var altHref = pageUrl(currentPage, altLang);
    var navAlign = isAr ? 'me-auto' : 'ms-auto';
    var ctrlMargin = isAr ? 'me-lg-3' : 'ms-lg-3';

    var sunIcon = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
    var moonIcon = '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>';

    function navLink(pageName, label) {
      return '<li class="nav-item"><a class="nav-link" href="' + pageUrl(pageName, lang)
           + '" data-page="' + pageName + '">' + escHtml(label) + '</a></li>';
    }

    var html = [
      '<header class="et-header" role="banner">',
        '<nav class="navbar navbar-expand-lg et-navbar" aria-label="Main navigation">',
          '<div class="container">',
            '<a class="navbar-brand et-brand" href="' + pageUrl('home', lang) + '">',
            '<img src="' + getDepth() + 'img/logo.png" alt="' + escHtml(t('site.name')) + '" class="et-brand-logo">',
            '<span class="et-brand-name">' + escHtml(t('site.name')) + '</span>',
            '</a>',
            '<button class="navbar-toggler et-toggler" type="button"',
              ' data-bs-toggle="collapse" data-bs-target="#et-nav"',
              ' aria-controls="et-nav" aria-expanded="false"',
              ' aria-label="Toggle navigation">',
              '<span class="et-toggler-bar"></span>',
              '<span class="et-toggler-bar"></span>',
              '<span class="et-toggler-bar"></span>',
            '</button>',
            '<div class="collapse navbar-collapse" id="et-nav">',
              '<ul class="navbar-nav ' + navAlign + ' align-items-lg-center gap-lg-1">',
                navLink('home',    t('nav.home')),
                navLink('about',   t('nav.about')),
                '<li class="nav-item dropdown">',
                  '<a class="nav-link dropdown-toggle" href="' + pageUrl('services', lang) + '"',
                    ' data-page="services" role="button" data-bs-toggle="dropdown" aria-expanded="false">',
                    escHtml(t('nav.services')),
                  '</a>',
                  '<ul class="dropdown-menu et-dropdown">',
                    '<li><a class="dropdown-item" href="' + pageUrl('architecture',  lang) + '" data-page="architecture">'  + escHtml(t('nav.servicesDropdown.architecture'))  + '</a></li>',
                    '<li><a class="dropdown-item" href="' + pageUrl('development',   lang) + '" data-page="development">'   + escHtml(t('nav.servicesDropdown.development'))   + '</a></li>',
                    '<li><a class="dropdown-item" href="' + pageUrl('modernization', lang) + '" data-page="modernization">' + escHtml(t('nav.servicesDropdown.modernization')) + '</a></li>',
                    '<li><a class="dropdown-item" href="' + pageUrl('consulting',    lang) + '" data-page="consulting">'    + escHtml(t('nav.servicesDropdown.consulting'))    + '</a></li>',
                  '</ul>',
                '</li>',
                navLink('contact', t('nav.contact')),
              '</ul>',
              '<div class="et-nav-controls d-flex align-items-center gap-2 ' + ctrlMargin + '">',
                '<a href="' + altHref + '" class="et-lang-btn"',
                  ' onclick="event.preventDefault();ET.lang.switch(\'' + altLang + '\')"',
                  ' title="' + escHtml(altLangTitle) + '" aria-label="' + escHtml(altLangTitle) + '">',
                  escHtml(altLangLabel),
                '</a>',
                '<button id="theme-toggle" class="et-theme-btn" type="button"',
                  ' aria-label="Toggle dark/light mode" title="Toggle theme">',
                  '<span class="et-theme-icon et-icon-light">' + sunIcon + '</span>',
                  '<span class="et-theme-icon et-icon-dark">' + moonIcon + '</span>',
                '</button>',
              '</div>',
            '</div>',
          '</div>',
        '</nav>',
      '</header>',
    ].join('');

    document.getElementById('site-header').innerHTML = html;
    setActiveNav(lang);
  }

  /* ── Render footer ──────────────────────────────────────────────────────── */
  function renderFooter(translations, lang) {
    var t = function (k) { return resolve(translations, k) || ''; };
    var isAr = lang === 'ar';
    var year = new Date().getFullYear();

    var headingPages    = isAr ? 'الصفحات'  : 'Pages';
    var headingServices = isAr ? 'الخدمات'  : 'Services';
    var headingContact  = isAr ? 'التواصل'  : 'Contact';

    var html = [
      '<footer class="et-footer" role="contentinfo">',
        '<div class="container">',
          '<div class="et-footer-grid">',
            '<div class="et-footer-brand">',
              '<a href="' + pageUrl('home', lang) + '" class="et-brand et-footer-brand-link">',
                '<img src="' + getDepth() + 'img/logo.png" alt="' + escHtml(t('site.name')) + '" class="et-brand-logo et-brand-logo--footer">',
                '<span class="et-brand-name">' + escHtml(t('site.name')) + '</span>',
              '</a>',
              '<p class="et-footer-tagline">' + escHtml(t('footer.tagline')) + '</p>',
            '</div>',
            '<nav class="et-footer-nav" aria-label="' + escHtml(headingPages) + '">',
              '<h3 class="et-footer-heading">' + escHtml(headingPages) + '</h3>',
              '<ul>',
                '<li><a href="' + pageUrl('home',     lang) + '">' + escHtml(t('nav.home'))     + '</a></li>',
                '<li><a href="' + pageUrl('about',    lang) + '">' + escHtml(t('nav.about'))    + '</a></li>',
                '<li><a href="' + pageUrl('services', lang) + '">' + escHtml(t('nav.services')) + '</a></li>',
                '<li><a href="' + pageUrl('contact',  lang) + '">' + escHtml(t('nav.contact'))  + '</a></li>',
              '</ul>',
            '</nav>',
            '<nav class="et-footer-nav" aria-label="' + escHtml(headingServices) + '">',
              '<h3 class="et-footer-heading">' + escHtml(headingServices) + '</h3>',
              '<ul>',
                '<li><a href="' + pageUrl('architecture',  lang) + '">' + escHtml(t('nav.servicesDropdown.architecture'))  + '</a></li>',
                '<li><a href="' + pageUrl('development',   lang) + '">' + escHtml(t('nav.servicesDropdown.development'))   + '</a></li>',
                '<li><a href="' + pageUrl('modernization', lang) + '">' + escHtml(t('nav.servicesDropdown.modernization')) + '</a></li>',
                '<li><a href="' + pageUrl('consulting',    lang) + '">' + escHtml(t('nav.servicesDropdown.consulting'))    + '</a></li>',
              '</ul>',
            '</nav>',
            '<div class="et-footer-contact">',
              '<h3 class="et-footer-heading">' + escHtml(headingContact) + '</h3>',
              '<a href="mailto:info@evotech.ly" class="et-footer-contact-link">',
                '<i class="bi bi-envelope-fill" aria-hidden="true"></i> info@evotech.ly',
              '</a>',
              '<a href="tel:+218928706173" class="et-footer-contact-link">',
                '<i class="bi bi-telephone-fill" aria-hidden="true"></i>',
                '<span dir="ltr">+218 92 870 6173</span>',
              '</a>',
              '<p class="et-footer-address">',
                '<i class="bi bi-geo-alt-fill" aria-hidden="true"></i> ',
                escHtml(t('pages.contact.channels.address.value')),
              '</p>',
              '<div class="et-footer-social">',
                '<a href="https://wa.me/218928706173" target="_blank" rel="noopener noreferrer"',
                  ' class="et-footer-social-link" aria-label="WhatsApp">',
                  '<i class="bi bi-whatsapp"></i>',
                '</a>',
                '<a href="https://www.linkedin.com/company/evo-tech-ly" target="_blank" rel="noopener noreferrer"',
                  ' class="et-footer-social-link" aria-label="LinkedIn">',
                  '<i class="bi bi-linkedin"></i>',
                '</a>',
                '<a href="https://www.facebook.com/evotechly" target="_blank" rel="noopener noreferrer"',
                  ' class="et-footer-social-link" aria-label="Facebook">',
                  '<i class="bi bi-facebook"></i>',
                '</a>',
              '</div>',
            '</div>',
          '</div>',
          '<div class="et-footer-bottom">',
            '<p>&copy; ' + year + ' Evolution Technology. ' + escHtml(t('footer.allRights')) + '</p>',
          '</div>',
        '</div>',
      '</footer>',
    ].join('');

    document.getElementById('site-footer').innerHTML = html;
  }

  /* ── Mark active nav link ───────────────────────────────────────────────── */
  function setActiveNav(lang) {
    var currentPage = document.body.dataset.page || 'home';
    document.querySelectorAll('.navbar-nav a[data-page]').forEach(function (link) {
      if (link.dataset.page === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        var dropdown = link.closest('.dropdown');
        if (dropdown) {
          var toggle = dropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.classList.add('active');
        }
      }
    });
  }

  /* ── Update page meta + title ───────────────────────────────────────────── */
  function updateMeta(translations, page) {
    var pageKey = 'pages.' + page;
    var title = resolve(translations, pageKey + '.title') || '';
    var meta  = resolve(translations, pageKey + '.meta')  || '';

    document.title = (title ? title + ' \u2014 ' : '') + 'Evolution Technology';
    var metaEl = document.getElementById('meta-desc');
    if (metaEl && meta) metaEl.setAttribute('content', meta);
  }

  /* ── Render home service cards ───────────────────────────────────────────── */
  function renderHomeServices(translations, lang) {
    var container = document.getElementById('home-services-grid');
    if (!container) return;
    var cards = resolve(translations, 'pages.home.services.items');
    if (!Array.isArray(cards)) return;

    var servicePages = ['architecture', 'development', 'modernization', 'consulting'];
    container.innerHTML = cards.map(function (card, i) {
      var href = pageUrl(servicePages[i], lang);
      return [
        '<a href="' + href + '" class="et-card">',
          '<span class="et-card-number">' + escHtml(card.num) + '</span>',
          '<h3 class="et-card-title">' + escHtml(card.title) + '</h3>',
          '<p class="et-card-body">' + escHtml(card.body) + '</p>',
          '<span class="et-card-cta">' + escHtml(card.cta) + ' <i class="bi bi-arrow-right et-card-arrow" aria-hidden="true"></i></span>',
        '</a>',
      ].join('');
    }).join('');
  }

  /* ── Render home partnership principles ─────────────────────────────────── */
  function renderHomePrinciples(translations) {
    var container = document.getElementById('home-principles-grid');
    if (!container) return;
    var items = resolve(translations, 'pages.home.partnership.principles');
    if (!Array.isArray(items)) return;

    container.innerHTML = items.map(function (item) {
      return [
        '<div class="et-principle">',
          '<h3 class="et-principle-title">' + escHtml(item.title) + '</h3>',
          '<p class="et-principle-body">' + escHtml(item.body) + '</p>',
        '</div>',
      ].join('');
    }).join('');
  }

  /* ── Render about philosophy blocks ─────────────────────────────────────── */
  function renderAboutPhilosophy(translations) {
    var container = document.getElementById('philosophy-grid');
    if (!container) return;
    var items = resolve(translations, 'pages.about.philosophy.items');
    if (!Array.isArray(items)) return;

    container.innerHTML = items.map(function (item) {
      return [
        '<div class="et-philosophy-block">',
          '<h3 class="et-philosophy-title">' + escHtml(item.title) + '</h3>',
          '<p class="et-philosophy-body">' + escHtml(item.body) + '</p>',
        '</div>',
      ].join('');
    }).join('');
  }

  /* ── Render about methodology steps ─────────────────────────────────────── */
  function renderMethodology(translations) {
    var container = document.getElementById('methodology-steps');
    if (!container) return;
    var steps = resolve(translations, 'pages.about.methodology.steps');
    if (!Array.isArray(steps)) return;

    container.innerHTML = steps.map(function (step) {
      return [
        '<li class="et-step-item">',
          '<strong class="et-step-title">' + escHtml(step.title) + '</strong>',
          '<span class="et-step-body">' + escHtml(step.body) + '</span>',
        '</li>',
      ].join('');
    }).join('');
  }

  /* ── Render about values grid ────────────────────────────────────────────── */
  function renderAboutValues(translations) {
    var container = document.getElementById('values-grid');
    if (!container) return;
    var items = resolve(translations, 'pages.about.values.items');
    if (!Array.isArray(items)) return;

    container.innerHTML = items.map(function (item) {
      return [
        '<div class="et-value-card">',
          '<h3 class="et-value-title">' + escHtml(item.title) + '</h3>',
          '<p class="et-value-body">' + escHtml(item.body) + '</p>',
        '</div>',
      ].join('');
    }).join('');
  }

  /* ── Render services index cards ─────────────────────────────────────────── */
  function renderServicesCards(translations, lang) {
    var container = document.getElementById('services-cards');
    if (!container) return;
    var cards = resolve(translations, 'pages.services.cards');
    if (!Array.isArray(cards)) return;

    var servicePages = ['architecture', 'development', 'modernization', 'consulting'];
    container.innerHTML = cards.map(function (card, i) {
      var href = pageUrl(servicePages[i], lang);
      return [
        '<a href="' + href + '" class="et-card et-card--large">',
          '<span class="et-card-number">' + escHtml(card.num) + '</span>',
          '<h2 class="et-card-title">' + escHtml(card.title) + '</h2>',
          '<p class="et-card-body">' + escHtml(card.body) + '</p>',
          '<span class="et-card-cta">' + escHtml(card.cta) + ' <i class="bi bi-arrow-right et-card-arrow" aria-hidden="true"></i></span>',
        '</a>',
      ].join('');
    }).join('');
  }

  /* ── Render contact service select options ───────────────────────────────── */
  function renderContactSelect(translations) {
    var select = document.getElementById('contact-service');
    if (!select) return;
    var services = resolve(translations, 'pages.contact.form.services');
    var defaultLabel = resolve(translations, 'pages.contact.form.serviceDefault') || 'Select a service area';

    var options = '<option value="" disabled selected>' + escHtml(defaultLabel) + '</option>';
    if (Array.isArray(services)) {
      options += services.map(function (svc) {
        return '<option value="' + escHtml(svc) + '">' + escHtml(svc) + '</option>';
      }).join('');
    }
    select.innerHTML = options;
  }

  /* ── Render contact info steps ───────────────────────────────────────────── */
  function renderContactSteps(translations) {
    var container = document.getElementById('contact-steps');
    if (!container) return;
    var steps = resolve(translations, 'pages.contact.info.steps');
    if (!Array.isArray(steps)) return;

    container.innerHTML = steps.map(function (step) {
      return [
        '<li class="et-contact-step">',
          '<strong class="et-contact-step-title">' + escHtml(step.title) + '</strong>',
          '<span class="et-contact-step-body">' + escHtml(step.body) + '</span>',
        '</li>',
      ].join('');
    }).join('');
  }

  /* ── Bootstrap CSS RTL/LTR toggle ───────────────────────────────────────── */
  function applyBootstrapDirection(lang) {
    var ltr = document.getElementById('bs-ltr');
    var rtl = document.getElementById('bs-rtl');
    if (!ltr || !rtl) return;
    if (lang === 'ar') {
      ltr.disabled = true;
      rtl.disabled = false;
    } else {
      ltr.disabled = false;
      rtl.disabled = true;
    }
  }

  /* ── Load and apply font ─────────────────────────────────────────────────── */
  function applyFont(lang) {
    var existing = document.getElementById('et-font');
    if (existing) existing.remove();

    var link = document.createElement('link');
    link.id = 'et-font';
    link.rel = 'stylesheet';
    link.href = lang === 'ar'
      ? 'https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap'
      : 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=DM+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }

  /* ── Render all page content from loaded translations ───────────────────── */
  function renderAll(translations, lang) {
    var page = document.body.dataset.page || 'home';

    updateMeta(translations, page);
    renderHeader(translations, lang);
    renderFooter(translations, lang);
    applyTranslations(translations, lang);

    renderHomeServices(translations, lang);
    renderHomePrinciples(translations);
    renderAboutPhilosophy(translations);
    renderMethodology(translations);
    renderAboutValues(translations);
    renderServicesCards(translations, lang);
    renderContactSelect(translations);
    renderContactSteps(translations);

    window.ET = window.ET || {};
    window.ET.lang = {
      switch: switchLang,
      current: lang,
      t: function (key) { return resolve(translations, key) || key; },
    };
  }

  /* ── Main init ──────────────────────────────────────────────────────────── */
  function init() {
    var lang = detectLang();
    localStorage.setItem('et-lang', lang);

    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    applyBootstrapDirection(lang);
    applyFont(lang);

    /* Locale globals are pre-loaded as static <script> tags in each HTML file */
    var translations = window['ET_LOCALE_' + lang.toUpperCase()] || {};
    if (!translations || !translations.site) {
      console.warn('[ET] Locale not loaded. Add <script src="locales/' + lang + '.js"> to <head>.');
    }
    renderAll(translations, lang);
  }

  /* Run on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
