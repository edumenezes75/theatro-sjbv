export default function Mark({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 40) / 48}
      viewBox="0 0 48 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden
      role="presentation"
    >
      {/* silhueta da fachada eclética: alas + corpo central com frontão curvo */}
      <path d="M5 37 V18 H18 V12 C18 6.5 20.5 5 24 5 C27.5 5 30 6.5 30 12 V18 H43 V37" />
      {/* embasamento */}
      <path d="M3 37 H45" strokeWidth="1.6" />
      {/* cornija entre pavimentos */}
      <path d="M5 25 H43" strokeWidth="1.1" />
      {/* grande arco central */}
      <path d="M20 25 V17 C20 12.8 28 12.8 28 17 V25" strokeWidth="1.2" />
      {/* óculo/medalhão no frontão */}
      <circle cx="24" cy="9.6" r="1.15" fill="currentColor" stroke="none" />
      {/* três portas em arco no térreo */}
      <path d="M19 37 V31.5 C19 30 21 30 21 31.5 V37" strokeWidth="1.1" />
      <path d="M22.6 37 V30.4 C22.6 28.4 25.4 28.4 25.4 30.4 V37" strokeWidth="1.1" />
      <path d="M27 37 V31.5 C27 30 29 30 29 31.5 V37" strokeWidth="1.1" />
      {/* alas: janela superior + frontão triangular */}
      <path d="M9 24 V18 H13 V24" strokeWidth="1.1" />
      <path d="M8.4 18 L11 15.4 L13.6 18" strokeWidth="1.1" />
      <path d="M35 24 V18 H39 V24" strokeWidth="1.1" />
      <path d="M34.4 18 L37 15.4 L39.6 18" strokeWidth="1.1" />
      {/* alas: portas térreas */}
      <path d="M9 37 V31 H12.5 V37" strokeWidth="1.1" />
      <path d="M35.5 37 V31 H39 V37" strokeWidth="1.1" />
    </svg>
  );
}
