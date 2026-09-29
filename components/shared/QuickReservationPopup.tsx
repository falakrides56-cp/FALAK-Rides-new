'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, MapPin, Car, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'falak_ride_popup_dismissed';

export default function QuickReservationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [pickupCity, setPickupCity] = useState('Jeddah Airport');
  const [dropoffCity, setDropoffCity] = useState('Makkah Hotel');
  const [vehicle, setVehicle] = useState('SUV');
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Check if user already dismissed this popup during the current session
    try {
      const isDismissed = sessionStorage.getItem(STORAGE_KEY);
      if (isDismissed === 'true') {
        return;
      }
    } catch {
      // Ignore storage errors in restricted iframe environments
    }

    // Generate a randomized scroll trigger threshold between 450px and 1100px
    // or when the user scrolls past ~25% - 40% of the document height
    const randomThreshold = Math.floor(Math.random() * (1000 - 450 + 1)) + 450;
    const randomDelay = Math.floor(Math.random() * (1800 - 600 + 1)) + 600;

    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      // If already dismissed in this session, remove listener
      try {
        if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
          window.removeEventListener('scroll', handleScroll);
          return;
        }
      } catch {}

      if (hasTriggeredRef.current || isOpen) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > randomThreshold) {
        hasTriggeredRef.current = true;
        // Introduce an organic randomized delay after scroll threshold is reached
        timeoutId = setTimeout(() => {
          try {
            if (sessionStorage.getItem(STORAGE_KEY) !== 'true') {
              setIsOpen(true);
            }
          } catch {
            setIsOpen(true);
          }
        }, randomDelay);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen]);

  const handleClose = () => {
    // Permanently hide for this user/session when clicking X
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-reservation-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          // Temporary close if clicking outside without dismissing
          setIsOpen(false);
          hasTriggeredRef.current = false;
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
    >
      {/* Modal card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-brand-green-100/90 bg-white p-6 shadow-2xl transition-all duration-300 sm:p-7">
        {/* Clearly visible "X" Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close Quick Ride Reservation"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-800 transition-colors hover:bg-brand-green-100 hover:text-brand-green-950 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="border-b border-brand-green-100 pb-4 pr-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-50 px-2.5 py-0.5 text-[0.68rem] font-bold text-brand-green-800">
              <Clock className="h-3 w-3 text-brand-gold-600" />
              24/7 Available
            </span>
          </div>
          <h3
            id="quick-reservation-title"
            className="mt-1.5 font-sans text-lg font-bold text-brand-green-900"
          >
            Quick Ride Reservation
          </h3>
          <p className="text-xs text-muted-foreground">
            Direct driver dispatch & confirmed fixed pricing
          </p>
        </div>

        {/* Reservation Form Controls */}
        <div className="mt-5 space-y-4">
          {/* Pickup */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-brand-green-800">
              <MapPin className="h-3.5 w-3.5 text-brand-gold-600" /> Pickup Location
            </label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="w-full rounded-xl border border-brand-green-200 bg-white px-3.5 py-2.5 text-xs font-medium text-brand-green-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40"
            >
              <option value="Jeddah Airport">Jeddah Airport (Terminal 1 / North)</option>
              <option value="Makkah Hotel">Makkah Clock Tower / Haram Hotels</option>
              <option value="Madinah Hotel">Madinah Central / Markaziyah Hotels</option>
              <option value="Madinah Airport">Prince Mohammad Airport (MED)</option>
              <option value="Taif">Taif / Miqat Qarn Al-Manazil</option>
            </select>
          </div>

          {/* Dropoff */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-brand-green-800">
              <MapPin className="h-3.5 w-3.5 text-brand-gold-600" /> Destination
            </label>
            <select
              value={dropoffCity}
              onChange={(e) => setDropoffCity(e.target.value)}
              className="w-full rounded-xl border border-brand-green-200 bg-white px-3.5 py-2.5 text-xs font-medium text-brand-green-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40"
            >
              <option value="Makkah Hotel">Makkah Hotel / Haram Zone</option>
              <option value="Madinah Hotel">Madinah Central Area</option>
              <option value="Jeddah Airport">Jeddah Airport Departure</option>
              <option value="Makkah Ziyarat Tour">Makkah Historical Ziyarat (4 hrs)</option>
              <option value="Madinah Ziyarat Tour">Madinah Historical Ziyarat (4 hrs)</option>
            </select>
          </div>

          {/* Vehicle Preference */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-brand-green-800">
              <Car className="h-3.5 w-3.5 text-brand-gold-600" /> Vehicle Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Sedan', label: 'Sedan (1-4)' },
                { id: 'SUV', label: 'SUV (1-6)' },
                { id: 'Van', label: 'Van (7-10)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setVehicle(opt.id)}
                  className={cn(
                    'rounded-xl border py-2 text-center text-xs font-semibold transition-all',
                    vehicle === opt.id
                      ? 'border-brand-green-700 bg-brand-green-50 text-brand-green-800 ring-1 ring-brand-green-700'
                      : 'border-brand-green-100 bg-white text-brand-green-700 hover:bg-brand-green-50/50'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <Link
            href={`/booking?from=${encodeURIComponent(pickupCity)}&to=${encodeURIComponent(dropoffCity)}&car=${encodeURIComponent(vehicle)}`}
            onClick={handleClose}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-green-700 to-brand-green-600 py-3.5 text-sm font-semibold text-white shadow-green transition-all hover:bg-brand-green-800 active:scale-[0.99]"
          >
            Continue to Booking
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="flex items-center justify-center gap-1 pt-1 text-center text-[0.7rem] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
            <span>Free cancellation · Meet & Greet included · No advance deposit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
