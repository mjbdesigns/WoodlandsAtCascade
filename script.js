/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== HERO SLIDER ===== */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let slideTimer;

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }

function startSlider() {
  slideTimer = setInterval(nextSlide, 5000);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideTimer);
    goToSlide(i);
    startSlider();
  });
});

startSlider();

/* ===== TESTIMONIALS CAROUSEL ===== */
const track = document.querySelector('.testimonials-track');
const cards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('tPrev');
const nextBtn = document.getElementById('tNext');
let tIndex = 0;

function getVisible() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function updateCarousel() {
  const visible = getVisible();
  const max = Math.max(0, cards.length - visible);
  tIndex = Math.min(tIndex, max);
  const cardWidth = cards[0].getBoundingClientRect().width + 24;
  track.style.transform = `translateX(-${tIndex * cardWidth}px)`;
}

prevBtn.addEventListener('click', () => { tIndex = Math.max(0, tIndex - 1); updateCarousel(); });
nextBtn.addEventListener('click', () => {
  const visible = getVisible();
  tIndex = Math.min(tIndex + 1, cards.length - visible);
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => observer.observe(el));

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById('tourForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Thank You! We\'ll Be In Touch.';
    btn.disabled = true;
    btn.style.background = '#2F5D50';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 4000);
  });
}
