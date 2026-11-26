// National snapshot. Figures are curated from published releases; see app/sources.js.
export const snapshot = {
  population: 281.2,          // million, mid-2024 estimate
  populationYear: 2024,
  gdp: 1403,                  // USD billion, 2024
  gdpYear: 2024,
  growth: 5.03,               // percent, 2024
  inflation: 2.30,            // percent, 2024
  urban: 57.3,                // percent, 2024
  medianAge: 30.2,            // years, 2024
  lifeExpectancy: 74.6,       // years, 2024
  updated: 'November 2026 edition'
};

// Population by broad age band, share of total (%). Census 2020 with 2024 projection.
export const ageBands = [
  { label: '0–14', value: 24.2 },
  { label: '15–24', value: 16.8 },
  { label: '25–44', value: 29.1 },
  { label: '45–64', value: 21.4 },
  { label: '65+', value: 8.5 }
];

// Annual mid-year population, millions.
export const populationSeries = [
  { year: 2020, value: 273.5 },
  { year: 2021, value: 275.6 },
  { year: 2022, value: 277.7 },
  { year: 2023, value: 279.7 },
  { year: 2024, value: 281.2 }
];

// Urban share, percent of population.
export const urbanSeries = [
  { year: 2020, value: 53.7 },
  { year: 2021, value: 54.3 },
  { year: 2022, value: 55.2 },
  { year: 2023, value: 56.4 },
  { year: 2024, value: 57.3 }
];

export const provinces4 = [
  { name: 'Jawa Barat', population: 50.8 },
  { name: 'Jawa Timur', population: 41.1 },
  { name: 'Jawa Tengah', population: 37.8 },
  { name: 'Sumatera Utara', population: 15.6 }
];
