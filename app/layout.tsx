import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Harel Asaf — AI Prototype Launchpad',
  description:
    'Every AI prototype Harel and his agent team build — playable, clickable, live.',
  openGraph: {
    title: 'Harel Asaf — AI Prototype Launchpad',
    description:
      'Every AI prototype Harel and his agent team build — playable, clickable, live.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-surface`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent_60%)]" />
        {children}
      </body>
    </html>
  );
}
