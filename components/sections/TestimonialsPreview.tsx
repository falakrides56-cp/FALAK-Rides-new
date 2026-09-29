'use client';

import { Quote } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import StarRating from '@/components/shared/StarRating';
import reviews from '@/data/reviews.json';

export default function TestimonialsPreview() {
  const featured = reviews.slice(0, 6);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-brand-green-50/30">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Testimonials"
          title="Happy"
          highlight="Clients"
          description="What our pilgrims and travelers say about their Falak Ride experience"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((review, i) => (
            <Reveal key={review.id} delay={i * 80}>
              <div className="relative flex flex-col rounded-2xl border border-brand-green-100/60 bg-white p-5 shadow-soft transition-all duration-300 hover:shadow-green hover:border-brand-gold-200">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-brand-gold-100" />

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-400 text-sm font-bold text-white">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-green-700">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>

                <StarRating rating={review.rating} size="sm" className="mt-3" />

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{review.comment}&rdquo;
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-brand-green-50 pt-3">
                  <span className="text-xs font-medium text-brand-gold-600">{review.service}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
