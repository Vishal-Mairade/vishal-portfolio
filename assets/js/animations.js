/**
 * animations.js — Scroll Reveal & Skill Bar Animations
 * Portfolio: Vishal Mairade | Senior PHP Laravel Developer
 *
 * Uses IntersectionObserver to:
 *  1. Reveal elements with .reveal-up / .reveal-left / .reveal-right
 *  2. Animate skill progress bars when they enter the viewport
 *  3. Generate hero particles
 */

(function () {
  'use strict';

  /* ============================================================
     1. INTERSECTION OBSERVER — SCROLL REVEAL
  ============================================================ */
  const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Respect stagger delay from HTML style attribute
            const delay = entry.target.style.getPropertyValue('--delay') || '0ms';
            entry.target.style.transitionDelay = delay;
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show all elements immediately for old browsers */
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ============================================================
     2. SKILL BAR ANIMATION
  ============================================================ */
  const skillCards = document.querySelectorAll('.skill-card');

  if ('IntersectionObserver' in window && skillCards.length) {
    const skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            skillObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    skillCards.forEach(function (card) {
      skillObserver.observe(card);
    });
  } else {
    skillCards.forEach(function (card) {
      card.classList.add('animated');
    });
  }

  /* ============================================================
     3. HERO PARTICLES (Canvas-free, DOM particles)
  ============================================================ */
  (function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const PARTICLE_COUNT = 40;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('span');
      p.classList.add('particle');

      // Random size between 1.5px and 4px
      const size = Math.random() * 2.5 + 1.5;
      // Random horizontal start position
      const startX = Math.random() * 100;
      // Random horizontal drift
      const drift = (Math.random() - 0.5) * 80;
      // Random animation duration between 8s and 20s
      const duration = Math.random() * 12 + 8;
      // Random delay
      const delay = Math.random() * 15;
      // Random opacity
      const opacity = Math.random() * 0.4 + 0.1;
      // Color: cycle through primary/accent/purple
      const colors = ['#2563EB', '#06B6D4', '#8B5CF6'];
      const color  = colors[Math.floor(Math.random() * colors.length)];

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${startX}%;
        bottom: -10px;
        opacity: ${opacity};
        --drift: ${drift}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 2}px ${color};
      `;

      container.appendChild(p);
    }
  })();

  /* ============================================================
     4. SECTION ACTIVE NAV LINK (Scroll Spy)
  ============================================================ */
  (function initScrollSpy() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72'
    );

    function getCurrentSection() {
      const scrollY = window.scrollY + navHeight + 40;

      let current = null;
      sections.forEach(function (section) {
        if (section.offsetTop <= scrollY) {
          current = section.getAttribute('id');
        }
      });
      return current;
    }

    function updateActiveLink() {
      const current = getCurrentSection();
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    }

    // Use passive scroll listener for performance
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink(); // Run on load
  })();

})();
