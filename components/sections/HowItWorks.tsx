import { CalendarCheck, MessageSquareText, UserCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';

const STEPS = [
  {
    step: '01',
    title: 'Reserve in 60 Seconds',
    desc: 'Select your route, dates, and vehicle size online or via WhatsApp. Guaranteed fixed fare with zero prepayment needed.',
    icon: CalendarCheck,
  },
  {
    step: '02',
    title: 'Instant Confirmation',
    desc: 'Receive immediate booking confirmation, driver assignment, vehicle license details, and exact meeting instructions.',
    icon: MessageSquareText,
  },
  {
    step: '03',
    title: 'Terminal Meet & Greet',
    desc: 'Your licensed chauffeur monitors your flight landing in real-time and greets you at arrivals holding your name sign.',
    icon: UserCheck,
  },
  {
    step: '04',
    title: 'Blessed & Restful Journey',
    desc: 'Relax in a pristine, air-conditioned vehicle with complimentary chilled water, luggage loading, and courteous service.',
    icon: HeartHandshake,
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Seamless Pilgrim Experience"
          title="How It"
          highlight="Works"
          description="From arrival at the airport to reaching the holy sanctuaries, we ensure your Umrah journey is smooth, dignified, and stress-free."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={idx * 100}>
                <div className="relative flex flex-col rounded-2xl border border-brand-green-100/70 bg-gradient-to-b from-white to-brand-green-50/20 p-6 shadow-soft transition-all duration-300 hover:shadow-green-lg hover:-translate-y-1 hover:border-brand-gold-300">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700 ring-1 ring-brand-green-100">
                      <Icon className="h-6 w-6 text-brand-gold-600" />
                    </div>
                    <span className="font-sans text-xs font-bold tracking-wider text-brand-gold-600 uppercase">
                      Step {item.step}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg font-bold text-brand-green-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-green-700 px-6 py-3 text-sm font-semibold text-white shadow-green transition-all hover:bg-brand-green-800"
          >
            Start Your Reservation
            <ArrowRight className="h-4 w-4 text-brand-gold-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
