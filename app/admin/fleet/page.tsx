'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Briefcase, X } from 'lucide-react';
import fleetData from '@/data/fleet.json';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Vehicle = (typeof fleetData)[0];

const emptyVehicle: Vehicle = {
  id: '',
  name: '',
  category: '',
  image: 'sedan',
  passengers: 4,
  luggage: 3,
  ac: true,
  features: [],
  priceFrom: 0,
  currency: 'SAR',
  description: '',
};

export default function AdminFleet() {
  const [vehicles, setVehicles] = useState(fleetData);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<Vehicle>(emptyVehicle);

  const handleAdd = () => {
    setForm({ ...emptyVehicle, id: `veh-${Date.now()}` });
    setEditing(null);
    setShowAdd(true);
  };

  const handleEdit = (v: Vehicle) => {
    setForm(v);
    setEditing(v);
    setShowAdd(true);
  };

  const handleSave = () => {
    if (editing) {
      setVehicles((prev) => prev.map((v) => (v.id === editing.id ? form : v)));
    } else {
      setVehicles((prev) => [...prev, form]);
    }
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-brand-green-900">Fleet Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add, edit, and remove vehicles</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-green-600 to-brand-green-500 px-4 py-2 text-sm font-semibold text-white shadow-green transition-all hover:shadow-green-lg"
        >
          <Plus className="h-4 w-4" /> Add Vehicle
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => (
          <div key={v.id} className="rounded-xl border border-brand-green-100/60 bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-sans text-base font-bold text-brand-green-900">{v.name}</h3>
                <span className="text-xs text-brand-gold-600">{v.category}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(v)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-600 hover:bg-amber-50"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-brand-gold-500" /> {v.passengers} seats</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5 text-brand-gold-500" /> {v.luggage} bags</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{v.description}</p>
            <p className="mt-3 font-semibold text-brand-green-700">From {v.priceFrom} {v.currency}</p>
          </div>
        ))}
      </div>

      {/* Add/Edit modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-sans text-lg font-bold text-brand-green-900">
              {editing ? 'Edit Vehicle' : 'Add New Vehicle'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-700">Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-brand-green-100/80 focus-visible:ring-brand-gold-400/40"
                placeholder="e.g. Premium SUV"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="border-brand-green-100/80 focus-visible:ring-brand-gold-400/40"
                  placeholder="e.g. SUV"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">Price From (SAR)</Label>
                <Input
                  type="number"
                  value={form.priceFrom}
                  onChange={(e) => setForm({ ...form, priceFrom: Number(e.target.value) })}
                  className="border-brand-green-100/80 focus-visible:ring-brand-gold-400/40"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">Passengers</Label>
                <Input
                  type="number"
                  value={form.passengers}
                  onChange={(e) => setForm({ ...form, passengers: Number(e.target.value) })}
                  className="border-brand-green-100/80 focus-visible:ring-brand-gold-400/40"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">Luggage</Label>
                <Input
                  type="number"
                  value={form.luggage}
                  onChange={(e) => setForm({ ...form, luggage: Number(e.target.value) })}
                  className="border-brand-green-100/80 focus-visible:ring-brand-gold-400/40"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-700">Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border-brand-green-100/80 focus-visible:ring-brand-gold-400/40"
                placeholder="Short description"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-brand-green-100 px-4 py-2 text-sm font-medium text-brand-green-700 hover:bg-brand-green-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-gradient-to-r from-brand-green-600 to-brand-green-500 px-4 py-2 text-sm font-semibold text-white"
            >
              {editing ? 'Save Changes' : 'Add Vehicle'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
