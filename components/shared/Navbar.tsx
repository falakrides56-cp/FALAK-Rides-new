'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { NAV_LINKS, BRAND, WHATSAPP_LINK } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-white/80 backdrop-blur-sm'
        )}
      >
        <div className="container-brand flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 xl:gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'nav-link text-xs xl:text-sm font-medium whitespace-nowrap',
                  pathname === link.href && 'active text-brand-gold-600 font-bold'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-green-700 transition-colors hover:bg-brand-green-50"
              aria-label="Toggle language"
            >
              <span className={lang === 'EN' ? 'text-brand-gold-600' : ''}>EN</span>
              <span className="text-brand-green-300">|</span>
              <span className={lang === 'AR' ? 'text-brand-gold-600' : ''}>AR</span>
            </button>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-green-600 to-brand-green-500 px-3.5 py-2 text-xs font-semibold text-white shadow-green transition-all hover:shadow-green-lg sm:flex"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-green-700 transition-colors hover:bg-brand-green-50 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-brand-green-100 bg-white lg:hidden">
            <nav className="container-brand flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-brand-green-50 text-brand-gold-600'
                      : 'text-brand-green-700 hover:bg-brand-green-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-green-600 to-brand-green-500 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                {BRAND.phone}
              </a>
            </nav>
          </div>
        )}
      </header>
      <div className="h-16" />
    </>
  );
}
