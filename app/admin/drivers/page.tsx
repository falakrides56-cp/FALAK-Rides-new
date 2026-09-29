'use client';

import { Plus, Edit, Trash2, Phone, Star } from 'lucide-react';
import team from '@/data/team.json';

const drivers = [
  { id: 'drv-1', name: 'Ali Al-Harbi', phone: '+966 55 111 2233', rating: 4.9, trips: 342, status: 'active', vehicle: 'Sedan' },
  { id: 'drv-2', name: 'Hassan Al-Otaibi', phone: '+966 56 222 3344', rating: 4.8, trips: 289, status: 'active', vehicle: 'SUV' },
  { id: 'drv-3', name: 'Nasser Al-Ghamdi', phone: '+966 57 333 4455', rating: 5.0, trips: 412, status: 'active', vehicle: 'Luxury' },
  { id: 'drv-4', name: 'Salem Al-Qahtani', phone: '+966 58 444 5566', rating: 4.7, trips: 198, status: 'off-duty', vehicle: 'Van' },
  { id: 'drv-5', name: 'Fahd Al-Dossari', phone: '+966 59 555 6677', rating: 4.9, trips: 356, status: 'active', vehicle: 'SUV' },
  { id: 'drv-6', name: 'Majed Al-Subaie', phone: '+966 50 666 7788', rating: 4.6, trips: 167, status: 'off-duty', vehicle: 'Sedan' },
];

export default function AdminDrivers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-brand-green-900">Drivers</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your team of drivers</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-green-600 to-brand-green-500 px-4 py-2 text-sm font-semibold text-white shadow-green transition-all hover:shadow-green-lg">
          <Plus className="h-4 w-4" /> Add Driver
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {drivers.map((d) => (
          <div key={d.id} className="rounded-xl border border-brand-green-100/60 bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-400 text-sm font-bold text-white">
                  {d.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-brand-green-700">{d.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" /> {d.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-600 hover:bg-amber-50">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 border-t border-brand-green-50 pt-3 text-xs">
              <span className="flex items-center gap-1 font-semibold text-brand-gold-600">
                <Star className="h-3.5 w-3.5 fill-current" /> {d.rating}
              </span>
              <span className="text-muted-foreground">{d.trips} trips</span>
              <span className="text-muted-foreground">{d.vehicle}</span>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${d.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {d.status === 'active' ? 'Active' : 'Off Duty'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
