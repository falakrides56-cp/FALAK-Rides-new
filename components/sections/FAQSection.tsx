'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '@/lib/constants';

const FAQS = [
  {
    q: 'Where will I meet my chauffeur at King Abdulaziz International Airport (JED)?',
    a: 'For King Abdulaziz Terminal 1 (Saudia, Flynas, and most international carriers), your driver will meet you right outside the baggage exit inside the arrivals hall holding a sign with your name. For North Terminal (charter flights), your driver coordinates via WhatsApp and will be parked at the designated VIP passenger pickup curb.',
  },
  {
    q: 'What happens if my flight is delayed or immigration takes longer than usual?',
    a: 'We monitor all flights using real-time aviation tracking. Whether your flight arrives 2 hours early or 3 hours late, your chauffeur adjusts automatically. We also provide up to 60 minutes of complimentary waiting time after your flight actually lands, so you can clear passport control and baggage claim without rushing.',
  },
  {
    q: 'Can the driver stop at a Miqat mosque for us to assume Ihram and pray?',
    a: 'Yes, absolutely. If you are landing without Ihram and traveling to Makkah, or heading from Madinah to Makkah, our drivers will happily stop at the designated Miqat (such as Masjid Dhul Hulayfah / Bir Ali in Madinah or Qarn Al-Manazil / Yalamlam) for prayer and Niyyah at no additional charge.',
  },
  {
    q: 'Are 5-liter Zamzam water cans permitted in the vehicle?',
    a: 'Yes. All our SUVs and family vans are equipped to comfortably handle large pilgrim suitcases plus official 5L airport-sealed Zamzam water containers. If you are a larger family with extra luggage, we recommend choosing our GMC Yukon or 7-10 Seater Family Van.',
  },
  {
    q: 'Are the prices fixed or are there extra charges for tolls and taxes?',
    a: 'All Falak Ride fares are 100% fixed and transparent. The quote you receive includes all Saudi highway toll gates, airport parking fees, and applicable VAT. There are never any surprise charges upon arrival.',
  },
  {
    q: 'Can we book a multi-leg journey (Jeddah → Makkah → Madinah → Airport)?',
    a: 'Yes! A majority of our guests book their complete Umrah transport itinerary with us. You can specify all legs on our booking form or discuss custom dates directly with our dispatch team on WhatsApp.',
  },
  {
    q: 'What payment options do you accept?',
    a: 'We accept cash payment in Saudi Riyal (SAR) directly to the chauffeur upon arrival, card payments via mobile POS, or upfront online bank transfer. No advance deposit is required to confirm standard bookings.',
  },
  {
    q: 'Are child car seats and elderly assistance available?',
    a: 'Yes. Please indicate in the booking notes if you require a child car seat or need luggage assistance for elderly family members. Our chauffeurs take great pride in assisting guests of Allah with utmost care.',
  },
];

export default function FAQSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-brand-green-50/20 to-white">
      <div className="container-brand max-w-4xl">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Common Questions About"
          highlight="Umrah Transport"
          description="Everything you need to know about our chauffeur services, airport pickup procedures, and booking policies."
        />

        <div className="mt-12 rounded-2xl border border-brand-green-100/80 bg-white p-6 md:p-8 shadow-soft">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border border-brand-green-100/60 rounded-xl px-4 transition-colors data-[state=open]:bg-brand-green-50/40 data-[state=open]:border-brand-gold-300"
              >
                <AccordionTrigger className="text-left font-sans text-sm font-bold text-brand-green-900 hover:text-brand-gold-700 hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-brand-gold-600 shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-sans text-xs leading-relaxed text-muted-foreground pt-1 pb-4 pl-7">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-brand-green-50/70 p-5 sm:flex-row">
            <div>
              <p className="font-sans text-sm font-bold text-brand-green-900">Have a special inquiry or group over 15 people?</p>
              <p className="text-xs text-muted-foreground">Our 24/7 reservation team is ready to assist instantly.</p>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-green-700 px-4 py-2.5 text-xs font-semibold text-white shadow-green transition-all hover:bg-brand-green-800 shrink-0"
            >
              <MessageCircle className="h-4 w-4 text-brand-gold-300" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
