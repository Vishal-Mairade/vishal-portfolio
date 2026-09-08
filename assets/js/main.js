/**
 * main.js — Core Application Logic
 * Portfolio: Vishal Mairade | Senior PHP Laravel Developer
 *
 * Modules:
 *  1. Navbar — scroll detection, glass morphism on scroll
 *  2. Mobile Menu — hamburger toggle, outside-click close
 *  3. Typing Animation — multi-phrase rotating typewriter
 *  4. Smooth Scroll — enhanced anchor navigation
 *  5. Footer Year — dynamic copyright year
 *  6. Keyboard Accessibility — ESC key, trap focus in mobile menu
 */

(function () {
  'use strict';

  /* ============================================================
     1. NAVBAR — Scroll-triggered glassmorphism
  ============================================================ */
  (function initNavbar() {
    const navbar = document.getElementById('navbar');
    const SCROLL_THRESHOLD = 20;

    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run on page load (handles refresh at scroll position)
  })();

  /* ============================================================
     2. MOBILE MENU — Hamburger toggle
  ============================================================ */
  (function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

    if (!hamburger || !mobileMenu) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent background scroll

      // Make links tabbable
      mobileLinks.forEach(function (link) {
        link.setAttribute('tabindex', '0');
      });
    }

    function closeMenu() {
      isOpen = false;
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';

      // Remove tabindex
      mobileLinks.forEach(function (link) {
        link.setAttribute('tabindex', '-1');
      });
    }

    function toggleMenu() {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close on link click
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close on window resize to tablet/desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && isOpen) {
        closeMenu();
      }
    }, { passive: true });
  })();

  /* ============================================================
     3. TYPING ANIMATION — Rotating role titles
  ============================================================ */
  (function initTypingAnimation() {
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;

    /* Array of strings to cycle through */
    const phrases = [
      'Laravel Developer',
      'Backend Engineer',
      'REST API Expert',
      'AI Integration Dev',
      'PHP Specialist',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    /* Timing configuration (ms) */
    const TYPE_SPEED = 75;   // ms per character typed
    const DELETE_SPEED = 40;   // ms per character deleted
    const PAUSE_AFTER = 2000; // ms to wait after full phrase is typed
    const PAUSE_BEFORE = 300;  // ms to wait before typing next phrase

    function tick() {
      const currentPhrase = phrases[phraseIndex];

      if (isPaused) {
        isPaused = false;
        isDeleting = true;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }

      if (isDeleting) {
        // Remove one character
        charIndex--;
        typingEl.textContent = currentPhrase.slice(0, charIndex);

        if (charIndex === 0) {
          // Finished deleting — move to next phrase
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, PAUSE_BEFORE);
          return;
        }

        setTimeout(tick, DELETE_SPEED);
      } else {
        // Add one character
        charIndex++;
        typingEl.textContent = currentPhrase.slice(0, charIndex);

        if (charIndex === currentPhrase.length) {
          // Finished typing — pause before deleting
          isPaused = true;
          setTimeout(tick, PAUSE_AFTER);
          return;
        }

        setTimeout(tick, TYPE_SPEED);
      }
    }

    // Start after a brief delay (let hero entrance animation play first)
    setTimeout(tick, 1200);
  })();

  /* ============================================================
     4. SMOOTH SCROLL — Enhanced anchor navigation
     (CSS scroll-behavior:smooth is already set, this adds
      offset correction for the fixed navbar)
  ============================================================ */
  (function initSmoothScroll() {
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72'
    );

    document.addEventListener('click', function (e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });

      // Update URL without triggering scroll (for SPA-like feel)
      if (history.pushState) {
        history.pushState(null, null, targetId);
      }
    });
  })();

  /* ============================================================
     5. FOOTER YEAR — Dynamic copyright year
  ============================================================ */
  (function initFooterYear() {
    const yearEl = document.getElementById('footerYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  })();

  /* ============================================================
     6. PAGE LOADER — Remove any loading state on full load
  ============================================================ */
  (function initPageLoad() {
    window.addEventListener('load', function () {
      document.body.classList.add('loaded');
    });
  })();

  /* ============================================================
     7. LAZY LOAD IMAGES — Use native loading="lazy" supplement
  ============================================================ */
  (function initLazyImages() {
    // Add loading="lazy" to all images not already marked
    document.querySelectorAll('img:not([loading])').forEach(function (img) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  })();

  /* ============================================================
     8. TOOLTIP — Show skill name on floating icon hover (mobile)
  ============================================================ */
  (function initFloatingIconTitles() {
    const iconMapping = {
      'icon-php': 'PHP',
      'icon-laravel': 'Laravel',
      'icon-mysql': 'MySQL',
      'icon-react': 'React',
      'icon-api': 'REST API',
      'icon-git': 'Git',
    };

    Object.entries(iconMapping).forEach(function ([cls, label]) {
      const el = document.querySelector('.' + cls);
      if (el) {
        el.setAttribute('title', label);
        el.setAttribute('aria-label', label + ' technology');
      }
    });
  })();

  /* ============================================================
     9. PROJECT FILTER TABS
  ============================================================ */
  (function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.proj-filter');
    const projCards = document.querySelectorAll('.proj-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter cards
        projCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  })();

  /* ============================================================
     10. PROJECT CARD — Mouse Glow effect
  ============================================================ */
  (function initCardMouseGlow() {
    const cards = document.querySelectorAll('.proj-card');

    cards.forEach(function (card) {
      const glow = card.querySelector('.proj-card-glow');
      if (!glow) return;

      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
      });
    });
  })();

  /* ============================================================
     11. PROJECT MODAL
  ============================================================ */
  (function initProjectModal() {
    const overlay = document.getElementById('projModalOverlay');
    const modal = document.getElementById('projModal');
    const closeBtn = document.getElementById('projModalClose');
    const content = document.getElementById('projModalContent');

    if (!overlay || !modal || !closeBtn || !content) return;

    /* Mini project DB — maps data-project to extended info */
    const projectData = {
      firstmedix: { title: 'First Medix', category: 'Healthcare', desc: 'A comprehensive Healthcare Information Management System handling patient records, clinical workflows, appointments, and billing. Designed for multi-branch hospital networks with real-time data visibility across departments.' },
      ems: { title: 'Employee Management System', category: 'HRMS', desc: 'Full-featured HRMS covering the complete employee lifecycle. Includes payroll automation, QR-based attendance with geo-fencing, performance reviews, leave management, and multi-department analytics.' },
      studygenius: { title: 'Study Genius AI', category: 'AI Platform', desc: 'AI-powered adaptive learning platform integrating OpenAI GPT for dynamic content generation. Features spaced repetition quizzes, personalized study paths, and real-time progress reporting.' },
      asset: { title: 'Asset Management Platform', category: 'Enterprise SaaS', desc: 'Enterprise asset lifecycle management covering acquisition, tracking via QR/barcode, depreciation calculations, maintenance scheduling, and compliance audits with full role-based access control.' },
      wrkman: { title: 'Wrkman', category: 'Field Service', desc: 'End-to-end field service management connecting businesses with skilled tradespeople. Features real-time GPS tracking, job dispatch, automated quote-to-invoice workflows, and Firebase-powered push notifications.' },
      parq: { title: 'Parq', category: 'Smart Parking', desc: 'IoT-integrated smart parking management platform with real-time slot availability, QR-based entry/exit, payment gateway integration, and an operator dashboard for revenue analytics.' },
      fitness: { title: 'Health & Fitness App', category: 'Healthcare', desc: 'Personalized fitness platform with AI-generated workout & meal plans, real-time Firebase chat between trainers and clients, streak tracking, and detailed progress visualization.' },
      games: { title: 'Dream App Games', category: 'Gaming', desc: 'Multi-game backend platform with real-time Firebase leaderboards, in-app purchases, virtual currency management, social features, and game state sync with anti-cheat validation.' },
      embro: { title: 'EmbroHub', category: 'Marketplace', desc: 'B2B embroidery marketplace managing multi-vendor orders, digitization requests, file delivery workflows, and bulk pricing/quote engines for designers, manufacturers, and retailers.' },
      playzone: { title: 'PlayZone Fun', category: 'Entertainment', desc: 'Subscription-based entertainment hub offering interactive games, streaming content, and social community features. Includes freemium access tiers, content delivery optimization, and a social moderation pipeline.' },
      viraal: { title: 'Viraal Call', category: 'Telecom', desc: 'Next-gen VoIP platform with viral referral-based growth mechanics, virtual number provisioning, real-time call management, and a comprehensive analytics and reporting suite.' },
      klyvro: { title: 'KLYVRO', category: 'AI SaaS', desc: 'AI-powered restaurant marketing SaaS that helps restaurants generate marketing campaigns and channel-specific social content, manage campaigns, track AI usage, and grow their online presence with a streamlined marketing workflow.' },
    };

    function openModal(projectKey) {
      const data = projectData[projectKey];
      if (!data) return;

      content.innerHTML = '<div style="padding: 1.5rem 0 0;">'
        + '<div style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent);margin-bottom:0.75rem;">' + data.category + '</div>'
        + '<h2 style="font-family:var(--font-primary);font-size:1.75rem;font-weight:800;color:var(--color-text);margin-bottom:1rem;line-height:1.2;">' + data.title + '</h2>'
        + '<p style="font-size:1rem;color:var(--color-text-sec);line-height:1.85;">' + data.desc + '</p>'
        + '</div>';

      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeModal() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Open on "View Details" clicks
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.proj-details-btn');
      if (btn) {
        openModal(btn.getAttribute('data-project'));
      }
    });

    // Close
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  })();

  /* ============================================================
     12. TOAST NOTIFICATION SYSTEM
  ============================================================ */
  var Toast = (function () {
    var container = document.getElementById('toastContainer');

    function show(type, title, message, duration) {
      if (!container) return;
      duration = duration || 4500;

      var icons = {
        success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
        error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      };

      var toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.setAttribute('role', 'alert');
      toast.innerHTML =
        '<div class="toast-icon">' + (icons[type] || '') + '</div>' +
        '<div class="toast-body">' +
        '<div class="toast-title">' + title + '</div>' +
        '<div class="toast-msg">' + message + '</div>' +
        '</div>' +
        '<div class="toast-close" aria-label="Dismiss" tabindex="0">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</div>';

      container.appendChild(toast);
      // Trigger entrance
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { toast.classList.add('show'); });
      });

      function dismiss() {
        toast.classList.remove('show');
        toast.classList.add('hide');
        toast.addEventListener('transitionend', function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, { once: true });
      }

      toast.querySelector('.toast-close').addEventListener('click', dismiss);
      toast.querySelector('.toast-close').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') dismiss();
      });
      setTimeout(dismiss, duration);
    }

    return { success: function (t, m) { show('success', t, m); }, error: function (t, m) { show('error', t, m); } };
  })();

  /* ============================================================
     12b. CONTACT FORM — Real EmailJS Integration
  ============================================================ */
  (function initContactForm() {
    var form = document.getElementById('contactForm');
    var submitBtn = document.getElementById('formSubmitBtn');
    if (!form || !submitBtn) return;

    /* Helpers */
    function setLoading(loading) {
      if (loading) {
        submitBtn.disabled = true;
        submitBtn.querySelector('.submit-label').innerHTML =
          '<span class="btn-spinner"></span> Sending…';
      } else {
        submitBtn.disabled = false;
        submitBtn.querySelector('.submit-label').innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
      }
    }

    function markError(el) {
      el.style.borderColor = '#ef4444';
      el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.12)';
      el.addEventListener('input', function () {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }, { once: true });
    }

    function validate() {
      var name = form.querySelector('#contactName');
      var email = form.querySelector('#contactEmail');
      var subject = form.querySelector('#contactSubject');
      var message = form.querySelector('#contactMessage');
      var ok = true;

      [name, subject, message].forEach(function (f) {
        if (!f.value.trim()) { markError(f); ok = false; }
      });

      var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRx.test(email.value.trim())) {
        markError(email); ok = false;
      }

      if (message.value.trim().length < 20) {
        markError(message);
        Toast.error('Message too short', 'Please write at least 20 characters.');
        ok = false;
      }

      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;

      setLoading(true);

      /* EmailJS.send — configured via emailjs.config.js */
      if (typeof emailjs === 'undefined') {
        Toast.error('Service Unavailable', 'Email service could not load. Please try again.');
        setLoading(false);
        return;
      }

      var params = {
        from_name: form.querySelector('#contactName').value.trim(),
        from_email: form.querySelector('#contactEmail').value.trim(),
        subject: form.querySelector('#contactSubject').value.trim(),
        message: form.querySelector('#contactMessage').value.trim(),
        to_name: 'Vishal',
      };

      emailjs.send(
        window.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        window.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        params
      ).then(function () {
        setLoading(false);
        Toast.success('Message Sent! 🎉', 'Thanks for reaching out. I\'ll reply within 24 hours.');
        form.reset();
      }).catch(function (err) {
        setLoading(false);
        console.error('EmailJS error:', err);
        Toast.error('Failed to Send', 'Something went wrong. Please email me directly.');
      });
    });
  })();

  /* ============================================================
     13. BACK TO TOP
  ============================================================ */
  (function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

})();
