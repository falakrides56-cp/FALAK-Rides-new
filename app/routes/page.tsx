'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Car,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  Plane,
  Building2,
  Compass,
  Check,
  Sparkles,
  Luggage,
  Users,
  Info,
} from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import BrandButton from '@/components/shared/BrandButton';
import { IMAGES, getRouteImage } from '@/lib/images';
import { cn } from '@/lib/utils';
import { WHATSAPP_LINK } from '@/lib/constants';

interface DetailedRoute {
  id: string;
  from: string;
  to: string;
  category: 'airport' | 'intercity' | 'ziyarat' | 'regional';
  duration: string;
  distance: string;
  highway: string;
  image: string;
  popular?: boolean;
  prices: {
    sedan: number;
    suv: number;
    luxury: number;
    van: number;
  };
  highlights: string[];
  description: string;
}

const ALL_ROUTES: DetailedRoute[] = [
  {
    id: 'jed-mak',
    from: 'Jeddah Airport (JED)',
    to: 'Makkah Al-Mukarramah',
    category: 'airport',
    duration: '55 - 75 min',
    distance: '85 km',
    highway: 'Makkah - Jeddah Highway (Hwy 40)',
    image: 'makkah-route',
    popular: true,
    prices: { sedan: 150, suv: 240, luxury: 380, van: 300 },
    highlights: ['Terminal 1 & North Gate meet & greet', 'Luggage assistance', 'Direct Haram hotel drop-off', '60-min complimentary flight delay buffer'],
    description: 'The most popular pilgrimage route. Your licensed chauffeur welcomes you at Jeddah Airport arrivals hall and drives you straight to your hotel doorsteps near the Holy Mosque.',
  },
  {
    id: 'mak-med',
    from: 'Makkah Al-Mukarramah',
    to: 'Madinah Al-Munawwarah',
    category: 'intercity',
    duration: '4 hrs 15 min',
    distance: '420 km',
    highway: 'Al Hijrah Highway (Route 15)',
    image: 'madinah-route',
    popular: true,
    prices: { sedan: 380, suv: 520, luxury: 850, van: 650 },
    highlights: ['Comfort stop at SASCO Palm (rest/prayer)', 'Complimentary chilled water', 'Luggage trunk capacity for Zamzam', 'Door-to-door hotel transfer'],
    description: 'Seamless journey between the two holy sanctuaries along the scenic Al Hijrah expressway. Includes scheduled rest stop for prayers and refreshments.',
  },
  {
    id: 'med-air',
    from: 'Madinah Airport (MED)',
    to: 'Madinah City / Central Haram',
    category: 'airport',
    duration: '25 min',
    distance: '20 km',
    highway: 'King Fahd Road',
    image: 'madinah-airport',
    popular: true,
    prices: { sedan: 90, suv: 140, luxury: 250, van: 180 },
    highlights: ['Terminal exit greeting with name board', 'Zero waiting curbside delay', 'Hotels in Central Markaziyah area', 'Smooth AC ride'],
    description: 'Quick VIP transfer from Prince Mohammad bin Abdulaziz Airport directly to your hotel adjacent to the Prophet’s Mosque (Al-Masjid an-Nabawi).',
  },
  {
    id: 'jed-med',
    from: 'Jeddah City / Airport',
    to: 'Madinah Al-Munawwarah',
    category: 'intercity',
    duration: '4 hrs',
    distance: '400 km',
    highway: 'Route 60 / Highway 15',
    image: 'madinah-route',
    popular: false,
    prices: { sedan: 370, suv: 500, luxury: 800, van: 620 },
    highlights: ['Direct departure from Jeddah terminal or residence', 'Safe regulated highway speeds', 'Scenic desert highway vista', 'Generous baggage allowance'],
    description: 'Direct transfer connecting Jeddah seaport or airport directly to the tranquil city of the Prophet ﷺ without transit delays.',
  },
  {
    id: 'mak-taf',
    from: 'Makkah Al-Mukarramah',
    to: 'Taif City / Mountain Resorts',
    category: 'ziyarat',
    duration: '1 hr 15 min',
    distance: '90 km',
    highway: 'Al-Hada Mountain Pass & Ring Rd',
    image: 'taif-route',
    popular: true,
    prices: { sedan: 220, suv: 320, luxury: 490, van: 400 },
    highlights: ['Al-Hada scenic hairpin mountain drive', 'Stop at Qarn Al-Manazil Miqat', 'Taif rose factories visit option', 'Cable car viewpoints'],
    description: 'Breathtaking mountain climb from the Makkah valley up to the temperate city of roses and historical sites of Taif.',
  },
  {
    id: 'jed-taf',
    from: 'Jeddah Airport / City',
    to: 'Taif City',
    category: 'regional',
    duration: '2 hrs',
    distance: '170 km',
    highway: 'Route 80 / Al Hada Bypass',
    image: 'taif-route',
    popular: false,
    prices: { sedan: 260, suv: 380, luxury: 580, van: 480 },
    highlights: ['Direct airport link to Taif mountains', 'Spacious AC comfort for ascending altitudes', 'Photo stops on request', 'Fixed quote with no mountain surcharges'],
    description: 'Comfortable cross-province transfer connecting Jeddah directly to the cooler mountain retreats and historic shrines of Taif.',
  },
  {
    id: 'mak-ziy',
    from: 'Makkah Haram Hotel',
    to: 'Makkah Historic Ziyarat Circuit',
    category: 'ziyarat',
    duration: '3 hrs 30 min',
    distance: '45 km circuit',
    highway: 'Makkah Ring Road & Jabal Al-Nour Rd',
    image: 'makkah-route',
    popular: true,
    prices: { sedan: 180, suv: 260, luxury: 420, van: 320 },
    highlights: ['Cave of Hira / Jabal Al-Nour', 'Cave of Thawr', 'Mount Arafat (Jabal Al-Rahmah)', 'Mina & Muzdalifah pilgrimage plains'],
    description: 'Comprehensive guided sacred tour covering the key historical sites of revelation and Hajj under the care of a courteous local chauffeur.',
  },
  {
    id: 'med-ziy',
    from: 'Madinah Markaziyah Hotel',
    to: 'Madinah Historic Ziyarat Circuit',
    category: 'ziyarat',
    duration: '3 hrs',
    distance: '35 km circuit',
    highway: 'King Abdullah Rd & Uhud Boulevard',
    image: 'madinah-airport',
    popular: true,
    prices: { sedan: 160, suv: 240, luxury: 390, van: 300 },
    highlights: ['Masjid Quba (Prayer opportunity)', 'Mount Uhud & Martyrs Cemetery', 'Masjid Al-Qiblatayn', 'The Seven Mosques & Trench site'],
    description: 'Enriching historical pilgrimage visiting the very first mosque in Islam, battlefields of Uhud, and historical masajid with flexible prayer stops.',
  },
  {
    id: 'ruh-air',
    from: 'Riyadh Airport (RUH)',
    to: 'Riyadh Central / Olaya / KAFD',
    category: 'regional',
    duration: '35 - 50 min',
    distance: '38 km',
    highway: 'Airport Road / King Salman Rd',
    image: 'riyadh-route',
    popular: false,
    prices: { sedan: 110, suv: 180, luxury: 320, van: 240 },
    highlights: ['VIP airport greeting at Terminals 1-5', 'Flight radar synchronization', 'Corporate & family transport', 'Executive class vehicles'],
    description: 'Reliable capital transfers between King Khalid International Airport and all residential, commercial, or governmental quarters across Riyadh.',
  },
  {
    id: 'ruh-dmm',
    from: 'Riyadh City',
    to: 'Dammam / Al Khobar / Dhahran',
    category: 'regional',
    duration: '3 hrs 45 min',
    distance: '410 km',
    highway: 'Riyadh - Dammam Highway (Hwy 40)',
    image: 'dammam-route',
    popular: false,
    prices: { sedan: 420, suv: 600, luxury: 950, van: 750 },
    highlights: ['Inter-provincial express link', 'Modern highway express cruising', 'Scheduled midpoint rest stop', 'Door-to-door delivery'],
    description: 'Comfortable cross-country highway transport connecting the capital Riyadh to the Eastern Province hubs of Dammam and Khobar.',
  },
];

export default function RoutesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRoutes = useMemo(() => {
    return ALL_ROUTES.filter((route) => {
      const matchesCategory =
        selectedCategory === 'all' || route.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        route.from.toLowerCase().includes(q) ||
        route.to.toLowerCase().includes(q) ||
        route.highway.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PublicLayout>
      {/* Header Banner */}
      <section className="relative h-[38vh] min-h-[280px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.routes['makkah-route']}
            alt="Makkah and Madinah Routes"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-700/85 via-brand-green-700/80 to-brand-green-700/90" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">
            Transparent Fixed Fares
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Intercity & Airport Routes
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
            Guaranteed door-to-door private chauffeur transfers across Makkah, Madinah, Jeddah, Taif, and the Kingdom.
            Tolls, airport waiting, and bottled water included.
          </p>
        </div>
      </section>

      {/* Controls & Search */}
      <section className="section-padding bg-gradient-to-b from-white via-brand-green-50/20 to-white">
        <div className="container-brand">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category Filter Pills (Button tabs) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-brand-green-50/80 border border-brand-green-100">
              {[
                { id: 'all', label: 'All Routes' },
                { id: 'airport', label: 'Airport Transfers' },
                { id: 'intercity', label: 'Makkah ↔ Madinah' },
                { id: 'ziyarat', label: 'Ziyarat Excursions' },
                { id: 'regional', label: 'Regional & Riyadh' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all',
                    selectedCategory === cat.id
                      ? 'bg-brand-green-700 text-white shadow-sm'
                      : 'text-brand-green-800 hover:bg-brand-green-100/70'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search city, airport, route..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-brand-green-100 bg-white pl-9 pr-4 text-xs font-medium text-brand-green-900 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-gold-400/50"
              />
            </div>
          </div>

          {/* Results Counter */}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {filteredRoutes.length} available transport routes</span>
            <span className="text-brand-green-700 font-medium">All fares fixed · Zero surge pricing</span>
          </div>

          {/* Routes Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredRoutes.map((route, i) => (
              <Reveal key={route.id} delay={i * 50}>
                <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-green-100/80 bg-white shadow-soft transition-all duration-300 hover:shadow-green-lg hover:border-brand-gold-300">
                  <div>
                    {/* Top Route Header */}
                    <div className="relative h-40 overflow-hidden bg-brand-green-900">
                      <img
                        src={getRouteImage(route.image)}
                        alt={`${route.from} to ${route.to}`}
                        className="h-full w-full object-cover opacity-80 transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950 via-brand-green-900/60 to-transparent" />
                      
                      {route.popular && (
                        <span className="absolute right-3 top-3 rounded-full bg-brand-gold-500 px-3 py-1 text-[0.7rem] font-bold text-brand-green-950 shadow-sm">
                          Most Booked
                        </span>
                      )}

                      <div className="absolute bottom-3 left-4 right-4">
                        <div className="flex items-center gap-2 font-sans text-base font-extrabold text-white">
                          <span>{route.from}</span>
                          <ArrowRight className="h-4 w-4 text-brand-gold-400 shrink-0" />
                          <span>{route.to}</span>
                        </div>
                        <p className="mt-0.5 text-[0.7rem] text-brand-gold-200">
                          {route.highway}
                        </p>
                      </div>
                    </div>

                    {/* Quick Specs */}
                    <div className="flex items-center justify-between border-b border-brand-green-50 bg-brand-green-50/40 px-5 py-2.5 text-xs text-brand-green-800">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Clock className="h-3.5 w-3.5 text-brand-gold-600" />
                        <span>{route.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold">
                        <MapPin className="h-3.5 w-3.5 text-brand-gold-600" />
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[0.7rem] text-muted-foreground">
                        <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                        Licensed Driver
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {route.description}
                      </p>

                      {/* Vehicle Fare Matrix */}
                      <div className="mt-4">
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-gold-600">
                          Fixed Rates by Vehicle Type
                        </span>
                        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-2 text-center">
                            <span className="block text-[0.68rem] text-muted-foreground">Sedan (1-3)</span>
                            <span className="font-sans text-sm font-bold text-brand-green-900">{route.prices.sedan} SAR</span>
                          </div>
                          <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-2 text-center">
                            <span className="block text-[0.68rem] text-muted-foreground">Family SUV (1-6)</span>
                            <span className="font-sans text-sm font-bold text-brand-green-900">{route.prices.suv} SAR</span>
                          </div>
                          <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-2 text-center">
                            <span className="block text-[0.68rem] text-muted-foreground">VIP Luxury</span>
                            <span className="font-sans text-sm font-bold text-brand-gold-700">{route.prices.luxury} SAR</span>
                          </div>
                          <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-2 text-center">
                            <span className="block text-[0.68rem] text-muted-foreground">Van (7-8)</span>
                            <span className="font-sans text-sm font-bold text-brand-green-900">{route.prices.van} SAR</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="mt-4 space-y-1.5 border-t border-brand-green-50 pt-3">
                        {route.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-[0.75rem] text-brand-green-800">
                            <Check className="h-3 w-3 text-brand-gold-600 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between border-t border-brand-green-100/60 bg-white px-5 py-3.5">
                    <div>
                      <span className="text-[0.65rem] uppercase text-muted-foreground">Starting from</span>
                      <p className="font-sans text-lg font-extrabold text-brand-green-900">
                        {route.prices.sedan} <span className="text-xs font-semibold text-brand-gold-600">SAR</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Assalamu Alaikum Falak Ride. I want to book the route: ${route.from} to ${route.to}. Please share driver availability.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-brand-green-200 px-3 py-2 text-xs font-semibold text-brand-green-700 hover:bg-brand-green-50"
                      >
                        WhatsApp
                      </a>
                      <Link
                        href={`/booking?pickup=${encodeURIComponent(route.from.split(' ')[0])}&dropoff=${encodeURIComponent(route.to.split(' ')[0])}`}
                        className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-brand-green-700 to-brand-green-600 px-4 py-2 text-xs font-bold text-white shadow-green transition-all hover:bg-brand-green-800"
                      >
                        Book Ride <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="mt-12 rounded-2xl border border-brand-green-100 bg-white p-12 text-center shadow-soft">
              <Compass className="mx-auto h-12 w-12 text-brand-gold-500" />
              <h3 className="mt-3 font-sans text-base font-bold text-brand-green-900">No specific route found</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                We provide custom chauffeur services to any destination across the Kingdom.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-green-700 px-5 py-2.5 text-xs font-semibold text-white shadow-green"
              >
                Inquire on WhatsApp for Custom Route
              </a>
            </div>
          )}

          {/* Airport Pickup Protocol Section */}
          <div className="mt-16 rounded-2xl border border-brand-green-100/80 bg-white p-6 md:p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold-50 text-brand-gold-700">
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-brand-green-900">
                  Airport Arrival & Terminal Meet-and-Greet Guide
                </h3>
                <p className="text-xs text-muted-foreground">
                  How our chauffeurs receive you smoothly upon touchdown
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-4">
                <span className="font-sans text-sm font-bold text-brand-green-900">Jeddah Airport Terminal 1</span>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  The primary terminal for Saudia, Flynas, and major international carriers. Your driver tracks your flight, enters the arrivals hall, and waits outside the baggage gate with your personalized name board.
                </p>
              </div>
              <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-4">
                <span className="font-sans text-sm font-bold text-brand-green-900">Jeddah North Terminal</span>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Dedicated to select charter, seasonal Umrah flights, and international low-cost flights. Your chauffeur contacts you via WhatsApp upon landing and pulls up directly to the designated VIP curb.
                </p>
              </div>
              <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-4">
                <span className="font-sans text-sm font-bold text-brand-green-900">Madinah Airport (MED)</span>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  A compact modern terminal with rapid baggage release. Your driver meets you at the exit gate, assists with large luggage and Zamzam containers, and parks directly in the express pickup lane.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-brand-green-700 p-5 text-white sm:flex-row">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-brand-gold-300 shrink-0" />
                <p className="text-xs leading-relaxed">
                  <strong>Flight delayed?</strong> We monitor live radar. Up to 60 minutes free waiting time is included after actual touchdown.
                </p>
              </div>
              <Link
                href="/booking"
                className="rounded-lg bg-brand-gold-500 px-4 py-2 text-xs font-bold text-brand-green-950 shadow-gold shrink-0 hover:bg-brand-gold-400"
              >
                Reserve Airport Ride
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
