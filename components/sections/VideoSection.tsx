'use client';

import { Play } from 'lucide-react';
import { IMAGES } from '@/lib/images';

export default function VideoSection() {
  return (
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={IMAGES.madinahMosque}
          alt="Madinah mosque"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green-700/70 to-brand-green-700/80" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <h2 className="font-sans text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl">
          Experience the <span className="text-gradient-gold">Sacred Journey</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
          Watch how we make every trip a comfortable and blessed experience for our pilgrims
        </p>

        <button
          className="group mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30 transition-all duration-300 hover:scale-110 hover:bg-brand-gold-500"
          aria-label="Play video"
        >
          <div className="absolute inset-0 animate-ping rounded-full bg-white/10" style={{ animationDuration: '2s' }} />
          <Play className="h-7 w-7 fill-white text-white transition-colors group-hover:fill-brand-green-700 group-hover:text-brand-green-700" />
        </button>
      </div>
    </section>
  );
}
