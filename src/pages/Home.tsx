import { useState } from 'react';
import { site, wa, workImg } from '../site';
import Calculator from '../components/Calculator';

const Head = ({ tag, title }: { tag: string; title: string }) => (
  <div className="mb-12 text-center">
    <p className="mb-3 inline-block rounded-full bg-accent-soft px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-dark">
      {tag}
    </p>
    <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
  </div>
);

function Lightbox({ open, onClose, src, alt, title }: { open: boolean; onClose: () => void; src: string; alt: string; title: string }) {
  if (!open) return null;
  return (
    <>
      <div className="lightbox-overlay open" onClick={onClose} role="dialog" aria-modal="true" aria-label="просмотр фото работы">
        <button onClick={onClose} aria-label="акрыть" className="lightbox-close">&#215;</button>
        <img src={src} alt={alt} className="lightbox-img" />
        <p className="lightbox-caption">{title}</p>
      </div>
    </>
  );
}

export default function Home() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title: string } | null>(null);

  return (
    <main id="top">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-dark pt-16 text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur">
                <span className="text-accent">&#10003;</span> {site.hero.badge}
              </p>
              <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                ремонт квартир в <span className="text-accent">Гомеле</span> под ключ
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                {site.hero.sub} делаем ремонт ванных комнат, укладку плитки, сантехнику и электрику под ключ.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={wa('дравствуйте! ужен ремонт квартиры в омеле. Хочу бесплатный замер.')}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-xl shadow-accent/30 transition-all hover:scale-105 hover:bg-accent-dark"
                >
                  Бесплатный замер
                </a>
                <a
                  href="#works"
                  className="rounded-full border border-white/25 px-8 py-4 text-base font-bold transition-colors hover:border-accent hover:text-accent"
                >
                  Фото работ
                </a>
              </div>
            </div>
            <div className="photo-ph-dark relative aspect-[4/3] sm:aspect-[3/2] items-center justify-center rounded-3xl border border-white/10 overflow-hidden">
              <img
                src="/images/images (1)-1-1-square.jpeg"
                alt="Ремонт квартиры в Гомеле под ключ"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-sm font-bold uppercase tracking-[0.3em] text-white/60">
                Ремонт который не бесит &#128522;
              </span>
              <div className="absolute z-20 -bottom-4 -left-4 rounded-2xl border border-white/15 bg-dark-2/90 px-5 py-3 shadow-2xl backdrop-blur">
                Гомель
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {site.stats.map(([v, l]) => (
              <div key={l} className="bg-dark px-6 py-5">
                <p className="font-display text-2xl font-bold text-accent sm:text-3xl">{v}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <div className="marquee overflow-hidden border-b border-line bg-accent py-3.5">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0 items-center">
              {['Ремонт квартир', 'Ремонт ванных', 'Дизайнерский ремонт', 'Укладка плитки', 'Сантехника', 'Электрика', 'Косметический ремонт', 'Капитальный ремонт', 'Ремонт под ключ'].map(
                (t) => (
                  <span key={t + i} className="mx-6 text-sm font-extrabold uppercase tracking-widest text-white">
                    {t} <span className="ml-6 text-white/60">&#10030;</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== услуги ===== */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
        <Head tag="услуги" title="Виды ремонтных работ в омеле" />
        <p className="mb-8 text-center text-muted max-w-3xl mx-auto">
          Выполняем косметический, капитальный и дизайнерский ремонт квартир под ключ в омеле и районе. Работы по укладке плитки, монтажу сантехники и электрике — с договором и гарантией.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-2xl">
                {s.icon}
              </div>
              <h3 className="text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              <p className="mt-4 font-display text-base font-bold text-accent">{s.price}</p>
            </article>
          ))}
        </div>
      </section>

      <Calculator />

      {/* ===== галерея работ ===== */}
      <section id="works" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
        <Head tag="портфолио" title="Фото выполненных работ" />
        <div className="space-y-6">
          {site.works.map((w) => {
            const imgSrc = workImg(w.img);
            return (
              <figure
                key={w.title}
                className="group relative overflow-hidden rounded-2xl border border-line bg-card cursor-pointer"
                onClick={() => imgSrc && setLightbox({ src: imgSrc, alt: w.title, title: `${w.title} — ${w.tag}` })}
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={w.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="photo-ph flex aspect-[4/3] w-full items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted/70">фото</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-accent font-bold text-sm uppercase tracking-wider">посмотреть фото</span>
                </div>
                <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="text-sm font-bold">{w.title}</span>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-dark">
                    {w.tag}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          open={true}
          onClose={() => setLightbox(null)}
          src={lightbox.src}
          alt={lightbox.alt}
          title={lightbox.title}
        />
      )}

      {/* ===== процесс ===== */}
      <section id="process" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
        <Head tag="этапы" title="Как мы работаем" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {site.process.map((p) => (
            <div key={p.num} className="relative rounded-2xl border border-line bg-card p-6 pt-8">
              <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-white shadow-lg shadow-accent/30">
                {p.num}
              </span>
              <h3 className="mt-2 font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== отзывы ===== */}
      <section id="reviews" className="border-y border-line bg-card">
        <div className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
          <Head tag="отзывы" title="что говорят клиенты" />
          <div className="grid gap-5 md:grid-cols-3">
            {site.reviews.map((r) => (
              <blockquote key={r.name} className="rounded-2xl border border-line bg-bg p-7">
                <div className="text-lg text-accent">{'★'.repeat(r.stars)}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted">«{r.text}»</p>
                <footer className="mt-5 text-sm font-extrabold">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ===== вопросы ===== */}
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-20 sm:px-6">
        <Head tag="вопросы" title="Частые вопросы" />
        <div className="space-y-3">
          {site.faq.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-line bg-card open:border-accent/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl font-light text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Свяжитесь</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Бесплатный замер</h2>
          <p className="mx-auto mt-5 max-w-md text-white/60">
            Оставьте заявку — приеду, посчитаю и назову точную цену. ни к чему не обязывает.
          </p>
          <div className="mx-auto mt-10 grid max-w-2xl gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-2">
            <a href={site.contacts.phoneHref} className="bg-dark-2 px-6 py-6 transition-colors hover:bg-dark">
              <p className="text-xs uppercase tracking-widest text-white/50">Телефон</p>
              <p className="mt-2 font-bold text-accent">{site.contacts.phone}</p>
            </a>
            <a href={site.contacts.telegram} target="_blank" rel="noreferrer" className="bg-dark-2 px-6 py-6 transition-colors hover:bg-dark">
              <p className="text-xs uppercase tracking-widest text-white/50">Telegram</p>
              <p className="mt-2 font-bold text-accent">{site.contacts.telegramHandle}</p>
            </a>
            <a href={site.contacts.whatsapp} target="_blank" rel="noreferrer" className="bg-dark-2 px-6 py-6 transition-colors hover:bg-dark">
              <p className="text-xs uppercase tracking-widest text-white/50">WhatsApp</p>
              <p className="mt-2 font-bold text-accent">{site.contacts.phone}</p>
            </a>
            <a href={site.contacts.viber} target="_blank" rel="noreferrer" className="bg-dark-2 px-6 py-6 transition-colors hover:bg-dark">
              <p className="text-xs uppercase tracking-widest text-white/50">Viber</p>
              <p className="mt-2 font-bold text-accent">{site.contacts.phone}</p>
            </a>
          </div>
        </div>
      </section>

      {/* ===== JSON-LD SEO ===== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${site.seo.url}#business`,
        name: site.brand,
        image: site.seo.ogImage,
        telephone: site.contacts.phone,
        url: site.seo.url,
        address: { '@type': 'PostalAddress', addressLocality: 'Гомель', addressCountry: 'BY' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: site.reviews.length },
        serviceType: ['ремонт квартир','ремонт ванных','дизайнерский ремонт','укладка плитки','сантехника','электрика','ремонт под ключ'],
        areaServed: { '@type': 'City', name: 'Гомель' },
        priceRange: 'BYN',
      }) }} />
    </main>
  );
}
