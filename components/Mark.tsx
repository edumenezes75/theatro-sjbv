export default function Mark({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 86) / 120}
      viewBox="0 0 120 86"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden
      role="presentation"
    >
      {/* ——— silhueta principal: alas baixas + corpo central de dois pavimentos ——— */}
      <g strokeWidth="2.3">
        <path d="M22 80 V20 H98 V80 Z" />
        <path d="M19 80 H101" strokeWidth="2.6" />
      </g>

      {/* ——— cornijas e linha entre pavimentos ——— */}
      <g strokeWidth="1.5">
        <path d="M22 50 H98" />           {/* cornija entre pavimentos */}
        <path d="M22 20 H98" />           {/* cornija do telhado */}
      </g>

      {/* ——— térreo: portal central em arco com bandeira + portas laterais ——— */}
      <g strokeWidth="1.7">
        <path d="M53 80 V60 Q53 54 60 54 Q67 54 67 60 V80" />
      </g>
      <g strokeWidth="1.2">
        <path d="M55 60 Q60 56.5 65 60" />          {/* bandeira do arco */}
        <path d="M60 80 V54" strokeWidth="0.9" />   {/* mainel do portal */}
        {/* portas térreas (2 de cada lado) */}
        <path d="M26 80 V58 H34 V80 M30 80 V58" />
        <path d="M41 80 V58 H49 V80 M45 80 V58" />
        <path d="M71 80 V58 H79 V80 M75 80 V58" />
        <path d="M86 80 V58 H94 V80 M90 80 V58" />
      </g>

      {/* ——— pavimento superior: janela central em arco + janelas laterais ——— */}
      <g strokeWidth="1.4">
        <path d="M52 46 V32 Q52 26 60 26 Q68 26 68 32 V46 Z" />
      </g>
      <g strokeWidth="1.1">
        <path d="M54 32 Q60 28.5 66 32" strokeWidth="0.8" /> {/* bandeira da janela central */}
        <path d="M26 46 V28 H34 V46 Z M30 46 V28" />
        <path d="M41 46 V28 H49 V46 Z M45 46 V28" />
        <path d="M71 46 V28 H79 V46 Z M75 46 V28" />
        <path d="M86 46 V28 H94 V46 Z M90 46 V28" />
      </g>

      {/* ——— frontõezinhos sobre as janelas + peitoris ——— */}
      <g strokeWidth="0.8">
        <path d="M27 27 L30 24.5 L33 27 M42 27 L45 24.5 L48 27 M72 27 L75 24.5 L78 27 M87 27 L90 24.5 L93 27" />
        <path d="M25 48 H35 M40 48 H50 M70 48 H80 M85 48 H95 M51 48 H69" />
      </g>

      {/* ——— balaustradas (entre pisos e no topo) ——— */}
      <g strokeWidth="0.7">
        <path d="M24 50 V53 M30 50 V53 M36 50 V53 M45 50 V53 M54 50 V53 M66 50 V53 M75 50 V53 M84 50 V53 M90 50 V53 M96 50 V53" />
        <path d="M24 20 V15 H96 V20" />
        <path d="M30 20 V15 M38 20 V15 M52 20 V15 M68 20 V15 M82 20 V15 M90 20 V15" />
      </g>

      {/* ——— urnas/acrotérios sobre a balaustrada ——— */}
      <g strokeWidth="0.9">
        <path d="M30 15 V11 M45 15 V12 M75 15 V12 M90 15 V11" />
        <circle cx="30" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="90" cy="10" r="1" fill="currentColor" stroke="none" />
      </g>

      {/* ——— frontão central coroado: arco, brasão e pináculo ——— */}
      <g strokeWidth="1.6">
        <path d="M47 20 V16 Q60 3 73 16 V20" />
      </g>
      <g strokeWidth="1">
        <path d="M47 16 H73" strokeWidth="1.2" />
        {/* brasão / cartela no tímpano */}
        <path d="M56 9 H64 V12 L60 15 L56 12 Z" />
        {/* pináculo central */}
        <path d="M60 6 V1.5" strokeWidth="1.2" />
        <path d="M60 3 L57.5 5 M60 3 L62.5 5 M58 1.8 H62" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
