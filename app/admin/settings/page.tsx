'use client';

import { useState } from 'react';
import { Save, Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BRAND } from '@/lib/constants';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    businessName: BRAND.name,
    tagline: BRAND.tagline,
    phone: BRAND.phone,
    email: BRAND.email,
    address: BRAND.address,
    hours: BRAND.hours,
    whatsapp: BRAND.whatsapp,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = 'border-brand-green-100/80 focus-visible:ring-brand-gold-400/40';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-bold text-brand-green-900">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your business information</p>
      </div>

      {saved && (
        <div className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="max-w-2xl space-y-5">
        <div className="rounded-xl border border-brand-green-100/60 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-brand-gold-600" />
            <h3 className="font-sans text-base font-bold text-brand-green-900">Business Information</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">Business Name</Label>
                <Input
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">Tagline</Label>
                <Input
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">
                  <Phone className="mr-1 inline h-3.5 w-3.5" /> Phone
                </Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">
                  <Mail className="mr-1 inline h-3.5 w-3.5" /> Email
                </Label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-700">
                <MapPin className="mr-1 inline h-3.5 w-3.5" /> Address
              </Label>
              <Textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className={`${inputClass} min-h-[60px] resize-none`}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">
                  <Clock className="mr-1 inline h-3.5 w-3.5" /> Business Hours
                </Label>
                <Input
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-green-700">WhatsApp Number</Label>
                <Input
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-green-600 to-brand-green-500 px-6 py-2.5 text-sm font-semibold text-white shadow-green transition-all hover:shadow-green-lg"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </form>
    </div>
  );
}
