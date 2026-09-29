import { Plane, Moon, Route, MapPin, UserRound, Car, Check, ArrowRight } from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import BrandButton from '@/components/shared/BrandButton';
import services from '@/data/services.json';
import { IMAGES, getServiceImage } from '@/lib/images';

const iconMap: Record<string, React.ElementType> = {
  Plane, Moon, Route, MapPin, UserRound, Car,
};

export default function ServicesPage() {
  return (
    <PublicLayout>
      {/* Page header */}
      <section className="relative h-[36vh] min-h-[260px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.kaabaPilgrims} alt="Makkah" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-700/80 to-brand-green-700/85" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">What We Do</span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">Our Services</h1>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            Comprehensive transport solutions designed for pilgrims and travelers across Saudi Arabia
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="section-padding bg-white">
        <div className="container-brand space-y-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Car;
            const isReversed = i % 2 === 1;
            return (
              <Reveal key={service.id}>
                <div
                  id={service.id}
                  className={`grid grid-cols-1 items-center gap-6 rounded-3xl border border-brand-green-100/80 bg-white p-6 md:p-8 lg:grid-cols-2 ${isReversed ? 'lg:[direction:rtl]' : ''}`}
                >
                  {/* Real Image */}
                  <div className={`relative h-64 overflow-hidden rounded-2xl md:h-80 ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
                    <img
                      src={getServiceImage(service.id)}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-700 text-brand-gold-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-sans text-base font-bold drop-shadow-sm">{service.title}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-600">
                      Service {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-2 font-sans text-xl font-bold tracking-tight text-brand-green-900 md:text-2xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mt-4 grid grid-cols-2 gap-2">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-sm text-brand-green-700">
                          <Check className="h-4 w-4 text-brand-gold-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <BrandButton href="/booking" variant="primary" size="sm">
                        Book This Service <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </BrandButton>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
