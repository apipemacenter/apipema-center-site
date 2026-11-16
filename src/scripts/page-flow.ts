import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initPageFlow(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressBar = document.querySelector<HTMLElement>('[data-page-progress]');

  if (prefersReduced) {
    if (progressBar) progressBar.hidden = true;
    return;
  }

  // 1. Silky Lenis smooth scroll synchronized with GSAP ScrollTrigger
  const lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Smooth anchor navigation across the connected page sections
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector<HTMLElement>(targetId);
      if (!targetEl) return;

      event.preventDefault();
      lenis.scrollTo(targetEl, {
        offset: -84,
        duration: 1.1,
      });
    });
  });

  // 2. Top scroll progress indicator linking all 4 sections
  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.25,
      },
    });
  }

  // 3. Hero -> Nossas Lojas continuous facade depth transition on scroll
  const heroSection = document.querySelector<HTMLElement>('[data-hero-section]');
  const heroImage = document.querySelector<HTMLElement>('.hero__image');

  if (heroSection && heroImage) {
    gsap.to(heroImage, {
      yPercent: 9,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.1,
      },
    });
  }
}
