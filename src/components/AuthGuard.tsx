'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getUsuario } from '@/lib/client/auth';
import { BottomNav } from './BottomNav';

const PUBLIC = ['/registro'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = getUsuario();
    if (pathname === '/registro' && user) {
      router.replace('/');
      return;
    }
    if (!user && !PUBLIC.includes(pathname)) {
      router.replace('/registro');
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) return null;

  const showNav = !PUBLIC.includes(pathname);
  return (
    <>
      {children}
      {showNav && <BottomNav />}
    </>
  );
}
