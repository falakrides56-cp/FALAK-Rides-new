'use client';

import { Phone, Mail, Calendar } from 'lucide-react';
import bookings from '@/data/bookings.json';

const customers = [
  { id: 'cus-1', name: 'Ahmed Al-Saud', phone: '+966 55 123 4567', email: 'ahmed@email.com', bookings: 3, totalSpent: 450, lastBooking: '2025-09-28' },
  { id: 'cus-2', name: 'Fatima Hassan', phone: '+966 56 234 5678', email: 'fatima@email.com', bookings: 2, totalSpent: 620, lastBooking: '2025-09-29' },
  { id: 'cus-3', name: 'Mohammed Rahman', phone: '+966 57 345 6789', email: 'mohammed@email.com', bookings: 5, totalSpent: 1450, lastBooking: '2025-09-30' },
  { id: 'cus-4', name: 'Aisha Khan', phone: '+966 58 456 7890', email: 'aisha@email.com', bookings: 1, totalSpent: 400, lastBooking: '2025-10-01' },
  { id: 'cus-5', name: 'Omar Farooq', phone: '+966 59 567 8901', email: 'omar@email.com', bookings: 4, totalSpent: 980, lastBooking: '2025-10-02' },
  { id: 'cus-6', name: 'Khadija Ibrahim', phone: '+966 50 678 9012', email: 'khadija@email.com', bookings: 2, totalSpent: 380, lastBooking: '2025-10-03' },
];

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-bold text-brand-green-900">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">View your customer database</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-brand-green-100/60 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-green-50 bg-brand-green-50/30 text-left text-xs font-semibold text-muted-foreground">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3">Total Spent</th>
                <th className="px-4 py-3">Last Booking</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-brand-green-50/60 last:border-0 hover:bg-brand-green-50/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-400 text-xs font-bold text-white">
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="font-medium text-brand-green-700">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.phone}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.email}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green-700">{c.bookings}</td>
                  <td className="px-4 py-3 font-semibold text-brand-gold-600">{c.totalSpent} SAR</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.lastBooking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
