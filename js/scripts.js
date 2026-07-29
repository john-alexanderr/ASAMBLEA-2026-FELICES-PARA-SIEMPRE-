(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  /* ─── LENIS ─── */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    infinite: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ─── DUST PARTICLES ─── */
  const dustContainer = document.getElementById('dust-particles');
  if (dustContainer) {
    const count = Math.min(40, Math.floor(window.innerWidth / 16));
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'dust-dot';
      const size = 2 + Math.random() * 4;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.opacity = 0.15 + Math.random() * 0.35;
      dustContainer.appendChild(dot);
      gsap.to(dot, {
        y: -(30 + Math.random() * 60),
        x: (Math.random() - 0.5) * 40,
        opacity: 0,
        duration: 8 + Math.random() * 12,
        repeat: -1,
        delay: Math.random() * 10,
        ease: 'none',
      });
    }
  }

  /* ─── KEN BURNS ─── */
  const bgImage = document.getElementById('bg-image');
  const bgOverlay = document.getElementById('bg-overlay');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#scene',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
    },
  });
  if (bgImage) {
    tl.to(bgImage, { scale: 1.12, y: '-3%', x: '-2%', ease: 'power1.inOut' }, 0);
  }

  /* ─── OVERLAY DARKEN BY SECTION ─── */
  ScrollTrigger.create({
    trigger: '#recursos',
    start: 'top 60%',
    end: 'bottom 40%',
    onEnter: () => gsap.to(bgOverlay, { opacity: 1, duration: 0.8 }),
    onLeaveBack: () => gsap.to(bgOverlay, { opacity: 0.65, duration: 0.8 }),
  });
  ScrollTrigger.create({
    trigger: '#servicios',
    start: 'top 60%',
    end: 'bottom 40%',
    onEnter: () => gsap.to(bgOverlay, { opacity: 1, duration: 0.8 }),
    onLeaveBack: () => gsap.to(bgOverlay, { opacity: 1, duration: 0.8 }),
  });
  ScrollTrigger.create({
    trigger: '#cita',
    start: 'top 70%',
    end: 'bottom 40%',
    onEnter: () => gsap.to(bgOverlay, { opacity: 0.85, duration: 0.8 }),
    onLeaveBack: () => gsap.to(bgOverlay, { opacity: 1, duration: 0.8 }),
  });

  /* ─── FOG CONTROL ─── */
  const fogs = document.querySelectorAll('.fog');
  const fogSections = [0.15, 0.4, 0.65, 0.85];
  fogs.forEach((fog, i) => {
    ScrollTrigger.create({
      trigger: '#scene',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        let opacity = 0;
        if (i === 0) opacity = Math.sin(progress * Math.PI) * 0.7;
        else if (i === 1) opacity = Math.sin((progress + 0.3) * Math.PI) * 0.5;
        else opacity = Math.sin((progress + 0.5) * Math.PI) * 0.4;
        fog.style.opacity = Math.max(0, opacity);
      },
    });
  });

  /* ─── LIGHT RAYS ─── */
  const lightRays = document.getElementById('light-rays');
  if (lightRays) {
    ScrollTrigger.create({
      trigger: '#scene',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        lightRays.style.opacity = Math.sin(self.progress * Math.PI) * 0.5;
      },
    });
  }

  /* ─── NAVBAR SCROLL ─── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    ScrollTrigger.create({
      trigger: '#scene',
      start: 'top -50',
      end: 'bottom 0',
      onUpdate: (self) => {
        if (self.progress > 0.02) {
          nav.style.background = 'rgba(10,15,26,0.9)';
          nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
          nav.style.background = 'rgba(10,15,26,0.6)';
          nav.style.boxShadow = 'none';
        }
      },
    });
  }

  /* ─── SMOOTH ANCHOR SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -60, duration: 1.8 });
      }
      const navbar = document.getElementById('navbarNav');
      if (navbar && navbar.classList.contains('show')) {
        document.querySelector('.navbar-toggler')?.click();
      }
    });
  });

  /* ─── SECTION REVEALS ─── */
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach((el) => {
    const section = el.closest('.scene-section') || el.closest('.scene-footer') || el;
    gsap.fromTo(
      el,
      {
        opacity: 0,
        filter: 'blur(8px)',
        y: 40,
        scale: 0.92,
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ─── GLASS CARDS STAGGER ─── */
  const cardsGrids = document.querySelectorAll('.cards-grid');
  cardsGrids.forEach((grid) => {
    const cards = grid.querySelectorAll('.glass-card');
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.88,
        rotateX: 8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ─── QUOTE REVEAL ─── */
  const quote = document.querySelector('.quote-text');
  if (quote) {
    gsap.fromTo(
      quote,
      { opacity: 0, filter: 'blur(6px)', scale: 0.9 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: quote,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /* ─── HERO FLOATING ICON ─── */
  const heroIcon = document.querySelector('#hero .scene-badge i');
  if (heroIcon) {
    gsap.to(heroIcon, {
      y: -5,
      rotation: -3,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  /* ─── CARD ICONS FLOAT ─── */
  document.querySelectorAll('.card-icon').forEach((icon, i) => {
    gsap.to(icon, {
      y: -4,
      rotation: i % 2 === 0 ? 2 : -2,
      duration: 2.5 + (i * 0.3),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.2,
    });
  });

  /* ─── SOCIAL LINKS FLOAT ─── */
  document.querySelectorAll('.social-link').forEach((link, i) => {
    gsap.to(link, {
      y: -3,
      duration: 2 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.15,
    });
  });

  /* ─── SCROLL HINT HIDE ─── */
  ScrollTrigger.create({
    trigger: '#recursos',
    start: 'top 90%',
    onEnter: () => {
      const hint = document.querySelector('.scroll-hint');
      if (hint) gsap.to(hint, { opacity: 0, duration: 0.6, onComplete: () => hint.remove() });
    },
  });

  /* ─── RESIZE ─── */
  ScrollTrigger.addEventListener('refresh', () => lenis.resize());
  window.addEventListener('resize', () => ScrollTrigger.refresh());
})();