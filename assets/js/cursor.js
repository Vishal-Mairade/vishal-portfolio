/**
 * cursor.js — Custom Cursor Module
 * Portfolio: Vishal Mairade | Senior PHP Laravel Developer
 *
 * Implements a smooth dual-element cursor:
 *  - .cursor-dot:     snaps immediately to mouse position
 *  - .cursor-outline: follows with spring-like lag
 *
 * Hover states enlarge & recolor both elements on interactive targets.
 */

(function () {
  'use strict';

  /* ── Element references ── */
  const dot     = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');

  if (!dot || !outline) return; // Safety guard

  /* ── State ── */
  let mouseX = -100, mouseY = -100; // Start off-screen
  let outlineX = -100, outlineY = -100;
  let isHovered = false;
  let rafId = null;

  /* ── Interactive targets that trigger hover state ── */
  const HOVER_SELECTORS = [
    'a',
    'button',
    '[role="button"]',
    '.btn',
    '.skill-card',
    '.about-stat-card',
    '.social-icon-btn',
    '.nav-link',
    '.mobile-nav-link',
    '.domain-tag',
    '.code-card',
    '.floating-icon',
  ].join(', ');

  /* ── Track mouse position ── */
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Snap dot immediately
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  /* ── Smooth outline via lerp loop ── */
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animateOutline() {
    // Lerp factor — lower = more lag, higher = snappier
    const lerpFactor = 0.12;

    outlineX = lerp(outlineX, mouseX, lerpFactor);
    outlineY = lerp(outlineY, mouseY, lerpFactor);

    outline.style.left = outlineX + 'px';
    outline.style.top  = outlineY + 'px';

    rafId = requestAnimationFrame(animateOutline);
  }

  rafId = requestAnimationFrame(animateOutline);

  /* ── Hover detection ── */
  document.addEventListener('mouseover', function (e) {
    if (e.target.matches && e.target.closest(HOVER_SELECTORS)) {
      if (!isHovered) {
        isHovered = true;
        dot.classList.add('hovered');
        outline.classList.add('hovered');
      }
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.matches && e.target.closest(HOVER_SELECTORS)) {
      // Only remove if the new target is NOT another hover element
      if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(HOVER_SELECTORS)) {
        isHovered = false;
        dot.classList.remove('hovered');
        outline.classList.remove('hovered');
      }
    }
  });

  /* ── Hide cursor when leaving window ── */
  document.addEventListener('mouseleave', function () {
    dot.style.opacity     = '0';
    outline.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function () {
    dot.style.opacity     = '1';
    outline.style.opacity = '1';
  });

  /* ── Pointer down state (click feedback) ── */
  document.addEventListener('mousedown', function () {
    dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    outline.style.transform = 'translate(-50%, -50%) scale(0.85)';
  });

  document.addEventListener('mouseup', function () {
    dot.style.transform = '';
    outline.style.transform = '';
  });

})();
