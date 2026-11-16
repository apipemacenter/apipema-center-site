import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger, svg } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

export function initServicesSection(): void {
  const section = document.querySelector<HTMLElement>('[data-services-section]');
  if (!section) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const mm = gsap.matchMedia();
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const eyebrow = section.querySelector<HTMLElement>('[data-services-eyebrow]');
    const rule = section.querySelector<HTMLElement>('[data-services-rule]');
    const titleLines = gsap.utils.toArray<HTMLElement>('[data-services-line]');
    const accentWord = section.querySelector<HTMLElement>('[data-services-accent]');
    const lead = section.querySelector<HTMLElement>('[data-services-lead]');
    const vignette = section.querySelector<HTMLElement>('[data-services-vignette]');
    const parallaxImg = section.querySelector<HTMLElement>('[data-services-parallax-img]');
    const waves = gsap.utils.toArray<HTMLElement>('[data-services-wave]');
    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-service-card]'));
    const drawPaths = section.querySelectorAll<SVGGeometryElement>('[data-services-draw]');

    // 1. Editorial header & vignette entrance
    const introTl = gsap.timeline({
      defaults: { ease: 'power3.out', clearProps: 'transform,opacity' },
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        once: true,
      },
    });

    if (eyebrow) {
      introTl.from(eyebrow, { y: 12, opacity: 0, duration: 0.45 }, 0);
    }
    if (rule) {
      introTl.from(rule, { scaleX: 0, duration: 0.55 }, 0.08);
    }
    if (titleLines.length > 0) {
      introTl.from(titleLines, { y: 24, opacity: 0, duration: 0.65, stagger: 0.1 }, 0.14);
    }
    if (accentWord) {
      introTl.from(accentWord, { scale: 0.94, duration: 0.45, ease: 'back.out(1.6)' }, 0.34);
    }
    if (lead) {
      introTl.from(lead, { y: 16, opacity: 0, duration: 0.55 }, 0.32);
    }
    if (vignette) {
      introTl.from(
        vignette,
        {
          scale: 1.04,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.out',
        },
        0.1,
      );
    }
    if (waves.length > 0) {
      introTl.from(
        waves,
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
        },
        0.25,
      );
    }

    // 2. Smooth scroll parallax inside the curved photo frame
    if (parallaxImg) {
      gsap.fromTo(
        parallaxImg,
        { yPercent: -6 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        },
      );
    }

    // 3. Organic SVG contour line drawing with Anime.js v4
    if (drawPaths.length > 0) {
      const drawable = svg.createDrawable(drawPaths);
      gsap.set(drawPaths, { opacity: 0.99 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          animate(drawable, {
            draw: ['0 0', '0 1'],
            duration: 1350,
            delay: stagger(160),
            ease: 'outCubic',
          });
        },
      });
    }

    // 4. Staggered Anime.js cascade on the 3 service cards
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 28, scale: 0.96 });

      ScrollTrigger.create({
        trigger: section.querySelector('[data-services-grid]'),
        start: 'top 86%',
        once: true,
        onEnter: () => {
          animate(cards, {
            translateY: [28, 0],
            scale: [0.96, 1],
            opacity: [0, 1],
            duration: 640,
            delay: stagger(110),
            ease: 'outCubic',
            onComplete: () => {
              gsap.set(cards, { clearProps: 'transform,opacity' });
            },
          });
        },
      });
    }

    // 5. Card hover "Design Spells": cursor spotlight + concentric icon ring + spring icon
    cards.forEach((card) => {
      const icon = card.querySelector<HTMLElement>('[data-service-icon]');
      const ring = card.querySelector<HTMLElement>('[data-service-ring]');

      const playCardSpell = (): void => {
        if (icon) {
          animate(icon, {
            scale: [1, 1.12, 1],
            duration: 440,
            ease: 'outBack(1.8)',
          });
        }
        if (ring) {
          animate(ring, {
            scale: [0.9, 1.48],
            opacity: [0.65, 0],
            duration: 640,
            ease: 'outExpo',
          });
        }
      };

      card.addEventListener('mouseenter', playCardSpell);

      if (hasFinePointer) {
        card.addEventListener('pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          card.style.setProperty('--spot-x', `${x}px`);
          card.style.setProperty('--spot-y', `${y}px`);
        });
      }
    });
  });
}
