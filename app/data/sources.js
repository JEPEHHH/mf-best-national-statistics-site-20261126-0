// One place for provenance. Each record names the release behind the figures on a page.
export const sources = [
  {
    who: 'Badan Pusat Statistik (BPS)',
    title: 'Population estimates and 2020 Census, National Socio-Economic Survey',
    years: '2020–2024',
    use: 'Population totals, age structure, urban share, province estimates, school enrolment.'
  },
  {
    who: 'BPS National Accounts',
    title: 'Gross Domestic Product and provincial GRDP releases',
    years: '2019–2024',
    use: 'GDP levels, sector shares, growth rates and GRDP per capita.'
  },
  {
    who: 'Bank Indonesia',
    title: 'Consumer price index and monetary reports',
    years: '2020–2024',
    use: 'Headline inflation series and price stability context.'
  },
  {
    who: 'BPS Trade Statistics',
    title: 'Exports, imports and destination statistics',
    years: '2024',
    use: 'Trade totals and the destination shares shown on the Economy page.'
  },
  {
    who: 'BPS Health & Social',
    title: 'Health Indicator Survey, Nutrition Status Survey',
    years: '2020–2024',
    use: 'Life expectancy, child nutrition, maternal and under-five indicators.'
  },
  {
    who: 'UN Development Programme',
    title: 'Human Development Report / national HDI series',
    years: '2023–2024',
    use: 'Provincial Human Development Index scores.'
  }
];

export const methodNotes = [
  'Figures are rounded for display: population to 0.1 million, money to USD 1 billion or 0.1 thousand, rates to 0.1 percentage point.',
  'When a release is revised, the newest published vintage in the series is used; earlier years are left as published at the time.',
  'Charts are drawn from the numbers in this site only. Hover a bar or point to read its exact labelled value.',
  'This is an independent explainer. It is not affiliated with, or an official publication of, any agency named above.'
];
