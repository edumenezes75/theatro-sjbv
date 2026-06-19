type P = { size?: number; className?: string };
const base = (size = 16) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const });

export const IconClose = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const IconChevron = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M9 6l6 6-6 6" /></svg>
);
export const IconArrowsLR = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M8 7l-4 5 4 5M16 7l4 5-4 5M5 12h14" /></svg>
);
export const IconExternal = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M14 5h5v5M19 5l-8 8M11 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" /></svg>
);
export const IconArrowRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconMenu = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
