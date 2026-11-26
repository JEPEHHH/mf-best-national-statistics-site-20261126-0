import { snapshot, ageBands, populationSeries, urbanSeries } from '../data/national.js';
import { columns, line, ranked, donut } from '../charts.js';

export function renderPeople(el) {
  el.innerHTML = `
    <div class="wrap page-title">
      <div class="eyebrow">People · 2024 snapshot</div>
      <h1>Who lives here</h1>
      <p>Four years of population growth, a largely young age structure, and a country that is becoming more urban every year. Every chart below is built from the figures in its caption.</p>
    </div>
    <div class="wrap">
      <div class="cards">
        ${fact('281.2 million', 'Population', 'Mid-2024 estimate · BPS')}
        ${fact('67.3%', 'Working age', 'Ages 15–64 · 2024 projection')}
        ${fact('57.3%', 'Urban', 'Up from 53.7% in 2020')}
        ${fact('30.2 years', 'Median age', '2024 estimate')}
      </div>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Long view</div><h2>Population and cities</h2></div>
          <p>Choose a series, then hover a point for its value. The raw numbers are in the chart itself.</p></div>
        <div class="controls" id="peopleControls">
          <button class="chip on" data-pick="pop">Population</button>
          <button class="chip" data-pick="urban">Urban share</button>
          <button class="chip" data-pick="growth">Year-on-year change</button>
        </div>
        <div class="panel"><h3 id="peopleChartTitle">Population, mid-year</h3><p class="sub" id="peopleChartSub">Millions, 2020–2024 · BPS</p><div id="peopleChart"></div></div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Structure</div><h2>Five age bands</h2></div>
          <p>The share by age tells a different story from the total: a large working-age core and a small but growing older group.</p></div>
        <div class="grid-2">
          <div class="panel"><h3>Share of total population</h3><p class="sub">Percent, 2024</p>${columns(ageBands.map(b => ({ label: b.label, value: b.value, display: b.value + '%' })), { color: '#1f7a6d' })}</div>
          <div class="panel"><h3>Dependency at a glance</h3><p class="sub">Every 100 people aged 15–64 support roughly 49 others</p>
            <div style="display:flex;gap:20px;align-items:center;justify-content:center;padding:10px 0 18px">
              ${donut([{ label: '15–64', value: 67.3, color: '#1f7a6d' }, { label: '0–14', value: 24.2, color: '#d95b43' }, { label: '65+', value: 8.5, color: '#c8912a' }], { center: '49', centerLabel: 'per 100 workers' })}
              <div class="legend" style="flex-direction:column;gap:8px"><span>Working age · 67.3%</span><span>Children · 24.2%</span><span>Older · 8.5%</span></div>
            </div>
            <p class="note">Calculated from the same BPS age-band shares. Ratios are rounded.</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Concentration</div><h2>Four populous provinces</h2></div></div>
        <div class="panel">${ranked([
          { label: 'Jawa Barat', value: 50.8, display: '50.8 juta' },
          { label: 'Jawa Timur', value: 41.1, display: '41.1 juta' },
          { label: 'Jawa Tengah', value: 37.8, display: '37.8 juta' },
          { label: 'Sumatera Utara', value: 15.6, display: '15.6 juta' }
        ], { labelW: 150, color: '#d95b43' })}
        <p class="note">Together these four provinces hold about 52% of the national population. BPS provincial estimates, 2024.</p></div>
      </section>
      <p class="note" style="padding:20px 0 0">See the <a href="#/sources">Sources page</a> for release names and years behind every figure.</p>
    </div>`;

  const host = el.querySelector('#peopleChart');
  const title = el.querySelector('#peopleChartTitle');
  const sub = el.querySelector('#peopleChartSub');
  const chips = [...el.querySelectorAll('[data-pick]')];
  function draw(pick) {
    let rows, color;
    if (pick === 'pop') {
      rows = populationSeries.map(r => ({ label: String(r.year), value: r.value, display: r.value.toFixed(1) }));
      color = '#d95b43'; title.textContent = 'Population, mid-year'; sub.textContent = 'Millions, 2020–2024 · BPS';
      host.innerHTML = line(rows, { color });
    } else if (pick === 'urban') {
      rows = urbanSeries.map(r => ({ label: String(r.year), value: r.value, display: r.value.toFixed(1) + '%' }));
      color = '#1f7a6d'; title.textContent = 'Urban share'; sub.textContent = 'Percent of population, 2020–2024 · BPS';
      host.innerHTML = columns(rows, { color });
    } else {
      rows = populationSeries.slice(1).map((r, i) => ({ label: String(r.year), value: +(r.value - populationSeries[i].value).toFixed(1), display: '+' + (r.value - populationSeries[i].value).toFixed(1) }));
      color = '#c8912a'; title.textContent = 'Year-on-year increase'; sub.textContent = 'Millions added each year, 2021–2024 · BPS';
      host.innerHTML = columns(rows, { color });
    }
    chips.forEach(c => c.classList.toggle('on', c.dataset.pick === pick));
  }
  chips.forEach(c => c.addEventListener('click', () => draw(c.dataset.pick)));
  draw('pop');
}

function fact(value, label, src) {
  return `<div class="card"><div class="label">${label}</div><div class="value">${value}</div><div class="src">${src}</div></div>`;
}
