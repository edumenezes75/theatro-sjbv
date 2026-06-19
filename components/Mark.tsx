export default function Mark({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden role="presentation">
      {/* arco / fachada-ferradura */}
      <path d="M5 28 V15 A11 11 0 0 1 27 15 V28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* base / palco */}
      <path d="M3 28 H29" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* medalhão (Carlos Gomes) */}
      <circle cx="16" cy="13.5" r="2.4" fill="currentColor" />
    </svg>
  );
}
