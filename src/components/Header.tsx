import { useState } from 'react';
import { site } from '../site';

const links = [
  { href: '#services', label: 'Услуги и цены' },
  { href: '#estimate', label: 'Смета' },
  { href: '#works', label: 'Фото работ' },
  { href: '#process', label: 'Как работаем' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <img
            src={import.meta.env.BASE_URL + 'images/images (1)-1-1-square.jpeg'}
            alt="Логотип Ремонт Гомель"
            width={28}
            height={28}
            className="rounded-md object-cover shrink-0"
          />
          Ремонт<span className="text-accent">Гомель</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-muted transition-colors hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.contacts.phoneHref} className="text-sm font-bold hover:text-accent">
            {site.contacts.phone}
          </a>
          <a
            href={site.contacts.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-dark"
          >
            Замер бесплатно
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Меню"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-lg lg:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <nav className="border-t border-line bg-bg px-4 py-4 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-line/50 py-3 text-sm font-semibold">
              {l.label}
            </a>
          ))}
          <a href={site.contacts.phoneHref} className="block py-3 text-sm font-bold text-accent">
            {site.contacts.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
