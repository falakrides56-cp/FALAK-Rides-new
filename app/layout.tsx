import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Falak Ride — Umrah Transport & Private Chauffeur Saudi Arabia',
  description:
    'Reliable VIP Umrah, Ziyarat, and airport transport across Jeddah, Makkah, and Madinah. Book licensed chauffeurs with transparent fixed pricing and instant WhatsApp confirmation.',
  openGraph: {
    title: 'Falak Ride — Umrah Transport & Private Chauffeur Saudi Arabia',
    description:
      'Reliable VIP Umrah, Ziyarat, and airport transport across Jeddah, Makkah, and Madinah.',
    images: [{ url: '/images/hero_transport.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/images/hero_transport.jpg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-brand-green-900 selection:bg-brand-gold-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
