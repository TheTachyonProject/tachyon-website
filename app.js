const toggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.mobile-menu');

toggle?.addEventListener('click', () => menu?.classList.toggle('open'));
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => menu?.classList.remove('open'))
);

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// Hardcoded production fallbacks keep checkout working even if checkout-config.js
// is delayed or unavailable. checkout-config.js can still override these values.
const fallbackCheckouts = {
  monthly: 'https://whop.com/checkout/plan_DulX0ELfxzSyT',
  quarterly: 'https://whop.com/checkout/plan_73Ny0h9vbhLlp',
  annual: 'https://whop.com/checkout/plan_7NQhyigSMh7iu',
  lifetime: 'https://whop.com/checkout/plan_3AurEJr6b252f'
};

const config = { ...fallbackCheckouts, ...(window.TACHYON_CHECKOUTS || {}) };
document.querySelectorAll('[data-checkout]').forEach(a => {
  const url = config[a.dataset.checkout];
  if (url) {
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  } else {
    a.addEventListener('click', e => {
      e.preventDefault();
      showToast('Checkout is temporarily unavailable.');
    });
  }
});

// Pricing must never appear as a blank section.
// Show the purchase cards immediately when the page loads.
document.querySelectorAll('#pricing .fade').forEach(el => el.classList.add('in'));

// Keep the subtle reveal animation everywhere else.
const remainingFade = [...document.querySelectorAll('.fade:not(.in)')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  remainingFade.forEach(el => observer.observe(el));
} else {
  remainingFade.forEach(el => el.classList.add('in'));
}
