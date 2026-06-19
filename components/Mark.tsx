export default function Mark({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={(size * 36) / 48} viewBox="0 0 48 36" fill="none" className={className} aria-hidden role="presentation">
      {/* silhueta da fachada: alas baixas + corpo central com frontão em arco */}
      <path d="M4 32 V20 H16 V10 Q24 3 32 10 V20 H44 V32" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      {/* linha do chão */}
      <path d="M2 32 H46" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* portal central em arco */}
      <path d="M20 32 V25 Q20 22 24 22 Q28 22 28 25 V32" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      {/* janelas em arco nas alas */}
      <path d="M8 32 V27 Q8 25 10.5 25 Q13 25 13 27 V32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M35 32 V27 Q35 25 37.5 25 Q40 25 40 27 V32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* óculo / medalhão central */}
      <circle cx="24" cy="13.5" r="1.5" fill="currentColor" />
    </svg>
  );
}
