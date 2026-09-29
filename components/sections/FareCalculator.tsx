'use client';

import { useState } from 'react';
import {
  MapPin,
  Car,
  Clock,
  Navigation,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { cn } from '@/lib/utils';
import { WHATSAPP_LINK } from '@/lib/constants';

interface RoutePricing {
  from: string;
  to: string;
  distance: string;
  duration: string;
  prices: {
    sedan: number;
    suv: number;
    luxury: number;
    van: number;
  };
  notes: string;
}

const POPULAR_CALCULATIONS: RoutePricing[] = [
  {
    from: 'Jeddah Airport (JED)',
    to: 'Makkah Hotel',
    distance: '85 km',
    duration: '50 - 65 min',
    prices: { sedan: 150, suv: 230, luxury: 380, van: 290 },
    notes: 'Terminal 1 & North Terminal pickup with complimentary flight tracking.',
  },
  {
    from: 'Makkah Hotel',
    to: 'Madinah Hotel',
    distance: '430 km',
    duration: '4 hrs 15 min',
    prices: { sedan: 420, suv: 600, luxury: 950, van: 720 },
    notes: 'Highway route via Hijrah road with prayer & rest stops included.',
  },
  {
    from: 'Jeddah Airport (JED)',
    to: 'Madinah Hotel',
    distance: '410 km',
    duration: '4 hrs',
    prices: { sedan: 430, suv: 620, luxury: 980, van: 740 },
    notes: 'Direct long-haul transfer with air-conditioned comfort.',
  },
  {
    from: 'Madinah Airport (MED)',
    to: 'Madinah Hotel',
    distance: '22 km',
    duration: '25 min',
    prices: { sedan: 90, suv: 140, luxury: 230, van: 180 },
    notes: 'Fast airport express pickup right outside arrival gates.',
  },
  {
    from: 'Makkah Hotel',
    to: 'Makkah Ziyarat Tour',
    distance: 'Half Day (4 hrs)',
    duration: '3 - 4 hrs',
    prices: { sedan: 200, suv: 300, luxury: 480, van: 380 },
    notes: 'Hira, Thawr, Arafat, Muzdalifah, Mina, and historical landmarks.',
  },
  {
    from: 'Madinah Hotel',
    to: 'Madinah Ziyarat Tour',
    distance: 'Half Day (4 hrs)',
    duration: '3 - 4 hrs',
    prices: { sedan: 180, suv: 270, luxury: 440, van: 350 },
    notes: 'Masjid Quba, Mount Uhud, Seven Mosques, and Qiblatayn.',
  },
];

const VEHICLE_OPTIONS = [
  {
    id: 'sedan',
    name: 'Standard Sedan',
    sub: 'Toyota Camry / Sonata',
    pax: '1-4',
    luggage: '2-3',
  },
  {
    id: 'suv',
    name: 'Family SUV',
    sub: 'GMC Yukon / Tahoe',
    pax: '4-6',
    luggage: '4-5',
  },
  {
    id: 'luxury',
    name: 'VIP Executive',
    sub: 'Lexus / Mercedes-Benz',
    pax: '1-3',
    luggage: '3',
  },
  {
    id: 'van',
    name: 'Spacious Family Van',
    sub: 'Toyota HiAce / Staria',
    pax: '7-10',
    luggage: '7-9',
  },
] as const;

export default function FareCalculator() {
  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number>(0);
  const [selectedVehicle, setSelectedVehicle] = useState<'sedan' | 'suv' | 'luxury' | 'van'>('sedan');

  const currentRoute = POPULAR_CALCULATIONS[selectedRouteIdx];
  const calculatedFare = currentRoute.prices[selectedVehicle];
  const activeVehicleMeta = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle)!;

  return (
    <section className="section-padding bg-gradient-to-b from-brand-green-50/40 via-white to-brand-green-50/20">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Instant Fare Estimator"
          title="Transparent Fixed"
          highlight="Pricing Calculator"
          description="Calculate your exact trip cost with guaranteed fixed rates. No hidden surge fees, airport parking, or toll charges."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Route & Vehicle Selectors */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Select Route */}
            <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-100 text-xs font-bold text-brand-green-800">
                  1
                </span>
                <h3 className="font-sans text-base font-semibold text-brand-green-900">
                  Select Popular Pilgrim Route
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {POPULAR_CALCULATIONS.map((route, idx) => {
                  const isSelected = selectedRouteIdx === idx;
                  return (
                    <button
                      key={`${route.from}-${route.to}`}
                      type="button"
                      onClick={() => setSelectedRouteIdx(idx)}
                      className={cn(
                        'flex flex-col items-start rounded-xl border p-3.5 text-left transition-all',
                        isSelected
                          ? 'border-brand-green-600 bg-brand-green-50/60 ring-1 ring-brand-green-600 shadow-sm'
                          : 'border-brand-green-100/70 bg-white hover:border-brand-gold-300 hover:bg-brand-green-50/20'
                      )}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-green-900">
                        <MapPin className="h-3.5 w-3.5 text-brand-gold-500 shrink-0" />
                        <span className="truncate">{route.from}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground pl-5">
                        <span>→</span>
                        <span className="font-medium text-brand-green-700 truncate">{route.to}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-[0.7rem] text-muted-foreground pl-5">
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-3 w-3" /> {route.duration}
                        </span>
                        <span>·</span>
                        <span>{route.distance}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Vehicle Class */}
            <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-100 text-xs font-bold text-brand-green-800">
                  2
                </span>
                <h3 className="font-sans text-base font-semibold text-brand-green-900">
                  Choose Vehicle Class
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {VEHICLE_OPTIONS.map((veh) => {
                  const isSelected = selectedVehicle === veh.id;
                  const price = currentRoute.prices[veh.id];
                  return (
                    <button
                      key={veh.id}
                      type="button"
                      onClick={() => setSelectedVehicle(veh.id)}
                      className={cn(
                        'relative flex flex-col rounded-xl border p-4 text-left transition-all',
                        isSelected
                          ? 'border-brand-gold-500 bg-brand-gold-50/30 ring-2 ring-brand-gold-400/40 shadow-sm'
                          : 'border-brand-green-100/70 bg-white hover:border-brand-gold-200 hover:bg-brand-green-50/20'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-sans text-sm font-bold text-brand-green-900">{veh.name}</p>
                          <p className="text-xs text-muted-foreground">{veh.sub}</p>
                        </div>
                        <span className="font-sans text-sm font-bold text-brand-green-800">
                          {price} <span className="text-[0.65rem] font-medium text-muted-foreground">SAR</span>
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground border-t border-brand-green-50 pt-2">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-brand-gold-500" /> {veh.pax} Guests
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5 text-brand-gold-500" /> {veh.luggage} Bags
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Fare Breakdown Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-brand-gold-200/60 bg-white p-6 shadow-green-lg">
              <div className="rounded-xl bg-gradient-to-br from-brand-green-800 to-brand-green-700 p-5 text-white">
                <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-widest text-brand-gold-300">
                  Fare Breakdown
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <h4 className="font-sans text-3xl font-extrabold tracking-tight text-white">
                    {calculatedFare}{' '}
                    <span className="font-sans text-base font-medium text-brand-gold-300">SAR</span>
                  </h4>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-brand-gold-300 backdrop-blur-sm">
                    All-Inclusive Fixed
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/80">
                  No surge pricing. Free cancellation up to 6 hours before pickup.
                </p>
              </div>

              {/* Route Summary */}
              <div className="mt-5 space-y-3 divide-y divide-brand-green-50 text-sm">
                <div className="flex justify-between pt-1">
                  <span className="text-xs text-muted-foreground">Pickup Location</span>
                  <span className="text-right text-xs font-semibold text-brand-green-900">{currentRoute.from}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-xs text-muted-foreground">Dropoff Location</span>
                  <span className="text-right text-xs font-semibold text-brand-green-900">{currentRoute.to}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-xs text-muted-foreground">Selected Vehicle</span>
                  <span className="text-right text-xs font-semibold text-brand-green-900">
                    {activeVehicleMeta.name}
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-xs text-muted-foreground">Est. Distance & Time</span>
                  <span className="text-right text-xs font-semibold text-brand-green-900">
                    {currentRoute.distance} · {currentRoute.duration}
                  </span>
                </div>
              </div>

              {/* Inclusions List */}
              <div className="mt-5 rounded-xl bg-brand-green-50/50 p-4">
                <p className="text-xs font-semibold text-brand-green-900 mb-2">What is included:</p>
                <ul className="space-y-1.5 text-xs text-brand-green-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-brand-green-600 shrink-0" />
                    <span>60 min free airport wait time with flight tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-brand-green-600 shrink-0" />
                    <span>Meet & Greet inside terminal with your nameplate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-brand-green-600 shrink-0" />
                    <span>All toll gates, parking fees, and VAT included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-brand-green-600 shrink-0" />
                    <span>Chilled bottled water, wet wipes, and AC comfort</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-2.5">
                <Link
                  href={`/booking?from=${encodeURIComponent(currentRoute.from)}&to=${encodeURIComponent(currentRoute.to)}&car=${encodeURIComponent(activeVehicleMeta.name)}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-green-700 to-brand-green-600 px-5 py-3 text-sm font-semibold text-white shadow-green transition-all hover:shadow-green-lg active:scale-[0.99]"
                >
                  Book This Route
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Salam Falak Ride, I would like to book ${currentRoute.from} to ${currentRoute.to} in a ${activeVehicleMeta.name} for ${calculatedFare} SAR.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-brand-green-200 bg-white px-5 py-2.5 text-xs font-semibold text-brand-green-800 transition-colors hover:bg-brand-green-50"
                >
                  Confirm on WhatsApp ({calculatedFare} SAR)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
