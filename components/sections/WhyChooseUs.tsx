'use client';

import { Headset, BadgeCheck, Tag, Languages, Sparkles, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';

const features = [
  {
    icon: Headset,
    title: '24/7 Support',
    desc: 'Round-the-clock assistance for all your travel needs, any time, any day.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Drivers',
    desc: 'Professional, background-checked drivers with years of experience.',
  },
  {
    icon: Tag,
    title: 'Fixed Pricing',
    desc: 'Transparent, upfront pricing with no hidden charges or surprises.',
  },
  {
    icon: Languages,
    title: 'Multilingual Drivers',
    desc: 'Drivers who speak Arabic, English, Urdu, and more for your comfort.',
  },
  {
    icon: Sparkles,
    title: 'Clean Vehicles',
    desc: 'Well-maintained, sanitized, and air-conditioned vehicles every time.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Reliable',
    desc: 'Your safety is our priority — fully insured vehicles and trained drivers.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-gradient-to-b from-brand-green-50/40 to-white">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Why Falak Ride"
          title="Why"
          highlight="Choose Us"
          description="We combine reliability, comfort, and Islamic hospitality for a seamless travel experience"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80}>
              <div className="group flex gap-4 rounded-2xl border border-brand-green-100/60 bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-gold-200 hover:shadow-green">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-green-50 transition-colors duration-300 group-hover:bg-brand-gold-50">
                  <feature.icon className="h-6 w-6 text-brand-green-600 transition-colors duration-300 group-hover:text-brand-gold-600" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-brand-green-900">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
