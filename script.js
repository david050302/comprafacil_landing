const WHATSAPP_NUMBER = '51967043222';

function buildWhatsAppUrl(category = 'mis cosas usadas') {
  const message = `Hola 👋 Vi su página web. Quiero vender ${category}. Tengo fotos para enviarles y quisiera una cotización.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function trackWhatsappClick(category) {
  // Analytics genérico. Cuando agregues Google Tag, estos eventos ya quedarán listos.
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'lead',
      event_label: category || 'general'
    });
    // Para una conversión oficial de Google Ads, agrega aquí el send_to que te entregue Google.
    // window.gtag('event','conversion',{send_to:'AW-XXXXXXXXX/XXXXXXXX'});
  }
}

document.querySelectorAll('.wa-link').forEach(link => {
  const category = link.dataset.category || 'mis cosas usadas';
  link.href = buildWhatsAppUrl(category);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.addEventListener('click', () => trackWhatsappClick(category));
});

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.main-nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(opened));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();
