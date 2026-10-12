/**
 * Format a number as South African Rand (ZAR).
 */
export function formatZAR(amount: number, showCents = false): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount);
}

/**
 * "From R12,000" label helper.
 */
export function priceLabel(amount: number, prefix = 'From'): string {
  return `${prefix} ${formatZAR(amount)}`;
}

/**
 * Return current year as a string.
 */
export function currentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Slugify a string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format a date string to readable format.
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}
