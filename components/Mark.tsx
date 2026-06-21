export default function Mark({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 34) / 52}
      viewBox="0 0 52 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden
      role="presentation"
    >
      {/* silhueta da fachada eclética: bloco largo e baixo com frontão curvo central */}
      <path d="M5 31 V13 H21 V11 C21 6.5 31 6.5 31 11 V13 H47 V31" />
      {/* embasamento */}
      <path d="M3 31 H49" strokeWidth="1.6" />
      {/* cornija/entablamento (faixa do letreiro MUSICA · THEATRO · MUNICIPAL · DRAMA) */}
      <path d="M5 13 H47" strokeWidth="1.5" />
      {/* friso entre pavimentos */}
      <path d="M5 22 H47" strokeWidth="1" />
      {/* óculo/medalhão no frontão */}
      <circle cx="26" cy="9.2" r="1.15" fill="currentColor" stroke="none" />
      {/* grande arco central do piso superior */}
      <path d="M22.5 21.5 V16.5 C22.5 12.8 29.5 12.8 29.5 16.5 V21.5" />
      {/* janelas superiores: duas de cada lado */}
      <path d="M9 21.5 V16.5 H11.5 V21.5" />
      <path d="M13.5 21.5 V16.5 H16 V21.5" />
      <path d="M36 21.5 V16.5 H38.5 V21.5" />
      <path d="M40.5 21.5 V16.5 H43 V21.5" />
      {/* porta central em arco */}
      <path d="M23 31 V25.5 C23 23.6 29 23.6 29 25.5 V31" />
      {/* portas laterais: duas de cada lado */}
      <path d="M9 31 V25 H11.5 V31" />
      <path d="M13.5 31 V25 H16 V31" />
      <path d="M36 31 V25 H38.5 V31" />
      <path d="M40.5 31 V25 H43 V31" />
    </svg>
  );
}
