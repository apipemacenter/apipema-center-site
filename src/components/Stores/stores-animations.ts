import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

export function initStoresSection(): void {
  const section = document.querySelector<HTMLElement>('[data-stores-section]');
  if (!section) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const viewport = section.querySelector<HTMLElement>('[data-stores-viewport]');
  const prevBtn = section.querySelector<HTMLButtonElement>('[data-stores-prev]');
  const nextBtn = section.querySelector<HTMLButtonElement>('[data-stores-next]');
  const progressThumb = section.querySelector<HTMLElement>('[data-stores-progress]');
  const progressBar = section.querySelector<HTMLElement>('.stores__progress');
  const tabsContainer = section.querySelector<HTMLElement>('[data-stores-tabs]');
  const tabIndicator = section.querySelector<HTMLElement>('[data-tab-indicator]');
  const tabs = Array.from(section.querySelectorAll<HTMLButtonElement>('[data-store-tab]'));
  const slides = Array.from(section.querySelectorAll<HTMLElement>('[data-store-card]'));
  const interactiveCards = Array.from(section.querySelectorAll<HTMLElement>('[data-store-interactive]'));

  // 1. Carousel scroll controls, drag-to-scroll & progress indicator
  const updateCarouselState = (): void => {
    if (!viewport) return;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const current = viewport.scrollLeft;
    const hasOverflow = maxScroll > 8;

    if (prevBtn) prevBtn.disabled = current <= 4;
    if (nextBtn) nextBtn.disabled = !hasOverflow || current >= maxScroll - 4;
    if (progressBar) progressBar.style.opacity = hasOverflow ? '1' : '0.35';

    if (progressThumb) {
      const ratio = maxScroll > 0 ? current / maxScroll : 0;
      const trackTravel = 127;
      progressThumb.style.transform = `translateX(${ratio * trackTravel}%)`;
    }
  };

  const scrollCarousel = (direction: -1 | 1): void => {
    if (!viewport) return;
    const step = Math.max(260, viewport.clientWidth * 0.62);
    viewport.scrollBy({
      left: direction * step,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });

    if (!prefersReduced) {
      const btn = direction < 0 ? prevBtn : nextBtn;
      if (btn) {
        animate(btn, {
          scale: [1, 0.9, 1],
          duration: 340,
          ease: 'outBack(1.6)',
        });
      }
    }
  };

  prevBtn?.addEventListener('click', () => scrollCarousel(-1));
  nextBtn?.addEventListener('click', () => scrollCarousel(1));

  viewport?.addEventListener('scroll', updateCarouselState, { passive: true });
  window.addEventListener('resize', () => {
    updateCarouselState();
    const activeTab = tabs.find((tab) => tab.classList.contains('is-active'));
    if (activeTab) syncTabIndicator(activeTab);
  }, { passive: true });

  // 2. Category tab filter + sliding indicator + Anime.js stagger reveal
  const syncTabIndicator = (activeTab: HTMLButtonElement): void => {
    if (!tabIndicator || !tabsContainer) return;
    const containerRect = tabsContainer.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    const offsetX = tabRect.left - containerRect.left;
    tabIndicator.style.width = `${tabRect.width}px`;
    tabIndicator.style.transform = `translateX(${offsetX}px)`;
  };

  const selectCategory = (category: string, animateTransition = true): void => {
    const activeTab = tabs.find((t) => t.dataset.storeTab === category);
    if (!activeTab) return;

    tabs.forEach((tab) => {
      const isMatch = tab === activeTab;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
    });

    syncTabIndicator(activeTab);

    const visibleSlides: HTMLElement[] = [];
    slides.forEach((slide) => {
      const alwaysVisible = slide.hasAttribute('data-store-always-visible');
      const slideCat = slide.dataset.storeCategoryItem;
      const matches = category === 'Todas' || alwaysVisible || slideCat === category;
      slide.hidden = !matches;
      if (matches) visibleSlides.push(slide);
    });

    if (viewport) viewport.scrollLeft = 0;
    window.requestAnimationFrame(updateCarouselState);

    if (animateTransition && !prefersReduced && visibleSlides.length > 0) {
      animate(visibleSlides, {
        translateY: [16, 0],
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 440,
        delay: stagger(55),
        ease: 'outCubic',
      });
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      selectCategory(tab.dataset.storeTab ?? 'Todas', true);
    });
  });

  const initialTab = tabs.find((t) => t.classList.contains('is-active'));
  if (initialTab) {
    window.requestAnimationFrame(() => syncTabIndicator(initialTab));
  }
  updateCarouselState();

  viewport?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollCarousel(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollCarousel(-1);
    }
  });

  // Pointer drag support without blocking clean link clicks
  if (viewport) {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let draggedDistance = 0;

    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') return;
      isDragging = true;
      draggedDistance = 0;
      startX = event.clientX;
      startScrollLeft = viewport.scrollLeft;
      viewport.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      const delta = event.clientX - startX;
      draggedDistance = Math.abs(delta);
      viewport.scrollLeft = startScrollLeft - delta;
    });

    window.addEventListener('pointerup', () => {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove('is-dragging');
      if (draggedDistance > 8) {
        viewport.dataset.suppressClick = 'true';
        window.setTimeout(() => {
          delete viewport.dataset.suppressClick;
        }, 60);
      }
    });

    viewport.addEventListener('click', (event) => {
      if (viewport.dataset.suppressClick) {
        event.preventDefault();
      }
    });
  }

  // 3. GSAP ScrollTrigger + Anime.js v4 choreographed entrance & Hero->Lojas connection
  if (prefersReduced) return;

  const mm = gsap.matchMedia();
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const bridgeLine = section.querySelector<HTMLElement>('[data-stores-bridge-line]');
    const bridgeDot = section.querySelector<HTMLElement>('[data-stores-bridge-dot]');
    const rules = gsap.utils.toArray<HTMLElement>('[data-stores-rule]');
    const eyebrow = section.querySelector<HTMLElement>('[data-stores-eyebrow]');
    const titleLines = gsap.utils.toArray<HTMLElement>('[data-stores-line]');
    const lead = section.querySelector<HTMLElement>('[data-stores-lead]');
    const cta = section.querySelector<HTMLElement>('[data-magnetic-stores-cta]');
    const topLeftArc = section.querySelector<HTMLElement>('[data-stores-arc="top-left"]');
    const bottomRightArc = section.querySelector<HTMLElement>('[data-stores-arc="bottom-right"]');

    if (topLeftArc) {
      gsap.fromTo(
        topLeftArc,
        { y: -32, x: -18 },
        {
          y: 18,
          x: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.1,
          },
        },
      );
    }

    if (bottomRightArc) {
      gsap.fromTo(
        bottomRightArc,
        { y: 36, x: 18 },
        {
          y: -14,
          x: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1.1,
          },
        },
      );
    }

    const introTl = gsap.timeline({
      defaults: { ease: 'power3.out', clearProps: 'transform,opacity' },
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        once: true,
      },
    });

    if (bridgeLine) {
      introTl.from(bridgeLine, { scaleY: 0, duration: 0.45 }, 0);
    }
    if (bridgeDot) {
      introTl.from(bridgeDot, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, 0.25);
    }
    if (eyebrow) {
      introTl.from(eyebrow, { y: 12, opacity: 0, duration: 0.45 }, 0.18);
    }
    if (rules.length > 0) {
      introTl.from(rules, { scaleX: 0, duration: 0.55, stagger: 0.06 }, 0.22);
    }
    if (titleLines.length > 0) {
      introTl.from(titleLines, { y: 24, opacity: 0, duration: 0.65, stagger: 0.1 }, 0.28);
    }
    if (lead) {
      introTl.from(lead, { y: 14, opacity: 0, duration: 0.5 }, 0.45);
    }
    if (tabsContainer) {
      introTl.from(tabsContainer, { y: 14, opacity: 0, duration: 0.48 }, 0.52);
    }
    if (cta) {
      introTl.from(cta, { y: 14, opacity: 0, duration: 0.5 }, 0.62);
    }

    if (slides.length > 0) {
      gsap.set(slides, { opacity: 0, y: 26, scale: 0.94 });

      ScrollTrigger.create({
        trigger: section.querySelector('[data-stores-carousel]'),
        start: 'top 84%',
        once: true,
        onEnter: () => {
          const visibleOnEnter = slides.filter((s) => !s.hidden);
          animate(visibleOnEnter, {
            translateY: [26, 0],
            scale: [0.94, 1],
            opacity: [0, 1],
            duration: 620,
            delay: stagger(65, { from: 'center' }),
            ease: 'outCubic',
            onComplete: () => {
              gsap.set(slides, { clearProps: 'transform,opacity' });
            },
          });
        },
      });
    }

    // Card "Design Spells": subtle pointer micro-depth on logo + Anime.js badge pop
    if (hasFinePointer) {
      interactiveCards.forEach((card) => {
        const media = card.querySelector<HTMLElement>('[data-store-media]');
        const badge = card.querySelector<HTMLElement>('[data-store-category]');

        if (media) {
          const mediaX = gsap.quickTo(media, 'x', { duration: 0.35, ease: 'power2.out' });
          const mediaY = gsap.quickTo(media, 'y', { duration: 0.35, ease: 'power2.out' });

          card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            const relX = (event.clientX - rect.left) / rect.width - 0.5;
            const relY = (event.clientY - rect.top) / rect.height - 0.5;
            mediaX(relX * 8);
            mediaY(relY * 6);
          });

          card.addEventListener('pointerleave', () => {
            mediaX(0);
            mediaY(0);
          });
        }

        if (badge) {
          const popBadge = (): void => {
            animate(badge, {
              scale: [1, 1.07, 1],
              duration: 380,
              ease: 'outBack(1.8)',
            });
          };
          card.addEventListener('mouseenter', popBadge);
          card.addEventListener('focus', popBadge);
        }
      });

      if (cta) {
        const ctaX = gsap.quickTo(cta, 'x', { duration: 0.35, ease: 'power2.out' });
        const ctaY = gsap.quickTo(cta, 'y', { duration: 0.35, ease: 'power2.out' });

        cta.addEventListener('pointermove', (event) => {
          const rect = cta.getBoundingClientRect();
          const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
          const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
          ctaX(offsetX);
          ctaY(offsetY);
        });

        cta.addEventListener('pointerleave', () => {
          ctaX(0);
          ctaY(0);
        });
      }
    }
  });
}
