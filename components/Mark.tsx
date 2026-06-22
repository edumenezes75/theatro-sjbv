export default function Mark({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 36) / 52}
      viewBox="0 0 52 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden
      role="presentation"
    >
      {/* silhueta: alas baixas + corpo central elevado coroado por frontão curvo */}
      <path d="M4 34 V14 H18 V9.5 Q26 2.5 34 9.5 V14 H48 V34 Z" strokeWidth="1.4" />
      {/* embasamento / linha do chão */}
      <path d="M2.5 34 H49.5" strokeWidth="1.7" />
      {/* cornija do frontão (corda do arco) + friso do letreiro */}
      <path d="M18 9.5 H34" />
      <path d="M18 13 H34" />
      {/* óculo/medalhão central no frontão */}
      <circle cx="26" cy="8" r="1.05" fill="currentColor" stroke="none" />
      {/* pináculos nas pontas do frontão + mastro no ápice */}
      <path d="M18 9.5 V7" />
      <path d="M34 9.5 V7" />
      <path d="M26 5.8 V3.2" />
      {/* cornija entre pavimentos */}
      <path d="M4 23 H48" />
      {/* pequena cornija sob o telhado das alas */}
      <path d="M4 15.5 H18" strokeWidth="0.9" />
      <path d="M34 15.5 H48" strokeWidth="0.9" />
      {/* sacada central em arco + balaustrada */}
      <path d="M22.5 22 V17 C22.5 14 29.5 14 29.5 17 V22" />
      <path d="M22 22 H30" strokeWidth="0.9" />
      <path d="M24.3 22 V20.4" strokeWidth="0.8" />
      <path d="M26 22 V20.4" strokeWidth="0.8" />
      <path d="M27.7 22 V20.4" strokeWidth="0.8" />
      {/* janelas do pavimento superior — duas em cada ala */}
      <path d="M7.5 21.5 V16.5 H10.5 V21.5" />
      <path d="M12.5 21.5 V16.5 H15.5 V21.5" />
      <path d="M36.5 21.5 V16.5 H39.5 V21.5" />
      <path d="M41.5 21.5 V16.5 H44.5 V21.5" />
      {/* portal central em arco */}
      <path d="M23 34 V26 C23 23.4 29 23.4 29 26 V34" />
      {/* portas térreas — duas em cada ala, alinhadas às janelas */}
      <path d="M7.5 34 V27 H10.5 V34" />
      <path d="M12.5 34 V27 H15.5 V34" />
      <path d="M36.5 34 V27 H39.5 V34" />
      <path d="M41.5 34 V27 H44.5 V34" />
    </svg>
  );
}
