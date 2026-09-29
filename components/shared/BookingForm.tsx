'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Briefcase,
  CreditCard,
  FileText,
  CheckCircle2,
  MessageCircle,
  X,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Navigation,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import cities from '@/data/cities.json';
import fleet from '@/data/fleet.json';
import { BRAND, buildWhatsAppMessage, WHATSAPP_LINK } from '@/lib/constants';
import {
  createBooking,
  calculateEstimatedFare,
  Booking,
} from '@/lib/mock-service';

interface BookingFormProps {
  compact?: boolean;
}

interface FormData {
  fullName: string;
  phone: string;
  pickupCity: string;
  dropoffCity: string;
  pickupDate: string;
  pickupTime: string;
  returnEnabled: boolean;
  returnDate: string;
  returnTime: string;
  carType: string;
  passengers: string;
  serviceType: string;
  payment: string;
  pickupLocation: string;
  notes: string;
}

const SERVICE_TYPES = [
  'Airport Transfer',
  'Umrah Ziyarat',
  'City Tour',
  'Intercity Transfer',
  'Self Drive',
  'With Driver',
];

const PAYMENT_OPTIONS = ['Cash', 'Card', 'Online Transfer'];

const CAR_TYPES = ['Sedan (Economy/Standard)', 'SUV', 'Luxury', 'Van/7-Seater'];

const initialData: FormData = {
  fullName: '',
  phone: '',
  pickupCity: '',
  dropoffCity: '',
  pickupDate: '',
  pickupTime: '10:00',
  returnEnabled: false,
  returnDate: '',
  returnTime: '14:00',
  carType: 'SUV',
  passengers: '2',
  serviceType: 'Airport Transfer',
  payment: 'Cash',
  pickupLocation: '',
  notes: '',
};

export default function BookingForm({ compact = false }: BookingFormProps) {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [pickupDateObj, setPickupDateObj] = useState<Date | undefined>();
  const [returnDateObj, setReturnDateObj] = useState<Date | undefined>();

  // Parse URL search params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pickup = params.get('pickup') || params.get('from');
      const dropoff = params.get('dropoff') || params.get('to');
      const service = params.get('service');
      const car = params.get('car');
      const notes = params.get('notes');

      setData((prev) => {
        const next = { ...prev };
        if (pickup) {
          const matched = cities.find(
            (c) =>
              c.label.toLowerCase() === pickup.toLowerCase() ||
              pickup.toLowerCase().includes(c.label.toLowerCase()) ||
              c.label.toLowerCase().includes(pickup.toLowerCase())
          );
          if (matched) next.pickupCity = matched.label;
          else next.pickupCity = pickup;
        }
        if (dropoff) {
          const matched = cities.find(
            (c) =>
              c.label.toLowerCase() === dropoff.toLowerCase() ||
              dropoff.toLowerCase().includes(c.label.toLowerCase()) ||
              c.label.toLowerCase().includes(dropoff.toLowerCase())
          );
          if (matched) next.dropoffCity = matched.label;
          else next.dropoffCity = dropoff;
        }
        if (service) {
          const matchedService = SERVICE_TYPES.find(
            (s) =>
              s.toLowerCase().includes(service.toLowerCase()) ||
              service.toLowerCase().includes(s.toLowerCase())
          );
          if (matchedService) next.serviceType = matchedService;
        }
        if (car) {
          const matchedCar = CAR_TYPES.find(
            (c) =>
              c.toLowerCase().includes(car.toLowerCase()) ||
              car.toLowerCase().includes(c.toLowerCase())
          );
          if (matchedCar) next.carType = matchedCar;
        }
        if (notes && !prev.notes) {
          next.notes = notes;
        }
        return next;
      });
    }
  }, []);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    // Clear inline error on change
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  // Live estimated fare calculation
  const estimatedFare = useMemo(() => {
    return calculateEstimatedFare(
      data.pickupCity || 'Jeddah',
      data.dropoffCity || 'Makkah',
      data.carType || 'Sedan',
      data.returnEnabled
    );
  }, [data.pickupCity, data.dropoffCity, data.carType, data.returnEnabled]);

  const summaryItems = useMemo(
    () => [
      { label: 'Name', value: data.fullName || '—' },
      { label: 'Phone', value: data.phone ? `+966 ${data.phone}` : '—' },
      {
        label: 'Pickup → Dropoff',
        value:
          data.pickupCity && data.dropoffCity
            ? `${data.pickupCity} → ${data.dropoffCity}`
            : '—',
      },
      {
        label: 'Pickup Date & Time',
        value: data.pickupDate
          ? `${data.pickupDate}${data.pickupTime ? ` at ${data.pickupTime}` : ''}`
          : '—',
      },
      {
        label: 'Return Ride',
        value:
          data.returnEnabled && data.returnDate
            ? `${data.returnDate}${data.returnTime ? ` at ${data.returnTime}` : ''}`
            : 'One-Way Transfer',
      },
      {
        label: 'Vehicle Class',
        value: data.carType ? `${data.carType} (${data.passengers} pax)` : '—',
      },
      { label: 'Service Category', value: data.serviceType || '—' },
      { label: 'Payment Method', value: data.payment || '—' },
    ],
    [data]
  );

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!data.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    } else if (data.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters';
    }

    const cleanPhone = data.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please provide a contact phone number';
    } else if (cleanPhone.length < 8) {
      errs.phone = 'Please enter a valid phone number (at least 8 digits)';
    }

    if (!data.pickupCity) {
      errs.pickupCity = 'Please select a pickup city or airport';
    }
    if (!data.dropoffCity) {
      errs.dropoffCity = 'Please select a destination city or hotel zone';
    }
    if (!data.pickupDate) {
      errs.pickupDate = 'Please select your pickup date';
    }
    if (data.returnEnabled && !data.returnDate) {
      errs.returnDate = 'Please select your return date';
    }
    if (!data.carType) {
      errs.carType = 'Please select a vehicle type';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleReviewAndConfirm = () => {
    if (validateForm()) {
      setShowConfirm(true);
    }
  };

  const executeBooking = async () => {
    setIsSubmitting(true);
    try {
      const newBooking = await createBooking({
        name: data.fullName.trim(),
        phone: `+966 ${data.phone.trim()}`,
        pickup: data.pickupCity,
        dropoff: data.dropoffCity,
        date: data.pickupDate,
        time: data.pickupTime || '10:00',
        returnDate: data.returnEnabled ? data.returnDate : undefined,
        returnTime: data.returnEnabled ? data.returnTime : undefined,
        carType: data.carType,
        passengers: parseInt(data.passengers) || 1,
        serviceType: data.serviceType || 'Airport Transfer',
        payment: data.payment,
        amount: estimatedFare,
        notes: data.notes,
        pickupLocation: data.pickupLocation,
      });

      setConfirmedBooking(newBooking);
      setShowConfirm(false);
      setShowSuccess(true);
    } catch (err) {
      console.error('Error submitting booking', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppText = (bookingId?: string): string => {
    const lines = [
      `*New Booking Request — Falak Ride*`,
      bookingId ? `*Reference:* #${bookingId}` : '',
      ``,
      `*Name:* ${data.fullName || '—'}`,
      `*Phone:* +966 ${data.phone || '—'}`,
      `*Route:* ${data.pickupCity} → ${data.dropoffCity}`,
      `*Pickup:* ${data.pickupDate} ${data.pickupTime}`,
      `*Return:* ${data.returnEnabled ? `${data.returnDate} ${data.returnTime}` : 'One-Way'}`,
      `*Car:* ${data.carType}`,
      `*Passengers:* ${data.passengers}`,
      `*Estimated Fare:* SAR ${estimatedFare} (Fixed Rate)`,
      `*Service:* ${data.serviceType}`,
      `*Payment:* ${data.payment}`,
    ].filter(Boolean);

    if (data.pickupLocation) lines.push(`*Pickup Location:* ${data.pickupLocation}`);
    if (data.notes) lines.push(`*Notes:* ${data.notes}`);
    return lines.join('\n');
  };

  const handleWhatsApp = async () => {
    setIsSubmitting(true);
    try {
      const newBooking = await createBooking({
        name: data.fullName.trim(),
        phone: `+966 ${data.phone.trim()}`,
        pickup: data.pickupCity,
        dropoff: data.dropoffCity,
        date: data.pickupDate,
        time: data.pickupTime || '10:00',
        returnDate: data.returnEnabled ? data.returnDate : undefined,
        returnTime: data.returnEnabled ? data.returnTime : undefined,
        carType: data.carType,
        passengers: parseInt(data.passengers) || 1,
        serviceType: data.serviceType || 'Airport Transfer',
        payment: data.payment,
        amount: estimatedFare,
        notes: data.notes,
        pickupLocation: data.pickupLocation,
      });

      setConfirmedBooking(newBooking);
      const text = buildWhatsAppText(newBooking.id);
      const link = buildWhatsAppMessage(text);
      if (typeof window !== 'undefined') {
        window.open(link, '_blank');
      }
      setShowConfirm(false);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setData(initialData);
    setErrors({});
    setPickupDateObj(undefined);
    setReturnDateObj(undefined);
    setConfirmedBooking(null);
  };

  const handleCopyRef = () => {
    if (confirmedBooking?.id && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(confirmedBooking.id);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const inputClass =
    'border-brand-green-100/80 focus-visible:ring-brand-gold-400/40 text-brand-green-950 font-medium';

  return (
    <div className={cn('w-full', compact ? '' : 'max-w-6xl mx-auto')}>
      <div className={cn('grid gap-6', compact ? 'grid-cols-1' : 'lg:grid-cols-[1fr_360px]')}>
        {/* Form Container */}
        <div className="rounded-2xl border border-brand-green-100/80 bg-white p-5 md:p-7">
          <div className="border-b border-brand-green-100/80 pb-4 mb-6">
            <h2 className="font-sans text-xl font-bold text-brand-green-900">
              Passenger & Journey Details
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fill in your transfer details. All rides include 100% fixed pricing, flight tracking, and chauffeur meet & greet.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <User className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="e.g. Tariq Mansour"
                value={data.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                className={cn(inputClass, errors.fullName && 'border-red-400 focus-visible:ring-red-400')}
              />
              {errors.fullName && (
                <p className="text-[0.7rem] font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <Phone className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                WhatsApp / Mobile Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-brand-green-200 bg-brand-green-50 px-3 text-xs font-semibold text-brand-green-800">
                  +966
                </span>
                <Input
                  type="tel"
                  placeholder="5X XXX XXXX"
                  value={data.phone}
                  onChange={(e) => update('phone', e.target.value.replace(/[^0-9\s]/g, ''))}
                  className={cn(
                    inputClass,
                    'rounded-l-none',
                    errors.phone && 'border-red-400 focus-visible:ring-red-400'
                  )}
                />
              </div>
              {errors.phone && (
                <p className="text-[0.7rem] font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.phone}
                </p>
              )}
            </div>

            {/* Pickup City */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <MapPin className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Pickup Location / City <span className="text-red-500">*</span>
              </Label>
              <Select value={data.pickupCity} onValueChange={(v) => update('pickupCity', v)}>
                <SelectTrigger className={cn(inputClass, errors.pickupCity && 'border-red-400')}>
                  <SelectValue placeholder="Select pickup city / airport" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.label}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pickupCity && (
                <p className="text-[0.7rem] font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.pickupCity}
                </p>
              )}
            </div>

            {/* Dropoff City */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <MapPin className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Destination / Dropoff <span className="text-red-500">*</span>
              </Label>
              <Select value={data.dropoffCity} onValueChange={(v) => update('dropoffCity', v)}>
                <SelectTrigger className={cn(inputClass, errors.dropoffCity && 'border-red-400')}>
                  <SelectValue placeholder="Select dropoff city / hotel" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.label}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.dropoffCity && (
                <p className="text-[0.7rem] font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.dropoffCity}
                </p>
              )}
            </div>

            {/* Pickup Date */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <Calendar className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Pickup Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      'flex h-10 w-full items-center justify-between rounded-md border border-brand-green-100/80 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40',
                      !data.pickupDate && 'text-muted-foreground',
                      errors.pickupDate && 'border-red-400'
                    )}
                  >
                    <span>{data.pickupDate || 'Pick a date'}</span>
                    <Calendar className="h-4 w-4 text-brand-gold-600" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarPicker
                    mode="single"
                    selected={pickupDateObj}
                    onSelect={(d) => {
                      setPickupDateObj(d);
                      update('pickupDate', d ? format(d, 'yyyy-MM-dd') : '');
                    }}
                    initialFocus
                    className="rounded-lg border-0"
                  />
                </PopoverContent>
              </Popover>
              {errors.pickupDate && (
                <p className="text-[0.7rem] font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.pickupDate}
                </p>
              )}
            </div>

            {/* Pickup Time */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <Clock className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Pickup Time
              </Label>
              <Input
                type="time"
                value={data.pickupTime}
                onChange={(e) => update('pickupTime', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Return ride toggle */}
            <div className="sm:col-span-2 rounded-xl border border-brand-green-100 bg-brand-green-50/40 p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="returnEnabled"
                  checked={data.returnEnabled}
                  onCheckedChange={(checked) => update('returnEnabled', !!checked)}
                />
                <label
                  htmlFor="returnEnabled"
                  className="text-xs font-semibold text-brand-green-900 cursor-pointer select-none"
                >
                  Book Return Journey (Save 15% on Round-Trip Fare)
                </label>
              </div>

              {data.returnEnabled && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 pt-3 border-t border-brand-green-100">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-brand-green-800">
                      Return Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            'flex h-10 w-full items-center justify-between rounded-md border border-brand-green-100/80 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40',
                            !data.returnDate && 'text-muted-foreground',
                            errors.returnDate && 'border-red-400'
                          )}
                        >
                          <span>{data.returnDate || 'Pick return date'}</span>
                          <Calendar className="h-4 w-4 text-brand-gold-600" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarPicker
                          mode="single"
                          selected={returnDateObj}
                          onSelect={(d) => {
                            setReturnDateObj(d);
                            update('returnDate', d ? format(d, 'yyyy-MM-dd') : '');
                          }}
                          initialFocus
                          className="rounded-lg border-0"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.returnDate && (
                      <p className="text-[0.7rem] font-medium text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.returnDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-brand-green-800">Return Time</Label>
                    <Input
                      type="time"
                      value={data.returnTime}
                      onChange={(e) => update('returnTime', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <Car className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Vehicle Category <span className="text-red-500">*</span>
              </Label>
              <Select value={data.carType} onValueChange={(v) => update('carType', v)}>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {CAR_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Passengers */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <Users className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Passengers Count
              </Label>
              <Select value={data.passengers} onValueChange={(v) => update('passengers', v)}>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Number of passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <Briefcase className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Service Type
              </Label>
              <Select value={data.serviceType} onValueChange={(v) => update('serviceType', v)}>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPES.map((st) => (
                    <SelectItem key={st} value={st}>
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <CreditCard className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Payment Method
              </Label>
              <Select value={data.payment} onValueChange={(v) => update('payment', v)}>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_OPTIONS.map((pm) => (
                    <SelectItem key={pm} value={pm}>
                      {pm} (Pay Driver Upon Arrival)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pickup Specific Location */}
            <div className="sm:col-span-2 space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <Navigation className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Specific Pickup Address or Terminal Details{' '}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input
                placeholder="e.g. King Abdulaziz Airport Terminal 1, Gate 4 / Hilton Convention Hotel Lobby"
                value={data.pickupLocation}
                onChange={(e) => update('pickupLocation', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Notes */}
            <div className="sm:col-span-2 space-y-1.5">
              <Label className="text-xs font-semibold text-brand-green-800">
                <FileText className="mr-1 inline h-3.5 w-3.5 text-brand-gold-600" />
                Special Notes / Flight Number / Child Seat Requests{' '}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Textarea
                placeholder="e.g. Flight SV 124 landing at 14:15, 2 large suitcases, need 1 child car seat..."
                value={data.notes}
                onChange={(e) => update('notes', e.target.value)}
                className={cn(inputClass, 'min-h-[75px] resize-none')}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3 pt-4 border-t border-brand-green-100">
            <button
              type="button"
              onClick={handleReviewAndConfirm}
              className="flex items-center gap-2 rounded-xl bg-brand-green-700 px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-gold-500 hover:text-brand-green-950"
            >
              <CheckCircle2 className="h-4 w-4" />
              Review & Confirm Booking
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-brand-green-200 bg-white px-5 py-3 text-xs font-semibold text-brand-green-800 transition-colors hover:bg-brand-green-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Form
            </button>
          </div>
        </div>

        {/* Live Summary Sidebar */}
        <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <div className="overflow-hidden rounded-2xl border border-brand-green-100 bg-brand-green-900 p-5 text-white">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-gold-400" />
                <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
                  Booking Summary
                </h3>
              </div>
              <span className="text-[0.65rem] font-bold text-brand-gold-300 rounded-full bg-white/10 px-2.5 py-0.5">
                Instant Quote
              </span>
            </div>

            {/* Estimated Fare Display */}
            <div className="mb-5 rounded-xl border border-brand-gold-400/40 bg-white/10 p-3.5 text-center">
              <span className="block text-[0.68rem] font-medium text-brand-gold-200 uppercase tracking-wider">
                Estimated Fixed Fare
              </span>
              <p className="mt-1 font-sans text-3xl font-extrabold text-white">
                {estimatedFare} <span className="text-sm font-bold text-brand-gold-300">SAR</span>
              </p>
              <span className="mt-1 block text-[0.65rem] text-white/70">
                All-Inclusive · No Toll/Parking Surprises
              </span>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-2 text-xs">
              {summaryItems.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-2 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">{item.label}</span>
                  <span className="text-right font-medium text-brand-gold-200">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Guarantees */}
            <div className="mt-5 space-y-1.5 border-t border-white/10 pt-3 text-[0.7rem] text-white/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold-400" />
                <span>Free cancellation up to 4 hrs prior</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand-gold-400" />
                <span>60-min airport flight delay buffer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md rounded-2xl border-brand-green-100 p-6">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-800">
              <CheckCircle2 className="h-6 w-6 text-brand-gold-600" />
            </div>
            <DialogTitle className="text-center font-sans text-lg font-bold text-brand-green-900">
              Confirm Your Ride Reservation
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground">
              Please review your journey summary below. You can submit directly for immediate system confirmation or dispatch via WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <div className="my-3 rounded-xl border border-brand-green-100 bg-brand-green-50/50 p-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Passenger:</span>
              <span className="font-semibold text-brand-green-950">{data.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Route:</span>
              <span className="font-semibold text-brand-green-950">{data.pickupCity} → {data.dropoffCity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pickup Time:</span>
              <span className="font-semibold text-brand-green-950">{data.pickupDate} at {data.pickupTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehicle:</span>
              <span className="font-semibold text-brand-green-950">{data.carType}</span>
            </div>
            <div className="flex justify-between border-t border-brand-green-200/60 pt-2">
              <span className="font-bold text-brand-green-900">Total Fixed Fare:</span>
              <span className="font-bold text-brand-gold-600 text-sm">{estimatedFare} SAR</span>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-col mt-2">
            <button
              onClick={executeBooking}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green-700 py-3 text-xs font-bold text-white transition-colors hover:bg-brand-green-800"
            >
              <CheckCircle2 className="h-4 w-4" />
              {isSubmitting ? 'Confirming Reservation...' : 'Confirm & Generate Booking ID'}
            </button>
            <button
              onClick={handleWhatsApp}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-green-200 bg-white py-3 text-xs font-bold text-brand-green-900 transition-colors hover:bg-brand-green-50"
            >
              <MessageCircle className="h-4 w-4 text-brand-green-700" />
              Confirm & Dispatch on WhatsApp
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal with Live Tracking Link */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md rounded-2xl border-brand-green-100 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
              <CheckCircle2 className="h-8 w-8 text-brand-gold-600" />
            </div>
            <h3 className="font-sans text-xl font-bold text-brand-green-900">
              Reservation Confirmed!
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Your ride is registered in our driver dispatch queue. A confirmation has been saved.
            </p>

            {/* Reference Badge */}
            {confirmedBooking && (
              <div className="my-4 w-full rounded-2xl border border-brand-gold-300 bg-brand-gold-50/50 p-4">
                <span className="text-[0.68rem] font-semibold text-brand-gold-800 uppercase tracking-wider block">
                  Your Booking Reference Code
                </span>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="font-mono text-xl font-black text-brand-green-950">
                    {confirmedBooking.id}
                  </span>
                  <button
                    onClick={handleCopyRef}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-gold-300 bg-white text-brand-gold-700 hover:bg-brand-gold-100"
                    title="Copy Booking ID"
                  >
                    {copiedRef ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {copiedRef && (
                  <span className="text-[0.65rem] text-green-700 font-semibold mt-1 block">
                    Copied to clipboard!
                  </span>
                )}

                {confirmedBooking.driver && (
                  <div className="mt-3 pt-3 border-t border-brand-gold-200/80 text-left text-xs">
                    <span className="text-[0.68rem] text-muted-foreground block">Assigned Chauffeur:</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold text-brand-green-900">{confirmedBooking.driver.name}</span>
                      <span className="text-brand-gold-700 font-semibold">{confirmedBooking.driver.vehicle}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Actions */}
            <div className="w-full space-y-2 pt-2">
              {confirmedBooking && (
                <Link
                  href={`/track-booking?ref=${confirmedBooking.id}`}
                  onClick={() => setShowSuccess(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green-700 py-3 text-xs font-bold text-white transition-colors hover:bg-brand-green-800"
                >
                  <Navigation className="h-4 w-4 text-brand-gold-300" />
                  Track Ride Live Status
                </Link>
              )}

              <a
                href={confirmedBooking ? buildWhatsAppMessage(buildWhatsAppText(confirmedBooking.id)) : WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-green-200 bg-white py-2.5 text-xs font-semibold text-brand-green-800 hover:bg-brand-green-50"
              >
                <MessageCircle className="h-4 w-4 text-brand-green-700" />
                Message Driver on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => {
                  setShowSuccess(false);
                  handleReset();
                }}
                className="text-xs font-semibold text-muted-foreground hover:text-brand-green-900 pt-2 block w-full"
              >
                Book Another Journey
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
