'use client';

import { Users, Car, Clock, Star } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import stats from '@/data/stats.json';

const iconMap: Record<string, React.ElementType> = {
  Users,
  Car,
  Clock,
  Star,
};

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-brand-green-700 py-14 md:py-16">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gold-400" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-gold-400" />
      </div>

      <div className="relative container-brand px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Impact"
          title="Trusted by"
          highlight="Thousands"
          description="Numbers that reflect our commitment to excellence"
          center
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Users;
            return (
              <Reveal key={stat.id} delay={i * 100}>
                <div className="flex flex-col items-center rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:ring-brand-gold-300/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold-500/15">
                    <Icon className="h-6 w-6 text-brand-gold-300" />
                  </div>
                  <span className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs text-white/70 md:text-sm">{stat.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
