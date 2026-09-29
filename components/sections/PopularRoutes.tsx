'use client';

import Link from 'next/link';
import { Clock, MapPin, ArrowRight, Car, Check } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import routes from '@/data/routes.json';
import { getRouteImage } from '@/lib/images';

export default function PopularRoutes() {
  return (
    <section className="section-padding bg-white">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Popular Destinations"
          title="Popular"
          highlight="Routes"
          description="Our most booked routes with transparent, fixed pricing"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route, i) => (
            <Reveal key={route.id} delay={i * 60}>
              <Link
                href={`/booking?pickup=${encodeURIComponent(route.from)}&dropoff=${encodeURIComponent(route.to)}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-green-100 bg-white transition-colors duration-200 hover:border-brand-gold-500"
              >
                <div>
                  {/* Top Image Viewport */}
                  <div className="relative h-44 overflow-hidden bg-brand-green-950">
                    <img
                      src={getRouteImage(route.image)}
                      alt={`${route.from} to ${route.to}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/90 via-brand-green-950/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between gap-2">
                      {route.popular ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-900/90 px-3 py-1 text-[0.68rem] font-bold text-brand-gold-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold-400" />
                          Most Booked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-900/80 px-3 py-1 text-[0.68rem] font-semibold text-white/90">
                          Direct Transfer
                        </span>
                      )}

                      <span className="rounded-full bg-brand-gold-500 px-3 py-1 font-sans text-xs font-bold text-white">
                        From {route.priceFrom} SAR
                      </span>
                    </div>

                    {/* Bottom Route Pathway Indicator */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center gap-2 font-sans text-base font-bold text-white tracking-tight sm:text-lg">
                        <span>{route.from}</span>
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-brand-gold-300">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                        <span>{route.to}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Specs & Inclusions */}
                  <div className="p-5">
                    {/* Micro-Badges Strip */}
                    <div className="grid grid-cols-3 gap-2 rounded-xl border border-brand-green-100 bg-brand-green-50/50 p-2.5 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="flex items-center gap-1 text-[0.68rem] font-bold text-brand-green-900">
                          <Clock className="h-3 w-3 text-brand-gold-600" />
                          {route.duration}
                        </span>
                        <span className="text-[0.62rem] text-muted-foreground">Duration</span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-x border-brand-green-100 px-1">
                        <span className="flex items-center gap-1 text-[0.68rem] font-bold text-brand-green-900">
                          <MapPin className="h-3 w-3 text-brand-gold-600" />
                          {route.distance}
                        </span>
                        <span className="text-[0.62rem] text-muted-foreground">Distance</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className="flex items-center gap-1 text-[0.68rem] font-bold text-brand-green-900">
                          <Car className="h-3 w-3 text-brand-gold-600" />
                          Private
                        </span>
                        <span className="text-[0.62rem] text-muted-foreground">Chauffeur</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="mt-4 space-y-1.5 text-[0.73rem] text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-brand-gold-600" />
                        <span>Door-to-door hotel & terminal drop-off</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-brand-gold-600" />
                        <span>Highway toll gates & airport fees included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-brand-gold-600" />
                        <span>Free 60-min airport delay waiting buffer</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Card Lower Bar / Action Strip */}
                <div className="flex items-center justify-between border-t border-brand-green-100 bg-white px-5 py-3.5">
                  <div>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      Fixed Rate
                    </span>
                    <p className="font-sans text-lg font-bold text-brand-green-900">
                      {route.priceFrom} <span className="text-xs font-semibold text-brand-gold-600">SAR</span>
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 group-hover:bg-brand-gold-500">
                    <span>Book Ride</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA to all routes */}
        <div className="mt-10 text-center">
          <Link
            href="/routes"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-green-200 bg-white px-6 py-3 text-xs font-bold text-brand-green-800 transition-colors duration-200 hover:bg-brand-green-700 hover:text-white hover:border-brand-green-700"
          >
            <span>View All Intercity & Airport Routes</span>
            <ArrowRight className="h-4 w-4 text-brand-gold-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
