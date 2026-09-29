'use client';

import { useState, useMemo } from 'react';
import {
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Car,
  MessageCircle,
  Camera,
  HeartHandshake,
  Check,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { cn } from '@/lib/utils';
import { buildWhatsAppMessage, WHATSAPP_LINK } from '@/lib/constants';

interface ZiyaratSite {
  name: string;
  significance: string;
  duration: string;
  features: string[];
}

const MAKKAH_SITES: ZiyaratSite[] = [
  {
    name: 'Jabal Al-Nour & Cave of Hira',
    significance: 'Where the Prophet ﷺ received the very first revelation of the Holy Quran (Surah Al-Alaq).',
    duration: '45 min stop',
    features: ['Panoramic viewpoint', 'Historical marker', 'Visitor pavilion'],
  },
  {
    name: 'Mount Arafat (Jabal Al-Rahmah)',
    significance: 'The pillar of Hajj where the Prophet delivered the Farewell Pilgrimage sermon.',
    duration: '30 min stop',
    features: ['Jabal Al-Rahmah pillar', 'Namirah Mosque view', 'Spacious parking'],
  },
  {
    name: 'Mina & Muzdalifah Sanctuaries',
    significance: 'The tent city of Mina and Muzdalifah where millions gather for the sacred days of Tashreeq.',
    duration: 'Drive-through & stop',
    features: ['Jamarat complex view', 'Kuwayti Mosque', 'Historical pilgrimage path'],
  },
  {
    name: 'Jabal Thawr (Cave of Thawr)',
    significance: 'The mountain cave where the Prophet and Abu Bakr (RA) took refuge during the Hijrah migration.',
    duration: '30 min stop',
    features: ['Historical foothills stop', 'Photographic point', 'Informative guide briefing'],
  },
];

const MADINAH_SITES: ZiyaratSite[] = [
  {
    name: 'Masjid Quba',
    significance: 'The first mosque built in Islam. Praying two rakats here carries the reward of a complete Umrah.',
    duration: '45 min stop for prayer',
    features: ['Wudu facilities', 'Spacious courtyard', 'Dates and souvenirs market'],
  },
  {
    name: 'Mount Uhud & Martyrs Cemetery',
    significance: 'The historic site of the Battle of Uhud and resting place of Sayyiduna Hamza (RA) and 70 martyrs.',
    duration: '40 min stop',
    features: ['Archers Hill (Jabal Al-Rumat)', 'Uhud Martyrs Shrine', 'Museum exhibition nearby'],
  },
  {
    name: 'Masjid Al-Qiblatayn',
    significance: 'The Mosque of the Two Qiblas where the divine command changed the prayer direction toward the Kaaba.',
    duration: '30 min stop',
    features: ['Historic twin-niche architecture', 'Prayer stop', 'Visitor plaza'],
  },
  {
    name: 'The Seven Mosques (Saba Masajid)',
    significance: 'The battlefield perimeter of the Battle of the Trench (Al-Khandaq) and Masjid Al-Fath.',
    duration: '30 min stop',
    features: ['Trench historical site', 'Masjid Al-Fath view', 'Gardens promenade'],
  },
];

// Custom Itinerary available options
const CUSTOM_MAKKAH_STOPS = [
  'Jabal Al-Nour (Cave of Hira View)',
  'Jabal Thawr (Foothills & Cave)',
  'Mount Arafat & Jabal Al-Rahmah',
  'Mina & Muzdalifah Sanctuaries',
  'Masjid Al-Jinn & Jannat Al-Mualla',
  'Hira Cultural District & Quran Museum',
];

const CUSTOM_MADINAH_STOPS = [
  'Masjid Quba (Prayer Stop)',
  'Mount Uhud & Archers Hill',
  'Masjid Al-Qiblatayn (Two Qiblas)',
  'The Seven Mosques (Battle of Trench)',
  'Historic Madinah Dates Market',
  'Masjid Al-Ghamamah & Courtyard',
];

const VEHICLE_PRICING = {
  Sedan: { label: 'Sedan (1-4 pax)', price: 200, baseCar: 'Sedan' },
  SUV: { label: 'Family SUV (1-6 pax)', price: 300, baseCar: 'SUV' },
  Van: { label: 'VIP Van (7-10 pax)', price: 420, baseCar: 'Van/7-Seater' },
};

export default function ZiyaratGuide() {
  const [activeCity, setActiveCity] = useState<'makkah' | 'madinah'>('makkah');

  // Custom Itinerary Interactive State
  const [customCity, setCustomCity] = useState<'makkah' | 'madinah'>('makkah');
  const [selectedStops, setSelectedStops] = useState<string[]>([
    'Jabal Al-Nour (Cave of Hira View)',
    'Mount Arafat & Jabal Al-Rahmah',
    'Jabal Thawr (Foothills & Cave)',
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState<'Sedan' | 'SUV' | 'Van'>('SUV');

  const sites = activeCity === 'makkah' ? MAKKAH_SITES : MADINAH_SITES;
  const customAvailableStops = customCity === 'makkah' ? CUSTOM_MAKKAH_STOPS : CUSTOM_MADINAH_STOPS;

  const toggleStop = (stop: string) => {
    setSelectedStops((prev) => {
      if (prev.includes(stop)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((s) => s !== stop);
      }
      return [...prev, stop];
    });
  };

  const handleCustomCityChange = (city: 'makkah' | 'madinah') => {
    setCustomCity(city);
    if (city === 'makkah') {
      setSelectedStops([
        'Jabal Al-Nour (Cave of Hira View)',
        'Mount Arafat & Jabal Al-Rahmah',
        'Jabal Thawr (Foothills & Cave)',
      ]);
    } else {
      setSelectedStops([
        'Masjid Quba (Prayer Stop)',
        'Mount Uhud & Archers Hill',
        'Masjid Al-Qiblatayn (Two Qiblas)',
      ]);
    }
  };

  // Build dynamic booking URL
  const bookingUrl = useMemo(() => {
    const cityName = customCity === 'makkah' ? 'Makkah' : 'Madinah';
    const notesText = `Custom ${cityName} Ziyarat (${selectedStops.length} stops): ${selectedStops.join(', ')}`;
    const carParam = VEHICLE_PRICING[selectedVehicle].baseCar;
    return `/booking?pickup=${encodeURIComponent(cityName)}&dropoff=${encodeURIComponent(`Custom ${cityName} Ziyarat Tour`)}&service=${encodeURIComponent('Umrah Ziyarat')}&car=${encodeURIComponent(carParam)}&notes=${encodeURIComponent(notesText)}`;
  }, [customCity, selectedStops, selectedVehicle]);

  // Build dynamic WhatsApp text
  const customWhatsAppText = useMemo(() => {
    const cityName = customCity === 'makkah' ? 'Makkah Al-Mukarramah' : 'Madinah Al-Munawwarah';
    const price = VEHICLE_PRICING[selectedVehicle].price;
    const vehicleName = VEHICLE_PRICING[selectedVehicle].label;

    const lines = [
      `*Custom Multi-Site Ziyarat Inquiry — Falak Ride*`,
      ``,
      `*City:* ${cityName}`,
      `*Vehicle Preference:* ${vehicleName}`,
      `*Estimated Fare:* SAR ${price} (Private Chauffeur Tour)`,
      `*Stops Included (${selectedStops.length}):*`,
      ...selectedStops.map((s, idx) => `  ${idx + 1}. ${s}`),
      ``,
      `*Special Preferences:* Flexible family prayer timing, photo pauses, air-conditioned transport.`,
    ];
    return lines.join('\n');
  }, [customCity, selectedStops, selectedVehicle]);

  return (
    <section className="section-padding bg-brand-green-50/20">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Sacred Landmarks"
          title="Holy Ziyarat"
          highlight="Tours & Pilgrimage Sites"
          description="Enrich your pilgrimage with private chauffeured excursions to the historic and spiritually uplifting landmarks of Makkah and Madinah."
        />

        {/* City Filter Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-xl bg-white p-1 border border-brand-green-200">
            <button
              type="button"
              onClick={() => setActiveCity('makkah')}
              className={cn(
                'rounded-lg px-6 py-2.5 text-xs font-bold transition-colors',
                activeCity === 'makkah'
                  ? 'bg-brand-green-700 text-white'
                  : 'text-brand-green-800 hover:text-brand-green-950'
              )}
            >
              Makkah Al-Mukarramah Tours
            </button>
            <button
              type="button"
              onClick={() => setActiveCity('madinah')}
              className={cn(
                'rounded-lg px-6 py-2.5 text-xs font-bold transition-colors',
                activeCity === 'madinah'
                  ? 'bg-brand-green-700 text-white'
                  : 'text-brand-green-800 hover:text-brand-green-950'
              )}
            >
              Al-Madinah Al-Munawwarah Tours
            </button>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {sites.map((site, index) => (
            <Reveal key={site.name} delay={index * 60}>
              <div className="flex flex-col justify-between rounded-2xl border border-brand-green-100 bg-white p-6 transition-colors duration-200 hover:border-brand-gold-500">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-800">
                        <Compass className="h-5 w-5" />
                      </div>
                      <h3 className="font-sans text-base font-bold text-brand-green-900">
                        {site.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-50 px-2.5 py-1 text-[0.7rem] font-semibold text-brand-green-800">
                      <Clock className="h-3 w-3 text-brand-gold-600" />
                      {site.duration}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {site.significance}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {site.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1 rounded-md bg-brand-green-50/70 px-2 py-1 text-[0.68rem] font-medium text-brand-green-800"
                      >
                        <CheckCircle2 className="h-3 w-3 text-brand-gold-600" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-brand-green-100 pt-4">
                  <span className="text-xs text-muted-foreground">Private Air-Conditioned Van or Sedan</span>
                  <Link
                    href={`/booking?service=${encodeURIComponent(`${activeCity === 'makkah' ? 'Makkah' : 'Madinah'} Ziyarat`)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-green-800 hover:text-brand-gold-600 transition-colors"
                  >
                    Book Tour <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Enhanced Custom Multi-Site Itinerary Planner Card */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-brand-green-200 bg-white">
          {/* Card Header */}
          <div className="border-b border-brand-green-100 bg-brand-green-900 p-6 md:p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-500/20 px-3 py-1 text-[0.7rem] font-bold text-brand-gold-300">
                  <Sparkles className="h-3.5 w-3.5 text-brand-gold-400" />
                  Tailored Pilgrimage Excursions
                </div>
                <h3 className="mt-2 font-sans text-xl md:text-2xl font-extrabold text-white">
                  Looking for a Custom Multi-Site Ziyarat Itinerary?
                </h3>
                <p className="mt-1 text-xs md:text-sm text-white/80 max-w-2xl leading-relaxed">
                  Our knowledgeable local drivers accommodate custom stops, photo opportunities, and family prayer timing.
                  Choose your landmarks and build your personalized holy journey below.
                </p>
              </div>

              {/* City Switcher Buttons */}
              <div className="flex items-center gap-2 rounded-xl bg-white/10 p-1 self-start lg:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleCustomCityChange('makkah')}
                  className={cn(
                    'rounded-lg px-4 py-2 text-xs font-bold transition-colors',
                    customCity === 'makkah'
                      ? 'bg-brand-gold-500 text-brand-green-950'
                      : 'text-white hover:text-brand-gold-200'
                  )}
                >
                  Makkah Itinerary
                </button>
                <button
                  type="button"
                  onClick={() => handleCustomCityChange('madinah')}
                  className={cn(
                    'rounded-lg px-4 py-2 text-xs font-bold transition-colors',
                    customCity === 'madinah'
                      ? 'bg-brand-gold-500 text-brand-green-950'
                      : 'text-white hover:text-brand-gold-200'
                  )}
                >
                  Madinah Itinerary
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Planner Body */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Sites Selector */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h4 className="font-sans text-sm font-bold text-brand-green-950 uppercase tracking-wider">
                    Select Your Holy Landmarks ({selectedStops.length} Selected)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Click any landmark to add or remove it from your personalized route.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {customAvailableStops.map((stop) => {
                    const isSelected = selectedStops.includes(stop);
                    return (
                      <button
                        key={stop}
                        type="button"
                        onClick={() => toggleStop(stop)}
                        className={cn(
                          'flex items-center justify-between gap-2 rounded-xl border p-3 text-left transition-colors duration-150',
                          isSelected
                            ? 'border-brand-green-700 bg-brand-green-50 text-brand-green-950 font-bold'
                            : 'border-brand-green-100 bg-white text-brand-green-800 hover:border-brand-gold-400 font-medium'
                        )}
                      >
                        <span className="text-xs leading-snug">{stop}</span>
                        <div
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs',
                            isSelected
                              ? 'border-brand-green-700 bg-brand-green-700 text-white'
                              : 'border-brand-green-200 bg-white text-transparent'
                          )}
                        >
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Chauffeur Accommodations & Perks */}
                <div className="mt-5 rounded-2xl border border-brand-green-100 bg-brand-green-50/50 p-4">
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-gold-700 block mb-2">
                    Included with Every Custom Ziyarat
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-brand-green-950">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-brand-green-700" />
                      <span>Family Prayer Pauses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 shrink-0 text-brand-green-700" />
                      <span>Scenic Photo Stops</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="h-4 w-4 shrink-0 text-brand-green-700" />
                      <span>Elderly Assistance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Vehicle Selection & Live Quotation */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-brand-green-100 bg-brand-green-50/30 p-5 md:p-6">
                <div>
                  <h4 className="font-sans text-sm font-bold text-brand-green-950 uppercase tracking-wider">
                    Vehicle Class
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select the ideal capacity for your family group:
                  </p>

                  <div className="mt-3 space-y-2">
                    {(Object.keys(VEHICLE_PRICING) as (keyof typeof VEHICLE_PRICING)[]).map((vKey) => {
                      const item = VEHICLE_PRICING[vKey];
                      const isSelected = selectedVehicle === vKey;
                      return (
                        <button
                          key={vKey}
                          type="button"
                          onClick={() => setSelectedVehicle(vKey)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors',
                            isSelected
                              ? 'border-brand-green-700 bg-white ring-1 ring-brand-green-700 font-bold'
                              : 'border-brand-green-100 bg-white hover:border-brand-gold-400'
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <Car className={cn('h-4 w-4', isSelected ? 'text-brand-green-800' : 'text-brand-gold-600')} />
                            <div>
                              <p className="text-xs text-brand-green-950">{item.label}</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-brand-green-900">
                            SAR {item.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Summary Box */}
                  <div className="mt-5 rounded-xl border border-brand-green-200 bg-white p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Estimated Tour Duration:</span>
                      <span className="font-bold text-brand-green-950">
                        {selectedStops.length <= 3 ? '3.0 - 3.5 Hours' : '4.0 - 5.0 Hours'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-2 border-t border-brand-green-50 pt-2">
                      <span className="text-muted-foreground">Selected Landmarks:</span>
                      <span className="font-bold text-brand-green-950">{selectedStops.length} stops</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2 border-t border-brand-green-100 pt-2 font-bold">
                      <span className="text-brand-green-900">Total Fixed Tour Rate:</span>
                      <span className="text-brand-green-800 text-base">
                        SAR {VEHICLE_PRICING[selectedVehicle].price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-6 space-y-2 pt-2">
                  <Link
                    href={bookingUrl}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green-700 py-3 text-xs font-bold text-white transition-colors hover:bg-brand-gold-500 hover:text-brand-green-950"
                  >
                    <span>Book Custom Itinerary</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={buildWhatsAppMessage(customWhatsAppText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-green-200 bg-white py-2.5 text-xs font-bold text-brand-green-900 transition-colors hover:bg-brand-green-50"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-green-700" />
                    <span>Send Custom Itinerary on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
