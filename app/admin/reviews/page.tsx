'use client';

import { useState, useEffect } from 'react';
import { Check, X, Trash2, Star } from 'lucide-react';
import StarRating from '@/components/shared/StarRating';
import StatusBadge from '@/components/shared/StatusBadge';
import { cn } from '@/lib/utils';
import { getReviews, deleteReview, Review } from '@/lib/mock-service';

type AdminReview = Review & { adminStatus?: 'approved' | 'pending' | 'rejected' };

export default function AdminReviews() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getReviews();
      setReviews(data.map((r) => ({ ...r, adminStatus: 'approved' })));
    }
    load();
  }, []);

  const handleApprove = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, adminStatus: 'approved' } : r)));
  };

  const handleReject = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, adminStatus: 'rejected' } : r)));
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this customer review?')) {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-bold text-brand-green-900">Reviews Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">Approve, reject, or delete customer reviews</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-brand-green-100/60 bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-400 text-xs font-bold text-white">
                  {r.avatar || r.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-brand-green-700">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location || r.country || 'Pilgrim'}</p>
                </div>
              </div>
              <StatusBadge status={r.adminStatus as 'approved' | 'rejected' | 'pending'} />
            </div>

            <StarRating rating={r.rating} size="sm" className="mt-3" />
            <p className="mt-2 text-sm text-muted-foreground">&ldquo;{r.comment}&rdquo;</p>

            <div className="mt-3 flex items-center justify-between border-t border-brand-green-50 pt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-brand-gold-600">{r.service || r.route || 'Umrah Transfer'}</span>
                <span>•</span>
                <span>{r.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleApprove(r.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-green-600 hover:bg-green-50"
                  title="Approve"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleReject(r.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-600 hover:bg-amber-50"
                  title="Reject"
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
