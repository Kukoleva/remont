import { useMemo, useState } from 'react';
import { site, wa } from '../site';

type Qty = Record<string, number>;

const fmt = (n: number) =>
  n.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export default function Calculator() {
  const [qty, setQty] = useState<Qty>({});
  const [openCat, setOpenCat] = useState<number[]>([0]);
  const [copied, setCopied] = useState(false);

  const selected = useMemo(() => {
    const rows: { cat: string; name: string; unit: string; price: number; q: number; sum: number }[] = [];
    site.pricelist.forEach((c) =>
      c.items.forEach((it) => {
        const q = qty[it.name] ?? 0;
        if (q > 0) rows.push({ cat: c.category, name: it.name, unit: it.unit, price: it.price, q, sum: q * it.price });
      }),
    );
    return rows;
  }, [qty]);

  const total = selected.reduce((s, r) => s + r.sum, 0);

  const set = (name: string, v: string) => {
    const n = parseFloat(v.replace(',', '.'));
    setQty((p) => ({ ...p, [name]: Number.isFinite(n) && n > 0 ? n : 0 }));
  };

  const toggle = (i: number) =>
    setOpenCat((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const expandAll = () => setOpenCat(site.pricelist.map((_, i) => i));

  const smetaText = () => {
    let t = `СМЕТА — ремонт квартиры (${site.city})\n${'='.repeat(34)}\n`;
    let cat = '';
    selected.forEach((r) => {
      if (r.cat !== cat) {
        cat = r.cat;
        t += `\n${cat.toUpperCase()}\n`;
      }
      t += `${r.name} — ${fmt(r.q)} ${r.unit} × ${fmt(r.price)} = ${fmt(r.sum)} BYN\n`;
    });
    t += `${'='.repeat(34)}\nИТОГО: ${fmt(total)} BYN\n(ориентировочно, точная цена после замера)`;
    return t;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(smetaText());
    } catch {
      const ta = document.createElement('textarea');
      ta.value = smetaText();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="estimate" className="border-y border-line bg-card">
      <div className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 inline-block rounded-full bg-accent-soft px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-dark">
            калькулятор
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Посчитайте смету сами</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Введите объёмы работ — смета соберётся автоматически с итогом. Её можно скопировать или
            отправить мне в WhatsApp для уточнения.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* ===== Список работ ===== */}
          <div className="space-y-3">
            <button onClick={expandAll} className="mb-2 text-sm font-bold text-accent hover:underline">
              Развернуть все категории ↓
            </button>
            {site.pricelist.map((c, ci) => {
              const open = openCat.includes(ci);
              const catCount = c.items.filter((it) => (qty[it.name] ?? 0) > 0).length;
              return (
                <div key={c.category} className="overflow-hidden rounded-2xl border border-line bg-bg">
                  <button
                    onClick={() => toggle(ci)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-3 font-extrabold">
                      {c.category}
                      {catCount > 0 && (
                        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white">
                          {catCount}
                        </span>
                      )}
                    </span>
                    <span className={`text-xl font-light text-accent transition-transform ${open ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {open && (
                    <div className="border-t border-line">
                      {/* Заголовок таблицы */}
                      <div className="hidden grid-cols-[1fr_90px_110px_110px] gap-3 border-b border-line bg-card px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-muted sm:grid">
                        <span>Вид работ</span>
                        <span className="text-right">Цена</span>
                        <span className="text-right">Кол-во</span>
                        <span className="text-right">Сумма</span>
                      </div>
                      {c.items.map((it) => {
                        const q = qty[it.name] ?? 0;
                        return (
                          <div
                            key={it.name}
                            className={`grid grid-cols-1 gap-2 border-b border-line/60 px-5 py-3 last:border-0 sm:grid-cols-[1fr_90px_110px_110px] sm:items-center sm:gap-3 ${
                              q > 0 ? 'bg-accent-soft/50' : ''
                            }`}
                          >
                            <span className="text-sm font-semibold">
                              {it.name}
                              <span className="ml-2 text-xs font-normal text-muted">за {it.unit}</span>
                            </span>
                            <span className="text-sm font-bold text-accent sm:text-right">
                              {fmt(it.price)} BYN
                            </span>
                            <span className="flex items-center gap-2 sm:justify-end">
                              <input
                                type="number"
                                min="0"
                                step="any"
                                inputMode="decimal"
                                placeholder="0"
                                value={q || ''}
                                onChange={(e) => set(it.name, e.target.value)}
                                className="w-24 rounded-lg border border-line bg-card px-3 py-1.5 text-right text-sm font-bold outline-none focus:border-accent"
                              />
                              <span className="w-8 text-xs text-muted">{it.unit}</span>
                            </span>
                            <span className="text-sm font-extrabold sm:text-right">
                              {q > 0 ? `${fmt(q * it.price)} BYN` : '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ===== Смета ===== */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-line bg-dark text-white shadow-2xl">
              <div className="border-b border-white/10 px-6 py-5">
                <h3 className="font-display text-lg font-bold">Смета</h3>
                <p className="mt-1 text-xs text-white/50">
                  {selected.length === 0 ? 'Введите кол-во напротив работ' : `${selected.length} позиций`}
                </p>
              </div>
              <div className="max-h-[420px] overflow-y-auto px-6 py-4">
                {selected.length === 0 ? (
                  <p className="py-6 text-center text-sm text-white/40">
                      заполнить объем работ
                  </p>
                ) : (
                  selected.map((r) => (
                    <div key={r.name} className="border-b border-white/10 py-3 last:border-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold">{r.name}</span>
                        <span className="shrink-0 text-sm font-bold text-accent">{fmt(r.sum)} BYN</span>
                      </div>
                      <p className="mt-0.5 text-xs text-white/40">
                        {fmt(r.q)} {r.unit} × {fmt(r.price)} BYN
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-white/15 px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest text-white/60">Итого</span>
                  <span className="font-display text-2xl font-bold text-accent">{fmt(total)} BYN</span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-white/40">
                  Ориентировочный расчёт без материалов. Точную цену назову после замера.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={copy}
                    disabled={selected.length === 0}
                    className="rounded-xl border border-white/20 py-3 text-sm font-bold transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
                  >
                    {copied ? 'Скопировано ✓' : 'Копировать'}
                  </button>
                  <a
                    href={selected.length ? wa(smetaText()) : undefined}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={selected.length === 0}
                    className={`rounded-xl bg-accent py-3 text-center text-sm font-bold text-white transition-colors hover:bg-accent-dark ${
                      selected.length === 0 ? 'pointer-events-none opacity-30' : ''
                    }`}
                  >
                    В WhatsApp →
                  </a>
                </div>
                <button
                  onClick={() => setQty({})}
                  disabled={selected.length === 0}
                  className="mt-2 w-full rounded-xl py-2 text-xs font-bold text-white/40 transition-colors hover:text-white disabled:opacity-30"
                >
                  Очистить смету
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
