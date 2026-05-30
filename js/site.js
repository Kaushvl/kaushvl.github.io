/* site.js — theme toggle, header scroll state, reveal-on-view, terminal animator, year */
(function () {
  const root = document.documentElement;

  /* ---------- Theme ---------- */
  const STORE_KEY = 'ks-theme';
  function getTheme() {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    document.querySelectorAll('.theme-toggle').forEach((b) => b.setAttribute('aria-label', t === 'dark' ? 'Switch to light' : 'Switch to dark'));
  }
  applyTheme(getTheme());

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORE_KEY, next);
    applyTheme(next);
  });

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Reveal on view ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Terminal animator ---------- */
  const term = document.querySelector('[data-terminal]');
  if (term) {
    const out = term.querySelector('.terminal__body');
    const lines = [
      { p: '$ ', t: 'whoami', kind: 'in' },
      { p: '', t: 'kaushal — ml engineer · based in india', kind: 'out' },
      { p: '$ ', t: 'cat focus.txt', kind: 'in' },
      { p: '', t: 'llms · rag · audio ml · agents', kind: 'out' },
      { p: '$ ', t: 'now', kind: 'in' },
      { p: '', t: 'building production genai at nexuslink services', kind: 'out' },
      { p: '$ ', t: 'mail', kind: 'in' },
      { p: '', t: 'kaushal-shukla@outlook.com ↵', kind: 'out' }
    ];
    let li = 0, ci = 0;
    function step() {
      if (li >= lines.length) return;
      const ln = lines[li];
      let cur = out.querySelector('.term-line.current');
      if (!cur) {
        cur = document.createElement('div');
        cur.className = 'term-line current ' + ln.kind;
        cur.innerHTML = `<span class="term-prompt">${ln.p}</span><span class="term-text"></span><span class="term-caret"></span>`;
        out.appendChild(cur);
      }
      const text = cur.querySelector('.term-text');
      if (ci < ln.t.length) {
        text.textContent += ln.t[ci++];
        setTimeout(step, 22 + Math.random() * 28);
      } else {
        cur.querySelector('.term-caret')?.remove();
        cur.classList.remove('current');
        li++; ci = 0;
        setTimeout(step, ln.kind === 'in' ? 320 : 480);
      }
    }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { io.disconnect(); setTimeout(step, 400); } });
    }, { threshold: 0.3 });
    io.observe(term);
  }

  /* ---------- Work-index filters (progressive enhancement) ---------- */
  const filters = document.querySelectorAll('.work-index .filter');
  if (filters.length) {
    const rows = document.querySelectorAll('.work-index .work-grid .work-row');
    filters.forEach((f) => f.addEventListener('click', () => {
      filters.forEach((x) => x.setAttribute('aria-pressed', 'false'));
      f.setAttribute('aria-pressed', 'true');
      const tag = f.dataset.filter;
      rows.forEach((r) => {
        const tags = (r.dataset.tags || '').split(',');
        r.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
      });
    }));
  }
})();
