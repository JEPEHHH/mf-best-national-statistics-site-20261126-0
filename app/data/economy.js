// Economy: published national accounts and price figures, 2019–2024.
export const gdpSeries = [
  { year: 2019, value: 1119 },
  { year: 2020, value: 1052 },
  { year: 2021, value: 1148 },
  { year: 2022, value: 1319 },
  { year: 2023, value: 1371 },
  { year: 2024, value: 1403 }
];

export const growthSeries = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 }
];

export const inflationSeries = [
  { year: 2020, value: 1.92 },
  { year: 2021, value: 1.56 },
  { year: 2022, value: 4.21 },
  { year: 2023, value: 3.67 },
  { year: 2024, value: 2.30 }
];

// Value added by sector, share of GDP (%), 2024.
export const sectors = [
  { label: 'Manufacturing', value: 18.6 },
  { label: 'Trade & transport', value: 17.8 },
  { label: 'Agriculture', value: 12.8 },
  { label: 'Construction', value: 10.2 },
  { label: 'Mining', value: 9.1 },
  { label: 'Services & other', value: 31.5 }
];

export const trade = {
  exports: 261.6,   // USD billion, 2024
  imports: 232.7,   // USD billion, 2024
  partners: [
    { name: 'China', value: 19.1 },
    { name: 'United States', value: 10.3 },
    { name: 'India', value: 6.8 },
    { name: 'Japan', value: 5.4 },
    { name: 'Singapore', value: 4.9 }
  ]
};
