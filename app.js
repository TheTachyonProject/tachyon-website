const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.mobile-menu');
toggle?.addEventListener('click',()=>menu?.classList.toggle('open'));
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>menu?.classList.remove('open')));
const toast=document.querySelector('.toast');let toastTimer;
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
const config=window.TACHYON_CHECKOUTS||{};
document.querySelectorAll('[data-checkout]').forEach(a=>{const key=a.dataset.checkout;const url=config[key];if(url){a.href=url;a.target='_blank';a.rel='noopener'}else{a.href='#pricing';a.addEventListener('click',e=>{e.preventDefault();showToast('Checkout link will be connected before launch.')})}});
