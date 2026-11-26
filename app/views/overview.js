import { snapshot, ageBands, populationSeries, urbanSeries, provinces4 } from './data/national.js';
import { columns, line, ranked, donut } from './charts.js';

export function renderOverview(el) {
  el.innerHTML = `
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <div class="eyebrow">A reading room for public figures</div>
          <h1>Indonesia, in numbers<br>and in context.</h1>
          <p class="lede">Population, the economy, provinces, schools and health — brought into one place, with a source and a year beside every figure.</p>
          <div class="hero-meta"><span><b>${snapshot.updated}</b></span><span>6 sections</span><span><b>38</b> published figures</span></div>
        </div>
        <div class="hero-panel">
          <h2>People of Indonesia</h2>
          <div class="hero-big">${snapshot.population} juta<small>Mid-year population estimate, ${snapshot.populationYear}</small></div>
          <div class="hero-bar"><span style="width:${snapshot.urban}%"></span></div>
          <div class="mini">${snapshot.urban}% live in urban areas · BPS ${snapshot.populationYear}</div>
        </div>
      </div>
    </section>
    <div class="wrap">
      <section class="section">
        <div class="section-head"><div><div class="kicker">At a glance</div><h2>The national picture</h2></div>
          <p>Four headline measures from the latest published releases. Each card tells you where it came from.</p></div>
        <div class="cards">
          ${card('Population', snapshot.population.toFixed(1), 'million', '+1.5 million since 2023', 'BPS · 2024 estimate')}
          ${card('GDP', snapshot.gdp.toLocaleString(), 'USD billion', '5.03% real growth', 'BPS national accounts · 2024')}
          ${card('Inflation', snapshot.inflation.toFixed(2), 'percent', 'down from 3.67% in 2023', 'Bank Indonesia · 2024')}
          ${card('Life expectancy', snapshot.lifeExpectancy.toFixed(1), 'years', 'up 2.7 since 2020', 'BPS health indicators · 2024')}
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Two lens, one country</div><h2>Growing, and growing up</h2></div>
          <p>Six years of population and urban living. Switch the measure to see how the shape changes.</p></div>
        <div class="controls" id="overviewControls">
          <label for="seriesPick">Series</label>
          <button class="chip on" data-series="people">People (millions)</button>
          <button class="chip" data-series="urban">Urban share (%)</button>
          <span class="spacer"></span><span class="note" id="seriesNote">BPS, 2020–2024</span>
        </div>
        <div class="grid-2">
          <div class="panel"><h3 id="seriesTitle">Population, mid-year</h3><p class="sub">Millions of people, 2020–2024</p><div id="seriesChart"></div></div>
          <div class="panel"><h3>Where people live</h3><p class="sub">Four most populous provinces, millions</p>${ranked(provinces4.map(p => ({ label: p.name, value: p.population, display: p.population.toFixed(1) })), { labelW: 130 })}<p class="note">BPS provincial estimates, 2024.</p></div>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Age structure</div><h2>A young country, changing</h2></div>
          <p>The 25–44 group is the largest. The 65+ group is small today but is the fastest growing.</p></div>
        <div class="grid-2-wide">
          <div class="panel"><h3>Share of population by age band</h3><p class="sub">Percent of total population, 2024 projection</p>${columns(ageBands.map(b => ({ label: b.label, value: b.value, display: b.value + '%' })), { color: '#1f7a6d', label: 'Population by age' })}</div>
          <div class="panel"><h3>The working-age core</h3><p class="sub">A quick read of the same data</p>
            <div style="display:flex;gap:18px;align-items:center;justify-content:center;padding:8px 0 16px">
              ${donut([{ label: 'Working age 15–64', value: 67.3, color: '#1f7a6d' }, { label: 'Children 0–14', value: 24.2, color: '#d95b43' }, { label: 'Older 65+', value: 8.5, color: '#c8912a' }], { center: '67.3%', centerLabel: 'working age' })}
              <div class="legend" style="flex-direction:column;gap:8px"><span>Working age 15–64</span><span>Children 0–14</span><span>Older 65+</span></div>
            </div>
            <p class="note">Source: BPS 2020 Census with 2024 projection.</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Keep exploring</div><h2>Go deeper</h2></div></div>
        <div class="story">
          <article><div class="fig">5.03%</div><h3><a href="#/economy">Economy →</a></h3><p>GDP grew 5.03% in 2024, with inflation easing to 2.30%.</p></article>
          <article><div class="fig">15 prov.</div><h3><a href="#/regions">Regions →</a></h3><p>Sort the provinces by people, HDI or income per person.</p></article>
          <article><div class="fig">96.8%</div><h3><a href="#/social">Schools &amp; health →</a></h3><p>Near-universal primary enrolment, and a long life trend that keeps rising.</p></article>
        </div>
      </section>
    </div>`;

  const chartHost = el.querySelector('#seriesChart');
  const title = el.querySelector('#seriesTitle');
  const sub = el.querySelector('.panel .sub');
  const note = el.querySelector('#seriesNote');
  const buttons = [...el.querySelectorAll('[data-series]')];
  function draw(kind) {
    const isPeople = kind === 'people';
    const rows = (isPeople ? populationSeries : urbanSeries).map(r => ({ label: String(r.year), value: r.value, display: String(r.value) }));
    chartHost.innerHTML = isPeople ? line(rows, { color: '#d95b43' }) : columns(rows, { color: '#c8912a' });
    title.textContent = isPeople ? 'Population, mid-year' : 'Share of people living in cities';
    sub.textContent = isPeople ? 'Millions of people, 2020–2024' : 'Percent of population, 2020–2024';
    note.textContent = 'BPS, 2020–2024';
    buttons.forEach(b => b.classList.toggle('on', b.dataset.series === kind));
  }
  buttons.forEach(b => b.addEventListener('click', () => draw(b.dataset.series)));
  draw('people');
}

function card(label, value, unit, delta, src) {
  return `<div class="card"><div class="label">${label}</div><div class="value">${value} <em>${unit}</em></div><div class="delta">${delta}</div><div class="src">${src}</div></div>`;
}
