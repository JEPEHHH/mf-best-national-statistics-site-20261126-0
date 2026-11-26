// Nusa Angka client router. One small shell; each page arrives through its own local module.
const outlet = document.getElementById('main');
const nav = document.getElementById('siteNav');
const menuBtn = document.getElementById('menuBtn');
const pages = {
  overview: () => import('./views/overview.js').then(m => m.renderOverview),
  people: () => import('./views/people.js').then(m => m.renderPeople),
  economy: () => import('./views/economy.js').then(m => m.renderEconomy),
  regions: () => import('./views/regions.js').then(m => m.renderRegions),
  social: () => import('./views/social.js').then(m => m.renderSocial),
  sources: () => import('./views/sources.js').then(m => m.renderSources)
};
const titles = {
  overview: 'Nusa Angka — Indonesia in numbers',
  people: 'People — Nusa Angka',
  economy: 'Economy — Nusa Angka',
  regions: 'Regions — Nusa Angka',
  social: 'Education & Health — Nusa Angka',
  sources: 'Sources — Nusa Angka'
};

let token = 0;
function route() {
  const raw = location.hash.replace(/^#\/?/, '').split('?')[0];
  const name = Object.hasOwn(pages, raw) ? raw : 'overview';
  const mine = ++token;
  document.title = titles[name];
  nav.querySelectorAll('a[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === name));
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  pages[name]().then(render => {
    if (mine !== token) return;
    render(outlet);
    window.scrollTo(0, 0);
  }).catch(err => {
    if (mine === token) outlet.innerHTML = '<div class="wrap placeholder"><h1>This page could not load.</h1><p>Please choose a section from the menu above.</p></div>';
    console.error(err);
  });
}

nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
window.addEventListener('hashchange', route);
route();
