import { useState } from 'react';
import { site } from '../data/site';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const submit = () => {
    const text = `Здравствуйте! Меня зовут ${name || '—'}. Хочу заказать замер/работу.${message ? ` Что нужно: ${message}.` : ''} Телефон: ${phone || '—'}`;
    window.open(`${site.contacts.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const inputCls =
    'mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-accent';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="rounded-2xl border border-white/15 bg-dark-2 p-6 sm:p-8"
    >
      <h3 className="font-display text-lg font-bold">Заявка на замер</h3>
      <p className="mt-1 text-xs text-white/50">Отвечу в течение часа в рабочее время.</p>

      <label className="mt-5 block text-sm font-semibold text-white/80" htmlFor="cf-name">
        Ваше имя
      </label>
      <input
        id="cf-name"
        className={inputCls}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Как к вам обращаться"
      />

      <label className="mt-4 block text-sm font-semibold text-white/80" htmlFor="cf-phone">
        Телефон
      </label>
      <input
        id="cf-phone"
        className={inputCls}
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+375 (__) ___-__-__"
        required
      />

      <label className="mt-4 block text-sm font-semibold text-white/80" htmlFor="cf-msg">
        Что нужно сделать?
      </label>
      <textarea
        id="cf-msg"
        className={`${inputCls} min-h-24 resize-y`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Например: косметический ремонт 1-комнатной"
      />

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-accent py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-dark"
      >
        Отправить в WhatsApp →
      </button>
      <p className="mt-3 text-[11px] leading-relaxed text-white/40">
        Заявка формируется в WhatsApp — ничего не публикуется. Бесплатно и ни к чему не обязывает.
      </p>
    </form>
  );
}