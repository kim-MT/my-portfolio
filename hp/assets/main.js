(() => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Header elevate on scroll
  const header = document.querySelector('[data-elevate]');
  const onScroll = () => {
    if (!header) return;
    const elevated = window.scrollY > 8;
    header.classList.toggle('elevated', elevated);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.getElementById('nav-panel');
  const closeNav = () => {
    if (!toggle || !panel) return;
    toggle.classList.remove('active');
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.removeProperty('overflow');
  };
  const openNav = () => {
    if (!toggle || !panel) return;
    toggle.classList.add('active');
    panel.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  };
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });
    panel.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement && target.classList.contains('nav-link')) {
        closeNav();
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', () => {
      // Ensure desktop doesn't stay locked after rotate
      if (window.innerWidth >= 761) closeNav();
    });
  }

  // Smooth scroll (respect reduced motion)
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // Contact form => mailto compose
  const form = document.querySelector('[data-contact-form]');
  if (form instanceof HTMLFormElement) {
    const mailTo = 'contact@example.com'; // TODO: 実運用の宛先に置換してください
    const subjectBase = '【無料相談】AI×Web開発のご相談';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const company = String(fd.get('company') || '').trim();
      const message = String(fd.get('message') || '').trim();

      const lines = [
        '以下の内容でご相談します。',
        '',
        `お名前: ${name}`,
        `メール: ${email}`,
        company ? `会社名: ${company}` : '会社名: （未記入）',
        '',
        '--- 相談内容 ---',
        message,
        '',
        '---',
        '（補足）返信可能な日時や、希望納期・予算感があればご記入ください。'
      ];

      const subject = `${subjectBase}${company ? `（${company}）` : ''}`;
      const body = lines.join('\n');

      const url = `mailto:${encodeURIComponent(mailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
    });
  }
})();

