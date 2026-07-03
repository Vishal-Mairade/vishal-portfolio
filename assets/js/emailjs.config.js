/**
 * emailjs.config.js — EmailJS Setup & Initialization
 * ─────────────────────────────────────────────────────
 * HOW TO CONFIGURE (one-time setup, ~5 minutes):
 *
 * STEP 1 — Create a FREE EmailJS account
 *   → https://www.emailjs.com/  (free tier: 200 emails/month)
 *
 * STEP 2 — Add an Email Service
 *   Dashboard → Email Services → Add New Service → Gmail
 *   Connect your Gmail account (vishalmairade@gmail.com)
 *   Copy the Service ID (looks like: service_xxxxxxx)
 *
 * STEP 3 — Create an Email Template
 *   Dashboard → Email Templates → Create New Template
 *
 *   Suggested template body:
 *   ─────────────────────────
 *   Subject: {{subject}}
 *
 *   Hello {{to_name}},
 *
 *   You have a new contact form submission:
 *
 *   Name:    {{from_name}}
 *   Email:   {{from_email}}
 *   Subject: {{subject}}
 *
 *   Message:
 *   {{message}}
 *   ─────────────────────────
 *   Set "To Email" to: vishalmairade@gmail.com
 *   Copy the Template ID (looks like: template_xxxxxxx)
 *
 * STEP 4 — Get Your Public Key
 *   Dashboard → Account → General → Public Key
 *
 * STEP 5 — Fill in the values below and SAVE.
 * ─────────────────────────────────────────────────────
 */

(function () {
  // ── FILL THESE IN ────────────────────────────────────
  var EMAILJS_PUBLIC_KEY = 'CbMO9il5rSipbxYaM';    // e.g. 'abc123XYZdef'
  var EMAILJS_SERVICE_ID = 'service_09sb95k';    // e.g. 'service_a1b2c3'
  var EMAILJS_TEMPLATE_ID = 'template_fa46vgi';   // e.g. 'template_x9y8z7'
  // ─────────────────────────────────────────────────────

  // Expose IDs to main.js form handler
  window.EMAILJS_SERVICE_ID = EMAILJS_SERVICE_ID;
  window.EMAILJS_TEMPLATE_ID = EMAILJS_TEMPLATE_ID;

  // Initialize EmailJS SDK
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    console.info('[EmailJS] Initialized successfully.');
  } else {
    console.warn('[EmailJS] SDK not loaded. Check your internet connection or CDN block.');
  }
})();
