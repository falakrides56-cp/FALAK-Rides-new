'use client';

import { useState, useMemo, useEffect } from 'react';
import { Star, Filter, ChevronLeft, ChevronRight, PlusCircle, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import StarRating from '@/components/shared/StarRating';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { getReviews, submitReview, Review } from '@/lib/mock-service';

const PAGE_SIZE = 6;
const RATINGS = [5, 4, 3];

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [filter, setFilter] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    country: '',
    rating: 5,
    route: 'Jeddah Airport → Makkah Hotel',
    comment: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function load() {
      const data = await getReviews();
      setReviewsList(data);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return filter ? reviewsList.filter((r) => r.rating === filter) : reviewsList;
  }, [filter, reviewsList]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (rating: number | null) => {
    setFilter(rating);
    setPage(1);
  };

  const handleOpenReviewDialog = () => {
    setSubmitSuccess(false);
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!newReview.name.trim()) {
      errs.name = 'Please enter your name';
    }
    if (!newReview.comment.trim()) {
      errs.comment = 'Please share your feedback or experience';
    } else if (newReview.comment.trim().length < 15) {
      errs.comment = 'Review must be at least 15 characters';
    }

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await submitReview({
        name: newReview.name.trim(),
        country: newReview.country.trim() || 'Pilgrim',
        rating: newReview.rating,
        route: newReview.route,
        comment: newReview.comment.trim(),
      });

      setReviewsList((prev) => [created, ...prev]);
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        setNewReview({
          name: '',
          country: '',
          rating: 5,
          route: 'Jeddah Airport → Makkah Hotel',
          comment: '',
        });
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      {/* Page header */}
      <section className="relative h-[36vh] min-h-[260px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.kaabaPilgrims2} alt="Pilgrims" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-700/80 to-brand-green-700/85" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">Testimonials</span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">Client Reviews</h1>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            Real experiences from pilgrims and travelers who chose Falak Ride across the Holy Cities
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-gradient-to-b from-white to-brand-green-50/30">
        <div className="container-brand">
          {/* Controls Bar: Filters & Write Review CTA */}
          <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-brand-green-100/70 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-brand-green-800 uppercase tracking-wide">
                <Filter className="h-3.5 w-3.5 text-brand-gold-600" /> Filter:
              </span>
              <button
                onClick={() => handleFilter(null)}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all',
                  filter === null
                    ? 'bg-brand-green-700 text-white'
                    : 'bg-brand-green-50 text-brand-green-800 hover:bg-brand-green-100'
                )}
              >
                All ({reviewsList.length})
              </button>
              {RATINGS.map((r) => (
                <button
                  key={r}
                  onClick={() => handleFilter(r)}
                  className={cn(
                    'flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all',
                    filter === r
                      ? 'bg-brand-green-700 text-white'
                      : 'bg-brand-green-50 text-brand-green-800 hover:bg-brand-green-100'
                  )}
                >
                  {r} <Star className="h-3.5 w-3.5 fill-current text-brand-gold-400" />
                </button>
              ))}
            </div>

            <button
              onClick={handleOpenReviewDialog}
              className="flex items-center gap-2 rounded-xl bg-brand-gold-500 px-5 py-2.5 text-xs font-bold text-brand-green-950 transition-colors hover:bg-brand-gold-400 self-stretch sm:self-auto justify-center"
            >
              <PlusCircle className="h-4 w-4" />
              Write a Review
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {current.map((review, i) => (
              <Reveal key={review.id} delay={i * 60}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-brand-green-100 bg-white p-6 transition-colors hover:border-brand-gold-400">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-sans text-base font-bold text-brand-green-900">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.country || 'Pilgrim traveler'}</p>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-brand-green-50 pt-3">
                    <span className="text-[0.7rem] font-semibold text-brand-gold-700">{review.route}</span>
                    <span className="text-[0.68rem] text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-green-200 text-brand-green-800 hover:bg-brand-green-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all',
                    p === page
                      ? 'bg-brand-green-700 text-white'
                      : 'border border-brand-green-200 text-brand-green-800 hover:bg-brand-green-50'
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-green-200 text-brand-green-800 hover:bg-brand-green-50 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Write a Review Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl border-brand-green-100 p-6">
          <DialogHeader>
            <DialogTitle className="font-sans text-lg font-bold text-brand-green-900">
              Share Your Journey Feedback
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Your honest feedback helps fellow pilgrims and allows us to maintain VIP chauffeur standards.
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="my-6 flex flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="font-sans text-base font-bold text-brand-green-900">
                Thank you for your review!
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Your feedback has been saved and published to the reviews list.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4 mt-2">
              {/* Rating Star Picker */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-brand-green-800">Your Rating</Label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={cn(
                          'h-6 w-6',
                          star <= newReview.rating
                            ? 'fill-brand-gold-400 text-brand-gold-400'
                            : 'text-gray-300'
                        )}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-brand-gold-600">
                    {newReview.rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Country */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-brand-green-800">Your Name *</Label>
                  <Input
                    placeholder="e.g. Brother Zaid"
                    value={newReview.name}
                    onChange={(e) => {
                      setNewReview((prev) => ({ ...prev, name: e.target.value }));
                      if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    className="border-brand-green-200 text-xs"
                  />
                  {formErrors.name && (
                    <p className="text-[0.68rem] text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-brand-green-800">Country of Origin</Label>
                  <Input
                    placeholder="e.g. UK / Malaysia"
                    value={newReview.country}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, country: e.target.value }))}
                    className="border-brand-green-200 text-xs"
                  />
                </div>
              </div>

              {/* Route */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-brand-green-800">Route Traveled</Label>
                <select
                  value={newReview.route}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, route: e.target.value }))}
                  className="w-full rounded-xl border border-brand-green-200 bg-white px-3 py-2 text-xs font-medium text-brand-green-900 focus:outline-none"
                >
                  <option value="Jeddah Airport → Makkah Hotel">Jeddah Airport → Makkah Hotel</option>
                  <option value="Makkah Hotel → Madinah Hotel">Makkah Hotel → Madinah Hotel</option>
                  <option value="Madinah Airport → Madinah Hotel">Madinah Airport → Madinah Hotel</option>
                  <option value="Makkah Historical Ziyarat Tour">Makkah Historical Ziyarat Tour</option>
                  <option value="Madinah Historical Ziyarat Tour">Madinah Historical Ziyarat Tour</option>
                  <option value="Jeddah City Tour & Al-Balad">Jeddah City Tour & Al-Balad</option>
                </select>
              </div>

              {/* Comment */}
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-brand-green-800">Your Experience *</Label>
                <Textarea
                  placeholder="Tell us about the chauffeur, vehicle comfort, punctuality, and overall trip..."
                  value={newReview.comment}
                  onChange={(e) => {
                    setNewReview((prev) => ({ ...prev, comment: e.target.value }));
                    if (formErrors.comment) setFormErrors((prev) => ({ ...prev, comment: '' }));
                  }}
                  className="min-h-[85px] border-brand-green-200 text-xs resize-none"
                />
                {formErrors.comment && (
                  <p className="text-[0.68rem] text-red-500">{formErrors.comment}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-brand-green-700 py-3 text-xs font-bold text-white transition-colors hover:bg-brand-green-800 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Review...' : 'Publish Review'}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
