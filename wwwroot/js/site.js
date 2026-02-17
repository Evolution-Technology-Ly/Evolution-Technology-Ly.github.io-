/**
 * Evolution Technology — site.js
 * Minimal vanilla JS: theme toggle, active nav, contact form UX
 */

(function () {
    'use strict';

    /* ── Theme toggle ────────────────────────────────────────────────────────── */
    var THEME_KEY = 'et-theme';
    var html = document.documentElement;

    function getTheme() {
        return localStorage.getItem(THEME_KEY) || 'light';
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    // Apply stored theme immediately (also done inline in <head> to prevent FOUC)
    setTheme(getTheme());

    document.addEventListener('DOMContentLoaded', function () {

        /* Theme button */
        var toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                var next = getTheme() === 'dark' ? 'light' : 'dark';
                setTheme(next);
            });
        }

        /* ── Active nav link ─────────────────────────────────────────────────── */
        var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
        var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href) return;
            var normalized = href.replace(/\/$/, '') || '/';
            // Exact match or starts-with for sub-paths (but not root)
            if (normalized !== '' && currentPath === normalized) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else if (
                normalized.length > 3 &&
                currentPath.startsWith(normalized)
            ) {
                link.classList.add('active');
            }
        });

        /* ── Smooth scroll for in-page anchors ───────────────────────────────── */
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        /* ── Contact form: clear success message on field change ─────────────── */
        var form = document.querySelector('.et-contact-form');
        if (form) {
            var successAlert = document.querySelector('.et-alert-success');
            if (successAlert) {
                form.querySelectorAll('input, select, textarea').forEach(function (el) {
                    el.addEventListener('input', function () {
                        successAlert.style.display = 'none';
                    }, { once: true });
                });
            }

            /* Disable submit button during form submission */
            form.addEventListener('submit', function () {
                var btn = form.querySelector('[type="submit"]');
                if (btn) {
                    btn.disabled = true;
                    btn.textContent = btn.getAttribute('data-submitting') || 'Sending…';
                }
            });
        }

        /* ── Navbar: close mobile menu on link click ─────────────────────────── */
        var navCollapse = document.getElementById('primaryNav');
        if (navCollapse) {
            navCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(function (link) {
                link.addEventListener('click', function () {
                    var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                });
            });
        }

    });

})();
