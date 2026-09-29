import { Target, Heart, Award, Users, ArrowRight } from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import BrandButton from '@/components/shared/BrandButton';
import team from '@/data/team.json';
import stats from '@/data/stats.json';
import { IMAGES } from '@/lib/images';

const values = [
  { icon: Target, title: 'Our Mission', desc: 'To provide safe, comfortable, and affordable transport for every pilgrim visiting the holy cities of Makkah and Madinah.' },
  { icon: Heart, title: 'Our Values', desc: 'Integrity, hospitality, and excellence guide everything we do — from the first booking to the final destination.' },
  { icon: Award, title: 'Our Standards', desc: 'We maintain the highest standards of vehicle quality, driver professionalism, and customer service in the industry.' },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Page header */}
      <section className="relative h-[36vh] min-h-[260px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.madinahMinarets} alt="Madinah" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-700/80 to-brand-green-700/85" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">About Us</span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">Our Story</h1>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            Serving pilgrims with dedication and excellence across Saudi Arabia
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-brand grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl shadow-green-lg">
              <img src={IMAGES.kaabaAerial} alt="Kaaba aerial view" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-600">The Beginning</span>
              <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight text-brand-green-900 md:text-3xl">
                A Journey Built on <span className="text-gradient-gold">Trust</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Falak Ride was founded with a simple mission: to make every pilgrim&apos;s journey to the holy cities
                as comfortable and stress-free as possible. What started as a small fleet of vehicles has grown into
                a trusted transport service serving thousands of pilgrims annually.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We understand that traveling for Umrah or Ziyarat is a deeply spiritual experience, and we take pride
                in being part of that journey. Our drivers are not just chauffeurs — they are hosts who understand the
                significance of the places they take you to.
              </p>
              <div className="mt-6 flex gap-3">
                <BrandButton href="/booking" variant="primary" size="sm">Book a Ride</BrandButton>
                <BrandButton href="/contact" variant="outline" size="sm">Contact Us</BrandButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gradient-to-b from-brand-green-50/40 to-white">
        <div className="container-brand">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our"
            highlight="Principles"
            description="The foundation of everything we do at Falak Ride"
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="flex flex-col items-center rounded-2xl border border-brand-green-100/60 bg-white p-6 text-center shadow-soft transition-all hover:shadow-green hover:border-brand-gold-200">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-50">
                    <value.icon className="h-7 w-7 text-brand-gold-600" />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-bold text-brand-green-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-brand-green-700 py-14">
        <div className="container-brand px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.id} delay={i * 80}>
                <div className="flex flex-col items-center text-center">
                  <span className="font-sans text-3xl font-extrabold tracking-tight text-brand-gold-300 md:text-4xl">{stat.value}</span>
                  <span className="mt-1 text-xs text-white/70 md:text-sm">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Meet the Team"
            title="Our"
            highlight="People"
            description="Dedicated professionals committed to making your journey exceptional"
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={i * 80}>
                <div className="flex flex-col items-center rounded-2xl border border-brand-green-100/60 bg-white p-6 text-center shadow-soft transition-all hover:shadow-green hover:border-brand-gold-200">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-400 text-xl font-bold text-white">
                    {member.avatar}
                  </div>
                  <h3 className="mt-4 font-sans text-base font-bold text-brand-green-900">{member.name}</h3>
                  <span className="mt-1 text-xs font-semibold text-brand-gold-600">{member.role}</span>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
