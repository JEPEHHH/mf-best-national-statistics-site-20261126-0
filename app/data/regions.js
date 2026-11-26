// Province snapshots, mid-2024 estimates in millions, with HDI and GRDP per capita (USD thousand).
// Values are rounded for presentation; the Sources page points to the underlying releases.
export const provinces = [
  { name: 'Jawa Barat', island: 'Java', population: 50.8, hdi: 75.4, grdp: 5.6, urban: 66.0 },
  { name: 'Jawa Timur', island: 'Java', population: 41.1, hdi: 74.9, grdp: 6.9, urban: 55.2 },
  { name: 'Jawa Tengah', island: 'Java', population: 37.8, hdi: 73.6, grdp: 4.8, urban: 52.1 },
  { name: 'Sumatera Utara', island: 'Sumatra', population: 15.6, hdi: 73.2, grdp: 5.3, urban: 53.4 },
  { name: 'DKI Jakarta', island: 'Java', population: 10.6, hdi: 82.2, grdp: 21.8, urban: 100.0 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', population: 9.3, hdi: 74.4, grdp: 5.4, urban: 55.8 },
  { name: 'Banten', island: 'Java', population: 12.0, hdi: 73.3, grdp: 7.9, urban: 63.7 },
  { name: 'Kalimantan Timur', island: 'Kalimantan', population: 4.2, hdi: 76.8, grdp: 17.4, urban: 68.0 },
  { name: 'DI Yogyakarta', island: 'Java', population: 3.7, hdi: 79.1, grdp: 6.7, urban: 51.2 },
  { name: 'Bali', island: 'Bali & Nusa', population: 4.2, hdi: 79.9, grdp: 8.5, urban: 56.3 },
  { name: 'Sumatera Selatan', island: 'Sumatra', population: 8.7, hdi: 72.9, grdp: 6.0, urban: 49.8 },
  { name: 'Kalimantan Barat', island: 'Kalimantan', population: 5.6, hdi: 70.5, grdp: 4.4, urban: 43.1 },
  { name: 'Nusa Tenggara Barat', island: 'Nusa & Papua', population: 5.6, hdi: 70.1, grdp: 3.5, urban: 44.6 },
  { name: 'Papua', island: 'Nusa & Papua', population: 4.4, hdi: 61.6, grdp: 6.1, urban: 38.2 },
  { name: 'Maluku', island: 'Nusa & Papua', population: 1.9, hdi: 69.7, grdp: 4.0, urban: 47.9 }
];

export const islandGroups = [
  { name: 'Java', share: 55.8, color: '#d95b43' },
  { name: 'Sumatra', share: 21.7, color: '#1f7a6d' },
  { name: 'Kalimantan', share: 10.2, color: '#c8912a' },
  { name: 'Sulawesi', share: 7.4, color: '#6d7fb5' },
  { name: 'Nusa & Papua', share: 4.9, color: '#9b6ea8' }
];
