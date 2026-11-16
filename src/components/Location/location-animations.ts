import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger, svg } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

export function initLocationSection(): void {
  const section = document.querySelector<HTMLElement>('[data-location-section]');
  if (!section) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const mm = gsap.matchMedia();
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const eyebrow = section.querySelector<HTMLElement>('[data-location-eyebrow]');
    const rule = section.querySelector<HTMLElement>('[data-location-rule]');
    const titleLines = gsap.utils.toArray<HTMLElement>('[data-location-line]');
    const lead = section.querySelector<HTMLElement>('[data-location-lead]');
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-location-item]'));
    const ctaWrap = section.querySelector<HTMLElement>('[data-location-cta]');
    const visual = section.querySelector<HTMLElement>('[data-location-visual]');
    const badge = section.querySelector<HTMLElement>('[data-location-badge]');
    const parallaxImg = section.querySelector<HTMLElement>('[data-location-parallax-img]');
    const bottomLeftArc = section.querySelector<HTMLElement>('[data-location-arc]');
    const drawPaths = section.querySelectorAll<SVGGeometryElement>('[data-location-draw]');
    const pulseRing = section.querySelector<HTMLElement>('[data-location-pulse]');
    const magneticCta = section.querySelector<HTMLElement>('[data-magnetic-location-cta]');

    const introTl = gsap.timeline({
      defaults: { ease: 'power3.out', clearProps: 'transform,opacity' },
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        once: true,
      },
    });

    if (eyebrow) introTl.from(eyebrow, { y: 12, opacity: 0, duration: 0.45 }, 0);
    if (rule) introTl.from(rule, { scaleX: 0, duration: 0.55 }, 0.08);
    if (titleLines.length > 0) {
      introTl.from(titleLines, { y: 24, opacity: 0, duration: 0.65, stagger: 0.1 }, 0.14);
    }
    if (lead) introTl.from(lead, { y: 16, opacity: 0, duration: 0.5 }, 0.3);
    if (ctaWrap) introTl.from(ctaWrap, { y: 14, opacity: 0, duration: 0.5 }, 0.55);
    if (visual) {
      introTl.from(visual, { y: 28, scale: 0.97, opacity: 0, duration: 0.8 }, 0.2);
    }
    if (badge) {
      introTl.from(badge, { y: 16, opacity: 0, duration: 0.5 }, 0.52);
    }

    // Staggered Anime.js reveal for info rows
    if (items.length > 0) {
      gsap.set(items, { opacity: 0, x: -16 });

      ScrollTrigger.create({
        trigger: section.querySelector('[data-location-details]'),
        start: 'top 86%',
        once: true,
        onEnter: () => {
          animate(items, {
            translateX: [-16, 0],
            opacity: [0, 1],
            duration: 540,
            delay: stagger(95),
            ease: 'outCubic',
            onComplete: () => {
              gsap.set(items, { clearProps: 'transform,opacity' });
            },
          });
        },
      });
    }

    // Icon micro-spring on hover
    items.forEach((item) => {
      const icon = item.querySelector<HTMLElement>('[data-location-icon]');
      if (!icon) return;
      item.addEventListener('mouseenter', () => {
        animate(icon, {
          scale: [1, 1.12, 1],
          duration: 420,
          ease: 'outBack(1.8)',
        });
      });
    });

    // Organic SVG contour lines drawing
    if (drawPaths.length > 0) {
      const drawable = svg.createDrawable(drawPaths);
      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          animate(drawable, {
            draw: ['0 0', '0 1'],
            duration: 1300,
            delay: stagger(180),
            ease: 'outCubic',
          });
        },
      });
    }

    // Subtle parallax inside facade frame & corner arc
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
            scrub: 1.15,
          },
        },
      );
    }

    if (bottomLeftArc) {
      gsap.fromTo(
        bottomLeftArc,
        { y: 24 },
        {
          y: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.1,
          },
        },
      );
    }

    // Live Ondina radar pulse beacon on badge
    if (pulseRing) {
      animate(pulseRing, {
        scale: [0.8, 2.2],
        opacity: [0.8, 0],
        duration: 1900,
        ease: 'outExpo',
        loop: true,
      });
    }

    // Magnetic CTA
    if (magneticCta && hasFinePointer) {
      const ctaX = gsap.quickTo(magneticCta, 'x', { duration: 0.35, ease: 'power2.out' });
      const ctaY = gsap.quickTo(magneticCta, 'y', { duration: 0.35, ease: 'power2.out' });

      magneticCta.addEventListener('pointermove', (event) => {
        const rect = magneticCta.getBoundingClientRect();
        const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
        ctaX(offsetX);
        ctaY(offsetY);
      });

      magneticCta.addEventListener('pointerleave', () => {
        ctaX(0);
        ctaY(0);
      });
    }
  });
}
