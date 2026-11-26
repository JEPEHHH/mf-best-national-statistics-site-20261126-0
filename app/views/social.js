import { schoolEnrolment, health, healthTrend, quickFacts } from '../data/social.js';
import { columns, line } from '../charts.js';

export function renderSocial(el) {
  el.innerHTML = `
    <div class="wrap page-title">
      <div class="eyebrow">Education &amp; health · latest releases</div>
      <h1>Schools, clinics and years of life</h1>
      <p>Access to school is close to universal at the primary stage. Health has improved steadily, though child nutrition remains a visible challenge.</p>
    </div>
    <div class="wrap">
      <div class="cards">
        ${c(quickFacts[0].figure, quickFacts[0].title, 'BPS · 2024')}
        ${c(quickFacts[1].figure, quickFacts[1].title, 'BPS · 2024')}
        ${c(quickFacts[2].figure, quickFacts[2].title, 'BPS · 2024')}
        <div class="card"><div class="label">Under-five mortality</div><div class="value">${health.underFiveMortality} <em>per 1,000</em></div><div class="src">BPS health indicators · 2024</div></div>
      </div>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Education ladder</div><h2>Enrolment falls as the ladder rises</h2></div>
          <p>Net enrolment by stage. The gap between senior secondary and tertiary is the widest step.</p></div>
        <div class="grid-2">
          <div class="panel"><h3>Net enrolment rate</h3><p class="sub">Percent of age group enrolled, 2024</p>
            ${columns(schoolEnrolment.map(s => ({ label: s.label, value: s.value, display: s.value + '%' })), { color: '#d95b43', width: 560 })}
          </div>
          <div class="panel"><h3>What the figures mean</h3><p class="sub">Short reading notes</p>
            <div class="story" style="grid-template-columns:1fr">
              ${quickFacts.map(q => `<article><div class="fig">${q.figure}</div><h3>${q.title}</h3><p>${q.text}</p></article>`).join('')}
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">A longer life</div><h2>Life expectancy, 2020–2024</h2></div>
          <p>Estimated years a child born today can expect to live. Switch the chart style to compare the same five numbers two ways.</p></div>
        <div class="controls" id="healthControls">
          <button class="chip on" data-style="line">Line</button>
          <button class="chip" data-style="bars">Columns</button>
        </div>
        <div class="panel"><h3>Years at birth</h3><p class="sub">BPS health indicators, 2020–2024</p><div id="healthChart"></div></div>
      </section>
      <div class="method" style="margin-bottom:20px">
        <h3>Reading the health figures</h3>
        <p>The maternal mortality ratio (${health.maternalMortality} per 100,000 live births, 2023) and the stunting rate (${health.stunting}%, 2024) are different kinds of measures — one is a ratio of events, the other a share of children. They are shown here as published, never added together.</p>
      </div>
      <p class="note" style="padding:0 0 20px">Full source list on the <a href="#/sources">Sources page</a>.</p>
    </div>`;

  const host = el.querySelector('#healthChart');
  const chips = [...el.querySelectorAll('[data-style]')];
  const rows = healthTrend.map(r => ({ label: String(r.year), value: r.value, display: r.value.toFixed(1) }));
  function draw(style) {
    host.innerHTML = style === 'line' ? line(rows, { color: '#1f7a6d' }) : columns(rows, { color: '#c8912a' });
    chips.forEach(c => c.classList.toggle('on', c.dataset.style === style));
  }
  chips.forEach(c => c.addEventListener('click', () => draw(c.dataset.style)));
  draw('line');
}

function c(value, label, src) {
  return `<div class="card"><div class="label">${label}</div><div class="value">${value}</div><div class="src">${src}</div></div>`;
}
