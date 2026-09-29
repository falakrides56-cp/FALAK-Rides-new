'use client';

import { useState, useMemo, useEffect } from 'react';
import { Eye, Edit, Trash2, X, Filter, Download, Search, CheckCircle2 } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getBookings, updateBookingStatus, deleteBooking, Booking } from '@/lib/mock-service';

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getBookings();
      setBookings(data);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesFilter = filter === 'all' || b.status === filter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.pickup.toLowerCase().includes(q) ||
        b.dropoff.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [bookings, filter, search]);

  const handleDelete = async (id: string) => {
    if (confirm(`Are you sure you want to delete reservation ${id}?`)) {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const validStatus = status as Booking['status'];
    await updateBookingStatus(id, validStatus);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: validStatus } : b)));
    if (selected && selected.id === id) {
      setSelected((prev) => (prev ? { ...prev, status: validStatus } : null));
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Pickup', 'Dropoff', 'Date', 'Time', 'CarType', 'ServiceType', 'Status', 'Amount', 'Payment'];
    const rows = filtered.map((b) => [
      b.id,
      `"${b.name}"`,
      `"${b.phone}"`,
      `"${b.pickup}"`,
      `"${b.dropoff}"`,
      b.date,
      b.time || '',
      `"${b.carType}"`,
      `"${b.serviceType}"`,
      b.status,
      b.amount,
      b.payment || '',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `falak-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-brand-green-900">Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage and track all customer reservations</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-lg border border-brand-green-200 bg-white px-4 py-2 text-xs font-semibold text-brand-green-800 shadow-soft hover:bg-brand-green-50 self-start sm:self-auto"
        >
          <Download className="h-4 w-4 text-brand-gold-600" />
          Export CSV ({filtered.length})
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-green-700">
            <Filter className="h-4 w-4 text-brand-gold-500" /> Status:
          </span>
          {['all', 'confirmed', 'pending', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all',
                filter === f
                  ? 'bg-brand-green-600 text-white'
                  : 'bg-brand-green-50 text-brand-green-700 hover:bg-brand-green-100'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search booking, name, route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-brand-green-100 bg-white pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-brand-green-100/60 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-green-50 bg-brand-green-50/30 text-left text-xs font-semibold text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Car</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-brand-green-50/60 last:border-0 hover:bg-brand-green-50/30">
                  <td className="px-4 py-3 font-mono text-xs text-brand-gold-600">{b.id}</td>
                  <td className="px-4 py-3 font-medium text-brand-green-700">{b.name}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{b.phone}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{b.pickup} → {b.dropoff}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{b.date}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{b.carType}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{b.serviceType}</td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className="rounded-md border border-brand-green-100/80 bg-white px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-green-700">{b.amount} SAR</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelected(b)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-green-600 hover:bg-brand-green-50"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-600 hover:bg-amber-50"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">No bookings found.</div>
        )}
      </div>

      {/* Detail modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-sans text-lg font-bold text-brand-green-900">
              Booking Details — {selected?.id}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              {[
                ['Customer', selected.name],
                ['Phone', selected.phone],
                ['Pickup', selected.pickup],
                ['Dropoff', selected.dropoff],
                ['Date', selected.date],
                ['Time', selected.time],
                ['Return Date', selected.returnDate || 'N/A'],
                ['Return Time', selected.returnTime || 'N/A'],
                ['Car Type', selected.carType],
                ['Passengers', String(selected.passengers)],
                ['Service Type', selected.serviceType],
                ['Payment', selected.payment],
                ['Amount', `${selected.amount} SAR`],
                ['Notes', selected.notes || 'None'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-brand-green-50 pb-2">
                  <span className="text-xs font-semibold text-brand-gold-600">{label}</span>
                  <span className="text-right text-sm font-medium text-brand-green-700">{value}</span>
                </div>
              ))}
              <div className="flex justify-between border-b border-brand-green-50 pb-2">
                <span className="text-xs font-semibold text-brand-gold-600">Status</span>
                <StatusBadge status={selected.status as 'confirmed' | 'pending' | 'cancelled'} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
