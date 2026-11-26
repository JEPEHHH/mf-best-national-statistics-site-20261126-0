import { gdpSeries, growthSeries, inflationSeries, sectors, trade } from '../data/economy.js';
import { columns, line, ranked, donut } from '../charts.js';

export function renderEconomy(el) {
  el.innerHTML = `
    <div class="wrap page-title">
      <div class="eyebrow">Economy · 2024 snapshot</div>
      <h1>Output, prices and trade</h1>
      <p>Growth held near 5% for a third straight year while inflation eased. This page puts the national accounts, the price series and the make-up of output next to each other.</p>
    </div>
    <div class="wrap">
      <div class="cards">
        ${f('USD 1,403 B', 'GDP', 'Nominal, 2024 · BPS')}
        ${f('5.03%', 'Real growth', '2024 · BPS national accounts')}
        ${f('2.30%', 'Inflation', '2024 · Bank Indonesia')}
        ${f('USD +28.9 B', 'Trade surplus', 'Exports minus imports, 2024')}
      </div>
      <section class="section">
        <div class="section-head"><div><div class="kicker">The long series</div><h2>Growth and prices</h2></div>
          <p>Switch between the level of output, the pace of growth and consumer prices. Each switch redraws the chart from local data.</p></div>
        <div class="controls" id="econControls">
          <button class="chip on" data-econ="gdp">GDP level</button>
          <button class="chip" data-econ="growth">Real growth</button>
          <button class="chip" data-econ="inflation">Inflation</button>
        </div>
        <div class="panel"><h3 id="econTitle">Gross domestic product</h3><p class="sub" id="econSub">USD billion, nominal, 2019–2024</p><div id="econChart"></div></div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Where output comes from</div><h2>Six sector shares</h2></div>
          <p>Manufacturing is the single largest sector; services and other activities together make up nearly a third of GDP.</p></div>
        <div class="grid-2">
          <div class="panel"><h3>Value added by sector</h3><p class="sub">Percent of GDP, 2024</p>${ranked(sectors.map(s => ({ label: s.label, value: s.value, display: s.value.toFixed(1) + '%' })), { labelW: 155, color: '#c8912a' })}</div>
          <div class="panel"><h3>The big three</h3><p class="sub">A simplified grouping of the same shares</p>
            <div style="display:flex;gap:18px;align-items:center;justify-content:center;padding:12px 0 18px">
              ${donut([
                { label: 'Manufacturing', value: 18.6, color: '#d95b43' },
                { label: 'Trade & transport', value: 17.8, color: '#1f7a6d' },
                { label: 'Other activities', value: 63.6, color: '#c8912a' }
              ], { center: '36.4%', centerLabel: 'goods & trade' })}
              <div class="legend" style="flex-direction:column;gap:8px"><span>Manufacturing · 18.6%</span><span>Trade &amp; transport · 17.8%</span><span>All other · 63.6%</span></div>
            </div>
            <p class="note">Grouped from the BPS sector table; percentages rounded.</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">External accounts</div><h2>Trade in 2024</h2></div>
          <p>Exports exceeded imports by about USD 29 billion. Destination shares show where the exports went.</p></div>
        <div class="grid-2">
          <div class="panel"><h3>Exports and imports</h3><p class="sub">USD billion, 2024</p>
            ${columns([{ label: 'Exports', value: trade.exports, display: '261.6' }, { label: 'Imports', value: trade.imports, display: '232.7' }], { color: '#1f7a6d', width: 520, height: 230 })}
            <p class="note">BPS trade statistics, 2024.</p>
          </div>
          <div class="panel"><h3>Top export destinations</h3><p class="sub">Share of exports, percent, 2024</p>
            ${ranked(trade.partners.map(p => ({ label: p.name, value: p.value, display: p.value.toFixed(1) + '%' })), { labelW: 130, color: '#d95b43' })}
          </div>
        </div>
      </section>
      <p class="note" style="padding:20px 0 0">All releases are named on the <a href="#/sources">Sources page</a>.</p>
    </div>`;

  const host = el.querySelector('#econChart');
  const title = el.querySelector('#econTitle');
  const sub = el.querySelector('#econSub');
  const chips = [...el.querySelectorAll('[data-econ]')];
  function draw(pick) {
    if (pick === 'gdp') {
      host.innerHTML = line(gdpSeries.map(r => ({ label: String(r.year), value: r.value, display: String(r.value) })), { color: '#d95b43' });
      title.textContent = 'Gross domestic product'; sub.textContent = 'USD billion, nominal, 2019–2024';
    } else if (pick === 'growth') {
      host.innerHTML = columns(growthSeries.map(r => ({ label: String(r.year), value: r.value, display: r.value.toFixed(2) + '%' })), { color: '#1f7a6d', zero: true });
      title.textContent = 'Real GDP growth'; sub.textContent = 'Percent per year, 2019–2024';
    } else {
      host.innerHTML = columns(inflationSeries.map(r => ({ label: String(r.year), value: r.value, display: r.value.toFixed(2) + '%' })), { color: '#c8912a' });
      title.textContent = 'Consumer price inflation'; sub.textContent = 'Annual average, percent, 2020–2024';
    }
    chips.forEach(c => c.classList.toggle('on', c.dataset.econ === pick));
  }
  chips.forEach(c => c.addEventListener('click', () => draw(c.dataset.econ)));
  draw('gdp');
}

function f(value, label, src) {
  return `<div class="card"><div class="label">${label}</div><div class="value">${value}</div><div class="src">${src}</div></div>`;
}
