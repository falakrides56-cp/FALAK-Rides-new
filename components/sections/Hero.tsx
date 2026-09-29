'use client';

import { MessageCircle, ArrowRight, Shield, Star } from 'lucide-react';
import BrandButton from '@/components/shared/BrandButton';
import { WHATSAPP_LINK } from '@/lib/constants';
import { IMAGES } from '@/lib/images';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-brand-green-900">
      {/* Background Image with Measured Scrim */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroKaaba}
          alt="Luxury Umrah Transport in Saudi Arabia"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-950/95 via-brand-green-900/85 to-brand-green-950/75" />
      </div>

      {/* Hero Content */}
      <div className="relative container-brand flex min-h-[90vh] flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold-400/40 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand-gold-400 animate-pulse" />
            <span className="font-sans text-xs font-semibold text-brand-gold-300">
              Official Saudi Umrah Transport & Chauffeur Service
            </span>
          </div>

          <h1 className="font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Your Blessed Journey,{' '}
            <span className="text-gradient-gold">Seamlessly Connected</span>
          </h1>

          <p className="max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
            Premium private airport transfers, intercity rides, and holy Ziyarat tours across Jeddah, Makkah, and Madinah. Transparent fixed pricing, flight tracking, and courteous English & Arabic speaking drivers.
          </p>

          {/* Quick Proof Metrics */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-gold-400" />
              <span>100% Fixed Fares (No Toll/Parking Surprises)</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-brand-gold-400 text-brand-gold-400" />
              <span>4.9/5 Rating from 12,000+ Pilgrims</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <BrandButton href="/booking" variant="gold" size="lg">
              Book Your Ride
              <ArrowRight className="ml-2 h-4 w-4" />
            </BrandButton>
            <BrandButton href={WHATSAPP_LINK} external variant="light" size="lg">
              <MessageCircle className="mr-2 h-4 w-4 text-brand-green-700" />
              Instant WhatsApp Booking
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
