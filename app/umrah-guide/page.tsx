'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Luggage,
  Clock,
  Droplet,
  FileCheck,
  AlertCircle,
  HelpCircle,
  Car,
  BookmarkCheck,
  Plane,
} from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { WHATSAPP_LINK } from '@/lib/constants';

interface MiqatPoint {
  name: string;
  location: string;
  distanceFromMakkah: string;
  whoItIsFor: string;
  facilities: string;
}

const MIQAT_POINTS: MiqatPoint[] = [
  {
    name: 'Dhu’l-Hulayfah (Masjid Bir Ali)',
    location: 'Abyar Ali, 9 km southwest of Al-Masjid an-Nabawi (Madinah)',
    distanceFromMakkah: '410 km north of Makkah',
    whoItIsFor: 'Pilgrims traveling from Madinah to Makkah by road or high-speed transit.',
    facilities: 'Large grand mosque with 500+ shower cubicles, wudu areas, ihram garment shops, and vast bus/car parking.',
  },
  {
    name: 'Qarn Al-Manazil (As-Sayl Al-Kabeer)',
    location: 'Near Taif on the eastern approach to Makkah',
    distanceFromMakkah: '75 km east of Makkah',
    whoItIsFor: 'Pilgrims arriving by road from Riyadh, Eastern Province, UAE, Oman, and Qatar.',
    facilities: 'Full ablution and bath complex, shopping for slippers, towels, belts, and air-conditioned prayer hall.',
  },
  {
    name: 'Yalamlam (Al-Sadiah)',
    location: 'Coastal plains south of Makkah',
    distanceFromMakkah: '100 km south of Makkah',
    whoItIsFor: 'Pilgrims arriving from Yemen, southern Saudi Arabia, and maritime/southern flight routes.',
    facilities: 'Fully equipped rest complex with separate male and female prayer sections.',
  },
  {
    name: 'Al-Juhfah (near Rabigh)',
    location: 'Northwest coast along the Red Sea near Rabigh',
    distanceFromMakkah: '183 km northwest of Makkah',
    whoItIsFor: 'Pilgrims coming from Egypt, Syria, Jordan, Turkey, and North Africa.',
    facilities: 'Restored historic mosque with full facilities.',
  },
  {
    name: 'Masjid Aisha (Al-Tan’eem)',
    location: 'Northern Makkah boundary along Medina Road',
    distanceFromMakkah: '7.5 km from the Holy Kaaba (Within Makkah perimeter)',
    whoItIsFor: 'Pilgrims already in Makkah wishing to renew or perform a second or subsequent Umrah.',
    facilities: 'Immediate access via taxi or private driver. Modern ablution halls, prayer areas, and ihram stalls.',
  },
];

const CHECKLIST_ITEMS = [
  { id: 'c1', label: 'Passport with at least 6 months validity from travel date', category: 'Documents' },
  { id: 'c2', label: 'Umrah Visa / Tourist eVisa PDF copy and printed backup', category: 'Documents' },
  { id: 'c3', label: 'Nusuk App installed with Umrah permit booked for rawdah & tawaf', category: 'Documents' },
  { id: 'c4', label: 'Two sets of white unstitched Ihram towels (for brothers)', category: 'Ihram' },
  { id: 'c5', label: 'Secure waist belt / pouch with zippered compartments for currency & passport', category: 'Ihram' },
  { id: 'c6', label: 'Comfortable non-stitched flip-flops or open sandals leaving ankle exposed', category: 'Ihram' },
  { id: 'c7', label: 'Modest abayas / hijabs in breathable cotton or linen (for sisters)', category: 'Clothing' },
  { id: 'c8', label: 'Fragrance-free soap, deodorant, shampoo, and vaseline / anti-chafe balm', category: 'Toiletries' },
  { id: 'c9', label: 'Travel hair clippers or scissors for Taqseer (hair trimming) in hotel', category: 'Toiletries' },
  { id: 'c10', label: 'Personal medications, throat lozenges, and hydration electrolyte sachets', category: 'Health' },
  { id: 'c11', label: 'Universal power adapter, phone power bank (under 100Wh for flights)', category: 'Electronics' },
  { id: 'c12', label: 'Pocket Quran or Du’a book and lightweight foldable prayer mat', category: 'Spiritual' },
];

export default function UmrahGuidePage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c3: false,
    c4: false,
    c5: false,
    c6: false,
    c7: false,
    c8: false,
    c9: false,
    c10: false,
    c11: false,
    c12: false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCount = CHECKLIST_ITEMS.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <section className="relative h-[38vh] min-h-[280px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.kaabaPilgrims}
            alt="Umrah Pilgrim Guide"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-700/85 via-brand-green-700/80 to-brand-green-700/90" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">
            Sacred Logistics & Practical Wisdom
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Pilgrim Umrah & Transport Guide
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
            Essential guidance on Miqat boundary points, Haram hotel drop-off logistics, Zamzam airline rules,
            and an interactive departure checklist for a blessed journey.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gradient-to-b from-white via-brand-green-50/20 to-white">
        <div className="container-brand">
          {/* Step-by-Step Umrah Journey Flow */}
          <SectionHeading
            eyebrow="Seamless Travel Flow"
            title="The Step-by-Step"
            highlight="Pilgrim Transport Journey"
            description="How Falak Ride coordinates every leg of your sacred pilgrimage from touchdown to return takeoff."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0}>
              <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-50 text-brand-gold-600 font-extrabold text-base">
                  01
                </div>
                <h3 className="mt-4 font-sans text-base font-bold text-brand-green-900">
                  Touchdown & Greeting
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Your chauffeur monitors your live flight number and greets you in Jeddah or Madinah arrivals hall with your name board. Up to 60 min delay buffer is complimentary.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-50 text-brand-gold-600 font-extrabold text-base">
                  02
                </div>
                <h3 className="mt-4 font-sans text-base font-bold text-brand-green-900">
                  Miqat & Niyyah Stop
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  If traveling between Madinah and Makkah or entering from a road border, your driver pulls into the Miqat mosque (e.g. Bir Ali) allowing ample time for wudu, prayer, and Ihram intention.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-50 text-brand-gold-600 font-extrabold text-base">
                  03
                </div>
                <h3 className="mt-4 font-sans text-base font-bold text-brand-green-900">
                  Direct Hotel Drop-off
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Our chauffeurs possess licensed entry permits into the Makkah and Madinah central security zones (Kudai, Ajyad, Jabal Omar, Markaziyah), unloading your bags directly at your lobby.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-50 text-brand-gold-600 font-extrabold text-base">
                  04
                </div>
                <h3 className="mt-4 font-sans text-base font-bold text-brand-green-900">
                  Ziyarat & Return Ride
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Enjoy historical site tours and when it’s time to depart, your driver safely stows your luggage along with official 5L airport-sealed Zamzam water bottles in the cargo trunk.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Sacred Miqat Guide */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="Spiritual Boundaries"
              title="Understanding the"
              highlight="Sacred Miqat Boundaries"
              description="The prophetic stations where every pilgrim entering the sacred boundary of Makkah must assume Ihram."
            />

            <div className="mt-8 overflow-hidden rounded-2xl border border-brand-green-100/80 bg-white shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-brand-green-100 bg-brand-green-50/60 font-sans text-brand-green-900">
                    <tr>
                      <th className="p-4 font-bold">Miqat Name</th>
                      <th className="p-4 font-bold">Geographic Location</th>
                      <th className="p-4 font-bold">Distance from Makkah</th>
                      <th className="p-4 font-bold">Designated Travelers</th>
                      <th className="p-4 font-bold">Amenities & Facilities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-green-50">
                    {MIQAT_POINTS.map((m) => (
                      <tr key={m.name} className="hover:bg-brand-green-50/30 transition-colors">
                        <td className="p-4 font-bold text-brand-green-900 whitespace-nowrap">
                          {m.name}
                        </td>
                        <td className="p-4 text-muted-foreground">{m.location}</td>
                        <td className="p-4 font-semibold text-brand-gold-600 whitespace-nowrap">
                          {m.distanceFromMakkah}
                        </td>
                        <td className="p-4 text-muted-foreground">{m.whoItIsFor}</td>
                        <td className="p-4 text-muted-foreground">{m.facilities}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-brand-green-100 bg-brand-green-50/30 p-4 text-[0.72rem] text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-brand-gold-600 shrink-0" />
                <span>
                  <strong>Air Travel Note:</strong> If flying directly into Jeddah with intention of performing Umrah immediately upon arrival, you should assume Ihram before boarding or when the pilot announces crossing the Miqat in mid-air.
                </span>
              </div>
            </div>
          </div>

          {/* Zamzam Regulations & Luggage Advice */}
          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Droplet className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-brand-green-900">
                    Official Zamzam Water Guidelines
                  </h3>
                  <p className="text-xs text-muted-foreground">Saudi GACA Aviation & Transport Rules</p>
                </div>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-600 shrink-0 mt-0.5" />
                  <span><strong>Airport Purchased Only:</strong> Airlines departing Jeddah (JED) or Madinah (MED) strictly require the official 5-liter boxed container purchased directly from the airport terminal depot.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-600 shrink-0 mt-0.5" />
                  <span><strong>Umrah Visa Holders:</strong> Eligible passengers may check in one complimentary 5L Zamzam container in addition to standard luggage allowances on most major airlines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-600 shrink-0 mt-0.5" />
                  <span><strong>Vehicle Trunk Handling:</strong> Our drivers ensure Zamzam containers are positioned upright and secured to prevent leakages in vehicle trunks.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold-50 text-brand-gold-700">
                  <Luggage className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-brand-green-900">
                    Haram Hotel Access & Traffic Zoning
                  </h3>
                  <p className="text-xs text-muted-foreground">Reaching Clock Tower, Ajyad, and Jabal Omar</p>
                </div>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-600 shrink-0 mt-0.5" />
                  <span><strong>Central Haram Security Ring:</strong> During peak prayer times and Ramadan/Hajj seasons, pedestrian corridors close to private non-licensed traffic. Our licensed chauffeurs use approved bypass routes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-600 shrink-0 mt-0.5" />
                  <span><strong>Kudai & Ajyad Access:</strong> For hotels located along Ajyad or Ibrahim Al-Khalil Street, drivers coordinate pickup times to avoid congested post-prayer pedestrian rushes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-600 shrink-0 mt-0.5" />
                  <span><strong>Luggage Cart Service:</strong> Chauffeurs assist you with bellboy coordination and luggage drop-off right at your hotel lobby ramp.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Pre-Departure Checklist */}
          <div className="mt-16 rounded-2xl border border-brand-green-100/80 bg-white p-6 md:p-8 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-gold-600">
                  Interactive Preparation
                </span>
                <h3 className="mt-1 font-sans text-xl font-bold text-brand-green-900">
                  Pilgrim Departure Checklist
                </h3>
                <p className="text-xs text-muted-foreground">
                  Click each item as you pack to ensure you have everything needed for a stress-free pilgrimage.
                </p>
              </div>

              {/* Progress Circle / Bar */}
              <div className="flex items-center gap-3 rounded-xl bg-brand-green-50/80 p-3 shrink-0">
                <div className="text-right">
                  <span className="block font-sans text-sm font-extrabold text-brand-green-900">
                    {completedCount} / {totalCount} Done
                  </span>
                  <span className="text-[0.68rem] text-brand-green-700 font-semibold">
                    {progressPercent}% Complete
                  </span>
                </div>
                <div className="h-2 w-24 rounded-full bg-brand-green-200 overflow-hidden">
                  <div
                    className="h-full bg-brand-gold-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKLIST_ITEMS.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all',
                      isChecked
                        ? 'border-brand-gold-300 bg-brand-gold-50/30'
                        : 'border-brand-green-100 bg-white hover:border-brand-green-200'
                    )}
                  >
                    <div
                      className={cn(
                        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                        isChecked
                          ? 'border-brand-gold-600 bg-brand-gold-500 text-white'
                          : 'border-brand-green-300 bg-white'
                      )}
                    >
                      {isChecked && <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-brand-gold-600 block">
                        {item.category}
                      </span>
                      <span
                        className={cn(
                          'text-xs leading-snug',
                          isChecked
                            ? 'text-brand-green-950 font-medium line-through opacity-70'
                            : 'text-brand-green-900 font-medium'
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Support Banner */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-brand-green-700 to-brand-green-600 p-5 text-white sm:flex-row">
              <div>
                <p className="font-sans text-sm font-bold">Ready to book your private Umrah chauffeur?</p>
                <p className="text-xs text-white/80">Guaranteed fixed prices, certified local drivers, and 24/7 WhatsApp dispatch.</p>
              </div>
              <Link
                href="/booking"
                className="rounded-xl bg-brand-gold-500 px-6 py-2.5 text-xs font-bold text-brand-green-950 shadow-gold shrink-0 hover:bg-brand-gold-400"
              >
                Book Your Ride Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
