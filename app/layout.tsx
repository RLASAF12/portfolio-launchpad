import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Harel Asaf · Build Lab',
  description:
    'Every AI prototype Harel and his agent team build — playable, clickable, live.',
  openGraph: {
    title: 'Harel Asaf · Build Lab',
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
