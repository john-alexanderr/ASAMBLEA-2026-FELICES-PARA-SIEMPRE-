AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic'
});

const navbar = document.getElementById('mainNav');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10,15,26,0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      navbar.style.backdropFilter = 'blur(16px)';
    } else {
      navbar.style.background = 'rgba(10,15,26,0.8)';
      navbar.style.boxShadow = 'none';
      navbar.style.backdropFilter = 'blur(12px)';
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.click();
    }
  });
});

if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 12,
    speed: 300,
    glare: true,
    'max-glare': 0.3,
    scale: 1.02,
    gyroscope: true
  });
}

const particlesContainer = document.getElementById('particles3d');
if (particlesContainer) {
  const count = Math.min(30, Math.floor(window.innerWidth / 30));
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle-3d-dot';
    dot.style.left = Math.random() * 100 + '%';
    dot.style.setProperty('--duration', (6 + Math.random() * 10) + 's');
    dot.style.setProperty('--delay', (Math.random() * 8) + 's');
    dot.style.width = (4 + Math.random() * 6) + 'px';
    dot.style.height = dot.style.width;
    particlesContainer.appendChild(dot);
  }
}

const heroTilt = document.querySelector('.hero-3d-tilt');
if (heroTilt && !('ontouchstart' in window)) {
  heroTilt.addEventListener('mousemove', (e) => {
    const rect = heroTilt.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroTilt.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(10px)`;
  });
  heroTilt.addEventListener('mouseleave', () => {
    heroTilt.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    heroTilt.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  });
}

const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card-recursos, .card-servicio').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px) scale(0.95)';
  el.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
  revealObserver.observe(el);
});
