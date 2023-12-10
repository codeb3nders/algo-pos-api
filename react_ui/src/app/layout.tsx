'use client';
import type { Metadata } from 'next';

import './globals.css';
import { Menu } from '../components/menu';
import { LeftSideMenu } from '@/components/leftSideMenu';
import { RightSideMenu } from '@/components/righSideMenu';
import { MenuComponent } from '@/components/menuComponent';
import { initFlowbite } from 'flowbite';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metadata: Metadata = {
    title: 'Algo POS',
    description: 'Algo Point of sales system',
  };

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen">
        <nav className="dark:border-gray-700 shadow-md p-1 sm:ml-64 border-2 bg-gray-100">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <LeftSideMenu />
              <RightSideMenu />
            </div>
          </div>
        </nav>
        <MenuComponent />
        <div className="p-4 sm:ml-64 border-2 bg-gray-100">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="grid gap-4 mb-4">
              <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
