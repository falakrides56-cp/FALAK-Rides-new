import { Users, Briefcase, Snowflake, Check, ArrowRight } from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import BrandButton from '@/components/shared/BrandButton';
import fleet from '@/data/fleet.json';
import { getFleetImage, IMAGES } from '@/lib/images';

export default function FleetPage() {
  return (
    <PublicLayout>
      {/* Page header */}
      <section className="relative h-[36vh] min-h-[260px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.fleet.luxury} alt="Our Fleet" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-700/80 to-brand-green-700/85" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">Our Vehicles</span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">Fleet Catalogue</h1>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            Choose from our wide range of well-maintained vehicles for every need and group size
          </p>
        </div>
      </section>

      {/* Fleet grid */}
      <section className="section-padding bg-white">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Vehicle Options"
            title="Find Your"
            highlight="Perfect Ride"
            description="All vehicles come with air conditioning, professional drivers, and full insurance"
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((vehicle, i) => (
              <Reveal key={vehicle.id} delay={i * 80}>
                <div className="group overflow-hidden rounded-2xl border border-brand-green-100/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-green-lg hover:border-brand-gold-200">
                  <div className="relative h-48 overflow-hidden bg-brand-green-50/40">
                    <img
                      src={getFleetImage(vehicle.image)}
                      alt={vehicle.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green-700/20 to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full bg-brand-gold-500 px-3 py-1 text-xs font-bold text-brand-green-700">
                      From {vehicle.priceFrom} {vehicle.currency}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-sans text-lg font-bold text-brand-green-900">{vehicle.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{vehicle.description}</p>

                    {/* Specs */}
                    <div className="mt-4 flex items-center gap-4 rounded-lg bg-brand-green-50/50 p-3">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-brand-green-700">
                        <Users className="h-4 w-4 text-brand-gold-500" />
                        {vehicle.passengers} seats
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-brand-green-700">
                        <Briefcase className="h-4 w-4 text-brand-gold-500" />
                        {vehicle.luggage} bags
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-brand-green-700">
                        <Snowflake className="h-4 w-4 text-brand-gold-500" />
                        AC
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="mt-4 space-y-1.5">
                      {vehicle.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-brand-green-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <BrandButton href="/booking" variant="primary" size="sm" className="mt-5 w-full">
                      Select & Book <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </BrandButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
