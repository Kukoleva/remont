import { site } from '../site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-card pb-24 md:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.brand} — {site.role}
        </p>
        <div className="flex gap-6 text-sm font-semibold text-muted">
          <a href={site.contacts.telegram} target="_blank" rel="noreferrer" className="hover:text-accent">
            Telegram
          </a>
          <a href={site.contacts.whatsapp} target="_blank" rel="noreferrer" className="hover:text-accent">
            WhatsApp
          </a>
          <a href={site.contacts.viber} target="_blank" rel="noreferrer" className="hover:text-accent">
            Viber
          </a>
        </div>
      </div>
    </footer>
  );
}
