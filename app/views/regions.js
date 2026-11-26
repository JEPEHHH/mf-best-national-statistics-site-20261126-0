import { provinces, islandGroups } from '../data/regions.js';
import { ranked, donut } from '../charts.js';

const COLS = [
  { key: 'name', label: 'Province', type: 'text' },
  { key: 'island', label: 'Island group', type: 'text' },
  { key: 'population', label: 'People (juta)', type: 'num' },
  { key: 'hdi', label: 'HDI', type: 'num' },
  { key: 'grdp', label: 'GRDP / capita', type: 'num' }
];

export function renderRegions(el) {
  el.innerHTML = `
    <div class="wrap page-title">
      <div class="eyebrow">Regions · 2024 snapshot</div>
      <h1>Provinces side by side</h1>
      <p>Fifteen provinces, four measures. Type a name, filter by island group, then click a column heading to sort. The bars and the table always show the same selection.</p>
    </div>
    <div class="wrap">
      <div class="grid-2-wide">
        <section class="section" style="padding-top:8px">
          <div class="panel">
            <h3>Population by island group</h3><p class="sub">Share of national population, percent</p>
            <div style="display:flex;gap:22px;align-items:center;justify-content:center;padding:6px 0 14px">
              ${donut(islandGroups.map(g => ({ label: g.name, value: g.share, color: g.color })), { center: '281 jt', centerLabel: 'population' })}
              <div class="legend" style="flex-direction:column;gap:7px">${islandGroups.map(g => `<span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${g.color};margin-right:7px"></i>${g.name} · ${g.share}%</span>`).join('')}</div>
            </div>
            <p class="note">BPS provincial estimates, 2024. Shares rounded; groups are a reading aid, not an official classification.</p>
          </div>
        </section>
        <section class="section" style="padding-top:8px">
          <div class="panel"><h3>Human development index</h3><p class="sub">Five highest HDI scores in this selection</p><div id="regionRank"></div></div>
        </section>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="kicker">Explore the table</div><h2>Compare the provinces</h2></div>
          <p>Click any heading to sort, click again to reverse. The search and island filter apply to both the table and the chart.</p></div>
        <div class="controls">
          <label for="provSearch">Search</label>
          <input type="search" id="provSearch" placeholder="e.g. Jawa, Papua…" aria-label="Search provinces">
          <label for="islandPick">Island</label>
          <select id="islandPick" aria-label="Filter by island group"><option value="all">All groups</option>${[...new Set(provinces.map(p => p.island))].map(i => `<option value="${i}">${i}</option>`).join('')}</select>
          <span class="spacer"></span><span class="note" id="rowCount"></span>
        </div>
        <div class="panel table-wrap"><table>
          <thead><tr>${COLS.map(c => `<th data-key="${c.key}" class="${c.type === 'num' ? 'num' : ''}">${c.label}</th>`).join('')}</tr></thead>
          <tbody id="provRows"></tbody>
        </table></div>
      </section>
      <p class="note" style="padding:20px 0 0">Sources and years: <a href="#/sources">see the Sources page</a>. GRDP per capita is in USD thousand.</p>
    </div>`;

  let sortKey = 'population', sortDir = -1;
  const search = el.querySelector('#provSearch');
  const island = el.querySelector('#islandPick');
  const rowsHost = el.querySelector('#provRows');
  const rankHost = el.querySelector('#regionRank');
  const count = el.querySelector('#rowCount');
  const headers = [...el.querySelectorAll('th[data-key]')];

  function current() {
    const q = search.value.trim().toLowerCase();
    return provinces.filter(p => (island.value === 'all' || p.island === island.value) && (!q || p.name.toLowerCase().includes(q) || p.island.toLowerCase().includes(q)))
      .sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
        return cmp * sortDir;
      });
  }
  function draw() {
    const list = current();
    rowsHost.innerHTML = list.map((p, i) => `<tr>
      <td><span class="rank">${i + 1}</span> ${p.name}</td><td>${p.island}</td>
      <td class="num">${p.population.toFixed(1)}</td><td class="num">${p.hdi.toFixed(1)}</td><td class="num">${p.grdp.toFixed(1)}</td>
    </tr>`).join('') || '<tr><td colspan="5" class="note">No province matches that filter.</td></tr>';
    const top = [...list].sort((a, b) => b.hdi - a.hdi).slice(0, 5);
    rankHost.innerHTML = top.length ? ranked(top.map(p => ({ label: p.name, value: p.hdi, display: p.hdi.toFixed(1) })), { width: 460, labelW: 140, color: '#1f7a6d' }) : '<p class="note">Nothing to rank.</p>';
    count.textContent = list.length + ' of ' + provinces.length + ' provinces';
    headers.forEach(h => h.classList.toggle('sorted', h.dataset.key === sortKey));
  }
  headers.forEach(h => h.addEventListener('click', () => {
    if (h.dataset.key === sortKey) sortDir *= -1;
    else { sortKey = h.dataset.key; sortDir = h.dataset.key === 'name' || h.dataset.key === 'island' ? 1 : -1; }
    draw();
  }));
  search.addEventListener('input', draw);
  island.addEventListener('change', draw);
  draw();
}
