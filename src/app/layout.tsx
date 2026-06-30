import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthGuard } from '@/components/AuthGuard';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'UniVuelta — La red confiable para volver a casa',
  description: 'Viajes compartidos entre Santiago y regiones, solo para comunidad universitaria.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <div id="app">
          <AuthGuard>{children}</AuthGuard>
        </div>
      </body>
    </html>
  );
}
