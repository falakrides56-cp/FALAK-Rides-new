'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Shield,
  Sun,
  Users,
  HeartHandshake,
  MessageCircle,
  Camera,
  Car,
} from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { BRAND, WHATSAPP_LINK } from '@/lib/constants';

interface ZiyaratDetail {
  id: string;
  name: string;
  arabicName: string;
  city: 'makkah' | 'madinah' | 'taif';
  significance: string;
  historicalNote: string;
  duration: string;
  bestTime: string;
  accessibility: string;
  features: string[];
}

const ZIYARAT_SITES: ZiyaratDetail[] = [
  // Makkah
  {
    id: 'hira',
    name: 'Jabal Al-Nour & Cave of Hira',
    arabicName: 'جبل النور وغار حراء',
    city: 'makkah',
    significance: 'The historic mountain where Prophet Muhammad ﷺ received the very first divine revelation of the Holy Quran through Angel Jibreel (Surah Al-Alaq).',
    historicalNote: 'The cave faces the Holy Kaaba. Today, the modern Hira Cultural District at the foothills provides an exhibition center, resting pavilions, and panoramic viewpoints.',
    duration: '45 - 60 min stop',
    bestTime: 'Early morning after Fajr or late afternoon',
    accessibility: 'Pavilion accessible for all; summit climb is steep and optional',
    features: ['Hira Cultural Exhibition center', 'Souvenir pavilion', 'Air-conditioned visitor terrace', 'Photographic panorama of Makkah'],
  },
  {
    id: 'thawr',
    name: 'Jabal Thawr & Cave of Thawr',
    arabicName: 'جبل ثور وغار ثور',
    city: 'makkah',
    significance: 'The sanctuary mountain where the Prophet ﷺ and Sayyiduna Abu Bakr Al-Siddiq (RA) took refuge for three nights during the historic Hijrah to Madinah.',
    historicalNote: 'Mentioned directly in Surah At-Tawbah (9:40): "When the two were in the cave and he said to his companion, do not grieve; indeed Allah is with us."',
    duration: '35 min stop',
    bestTime: 'Morning before midday',
    accessibility: 'Foot of mountain accessible with paved viewing promenade',
    features: ['Historical foothills plaza', 'Clear mountain vistas', 'Informative guide briefing', 'Refreshments available'],
  },
  {
    id: 'arafat',
    name: 'Mount Arafat & Jabal Al-Rahmah',
    arabicName: 'جبل الرحمة وصعيد عرفات',
    city: 'makkah',
    significance: 'The central station of Hajj where the Prophet delivered the Farewell Pilgrimage Khutbah, teaching the universal brotherhood of humanity.',
    historicalNote: 'The Prophet ﷺ stated: "Al-Hajj ‘Arafah" (Hajj is Arafat). Standing on Arafat on the 9th of Dhul Hijjah is the indispensable pillar of Hajj.',
    duration: '45 min stop',
    bestTime: 'Morning or late afternoon',
    accessibility: 'Paved walkways and gentle steps to the central white monument',
    features: ['Jabal Al-Rahmah marker', 'View of Masjid Namirah', 'Spacious pilgrim plaza', 'Full shade pavilions'],
  },
  {
    id: 'mina-muzdalifah',
    name: 'Mina & Muzdalifah Sanctuaries',
    arabicName: 'مشاعر منى ومزدلفة',
    city: 'makkah',
    significance: 'The legendary tent valley of Mina where pilgrims perform the stoning of the Jamarat, and the sacred open plains of Muzdalifah (Al-Mash’ar Al-Haram).',
    historicalNote: 'Reflects the unwavering faith of Prophet Ibrahim (AS) when tested with the command regarding his son Ismail (AS).',
    duration: 'Drive-through with 20 min photo stop',
    bestTime: 'Any time of day',
    accessibility: 'Fully vehicle-accessible throughout the year',
    features: ['View of the massive Jamarat Bridge', 'Kuwayti & Al-Khaif Mosques', 'Historical pilgrimage path'],
  },
  {
    id: 'mualla',
    name: 'Jannat Al-Mu’alla Cemetery',
    arabicName: 'مقبرة جنة المعلاة',
    city: 'makkah',
    significance: 'The ancient historic burial grounds of Makkah where the Beloved Mother of the Believers, Sayyidah Khadijah bint Khuwaylid (RA), is buried.',
    historicalNote: 'Also resting place of the Prophet’s grandfather Abdul Muttalib, his uncle Abu Talib, and numerous honored companions.',
    duration: '25 min stop',
    bestTime: 'Morning after Fajr or afternoon',
    accessibility: 'Paved perimeter walkway for sending salutations and making du’a',
    features: ['Du’a viewing promenade', 'Historical signage', 'Close to Masjid Al-Haram (1 km)'],
  },

  // Madinah
  {
    id: 'quba',
    name: 'Masjid Quba',
    arabicName: 'مسجد قباء',
    city: 'madinah',
    significance: 'The very first mosque built in Islamic history upon the Prophet’s arrival in Madinah. Praying two voluntary rakats here holds the spiritual reward of a complete Umrah.',
    historicalNote: 'The Prophet ﷺ visited Masjid Quba every Saturday, walking or riding, to offer prayers (Sahih Bukhari).',
    duration: '45 - 60 min stop for prayer & reflection',
    bestTime: 'Morning between Duha and Dhuhr',
    accessibility: 'Full step-free accessibility, wheelchair ramps, and modern wudu areas',
    features: ['Full prayer facilities & ablution', 'Expansive shaded courtyards', 'Surrounding date souq', 'Cooling mist fans'],
  },
  {
    id: 'uhud',
    name: 'Mount Uhud & Cemetery of the Martyrs',
    arabicName: 'جبل أحد ومقبرة الشهداء',
    city: 'madinah',
    significance: 'The site of the pivotal Battle of Uhud (3 AH) and resting place of the Master of Martyrs Sayyiduna Hamza (RA) alongside 70 noble Sahabah.',
    historicalNote: 'The Prophet ﷺ proclaimed: "Uhud is a mountain that loves us, and we love it" (Sahih Bukhari).',
    duration: '45 min stop',
    bestTime: 'Morning or late afternoon',
    accessibility: 'Easy walking paths; Archer’s Hill (Jabal Al-Rumat) has low stairs',
    features: ['Archer’s Hill viewpoint', 'Martyrs enclosure viewing window', 'Uhud Battlefield exhibition center', 'Local date vendors'],
  },
  {
    id: 'qiblatayn',
    name: 'Masjid Al-Qiblatayn (Two Qiblas)',
    arabicName: 'مسجد القبلتين',
    city: 'madinah',
    significance: 'The historic mosque where divine revelation commanded the Prophet ﷺ mid-prayer to turn the Qibla orientation from Jerusalem (Bayt Al-Maqdis) to the Kaaba in Makkah.',
    historicalNote: 'Recorded in the Quran (Surah Al-Baqarah 2:144): "We have seen the turning of your face toward the heaven. So We will surely turn you to a Qiblah that you will be pleased with."',
    duration: '35 min stop for prayer',
    bestTime: 'Morning or between prayers',
    accessibility: 'Modernized multi-level complex with elevators and plazas',
    features: ['Prayer hall access', 'Historic dual-niche commemoration', 'Modern landscaped plaza', 'Souvenir shops'],
  },
  {
    id: 'saba-masajid',
    name: 'The Seven Mosques & Battle of the Trench',
    arabicName: 'المساجد السبعة وغزوة الخندق',
    city: 'madinah',
    significance: 'The site where the historic trench (Khandaq) was dug during the Battle of the Confederates (Al-Ahzab) in 5 AH, marked by a cluster of historical mosques.',
    historicalNote: 'Includes Masjid Al-Fath on the mount where the Prophet ﷺ prayed for three consecutive days until victory was granted.',
    duration: '30 min stop',
    bestTime: 'Afternoon or evening',
    accessibility: 'Paved garden promenade connecting the mosques',
    features: ['Masjid Al-Fath view', 'Modern Grand Khandaq Mosque', 'Historical trench perimeter markers'],
  },

  // Taif
  {
    id: 'taif-abbas',
    name: 'Masjid Abdullah Ibn Abbas & Old Taif',
    arabicName: 'مسجد عبد الله بن عباس',
    city: 'taif',
    significance: 'The historic central mosque of Taif founded near the resting place of the great scholar of the Quran and cousin of the Prophet, Abdullah Ibn Abbas (RA).',
    historicalNote: 'Taif is known for the Prophet’s journey of patient endurance and prayer for the guidance of its people.',
    duration: '45 min stop for prayer',
    bestTime: 'Morning or Dhuhr prayer',
    accessibility: 'Fully wheelchair accessible prayer hall and courtyard',
    features: ['Historic library & mosque', 'Central heritage market adjacent', 'Traditional mint & honey vendors'],
  },
  {
    id: 'taif-roses',
    name: 'Al-Hada Mountain Pass & Rose Distilleries',
    arabicName: 'مرتفعات الهدا ومصانع الورد الطائفي',
    city: 'taif',
    significance: 'The high-altitude mountain oasis famed for cultivating the aromatic 30-petal Taif Rose used annually in the ceremonial washing of the Holy Kaaba.',
    historicalNote: 'Experience mountain panoramas at 2,000+ meters above sea level and witness centuries-old rosewater distillation methods.',
    duration: '60 min tour stop',
    bestTime: 'All day, especially blooming season (Spring) & year-round artisan shops',
    accessibility: 'Gentle family pathways and scenic mountain overlooks',
    features: ['Live rose distillation demo', 'Authentic pure rose oil & scents', 'Fruit orchards & honey tastings', 'Cable car station view'],
  },
];

const PACKAGES = [
  {
    title: 'Makkah Al-Mukarramah Ziyarat',
    city: 'Makkah',
    duration: '3.5 - 4 Hours',
    coverage: 'Cave of Hira, Cave of Thawr, Mount Arafat, Mina & Muzdalifah, Jannat Al-Mu’alla',
    prices: { sedan: 180, suv: 260, van: 320 },
    badge: 'Most Popular',
  },
  {
    title: 'Madinah Al-Munawwarah Ziyarat',
    city: 'Madinah',
    duration: '3 - 3.5 Hours',
    coverage: 'Masjid Quba, Mount Uhud & Martyrs, Masjid Al-Qiblatayn, The Seven Mosques, Date Farm',
    prices: { sedan: 160, suv: 240, van: 300 },
    badge: 'Highly Recommended',
  },
  {
    title: 'Taif City & Mountain Excursion',
    city: 'Taif',
    duration: '7 - 8 Hours (Full Day)',
    coverage: 'Al-Hada mountain pass, Shubra Palace, Masjid Ibn Abbas, Rose Distillery, Cable car stop',
    prices: { sedan: 340, suv: 460, van: 580 },
    badge: 'Scenic Mountain Day',
  },
];

export default function ZiyaratPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'makkah' | 'madinah' | 'taif'>('all');

  const filteredSites =
    activeTab === 'all'
      ? ZIYARAT_SITES
      : ZIYARAT_SITES.filter((site) => site.city === activeTab);

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative h-[38vh] min-h-[280px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.madinahMosque}
            alt="Sacred Ziyarat Tours"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-700/85 via-brand-green-700/80 to-brand-green-700/90" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">
            Sacred Heritage & History
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Holy Ziyarat Tours
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
            Walk in the footsteps of the Prophet ﷺ and his companions. Experience insightful, private chauffeured
            excursions to the revered historical landmarks of Makkah, Madinah, and Taif.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gradient-to-b from-white via-brand-green-50/20 to-white">
        <div className="container-brand">
          {/* Curated Pre-Packaged Tours */}
          <SectionHeading
            eyebrow="Popular Excursions"
            title="Pre-Packaged"
            highlight="Ziyarat Itineraries"
            description="Private vehicle with courteous driver, flexible prayer stops, and zero rush."
          />

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.title} delay={i * 80}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-green-lg hover:border-brand-gold-300">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-gold-600">
                        {pkg.city} Tour
                      </span>
                      <span className="rounded-full bg-brand-gold-100 px-2.5 py-0.5 text-[0.68rem] font-bold text-brand-green-900">
                        {pkg.badge}
                      </span>
                    </div>

                    <h3 className="mt-2 font-sans text-lg font-bold text-brand-green-900">
                      {pkg.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-brand-gold-500" />
                      <span>{pkg.duration}</span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      <strong>Sites included:</strong> {pkg.coverage}
                    </p>

                    <div className="mt-4 border-t border-brand-green-50 pt-3">
                      <span className="text-[0.68rem] font-semibold text-brand-green-800">
                        Fixed Package Pricing:
                      </span>
                      <div className="mt-1 flex items-center justify-between text-xs text-brand-green-900">
                        <span>Sedan: <strong>{pkg.prices.sedan} SAR</strong></span>
                        <span>SUV: <strong>{pkg.prices.suv} SAR</strong></span>
                        <span>Van: <strong>{pkg.prices.van} SAR</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/booking?service=${encodeURIComponent(`${pkg.city} Ziyarat`)}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-green-700 to-brand-green-600 py-2.5 text-xs font-bold text-white shadow-green transition-all hover:bg-brand-green-800"
                    >
                      Book This Ziyarat Package <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Directory of Sacred Sites */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="Landmark Directory"
              title="Sacred Sites &"
              highlight="Historical Monuments"
              description="Detailed guide to each landmark, its spiritual history, and practical visitor tips."
            />

            {/* City Tabs */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex flex-wrap gap-1 rounded-xl bg-brand-green-50/80 p-1.5 border border-brand-green-100">
                {[
                  { id: 'all', label: 'All Sacred Sites' },
                  { id: 'makkah', label: 'Makkah Al-Mukarramah' },
                  { id: 'madinah', label: 'Al-Madinah Al-Munawwarah' },
                  { id: 'taif', label: 'Historical Taif' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      'rounded-lg px-4 py-2 text-xs font-bold transition-all',
                      activeTab === tab.id
                        ? 'bg-brand-green-700 text-white shadow-sm'
                        : 'text-brand-green-800 hover:bg-brand-green-100/70'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sites Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {filteredSites.map((site, index) => (
                <Reveal key={site.id} delay={index * 40}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-green-lg hover:border-brand-gold-300">
                    <div>
                      {/* Title & Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[0.68rem] font-bold uppercase tracking-wider text-brand-gold-600">
                              {site.city.toUpperCase()}
                            </span>
                            <span className="text-brand-green-300">·</span>
                            <span className="font-arabic text-sm text-brand-green-700">
                              {site.arabicName}
                            </span>
                          </div>
                          <h3 className="mt-1 font-sans text-lg font-bold text-brand-green-900">
                            {site.name}
                          </h3>
                        </div>

                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-50 px-2.5 py-1 text-[0.7rem] font-semibold text-brand-green-800 shrink-0">
                          <Clock className="h-3 w-3 text-brand-gold-600" />
                          {site.duration}
                        </span>
                      </div>

                      {/* Spiritual & Historical Meaning */}
                      <div className="mt-3 space-y-2">
                        <p className="text-xs leading-relaxed text-brand-green-950 font-medium">
                          {site.significance}
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground border-l-2 border-brand-gold-400 pl-3">
                          {site.historicalNote}
                        </p>
                      </div>

                      {/* Practical Guidelines */}
                      <div className="mt-4 grid grid-cols-1 gap-2 rounded-xl bg-brand-green-50/50 p-3 text-[0.72rem] sm:grid-cols-2">
                        <div>
                          <span className="font-bold text-brand-green-800">Best Visiting Time:</span>
                          <p className="text-muted-foreground">{site.bestTime}</p>
                        </div>
                        <div>
                          <span className="font-bold text-brand-green-800">Accessibility:</span>
                          <p className="text-muted-foreground">{site.accessibility}</p>
                        </div>
                      </div>

                      {/* Features tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {site.features.map((feat) => (
                          <span
                            key={feat}
                            className="inline-flex items-center gap-1 rounded-md bg-white border border-brand-green-100 px-2 py-1 text-[0.68rem] text-brand-green-800"
                          >
                            <CheckCircle2 className="h-3 w-3 text-brand-gold-600" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-6 flex items-center justify-between border-t border-brand-green-50 pt-4">
                      <span className="text-[0.72rem] text-muted-foreground">
                        Includes chilled bottled water & AC waiting
                      </span>
                      <Link
                        href={`/booking?service=Umrah+Ziyarat&notes=${encodeURIComponent(`Interested in visiting ${site.name}`)}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-green-700 hover:text-brand-gold-600 transition-colors"
                      >
                        Request Stop <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Etiquette and Pilgrim Tips */}
          <div className="mt-16 rounded-2xl border border-brand-green-100/80 bg-white p-6 md:p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold-50 text-brand-gold-700">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-brand-green-900">
                  Pilgrim Etiquette & Sacred Manners for Ziyarat
                </h3>
                <p className="text-xs text-muted-foreground">
                  Maximizing spiritual benefit and respect while visiting sacred historical locations
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-4">
                <Sun className="h-5 w-5 text-brand-gold-600" />
                <h4 className="mt-2 font-sans text-xs font-bold text-brand-green-900">Beat the Midday Sun</h4>
                <p className="mt-1 text-[0.72rem] leading-relaxed text-muted-foreground">
                  Schedule outdoor historical sites (Uhud, Arafat, Thawr foothills) early in the morning right after Fajr or late afternoon after Asr for pleasant temperatures.
                </p>
              </div>

              <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-4">
                <Sparkles className="h-5 w-5 text-brand-gold-600" />
                <h4 className="mt-2 font-sans text-xs font-bold text-brand-green-900">Maintain Wudu & Taharah</h4>
                <p className="mt-1 text-[0.72rem] leading-relaxed text-muted-foreground">
                  Perform wudu in your hotel room prior to departure, especially when visiting Masjid Quba to gain the full reward of Umrah prayer mentioned in hadith.
                </p>
              </div>

              <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-4">
                <Camera className="h-5 w-5 text-brand-gold-600" />
                <h4 className="mt-2 font-sans text-xs font-bold text-brand-green-900">Respectful Photography</h4>
                <p className="mt-1 text-[0.72rem] leading-relaxed text-muted-foreground">
                  Souvenir photography for memories is allowed at exterior viewpoints, but preserve sanctity by keeping noise low and avoiding photographing praying pilgrims.
                </p>
              </div>

              <div className="rounded-xl border border-brand-green-100 bg-brand-green-50/30 p-4">
                <Users className="h-5 w-5 text-brand-gold-600" />
                <h4 className="mt-2 font-sans text-xs font-bold text-brand-green-900">Family & Elderly Care</h4>
                <p className="mt-1 text-[0.72rem] leading-relaxed text-muted-foreground">
                  Our chauffeurs remain parked closely with the vehicle air-conditioned. Elderly relatives can comfortably relax inside the vehicle while others explore nearby steps.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-brand-green-700 to-brand-green-600 p-5 text-white sm:flex-row">
              <div>
                <p className="font-sans text-sm font-bold">Have custom historical sites in mind?</p>
                <p className="text-xs text-white/80">Tell our reservation team on WhatsApp to customize your private chauffeur route.</p>
              </div>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Assalamu Alaikum. I would like to design a custom Ziyarat tour with Falak Ride.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-gold-500 px-5 py-2.5 text-xs font-bold text-brand-green-950 shadow-gold shrink-0 hover:bg-brand-gold-400"
              >
                <MessageCircle className="h-4 w-4" />
                Customize on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
