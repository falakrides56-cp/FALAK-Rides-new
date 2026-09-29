'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Clock,
  Car,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  AlertCircle,
  CreditCard,
  Printer,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Navigation,
} from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import StatusBadge from '@/components/shared/StatusBadge';
import { BRAND, WHATSAPP_LINK } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { getBookings, Booking } from '@/lib/mock-service';

interface DriverAssignment {
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
  plate: string;
  avatar: string;
}

const DRIVER_ASSIGNMENTS: Record<string, DriverAssignment> = {
  'BK-2401': {
    name: 'Ali Al-Harbi',
    phone: '+966 55 111 2233',
    rating: 4.9,
    vehicle: 'Toyota Camry Hybrid (Sedan)',
    plate: 'ح ر ب 8421',
    avatar: 'AH',
  },
  'BK-2402': {
    name: 'Nasser Al-Ghamdi',
    phone: '+966 57 333 4455',
    rating: 5.0,
    vehicle: 'Hyundai Staria VIP 7-Seater',
    plate: 'ق م د 3912',
    avatar: 'NG',
  },
  'BK-2403': {
    name: 'Hassan Al-Otaibi',
    phone: '+966 56 222 3344',
    rating: 4.8,
    vehicle: 'GMC Yukon XL (Family SUV)',
    plate: 'ط ي ب 1054',
    avatar: 'HO',
  },
  'BK-2404': {
    name: 'Fahd Al-Dossari',
    phone: '+966 59 555 6677',
    rating: 4.9,
    vehicle: 'Mercedes-Benz E-Class VIP',
    plate: 'د س ر 7733',
    avatar: 'FD',
  },
  'BK-2405': {
    name: 'Majed Al-Subaie',
    phone: '+966 50 666 7788',
    rating: 4.7,
    vehicle: 'Chevrolet Tahoe SUV',
    plate: 'س ب ع 9210',
    avatar: 'MS',
  },
};

export default function TrackBookingPage() {
  const [searchInput, setSearchInput] = useState('BK-2401');
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getBookings();
      setAllBookings(data);

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref) {
          setSearchInput(ref);
          const found = data.find(
            (b) =>
              b.id.toUpperCase() === ref.trim().toUpperCase() ||
              b.phone.replace(/[^0-9]/g, '').includes(ref.replace(/[^0-9]/g, ''))
          );
          if (found) {
            setActiveBooking(found);
            return;
          }
        }
      }

      if (data.length > 0) {
        setActiveBooking(data[0]);
      }
    }
    load();
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (!clean) return;

    const found = allBookings.find(
      (b) =>
        b.id.toUpperCase() === clean ||
        b.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
        b.name.toUpperCase().includes(clean)
    );

    setActiveBooking(found || null);
    setHasSearched(true);
  };

  const handleSampleClick = (id: string) => {
    setSearchInput(id);
    const found = allBookings.find((b) => b.id === id);
    if (found) {
      setActiveBooking(found);
      setHasSearched(true);
    }
  };

  const driver = activeBooking
    ? activeBooking.driver ||
      DRIVER_ASSIGNMENTS[activeBooking.id] || {
        name: 'Abdulrahman Al-Sharif',
        phone: '+966 55 987 6543',
        rating: 4.9,
        vehicle: activeBooking.carType || 'Executive Chauffeur SUV',
        plate: 'ف ل ك 2026',
        avatar: 'AS',
      }
    : null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative h-[32vh] min-h-[240px] overflow-hidden bg-brand-green-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-brand-gold-400" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-brand-gold-400" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">
            Real-Time Trip Lookup
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Track Your Booking & Ride
          </h1>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            Enter your booking reference or phone number to check live driver assignment, trip itinerary, and pickup schedule.
          </p>
        </div>
      </section>

      {/* Lookup & Result Section */}
      <section className="section-padding bg-gradient-to-b from-brand-green-50/30 to-white">
        <div className="container-brand max-w-4xl">
          {/* Search Card */}
          <div className="rounded-2xl border border-brand-green-100/80 bg-white p-6 shadow-soft">
            <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter Booking ID (e.g. BK-2401) or phone number..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="h-12 w-full rounded-xl border border-brand-green-100 bg-brand-green-50/20 pl-10 pr-4 text-sm font-medium text-brand-green-900 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-gold-400/50"
                />
              </div>
              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-green-700 to-brand-green-600 px-6 text-sm font-bold text-white shadow-green transition-all hover:bg-brand-green-800"
              >
                <Search className="h-4 w-4" />
                Check Status
              </button>
            </form>

            {/* Quick Demo Links */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Try sample bookings:</span>
              {['BK-2401', 'BK-2402', 'BK-2403', 'BK-2404'].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSampleClick(id)}
                  className="rounded-lg border border-brand-green-100 bg-brand-green-50/50 px-2.5 py-1 text-xs font-semibold text-brand-green-800 hover:bg-brand-gold-50 hover:text-brand-gold-700 hover:border-brand-gold-300 transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>

          {/* Search Result */}
          {activeBooking ? (
            <div className="mt-8 space-y-6">
              {/* Trip Header Status Card */}
              <div className="overflow-hidden rounded-2xl border border-brand-green-100/80 bg-white shadow-soft">
                <div className="border-b border-brand-green-50 bg-gradient-to-r from-brand-green-700 to-brand-green-600 p-5 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[0.7rem] uppercase tracking-wider text-brand-gold-300 font-semibold">
                        Trip Reservation
                      </span>
                      <h2 className="font-sans text-xl font-extrabold text-white">
                        {activeBooking.pickup} → {activeBooking.dropoff}
                      </h2>
                      <span className="font-mono text-xs text-brand-gold-200">
                        Reference: {activeBooking.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={activeBooking.status as 'confirmed' | 'pending' | 'cancelled'} />
                      <button
                        onClick={handlePrint}
                        className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                        title="Print / Save Voucher"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Print Voucher
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="border-b border-brand-green-50 bg-brand-green-50/30 p-5">
                  <span className="text-[0.68rem] font-bold uppercase tracking-wider text-brand-gold-600 block mb-3">
                    Live Trip Milestones
                  </span>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                      <div>
                        <p className="font-bold text-brand-green-900">Received</p>
                        <p className="text-[0.68rem] text-muted-foreground">Order verified</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2
                        className={cn(
                          'h-4 w-4 shrink-0',
                          activeBooking.status === 'confirmed' ? 'text-green-600' : 'text-amber-500'
                        )}
                      />
                      <div>
                        <p className="font-bold text-brand-green-900">Driver Assigned</p>
                        <p className="text-[0.68rem] text-muted-foreground">
                          {driver ? driver.name : 'Pending dispatch'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <Navigation
                        className={cn(
                          'h-4 w-4 shrink-0',
                          activeBooking.status === 'confirmed' ? 'text-brand-gold-600' : 'text-muted-foreground'
                        )}
                      />
                      <div>
                        <p className="font-bold text-brand-green-900">Vehicle En Route</p>
                        <p className="text-[0.68rem] text-muted-foreground">Scheduled pickup</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-bold text-brand-green-900">Arrive & Complete</p>
                        <p className="text-[0.68rem] text-muted-foreground">Door-to-door</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver Info Card */}
                {driver && (
                  <div className="border-b border-brand-green-50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-green-600 to-brand-green-500 font-bold text-white shadow-soft">
                          {driver.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-sans text-base font-bold text-brand-green-900">
                              {driver.name}
                            </h3>
                            <span className="rounded-md bg-brand-gold-50 px-2 py-0.5 text-[0.68rem] font-bold text-brand-gold-700">
                              ★ {driver.rating}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {driver.vehicle} · Plate: <strong className="text-brand-green-900 font-mono">{driver.plate}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${driver.phone}`}
                          className="flex items-center gap-1.5 rounded-xl border border-brand-green-200 px-3.5 py-2 text-xs font-semibold text-brand-green-700 hover:bg-brand-green-50 transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          Call Driver
                        </a>
                        <a
                          href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Assalamu Alaikum Driver ${driver.name}. I am passenger ${activeBooking.name} for booking ${activeBooking.id}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-xl bg-brand-green-700 px-4 py-2 text-xs font-bold text-white shadow-green hover:bg-brand-green-800 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-brand-gold-300" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary Details */}
                <div className="p-5">
                  <h4 className="font-sans text-sm font-bold text-brand-green-900 mb-4">
                    Trip Itinerary & Booking Specifications
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 text-xs">
                    <div className="rounded-xl border border-brand-green-50 bg-brand-green-50/20 p-3">
                      <span className="text-[0.68rem] font-semibold text-brand-gold-600 block">
                        Passenger Name
                      </span>
                      <span className="font-bold text-brand-green-900 text-sm mt-0.5 block">
                        {activeBooking.name}
                      </span>
                      <span className="text-muted-foreground">{activeBooking.phone}</span>
                    </div>

                    <div className="rounded-xl border border-brand-green-50 bg-brand-green-50/20 p-3">
                      <span className="text-[0.68rem] font-semibold text-brand-gold-600 block">
                        Pickup Date & Time
                      </span>
                      <span className="font-bold text-brand-green-900 text-sm mt-0.5 block">
                        {activeBooking.date}
                      </span>
                      <span className="text-muted-foreground">{activeBooking.time || 'Flexible'}</span>
                    </div>

                    <div className="rounded-xl border border-brand-green-50 bg-brand-green-50/20 p-3">
                      <span className="text-[0.68rem] font-semibold text-brand-gold-600 block">
                        Service Category
                      </span>
                      <span className="font-bold text-brand-green-900 text-sm mt-0.5 block">
                        {activeBooking.serviceType}
                      </span>
                      <span className="text-muted-foreground">{activeBooking.carType}</span>
                    </div>

                    <div className="rounded-xl border border-brand-green-50 bg-brand-green-50/20 p-3">
                      <span className="text-[0.68rem] font-semibold text-brand-gold-600 block">
                        Party Size
                      </span>
                      <span className="font-bold text-brand-green-900 text-sm mt-0.5 block">
                        {activeBooking.passengers} Passengers
                      </span>
                      <span className="text-muted-foreground">Standard luggage capacity</span>
                    </div>

                    <div className="rounded-xl border border-brand-green-50 bg-brand-green-50/20 p-3">
                      <span className="text-[0.68rem] font-semibold text-brand-gold-600 block">
                        Payment & Fares
                      </span>
                      <span className="font-bold text-brand-green-900 text-sm mt-0.5 block">
                        {activeBooking.amount} SAR (Fixed)
                      </span>
                      <span className="text-muted-foreground">Method: {activeBooking.payment}</span>
                    </div>

                    <div className="rounded-xl border border-brand-green-50 bg-brand-green-50/20 p-3">
                      <span className="text-[0.68rem] font-semibold text-brand-gold-600 block">
                        Notes / Instructions
                      </span>
                      <span className="font-bold text-brand-green-900 text-xs mt-0.5 block">
                        {activeBooking.notes || 'None provided'}
                      </span>
                    </div>
                  </div>

                  {activeBooking.returnDate && (
                    <div className="mt-4 rounded-xl border border-brand-gold-200 bg-brand-gold-50/30 p-3 text-xs">
                      <span className="font-bold text-brand-green-900 block">
                        Return Leg Scheduled:
                      </span>
                      <p className="text-muted-foreground mt-0.5">
                        Return from {activeBooking.dropoff} to {activeBooking.pickup} on{' '}
                        <strong>{activeBooking.returnDate}</strong> at {activeBooking.returnTime || 'TBD'}.
                      </p>
                    </div>
                  )}
                </div>

                {/* Need Help Banner */}
                <div className="border-t border-brand-green-100 bg-brand-green-50/40 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="h-4 w-4 text-brand-gold-600 shrink-0" />
                      <span>
                        Need to change pickup time, flight details, or add a stop?
                      </span>
                    </div>
                    <a
                      href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Assalamu Alaikum. I need to modify my booking ${activeBooking.id}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-brand-green-700 hover:text-brand-gold-700 transition-colors"
                    >
                      Message 24/7 Dispatch →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            hasSearched && (
              <div className="mt-8 rounded-2xl border border-brand-green-100 bg-white p-10 text-center shadow-soft">
                <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
                <h3 className="mt-3 font-sans text-base font-bold text-brand-green-900">
                  No booking found for &ldquo;{searchInput}&rdquo;
                </h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                  Please check that your booking reference format looks like <strong>BK-2401</strong>, or search by the phone number entered during reservation.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <Link
                    href="/booking"
                    className="rounded-xl bg-brand-green-700 px-5 py-2.5 text-xs font-semibold text-white shadow-green"
                  >
                    Make a New Booking
                  </Link>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-brand-green-200 px-5 py-2.5 text-xs font-semibold text-brand-green-700"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
