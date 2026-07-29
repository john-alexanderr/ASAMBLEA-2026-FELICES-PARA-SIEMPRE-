gsap.registerPlugin(ScrollTrigger);

gsap.to('.layer-1 img', {
  scrollTrigger: {
    trigger: '#hero-reveal',
    start: 'top top',
    end: 'bottom center',
    scrub: 1.2,
  },
  scale: 1.4,
  opacity: 0,
  filter: 'blur(12px)',
  ease: 'power2.inOut',
});

gsap.to('.layer-2 img', {
  scrollTrigger: {
    trigger: '#hero-reveal',
    start: 'top top',
    end: 'bottom center',
    scrub: 1.2,
  },
  scale: 1,
  opacity: 1,
  filter: 'blur(0px)',
  ease: 'power2.inOut',
});

gsap.to('.hero-content', {
  scrollTrigger: {
    trigger: '#hero-reveal',
    start: 'top top',
    end: 'bottom center',
    scrub: 1.2,
  },
  opacity: 0,
  y: -80,
  ease: 'power2.inOut',
});

gsap.to('.scroll-indicator', {
  scrollTrigger: {
    trigger: '#hero-reveal',
    start: 'top top',
    end: 'top 20%',
    scrub: 1,
  },
  opacity: 0,
  ease: 'power2.out',
});

AOS.init({
  duration: 800,
  once: true,
  offset: 60,
});

const navbar = document.getElementById('mainNav');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10,15,26,0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.background = 'rgba(10,15,26,0.8)';
      navbar.style.boxShadow = 'none';
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
  });
});
