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
export const IconMapPin = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const IconClock = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const IconPhone = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 6a2 2 0 0 1 2-2z" /></svg>
);
export const IconAccessible = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><circle cx="12" cy="4.5" r="1.6" /><path d="M5.5 8.5h13M12 8v5m0 0l-3.5 6m3.5-6l3.5 6" /></svg>
);

// Temas das Curiosidades
export const IconFachada = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M3 9l9-5 9 5M4 9h16M6.5 9v9M10.2 9v9M13.8 9v9M17.5 9v9M4 18h16M2.5 21h19" /></svg>
);
export const IconEstrela = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z" /></svg>
);
export const IconRadio = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M4 9h16v11H4zM7 9l9-5M14 13h3M14 16.5h3" /><circle cx="8.8" cy="14.6" r="2.4" /></svg>
);
export const IconFilme = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><path d="M4 4h16v16H4zM8 4v16M16 4v16M4 8h4M4 12h4M4 16h4M16 8h4M16 12h4M16 16h4" /></svg>
);
export const IconFechadura = ({ size, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7.5a2.6 2.6 0 0 1 1.3 4.85L14.2 16.5H9.8l.9-4.15A2.6 2.6 0 0 1 12 7.5z" /></svg>
);
