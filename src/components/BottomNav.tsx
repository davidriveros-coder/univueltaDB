'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', icon: '🏠', label: 'Inicio' },
  { href: '/buscar', icon: '🔍', label: 'Buscar' },
  { href: '/mis-viajes', icon: '📋', label: 'Mis viajes' },
  { href: '/perfil', icon: '👤', label: 'Perfil' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {tabs.map((t) => {
        const active =
          t.href === '/'
            ? pathname === '/'
            : pathname === t.href || pathname.startsWith(t.href + '/');
        return (
          <Link key={t.href} href={t.href} className={`nav-item${active ? ' active' : ''}`}>
            <span className="nav-icon">{t.icon}</span>
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
