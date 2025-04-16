'use client';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Login · Bravera Bank</title>
        <meta name="description" content="Bravera Bank provides secure banking solutions for personal and business needs." />
        <link rel="icon" type="image/png" href="/assets/logo.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}