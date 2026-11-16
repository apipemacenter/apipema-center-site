import gsap from 'gsap';
import { animate } from 'animejs';

export function initHeroAnimations(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const mm = gsap.matchMedia();

  // 1. GSAP entrance sequence
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const header = document.querySelector('[data-hero-header]');
    const titleLines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
    const description = document.querySelector('[data-hero-desc]');
    const cta = document.querySelector('[data-hero-cta]');
    const amenities = gsap.utils.toArray<HTMLElement>('[data-hero-amenity]');
    const media = document.querySelector('[data-hero-media]');

    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    });

    if (media) {
      tl.from(
        media,
        {
          scale: 1.035,
          opacity: 0.85,
          duration: 0.85,
        },
        0.04,
      );
    }

    if (header) {
      tl.from(
        header,
        {
          y: -14,
          opacity: 0,
          duration: 0.55,
        },
        0,
      );
    }

    if (titleLines.length > 0) {
      tl.from(
        titleLines,
        {
          y: 22,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
        },
        0.14,
      );
    }

    if (description) {
      tl.from(
        description,
        {
          y: 16,
          opacity: 0,
          duration: 0.55,
        },
        0.32,
      );
    }

    if (cta) {
      tl.from(
        cta,
        {
          y: 14,
          opacity: 0,
          duration: 0.5,
        },
        0.44,
      );
    }

    if (amenities.length > 0) {
      tl.from(
        amenities,
        {
          y: 12,
          opacity: 0,
          duration: 0.48,
          stagger: 0.09,
        },
        0.52,
      );
    }
  });

  // 2. Amenity icon micro-interaction on hover/focus
  document.querySelectorAll<HTMLElement>('[data-hero-amenity] .amenities__link').forEach((link) => {
    const icon = link.querySelector<HTMLElement>('[data-amenity-icon]');
    if (!icon) return;

    const playIconSpell = (): void => {
      animate(icon, {
        scale: [1, 1.15, 1],
        duration: 400,
        ease: 'outBack(1.6)',
      });
    };

    link.addEventListener('mouseenter', playIconSpell);
    link.addEventListener('focus', playIconSpell);
  });

  // 3. GSAP subtle pointer magnetic parallax on primary CTA
  const heroSection = document.querySelector<HTMLElement>('[data-hero-section]');
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (heroSection && hasFinePointer) {
    const layers = Array.from(heroSection.querySelectorAll<HTMLElement | SVGElement>('[data-parallax-depth]')).map(
      (el) => ({
        depth: Number(el.dataset.parallaxDepth ?? 14),
        xTo: gsap.quickTo(el, 'x', { duration: 0.75, ease: 'power3.out' }),
        yTo: gsap.quickTo(el, 'y', { duration: 0.75, ease: 'power3.out' }),
      }),
    );

    heroSection.addEventListener('pointermove', (event) => {
      const rect = heroSection.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;

      layers.forEach((layer) => {
        layer.xTo(relX * layer.depth);
        layer.yTo(relY * layer.depth);
      });
    });

    heroSection.addEventListener('pointerleave', () => {
      layers.forEach((layer) => {
        layer.xTo(0);
        layer.yTo(0);
      });
    });

    const magneticCta = heroSection.querySelector<HTMLElement>('[data-magnetic-cta]');
    if (magneticCta) {
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
  }
}
