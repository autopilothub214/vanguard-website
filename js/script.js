// =====================================================
// SHARED SCRIPT
// Fills the menu, phone, address and footer from js/site-config.js,
// and runs the mobile menu. You normally don't need to edit this.
// =====================================================

// ---------- Fill in business info everywhere ----------
// Any element with data-site="name" (or address / hours / phone / tagline)
// gets that value from site-config.js.
document.querySelectorAll('[data-site]').forEach(function (el) {
  const value = SITE[el.dataset.site];
  if (value) el.textContent = value;
});

// Tap-to-call links
document.querySelectorAll('[data-site-phone-link]').forEach(function (el) {
  el.href = 'tel:' + SITE.phoneLink;
  // Buttons that already say "Call us" keep their words; others show the number
  if (!el.textContent.trim()) el.textContent = SITE.phone;
  else el.textContent = 'Call ' + SITE.phone;
});

// The sticky call bar on phones
document.querySelectorAll('[data-site-phone-link-label]').forEach(function (el) {
  el.href = 'tel:' + SITE.phoneLink;
  el.textContent = el.dataset.siteMobileLabel || 'Call ' + SITE.phone;
});

// Email: shown only when an address is set in site-config.js
if (SITE.email) {
  const wrap = document.querySelector('[data-site-email-wrap]');
  const link = document.querySelector('[data-site-email-link]');
  if (wrap && link) {
    link.href = 'mailto:' + SITE.email;
    link.textContent = SITE.email;
    wrap.hidden = false;
  }
}

// Draft ribbon
if (SITE.mockup) {
  document.getElementById('mockup-ribbon').hidden = false;
  document.body.classList.add('has-ribbon');
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


// ---------- Build the menu ----------
const nav = document.getElementById('main-nav');
SITE.nav.forEach(function (item) {
  const a = document.createElement('a');
  a.href = item.href;
  a.textContent = item.label;
  nav.appendChild(a);
});
const navBtn = document.createElement('a');
navBtn.href = SITE.navButton.href;
navBtn.textContent = SITE.navButton.label;
navBtn.className = 'btn btn-orange nav-btn';
nav.appendChild(navBtn);


// ---------- Mobile menu (hamburger) ----------
const toggle = document.getElementById('menu-toggle');

function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

toggle.addEventListener('click', function () {
  setMenu(!nav.classList.contains('open'));
});

// Close the menu after tapping a link, or pressing Escape
nav.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') setMenu(false);
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') setMenu(false);
});


// ---------- Contact form (MOCKUP ONLY) ----------
// Not connected yet. At launch this will send to the client's email.
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('form-msg').textContent =
    'Mockup only: this form will be connected before launch.';
});
