import {
  Clock4,
  PlaneTakeoff,
  BadgeCheck,
  Shield,
  GlassWater,
  Sparkles,
  PhoneCall,
  UserCheck,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';

const PERKS = [
  {
    icon: Clock4,
    title: '60 Min Free Airport Waiting',
    desc: 'International arrivals face long queues at immigration. Our drivers wait up to 60 minutes free of charge after landing.',
  },
  {
    icon: PlaneTakeoff,
    title: 'Automated Flight Tracking',
    desc: 'We track your flight number in real time. If your flight is delayed or lands early, your pickup adjusts automatically.',
  },
  {
    icon: UserCheck,
    title: 'Terminal Meet & Greet',
    desc: 'Never search for a taxi in the heat. Your dedicated driver waits inside arrivals holding a clear sign with your name.',
  },
  {
    icon: GlassWater,
    title: 'Zamzam & Cold Refreshments',
    desc: 'Enjoy chilled bottled drinking water, phone charging ports, and moist towels to refresh after a long flight.',
  },
  {
    icon: Shield,
    title: 'Fixed All-Inclusive Fares',
    desc: 'The price you see is the final price. All highway tolls, Haramain corridor permits, and airport parking are fully covered.',
  },
  {
    icon: Sparkles,
    title: 'Pristine Sanitized Vehicles',
    desc: 'Every vehicle undergoes rigorous interior cleaning, AC filter sanitation, and safety inspections before your trip.',
  },
  {
    icon: BadgeCheck,
    title: 'Licensed Professional Chauffeurs',
    desc: 'Background-checked, experienced drivers who know the fastest routes, Miqat locations, and hotel drop-off protocols.',
  },
  {
    icon: PhoneCall,
    title: '24/7 Pilgrim Support Desk',
    desc: 'Our multilingual dispatch team is available around the clock via WhatsApp and phone to assist your family anytime.',
  },
];

export default function PilgrimPerks() {
  return (
    <section className="section-padding bg-white">
      <div className="container-brand">
        <SectionHeading
          eyebrow="The Falak Ride Standard"
          title="Designed Specifically for"
          highlight="Pilgrims & Families"
          description="We take care of every travel detail so you can focus your heart and mind entirely on your spiritual devotion."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <Reveal key={perk.title} delay={i * 60}>
                <div className="flex flex-col rounded-2xl border border-brand-green-100/60 bg-gradient-to-b from-white to-brand-green-50/20 p-6 shadow-soft transition-all duration-300 hover:shadow-green hover:border-brand-gold-300">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700">
                    <Icon className="h-5 w-5 text-brand-gold-600" />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-bold text-brand-green-900">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {perk.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
