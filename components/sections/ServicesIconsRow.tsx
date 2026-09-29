'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Plane,
  Moon,
  Route,
  MapPin,
  UserRound,
  Car,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import services from '@/data/services.json';
import { getServiceImage } from '@/lib/images';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Plane,
  Moon,
  Route,
  MapPin,
  UserRound,
  Car,
};

const serviceBadges: Record<string, string> = {
  'airport-transfer': 'Airport & Terminal',
  'umrah-ziyarat': 'Sacred Pilgrimage',
  'intercity-transfer': 'Intercity Express',
  'city-tour': 'Guided Heritage',
  'with-driver': 'Private VIP Chauffeur',
  'self-drive': 'Flexible Rental',
};

export default function ServicesIconsRow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Responsive visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, services.length - visibleCount);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Automatic continuous sliding
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-brand">
        {/* Centered Section Heading - No manual arrow buttons */}
        <SectionHeading
          eyebrow="What We Offer"
          title="Our"
          highlight="Services"
          description="Comprehensive transport solutions for every need across Saudi Arabia"
        />

        {/* Auto Carousel Viewport - Clean, No Shadows, No Effects, No Gradients */}
        <div
          className="mt-10 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Car;
              const badgeText = serviceBadges[service.id] || 'Transport Solution';
              const imageUrl = getServiceImage(service.id);

              return (
                <div
                  key={service.id}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* Clean Card: No Gradients, No Shadows, No Effects */}
                  <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-brand-green-100 bg-white transition-colors duration-200 hover:border-brand-gold-500">
                    <div>
                      {/* Real Image Header - Clean, No Gradients, No Effects */}
                      <div className="relative h-44 overflow-hidden bg-brand-green-900">
                        <img
                          src={imageUrl}
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                        {/* Clean Solid Badge on Image */}
                        <div className="absolute left-3 top-3">
                          <span className="inline-block rounded-full bg-brand-green-900/90 px-3 py-1 text-[0.68rem] font-bold text-brand-gold-300">
                            {badgeText}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-800">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-sans text-base font-bold text-brand-green-900 leading-snug">
                              {service.title}
                            </h3>
                            <span className="text-[0.68rem] font-medium text-brand-gold-600">
                              24/7 Available · Fixed Rates
                            </span>
                          </div>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {service.shortDesc}
                        </p>

                        {/* Features List */}
                        <div className="mt-4 space-y-1.5 border-t border-brand-green-100 pt-3">
                          {service.features.slice(0, 3).map((feat) => (
                            <div key={feat} className="flex items-center gap-2 text-[0.72rem] text-brand-green-900">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-gold-600" />
                              <span className="font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex items-center justify-between border-t border-brand-green-100 bg-brand-green-50/50 p-4">
                      <Link
                        href={`/services#${service.id}`}
                        className="text-xs font-semibold text-brand-green-800 hover:text-brand-gold-600 transition-colors duration-200"
                      >
                        Learn More
                      </Link>

                      <Link
                        href={`/booking?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-brand-gold-500"
                      >
                        <span>Book Ride</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                currentIndex === idx
                  ? 'w-7 bg-brand-gold-500'
                  : 'w-2 bg-brand-green-200 hover:bg-brand-green-300'
              )}
            />
          ))}
        </div>

        {/* Bottom Link to Full Services Catalog */}
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-green-200 bg-white px-6 py-3 text-xs font-bold text-brand-green-800 transition-colors duration-200 hover:bg-brand-green-700 hover:text-white hover:border-brand-green-700"
          >
            <span>Explore All Specialized Services</span>
            <ArrowRight className="h-4 w-4 text-brand-gold-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
