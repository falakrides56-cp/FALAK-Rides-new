'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Plane,
  CreditCard,
  Car,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BRAND, WHATSAPP_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  category: 'airport' | 'booking' | 'fleet' | 'umrah' | 'policy';
  q: string;
  a: string;
}

const FAQS_DATA: FAQItem[] = [
  // Airport & Arrivals
  {
    id: 'f1',
    category: 'airport',
    q: 'Where will I meet my chauffeur at King Abdulaziz International Airport (JED)?',
    a: 'For Terminal 1 (Saudia, Flynas, and most international carriers), your chauffeur meets you inside the arrivals hall right after you clear customs and baggage claim, holding a greeting sign with your name. For North Terminal (charter and low-cost flights), your driver coordinates live on WhatsApp and waits at the designated passenger pickup curb.',
  },
  {
    id: 'f2',
    category: 'airport',
    q: 'What happens if my flight is delayed or immigration takes longer than expected?',
    a: 'We monitor your flight status using real-time aviation tracking. Whether your flight lands 2 hours early or 3 hours delayed, your chauffeur automatically adjusts. We provide up to 60 minutes of complimentary waiting time after your flight actually touches down, allowing plenty of time for passport control and luggage retrieval.',
  },
  {
    id: 'f3',
    category: 'airport',
    q: 'Do you provide airport pickups from Madinah Prince Mohammad bin Abdulaziz Airport (MED)?',
    a: 'Yes! We provide 24/7 meet-and-greet transfers from Madinah Airport directly to all hotels in the Central Markaziyah area around Al-Masjid an-Nabawi or directly to Makkah hotels.',
  },
  {
    id: 'f4',
    category: 'airport',
    q: 'How will I identify my driver at the airport?',
    a: 'Prior to your arrival, our dispatch team sends you your driver’s name, local phone number, vehicle model, and license plate number on WhatsApp. Your driver will also hold a sign displaying your name in the designated arrivals meeting area.',
  },

  // Booking & Payments
  {
    id: 'f5',
    category: 'booking',
    q: 'Are the prices fixed or are there extra hidden charges for tolls and VAT?',
    a: 'All Falak Ride fares are 100% fixed, transparent, and all-inclusive. The quote you receive includes all Saudi highway toll gates, airport parking entrance fees, fuel, and taxes. There are zero surprise surcharges or surge prices upon arrival.',
  },
  {
    id: 'f6',
    category: 'booking',
    q: 'What payment methods do you accept?',
    a: 'We offer maximum flexibility: You can pay cash in Saudi Riyal (SAR) directly to the chauffeur upon arrival at your destination, pay with Visa/Mastercard/Mada via mobile card terminal, or make an advance bank transfer. Standard bookings require no advance deposit.',
  },
  {
    id: 'f7',
    category: 'booking',
    q: 'How far in advance should I book my ride?',
    a: 'While we frequently accommodate same-day bookings within 1 to 2 hours notice, we recommend booking at least 24 to 48 hours before your flight to guarantee your preferred vehicle category (especially for large family vans and luxury SUVs during peak Umrah seasons).',
  },
  {
    id: 'f8',
    category: 'booking',
    q: 'Can I book a multi-leg journey (e.g., Jeddah → Makkah → Madinah → Airport)?',
    a: 'Yes! A large majority of our guests book their entire pilgrimage transport package with us. You can specify all legs on our booking form or coordinate the dates and stopovers directly with our team on WhatsApp.',
  },

  // Fleet & Luggage
  {
    id: 'f9',
    category: 'fleet',
    q: 'How much luggage can fit in each vehicle type?',
    a: '• Sedan: 3-4 passengers + 3 large suitcases.\n• SUV (GMC Yukon / Tahoe): 5-6 passengers + 5-6 large suitcases + carry-ons.\n• Van (Hyundai Staria / Toyota HiAce): 7-8 passengers + 7-8 large suitcases.\nIf you are traveling with extra luggage or 5-liter Zamzam containers, we recommend booking a category larger.',
  },
  {
    id: 'f10',
    category: 'fleet',
    q: 'Are 5-liter Zamzam water cans permitted in the vehicle?',
    a: 'Yes, absolutely. All our vehicles have spacious trunks capable of carrying official 5L airport-sealed Zamzam water containers alongside your standard luggage. Our chauffeurs take extra care in handling and positioning them upright.',
  },
  {
    id: 'f11',
    category: 'fleet',
    q: 'Are child car seats and wheelchair assistance available?',
    a: 'Yes! Child car seats and booster seats can be arranged upon request at no extra charge. Please mention this in the booking notes. Our chauffeurs also assist passengers with foldable wheelchairs and luggage loading.',
  },
  {
    id: 'f12',
    category: 'fleet',
    q: 'Are all vehicles air-conditioned and smoke-free?',
    a: 'Yes. Every vehicle in the Falak Ride fleet is modern, strictly non-smoking, meticulously sanitized, and equipped with powerful dual-zone air conditioning to ensure complete comfort in the Saudi climate.',
  },

  // Umrah, Miqat & Ziyarat
  {
    id: 'f13',
    category: 'umrah',
    q: 'Can the driver stop at a Miqat mosque for us to assume Ihram and pray?',
    a: 'Yes, at no extra cost. When traveling between Madinah and Makkah, your driver will stop at Masjid Dhu’l-Hulayfah (Bir Ali) for ablution, prayer, and Ihram intention. If you arrive via road from Taif or Riyadh, we stop at Qarn Al-Manazil.',
  },
  {
    id: 'f14',
    category: 'umrah',
    q: 'Can the vehicle drop us right at our hotel door near Masjid Al-Haram?',
    a: 'Yes. Our chauffeurs hold authorized municipal permits allowing access to hotel zones near the Haram (such as Jabal Omar, Ajyad, and Ibrahim Al-Khalil Street). During peak prayer crowd hours when specific streets are pedestrianized by police, drivers drop you off at the closest permitted lobby access point.',
  },
  {
    id: 'f15',
    category: 'umrah',
    q: 'How do the Holy Ziyarat historical tours work?',
    a: 'Ziyarat tours are private excursions exclusively for your family or group. The driver picks you up from your hotel lobby, guides you to each sacred site (Cave of Hira, Mount Arafat, Masjid Quba, Mount Uhud, etc.), and waits with the AC running while you pray and take photos.',
  },

  // Changes & Cancellations
  {
    id: 'f16',
    category: 'policy',
    q: 'What is your cancellation policy?',
    a: 'We understand that flight schedules and pilgrimage plans can change. You can cancel or reschedule your ride free of charge up to 6 hours before the scheduled pickup time by simply sending a message on WhatsApp.',
  },
  {
    id: 'f17',
    category: 'policy',
    q: 'Can I change my pickup time or hotel destination after booking?',
    a: 'Yes. Just message us on WhatsApp with your booking reference (e.g. BK-2401) and our 24/7 dispatch desk will update your trip details and inform your assigned chauffeur immediately.',
  },
  {
    id: 'f18',
    category: 'policy',
    q: 'Do your drivers speak English and Arabic?',
    a: 'Yes. Our professional chauffeurs are multilingual, speaking Arabic, English, and Urdu/Hindi, ensuring clear communication throughout your journey.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative h-[36vh] min-h-[260px] overflow-hidden bg-brand-green-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-brand-gold-400" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-brand-gold-400" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">
            Help Center & Knowledge Base
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            Everything you need to know about our chauffeur services, airport pickup procedures, and booking policies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gradient-to-b from-white via-brand-green-50/20 to-white">
        <div className="container-brand max-w-4xl">
          {/* Search Box */}
          <div className="rounded-2xl border border-brand-green-100/80 bg-white p-4 md:p-6 shadow-soft">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Type your question (e.g., luggage, terminal 1, zamzam, cancellation)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-xl border border-brand-green-100 bg-brand-green-50/20 pl-11 pr-4 text-sm font-medium text-brand-green-900 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-gold-400/50"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'airport', label: 'Airport & Arrivals' },
                { id: 'booking', label: 'Booking & Payments' },
                { id: 'fleet', label: 'Vehicles & Luggage' },
                { id: 'umrah', label: 'Umrah & Ziyarat' },
                { id: 'policy', label: 'Changes & Policies' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all',
                    activeCategory === cat.id
                      ? 'bg-brand-green-700 text-white shadow-sm'
                      : 'bg-brand-green-50/70 text-brand-green-800 hover:bg-brand-green-100'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {filteredFaqs.length} answers</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-brand-gold-600 font-semibold hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="mt-6 rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {filteredFaqs.map((faq, i) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-brand-green-100/60 rounded-xl px-4 transition-colors data-[state=open]:bg-brand-green-50/40 data-[state=open]:border-brand-gold-300"
                >
                  <AccordionTrigger className="text-left font-sans text-sm font-bold text-brand-green-900 hover:text-brand-gold-700 hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-brand-gold-600 shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-xs leading-relaxed text-muted-foreground pt-1 pb-4 pl-7 whitespace-pre-line">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="py-12 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-brand-gold-500" />
                <h3 className="mt-3 font-sans text-base font-bold text-brand-green-900">
                  No exact match found
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Our 24/7 team is available on WhatsApp to answer any specific questions.
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-green-700 px-5 py-2.5 text-xs font-semibold text-white shadow-green"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask Us on WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Contact Support Banner */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-green-800 to-brand-green-700 p-6 md:p-8 text-white shadow-green-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold-300">
                  Still have questions?
                </span>
                <h3 className="mt-1 font-sans text-xl font-extrabold text-white">
                  We are available 24 hours a day, 7 days a week
                </h3>
                <p className="mt-1 text-xs text-white/80 max-w-lg leading-relaxed">
                  Whether you need custom pricing for groups over 10 people, specialized elderly assistance, or multiple city stops, reach out directly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-gold-300" />
                  Call {BRAND.phone}
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-400 px-6 py-3 text-xs font-bold text-brand-green-950 shadow-gold hover:bg-brand-gold-300 transition-all"
                >
                  <MessageCircle className="h-4 w-4 text-brand-green-950" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
