// Centralised enquiry form options — single source of truth

import { services } from './services';

export const serviceOptions = services.map((s) => ({
  value: s.slug,
  label: s.name,
  category: s.category,
}));

export const budgetOptions = [
  { value: 'under-10k', label: 'Under R10,000' },
  { value: '10k-25k', label: 'R10,000 – R25,000' },
  { value: '25k-50k', label: 'R25,000 – R50,000' },
  { value: '50k-100k', label: 'R50,000 – R100,000' },
  { value: 'over-100k', label: 'Over R100,000' },
  { value: 'retainer', label: 'Monthly retainer (TBD)' },
  { value: 'unsure', label: 'Not sure yet' },
];

export const timeframeOptions = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1–3 months' },
  { value: '3-6-months', label: '3–6 months' },
  { value: 'flexible', label: 'Flexible / not urgent' },
  { value: 'unsure', label: 'Not sure yet' },
];
