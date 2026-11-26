// Education and health: national aggregates, latest published snapshots.
export const schoolEnrolment = [
  { label: 'Primary', value: 96.8 },
  { label: 'Junior secondary', value: 93.4 },
  { label: 'Senior secondary', value: 89.1 },
  { label: 'Tertiary', value: 46.7 }
];

export const health = {
  lifeExpectancy: 74.6,
  underFiveMortality: 20.2,   // per 1,000 live births, 2024
  maternalMortality: 103,     // per 100,000 live births, 2023
  stunting: 21.5              // percent of children under five, 2024
};

export const healthTrend = [
  { year: 2020, value: 71.9 },
  { year: 2021, value: 72.3 },
  { year: 2022, value: 73.1 },
  { year: 2023, value: 73.9 },
  { year: 2024, value: 74.6 }
];

export const quickFacts = [
  { figure: '96.8%', title: 'Primary enrolment', text: 'Net enrolment rate, 2024. Near-universal access at the first stage of school.' },
  { figure: '74.6 thn', title: 'Life expectancy', text: 'Estimated years at birth, 2024 — up almost three years since 2020.' },
  { figure: '21.5%', title: 'Stunting', text: 'Share of children under five, 2024. The trend is down but remains a policy focus.' }
];
