'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '@/lib/constants';

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-500 p-3 text-white shadow-green-lg transition-all duration-300 hover:scale-110 hover:shadow-green-lg"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 animate-ping rounded-full bg-brand-green-500 opacity-30" style={{ animationDuration: '2s' }} />
    </a>
  );
}
