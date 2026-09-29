'use client';

import { Calendar, DollarSign, Clock, XCircle, TrendingUp, Car, Users } from 'lucide-react';
import bookings from '@/data/bookings.json';
import fleet from '@/data/fleet.json';
import reviews from '@/data/reviews.json';
import StatusBadge from '@/components/shared/StatusBadge';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const monthlyData = [
  { month: 'Apr', bookings: 42, revenue: 12600 },
  { month: 'May', bookings: 55, revenue: 16500 },
  { month: 'Jun', bookings: 48, revenue: 14400 },
  { month: 'Jul', bookings: 67, revenue: 20100 },
  { month: 'Aug', bookings: 78, revenue: 23400 },
  { month: 'Sep', bookings: 85, revenue: 25500 },
];

const chartConfig = {
  bookings: { label: 'Bookings', color: '#0B3D2E' },
  revenue: { label: 'Revenue (SAR)', color: '#F97316' },
} satisfies ChartConfig;

export default function AdminDashboard() {
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
  const pending = bookings.filter((b) => b.status === 'pending').length;
  const cancelled = bookings.filter((b) => b.status === 'cancelled').length;
  const revenue = bookings.filter((b) => b.status === 'confirmed').reduce((sum, b) => sum + b.amount, 0);

  const statCards = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-brand-green-600', bg: 'bg-brand-green-50' },
    { label: 'Pending', value: pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Confirmed', value: confirmed, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Cancelled', value: cancelled, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Revenue (SAR)', value: revenue.toLocaleString(), icon: DollarSign, color: 'text-brand-gold-600', bg: 'bg-brand-gold-50' },
    { label: 'Fleet Size', value: fleet.length, icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-bold text-brand-green-900">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of your business performance</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-brand-green-100/60 bg-white p-4 shadow-soft">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="mt-3 font-sans text-xl font-bold text-brand-green-900">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-brand-green-100/60 bg-white p-5 shadow-soft">
          <h3 className="font-sans text-base font-bold text-brand-green-900">Monthly Bookings</h3>
          <p className="mb-4 text-xs text-muted-foreground">Last 6 months performance</p>
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6F0EC" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="bookings" fill="var(--color-bookings)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="rounded-xl border border-brand-green-100/60 bg-white p-5 shadow-soft">
          <h3 className="font-sans text-base font-bold text-brand-green-900">Revenue Trend</h3>
          <p className="mb-4 text-xs text-muted-foreground">Revenue in SAR (last 6 months)</p>
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6F0EC" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} dot={{ fill: '#F97316', r: 4 }} />
            </LineChart>
          </ChartContainer>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="rounded-xl border border-brand-green-100/60 bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-sans text-base font-bold text-brand-green-900">Recent Bookings</h3>
          <span className="text-xs text-muted-foreground">{bookings.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-green-50 text-left text-xs font-semibold text-muted-foreground">
                <th className="pb-2 pr-4">ID</th>
                <th className="pb-2 pr-4">Customer</th>
                <th className="pb-2 pr-4">Route</th>
                <th className="pb-2 pr-4">Date</th>
                <th className="pb-2 pr-4">Car</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 6).map((b) => (
                <tr key={b.id} className="border-b border-brand-green-50/60 last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs text-brand-gold-600">{b.id}</td>
                  <td className="py-3 pr-4 font-medium text-brand-green-700">{b.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{b.pickup} → {b.dropoff}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{b.date}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{b.carType}</td>
                  <td className="py-3 pr-4"><StatusBadge status={b.status as 'confirmed' | 'pending' | 'cancelled'} /></td>
                  <td className="py-3 font-semibold text-brand-green-700">{b.amount} SAR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-brand-green-100/60 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-50">
              <Users className="h-5 w-5 text-brand-green-600" />
            </div>
            <div>
              <p className="font-sans text-lg font-bold text-brand-green-900">{reviews.length}</p>
              <p className="text-xs text-muted-foreground">Total Reviews</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-brand-green-100/60 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold-50">
              <TrendingUp className="h-5 w-5 text-brand-gold-600" />
            </div>
            <div>
              <p className="font-sans text-lg font-bold text-brand-green-900">
                {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-brand-green-100/60 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Car className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-sans text-lg font-bold text-brand-green-900">{fleet.length}</p>
              <p className="text-xs text-muted-foreground">Active Vehicles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
