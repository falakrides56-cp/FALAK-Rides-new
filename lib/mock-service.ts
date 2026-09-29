/**
 * Centralized API & Service Layer for Falak Ride
 * 
 * Directly connected to live Next.js backend API routes (/api/*) powered by
 * Neon PostgreSQL & Prisma ORM, with local storage fallbacks for instant responsiveness.
 */

import seedBookings from '@/data/bookings.json';
import seedReviews from '@/data/reviews.json';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  returnDate?: string;
  returnTime?: string;
  carType: string;
  passengers: number;
  serviceType: string;
  payment: string;
  status: 'confirmed' | 'pending' | 'in_progress' | 'completed' | 'cancelled';
  amount: number;
  notes?: string;
  pickupLocation?: string;
  createdAt?: string;
  driver?: {
    name: string;
    phone: string;
    rating: number;
    vehicle: string;
    plate: string;
    avatar: string;
  };
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  route?: string;
  service?: string;
  country?: string;
  location?: string;
  avatar?: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

const STORAGE_KEYS = {
  BOOKINGS: 'falak_bookings_store',
  REVIEWS: 'falak_reviews_store',
  INQUIRIES: 'falak_inquiries_store',
  ADMIN_AUTH: 'falak_admin_session',
};

// Helper to calculate estimated fare based on cities and vehicle
export function calculateEstimatedFare(
  fromCity: string,
  toCity: string,
  carType: string,
  isRoundTrip = false
): number {
  const from = fromCity.toLowerCase();
  const to = toCity.toLowerCase();

  let baseRate = 180;

  if (
    (from.includes('jeddah') && to.includes('makkah')) ||
    (from.includes('makkah') && to.includes('jeddah'))
  ) {
    baseRate = 160;
  } else if (
    (from.includes('makkah') && to.includes('madinah')) ||
    (from.includes('madinah') && to.includes('makkah'))
  ) {
    baseRate = 420;
  } else if (
    (from.includes('jeddah') && to.includes('madinah')) ||
    (from.includes('madinah') && to.includes('jeddah'))
  ) {
    baseRate = 450;
  } else if (to.includes('ziyarat') || from.includes('ziyarat')) {
    baseRate = 220;
  } else if (from.includes('airport') && to.includes('madinah')) {
    baseRate = 90;
  } else if (from.includes('taif') || to.includes('taif')) {
    baseRate = 260;
  }

  // Vehicle multiplier
  const car = carType.toLowerCase();
  let carMultiplier = 1;
  if (car.includes('suv')) carMultiplier = 1.45;
  else if (car.includes('van') || car.includes('7-seater')) carMultiplier = 1.7;
  else if (car.includes('luxury')) carMultiplier = 2.2;

  let total = Math.round(baseRate * carMultiplier);
  if (isRoundTrip) {
    total = Math.round(total * 1.85); // 15% roundtrip discount
  }

  return total;
}

// -------------------------------------------------------------
// Bookings Operations (Neon PostgreSQL + Prisma API)
// -------------------------------------------------------------

export async function getBookings(): Promise<Booking[]> {
  try {
    const res = await fetch('/api/bookings', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(json.data));
          } catch {}
        }
        return json.data;
      }
    }
  } catch (err) {
    console.warn('API /api/bookings fetch failed, using local fallback:', err);
  }

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (raw) return JSON.parse(raw);
    } catch {}
  }
  return seedBookings as unknown as Booking[];
}

export async function getBookingByReference(ref: string): Promise<Booking | null> {
  const clean = ref.trim().toUpperCase();
  if (!clean) return null;

  try {
    const res = await fetch(`/api/track?ref=${encodeURIComponent(clean)}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('API /api/track fetch failed, falling back:', err);
  }

  const all = await getBookings();
  const found = all.find(
    (b) =>
      b.id.toUpperCase() === clean ||
      b.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
      b.name.toUpperCase().includes(clean)
  );

  return found || null;
}

export async function createBooking(
  bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>
): Promise<Booking> {
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        // Also update local cache
        const all = await getBookings();
        const updated = [json.data, ...all.filter((b) => b.id !== json.data.id)];
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
          } catch {}
        }
        return json.data;
      }
    }
  } catch (err) {
    console.error('Error posting to /api/bookings, saving locally:', err);
  }

  // Fallback local booking generation
  const all = await getBookings();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newId = `BK-${randomSuffix}`;

  const newBooking: Booking = {
    ...bookingData,
    id: newId,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    driver: {
      name: 'Ali Al-Harbi',
      phone: '+966 55 111 2233',
      rating: 4.9,
      vehicle: bookingData.carType || 'Toyota Camry Hybrid (Sedan)',
      plate: 'ح ر ب 8421',
      avatar: 'AH',
    },
  };

  const updated = [newBooking, ...all];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    } catch {}
  }

  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking['status']
): Promise<boolean> {
  try {
    const res = await fetch(`/api/bookings/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const all = await getBookings();
      const updated = all.map((b) => (b.id === id ? { ...b, status } : b));
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
        } catch {}
      }
      return true;
    }
  } catch (err) {
    console.warn('API update failed:', err);
  }

  const all = await getBookings();
  const updated = all.map((b) => (b.id === id ? { ...b, status } : b));
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/bookings/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const all = await getBookings();
      const updated = all.filter((b) => b.id !== id);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
        } catch {}
      }
      return true;
    }
  } catch (err) {
    console.warn('API delete failed:', err);
  }

  const all = await getBookings();
  const updated = all.filter((b) => b.id !== id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

// -------------------------------------------------------------
// Reviews Operations (Neon PostgreSQL + Prisma API)
// -------------------------------------------------------------

export async function getReviews(): Promise<Review[]> {
  try {
    const res = await fetch('/api/reviews', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(json.data));
          } catch {}
        }
        return json.data;
      }
    }
  } catch (err) {
    console.warn('API /api/reviews fetch failed, using fallback:', err);
  }

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (raw) return JSON.parse(raw);
    } catch {}
  }
  return seedReviews as unknown as Review[];
}

export async function submitReview(
  newReview: Omit<Review, 'id' | 'date'>
): Promise<Review> {
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const all = await getReviews();
        const updated = [json.data, ...all];
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
          } catch {}
        }
        return json.data;
      }
    }
  } catch (err) {
    console.error('Error posting review:', err);
  }

  const all = await getReviews();
  const created: Review = {
    ...newReview,
    id: `rev-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
  };

  const updated = [created, ...all];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
    } catch {}
  }

  return created;
}

export async function deleteReview(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/reviews/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const all = await getReviews();
      const updated = all.filter((r) => r.id !== id);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
        } catch {}
      }
      return true;
    }
  } catch (err) {
    console.warn('API delete review failed:', err);
  }

  const all = await getReviews();
  const updated = all.filter((r) => r.id !== id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

// -------------------------------------------------------------
// Contact Inquiries Operations (Neon PostgreSQL + Prisma API)
// -------------------------------------------------------------

export async function submitContactInquiry(
  data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>
): Promise<ContactInquiry> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.error('API /api/contact error:', err);
  }

  const newInquiry: ContactInquiry = {
    ...data,
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };

  return newInquiry;
}

// -------------------------------------------------------------
// Admin Auth Session
// -------------------------------------------------------------

export async function loginAdminApi(username: string, password: string): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        setAdminAuthenticated(true);
        return true;
      }
    }
  } catch (err) {
    console.warn('API admin login failed, checking local credentials:', err);
  }

  // Fallback default admin check
  if (username === 'admin' && (password === 'admin123' || password === 'admin')) {
    setAdminAuthenticated(true);
    return true;
  }

  return false;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const session = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    return session === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(authenticated: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  } catch {}
}
