import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'webOS',
  description: 'A modern operating system built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${nunito.variable}`}>{children}</body>
    </html>
  );
}
