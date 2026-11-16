export function initNavigation(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  const menuToggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const mobilePanel = header.querySelector<HTMLElement>('[data-mobile-panel]');
  const searchToggle = header.querySelector<HTMLButtonElement>('[data-search-toggle]');
  const searchPanel = header.querySelector<HTMLElement>('[data-search-panel]');
  const searchInput = header.querySelector<HTMLInputElement>('[data-search-input]');
  const searchClose = header.querySelector<HTMLButtonElement>('[data-search-close]');
  const searchForm = header.querySelector<HTMLFormElement>('[data-search-form]');
  const searchItems = Array.from(header.querySelectorAll<HTMLElement>('[data-search-item]'));
  const searchEmpty = header.querySelector<HTMLElement>('[data-search-empty]');
  const navLinks = Array.from(header.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));

  const setMenuOpen = (open: boolean, returnFocus = false): void => {
    if (!menuToggle || !mobilePanel) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute(
      'aria-label',
      open ? 'Fechar menu de navegação' : 'Abrir menu de navegação',
    );
    mobilePanel.hidden = !open;

    if (open) {
      setSearchOpen(false);
      const firstLink = mobilePanel.querySelector<HTMLAnchorElement>('a');
      firstLink?.focus();
    } else if (returnFocus) {
      menuToggle.focus();
    }
  };

  const setSearchOpen = (open: boolean, returnFocus = false): void => {
    if (!searchToggle || !searchPanel) return;
    searchToggle.setAttribute('aria-expanded', String(open));
    searchPanel.hidden = !open;

    if (open) {
      setMenuOpen(false);
      window.requestAnimationFrame(() => searchInput?.focus());
    } else if (returnFocus) {
      searchToggle.focus();
    }
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  searchToggle?.addEventListener('click', () => {
    const isOpen = searchToggle.getAttribute('aria-expanded') === 'true';
    setSearchOpen(!isOpen);
  });

  searchClose?.addEventListener('click', () => {
    setSearchOpen(false, true);
  });

  mobilePanel?.querySelectorAll<HTMLAnchorElement>('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  searchPanel?.querySelectorAll<HTMLAnchorElement>('[data-search-link]').forEach((link) => {
    link.addEventListener('click', () => setSearchOpen(false));
  });

  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    searchItems.forEach((item) => {
      const haystack = item.dataset.searchItem ?? '';
      const matches = !query || haystack.includes(query);
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (searchEmpty) {
      searchEmpty.hidden = visibleCount > 0;
    }
  });

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstVisibleLink = searchItems
      .find((item) => !item.hidden)
      ?.querySelector<HTMLAnchorElement>('a');

    if (firstVisibleLink) {
      setSearchOpen(false);
      firstVisibleLink.click();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (searchPanel && !searchPanel.hidden) {
      setSearchOpen(false, true);
    } else if (mobilePanel && !mobilePanel.hidden) {
      setMenuOpen(false, true);
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    if (!header.contains(target)) {
      if (searchPanel && !searchPanel.hidden) setSearchOpen(false);
      if (mobilePanel && !mobilePanel.hidden) setMenuOpen(false);
    }
  });

  // Subtle sticky elevation when scrolling past the top fold
  const onScroll = (): void => {
    header.classList.toggle('is-scrolled', window.scrollY > 48);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Update active nav indicator while scrolling through sections
  const sections = ['inicio', 'lojas', 'servicos', 'sobre', 'contato']
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const activeId = visible.target.id;

        navLinks.forEach((link) => {
          const isMatch = link.dataset.navLink === activeId;
          link.classList.toggle('is-active', isMatch);
          if (isMatch) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
  }
}
