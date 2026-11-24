export interface NavLink {
  href: string;
  label: string;
}

export const servicesNav: NavLink[] = [
  { href: '/remont-kvartir/', label: 'Ремонт квартир' },
  { href: '/santehnika/', label: 'Сантехника' },
  { href: '/elektrika/', label: 'Электрика' },
  { href: '/plitka/', label: 'Плитка' },
  { href: '/remont-kottedzhey/', label: 'Ремонт коттеджей' },
  { href: '/otdelochnye-raboty/', label: 'Отделочные работы' },
];

export const serviceSlugs = [
  'remont-kvartir',
  'santehnika',
  'elektrika',
  'plitka',
  'remont-kottedzhey',
  'otdelochnye-raboty',
];