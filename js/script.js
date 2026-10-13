// =====================================================
// SHARED SCRIPT
// Builds the menu, fills in business info, switches English/Spanish,
// and runs the mobile menu. You normally don't need to edit this.
// =====================================================

// ---------- Language ----------
const LANG_KEY = 'vanguard-lang';

// Which language to show first: the visitor's saved choice, otherwise
// their browser language (Spanish browsers get Spanish, everyone else English)
function startLanguage() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch (e) { /* storage blocked: that's fine */ }
  return (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
}
let lang = startLanguage();

// Remember the English text that is written in index.html, so we can switch back to it
const originals = new Map();
document.querySelectorAll('[data-i18n], [data-i18n-alt], [data-i18n-placeholder], [data-i18n-aria]').forEach(function (el) {
  originals.set(el, {
    text: el.textContent,
    alt: el.getAttribute('alt'),
    placeholder: el.getAttribute('placeholder'),
    aria: el.getAttribute('aria-label')
  });
});

// The page title and description (shown in the browser tab and in Google)
const metaDesc = document.getElementById('meta-desc');
const originalTitle = document.title;
const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';

// Pick the right language for one piece of text
function pick(key, english) {
  return lang === 'es' && ES[key] ? ES[key] : english;
}


// ---------- Draw (and redraw) the whole page in the chosen language ----------
const nav = document.getElementById('main-nav');
const toggle = document.getElementById('menu-toggle');
const langBtn = document.getElementById('lang-toggle');

function render() {
  const ui = UI[lang];
  document.documentElement.lang = lang;

  // Page title + description
  document.title = pick('meta.title', originalTitle);
  if (metaDesc) metaDesc.setAttribute('content', pick('meta.description', originalDesc));

  // Every translated piece of text
  originals.forEach(function (orig, el) {
    if (el.dataset.i18n) el.textContent = pick(el.dataset.i18n, orig.text);
    if (el.dataset.i18nAlt) el.setAttribute('alt', pick(el.dataset.i18nAlt, orig.alt));
    if (el.dataset.i18nPlaceholder) el.setAttribute('placeholder', pick(el.dataset.i18nPlaceholder, orig.placeholder));
    if (el.dataset.i18nAria) el.setAttribute('aria-label', pick(el.dataset.i18nAria, orig.aria));
  });

  // Business info from site-config.js (address, hours, name)
  document.querySelectorAll('[data-site]').forEach(function (el) {
    const field = el.dataset.site;
    const value = (lang === 'es' && SITE[field + 'Es']) || SITE[field];
    if (value) el.textContent = value;
  });

  // Tap-to-call links
  document.querySelectorAll('[data-site-phone-link]').forEach(function (el) {
    el.href = 'tel:' + SITE.phoneLink;
    // Buttons marked data-phone-prefix read "Call (305) ..." / "Llamar (305) ..."
    el.textContent = el.hasAttribute('data-phone-prefix') ? ui.call + ' ' + SITE.phone : SITE.phone;
  });

  // Sticky call bar on phones
  document.querySelectorAll('[data-site-call-bar]').forEach(function (el) {
    el.href = 'tel:' + SITE.phoneLink;
    el.textContent = ui.call + ' ' + SITE.phone;
  });

  // Menu links
  nav.querySelectorAll('a').forEach(function (a) { a.remove(); });
  SITE.nav.forEach(function (item) {
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = (lang === 'es' && item.es) || item.label;
    nav.appendChild(a);
  });
  const navBtn = document.createElement('a');
  navBtn.href = SITE.navButton.href;
  navBtn.textContent = (lang === 'es' && SITE.navButton.es) || SITE.navButton.label;
  navBtn.className = 'btn btn-orange nav-btn';
  nav.appendChild(navBtn);

  // Language button shows the language you can switch TO
  langBtn.textContent = ui.langBtn;
  langBtn.setAttribute('aria-label', ui.switchTo);
  langBtn.setAttribute('lang', lang === 'es' ? 'en' : 'es');

  // Hamburger label
  toggle.setAttribute('aria-label', nav.classList.contains('open') ? ui.menuClose : ui.menuOpen);

  // Contact form note, if it is showing
  const msg = document.getElementById('form-msg');
  if (msg.dataset.shown) msg.textContent = ui.formMsg;
}

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
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

render();


// ---------- Language button ----------
langBtn.addEventListener('click', function () {
  lang = lang === 'es' ? 'en' : 'es';
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ok */ }
  render();
});


// ---------- Mobile menu (hamburger) ----------
function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? UI[lang].menuClose : UI[lang].menuOpen);
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
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.dataset.shown = '1';
  msg.textContent = UI[lang].formMsg;
});
