// Small SVG chart library. Every chart returns markup built from local numbers only.
const C = { coral: '#d95b43', teal: '#1f7a6d', gold: '#c8912a', grid: '#eadfcc', ink: '#102a3b' };

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}

// Vertical columns with value labels and year axis.
export function columns(rows, opts = {}) {
  const w = opts.width || 620, h = opts.height || 250;
  const pad = { l: 44, r: 14, t: 22, b: 34 };
  const max = Math.max(...rows.map(r => r.value)) * 1.12;
  const min = opts.zero ? Math.min(0, ...rows.map(r => r.value)) : 0;
  const span = max - min || 1;
  const plotW = w - pad.l - pad.r, plotH = h - pad.t - pad.b;
  const step = plotW / rows.length;
  const bw = Math.min(step * 0.62, 54);
  let s = `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Column chart')}">`;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + plotH * i / 4;
    const v = max - span * i / 4;
    s += `<line class="grid" x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}"/>`;
    s += `<text x="${pad.l - 8}" y="${y + 4}" text-anchor="end" font-size="10">${fmtTick(v)}</text>`;
  }
  const zeroY = pad.t + plotH * (max - 0) / span;
  rows.forEach((r, i) => {
    const x = pad.l + step * i + (step - bw) / 2;
    const yv = pad.t + plotH * (max - r.value) / span;
    const top = Math.min(yv, zeroY), height = Math.max(2, Math.abs(yv - zeroY));
    const color = r.color || (opts.color || C.coral);
    s += `<rect class="bar" x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${height.toFixed(1)}" rx="3" fill="${color}"><title>${esc(r.label)}: ${esc(r.value)}</title></rect>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600">${esc(r.display ?? r.value)}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="11">${esc(r.label)}</text>`;
  });
  return s + '</svg>';
}

// Smooth-enough line chart with dots and a shaded baseline.
export function line(rows, opts = {}) {
  const w = opts.width || 620, h = opts.height || 250;
  const pad = { l: 44, r: 16, t: 20, b: 32 };
  const vals = rows.map(r => r.value);
  const max = Math.max(...vals) * 1.1, min = Math.min(0, ...vals);
  const plotW = w - pad.l - pad.r, plotH = h - pad.t - pad.b;
  const x = i => pad.l + (rows.length === 1 ? plotW / 2 : plotW * i / (rows.length - 1));
  const y = v => pad.t + plotH * (max - v) / (max - min || 1);
  const color = opts.color || C.teal;
  let s = `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')}">`;
  for (let i = 0; i <= 4; i++) {
    const yy = pad.t + plotH * i / 4;
    s += `<line class="grid" x1="${pad.l}" y1="${yy}" x2="${w - pad.r}" y2="${yy}"/>`;
    s += `<text x="${pad.l - 8}" y="${yy + 4}" text-anchor="end" font-size="10">${fmtTick(max - (max - min) * i / 4)}</text>`;
  }
  const pts = rows.map((r, i) => `${x(i).toFixed(1)},${y(r.value).toFixed(1)}`).join(' ');
  s += `<polygon points="${pad.l},${pad.t + plotH} ${pts} ${x(rows.length - 1)},${pad.t + plotH}" fill="${color}" opacity=".10"/>`;
  s += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`;
  rows.forEach((r, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(r.value).toFixed(1)}" r="4" fill="#fff" stroke="${color}" stroke-width="2"><title>${esc(r.label)}: ${esc(r.value)}</title></circle>`;
    s += `<text x="${x(i).toFixed(1)}" y="${y(r.value) - 11}" text-anchor="middle" font-size="11" font-weight="600">${esc(r.display ?? r.value)}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11">${esc(r.label)}</text>`;
  });
  return s + '</svg>';
}

// Horizontal ranked bars — good for provinces and trade partners.
export function ranked(rows, opts = {}) {
  const w = opts.width || 560, rowH = 32, h = rows.length * rowH + 16;
  const max = Math.max(...rows.map(r => r.value));
  const labelW = opts.labelW || 145;
  let s = `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Ranked bars')}">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const len = (w - labelW - 70) * r.value / max;
    s += `<text x="0" y="${y + 18}" font-size="12">${esc(r.label)}</text>`;
    s += `<rect x="${labelW}" y="${y + 5}" width="${len.toFixed(1)}" height="18" rx="4" fill="${r.color || C.teal}"><title>${esc(r.label)}: ${esc(r.value)}</title></rect>`;
    s += `<text x="${(labelW + len + 8).toFixed(1)}" y="${y + 19}" font-size="11" font-weight="600">${esc(r.display ?? r.value)}</text>`;
  });
  return s + '</svg>';
}

// Donut with centre total and a small legend beside it.
export function donut(rows, opts = {}) {
  const size = opts.size || 210, r = size * 0.36, cx = size / 2, cy = size / 2;
  let a = -Math.PI / 2;
  let s = `<svg class="chart" viewBox="0 0 ${size} ${size}" style="max-width:${size}px" role="img" aria-label="${esc(opts.label || 'Donut chart')}">`;
  rows.forEach(row => {
    const ang = Math.PI * 2 * row.value / 100;
    const x1 = cx + r * Math.cos(a), y1 = cy + r * Math.sin(a);
    a += ang;
    const x2 = cx + r * Math.cos(a), y2 = cy + r * Math.sin(a);
    const large = ang > Math.PI ? 1 : 0;
    s += `<path d="M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}" fill="none" stroke="${row.color || C.coral}" stroke-width="${(r * 0.42).toFixed(1)}"><title>${esc(row.label)}: ${esc(row.value)}%</title></path>`;
  });
  s += `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="22" font-weight="700" fill="${C.ink}">${esc(opts.center || '')}</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="10">${esc(opts.centerLabel || '')}</text>`;
  return s + '</svg>';
}

function fmtTick(v) {
  if (Math.abs(v) >= 100) return Math.round(v).toString();
  return (Math.round(v * 10) / 10).toString();
}
