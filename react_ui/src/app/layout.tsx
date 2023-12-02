import type { Metadata } from 'next';

import './globals.css';
import { Menu } from '../components/menu';

export const metadata: Metadata = {
  title: 'Algo POS',
  description: 'Algo Point of sales system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Menu />
        <div className="flex items-center justify-center p-24">{children}</div>
      </body>
    </html>
  );
}
