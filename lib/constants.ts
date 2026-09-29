export const BRAND = {
  name: 'Falak Ride',
  tagline: 'Umrah Transport',
  phone: '+966 56 769 1683',
  phoneDisplay: '+966 56 769 1683',
  whatsapp: '966567691683',
  email: 'info@falakride.com',
  address: 'Makkah, Saudi Arabia',
  hours: '24/7 Available',
  social: {
    twitter: '#',
    instagram: '#',
    facebook: '#',
    youtube: '#',
  },
};

export const WHATSAPP_LINK = `https://wa.me/${BRAND.whatsapp}`;

export function buildWhatsAppMessage(text: string): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Routes', href: '/routes' },
  { label: 'Ziyarat', href: '/ziyarat' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Umrah Guide', href: '/umrah-guide' },
  { label: 'Track Ride', href: '/track-booking' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

