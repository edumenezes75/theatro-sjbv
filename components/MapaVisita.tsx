const Q = 'Theatro Municipal de São João da Boa Vista, Praça da Catedral, 22 - Centro, São João da Boa Vista - SP';

export default function MapaVisita() {
  const q = encodeURIComponent(Q);
  return (
    <section className="mt-16 border-t border-gold/25 pt-12">
      <h2 className="mb-2 font-display text-3xl">Como chegar</h2>
      <p className="mb-6 max-w-reading font-sans text-sm text-ink/70 dark:text-cream/70">
        Praça da Catedral, 22 — Centro, São João da Boa Vista — SP.
      </p>
      <div className="overflow-hidden rounded-sm border border-gold/25">
        <iframe
          title="Mapa do Theatro Municipal de São João da Boa Vista"
          src={`https://maps.google.com/maps?q=${q}&z=16&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[360px] w-full border-0"
        />
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold"
      >
        Abrir no Google Maps ↗
      </a>
    </section>
  );
}
