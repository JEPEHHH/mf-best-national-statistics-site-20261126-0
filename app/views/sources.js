import { sources, methodNotes } from '../data/sources.js';

export function renderSources(el) {
  el.innerHTML = `
    <div class="wrap page-title">
      <div class="eyebrow">Sources &amp; method</div>
      <h1>Where the numbers come from</h1>
      <p>Every figure on this site is a rounded reading of a published statistical release. This page names the publishers, the years and the way the figures were prepared.</p>
    </div>
    <div class="wrap">
      <section class="section" style="padding-top:8px">
        <div class="source-list">
          ${sources.map(s => `<div class="source-item">
            <b>${s.who}</b>
            <div><strong>${s.title}</strong><br><span class="who">Used for: ${s.use}</span></div>
            <span class="yr">${s.years}</span>
          </div>`).join('')}
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">How to read us</div><h2>Method notes</h2></div></div>
        <div class="method"><ul>${methodNotes.map(n => `<li>${n}</li>`).join('')}</ul></div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Site notes</div><h2>Built to be read anywhere</h2></div></div>
        <div class="story">
          <article><div class="fig">0</div><h3>Network requests</h3><p>Every file — data, styles and charts — sits beside this page. Nothing is fetched from another origin.</p></article>
          <article><div class="fig">6</div><h3>Linked sections</h3><p>Navigation, cards and cross-links all lead to a real page with its own content.</p></article>
          <article><div class="fig">100%</div><h3>Controls work</h3><p>Series switches, chart styles, search, island filter and sortable headings all change what you see.</p></article>
        </div>
      </section>
      <p class="note" style="padding:24px 0 0">Nusa Angka is an independent reading room. It publishes no new statistics of its own; it arranges existing public figures for easier reading.</p>
    </div>`;
}
