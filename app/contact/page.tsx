'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Map,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/components/shared/PublicLayout';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { BRAND, WHATSAPP_LINK } from '@/lib/constants';
import { submitContactInquiry, ContactInquiry } from '@/lib/mock-service';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryResult, setInquiryResult] = useState<ContactInquiry | null>(null);

  const contactItems = [
    { icon: Phone, label: '24/7 Hotline', value: BRAND.phone, href: `tel:${BRAND.phone}` },
    { icon: MessageCircle, label: 'Official WhatsApp', value: BRAND.phone, href: WHATSAPP_LINK },
    { icon: Mail, label: 'Dispatch Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: MapPin, label: 'HQ Address', value: BRAND.address },
    { icon: Clock, label: 'Operational Hours', value: '24 Hours / 7 Days a Week' },
  ];

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your contact phone or WhatsApp';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please type your question or request';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const created = await submitContactInquiry({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Inquiry',
        message: formData.message.trim(),
      });

      setInquiryResult(created);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      {/* Page header */}
      <section className="relative h-[32vh] min-h-[220px] overflow-hidden bg-brand-green-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-brand-gold-400" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-brand-gold-400" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">Get in Touch</span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">Contact Us</h1>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            We are available 24/7 across Jeddah, Makkah, and Madinah for bookings and special requirements
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="section-padding bg-white">
        <div className="container-brand grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Contact Information"
                title="Reach"
                highlight="Out to Us"
                center={false}
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Whether you have a question about airport arrivals, luggage space for large families,
                or custom multi-city Umrah itineraries, our Saudi chauffeur operations team is standing by.
              </p>

              <div className="mt-6 space-y-3">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-xl border border-brand-green-100/70 bg-white p-4 transition-colors hover:border-brand-gold-400"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green-50">
                      <item.icon className="h-5 w-5 text-brand-gold-600" />
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-wider text-brand-gold-700">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold text-brand-green-800 hover:text-brand-gold-600">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-brand-green-800">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Saudi Operations Center Card */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-brand-green-100 bg-brand-green-50/50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-700 text-brand-gold-300">
                    <Map className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-brand-green-900">
                      King Abdulaziz Airport & Haramain Dispatch Centers
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Chauffeur dispatch terminals operating 24 hours daily at Jeddah Airport Terminal 1, Makkah Clock Tower zone, and Madinah Markaziyah.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={150}>
            <div className="rounded-2xl border border-brand-green-100 bg-white p-6 md:p-8">
              <h3 className="font-sans text-xl font-bold text-brand-green-900">Send an Inquiry</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Submit your message below. We typically respond within 15 minutes.
              </p>

              {inquiryResult ? (
                <div className="mt-6 rounded-2xl border border-brand-green-200 bg-brand-green-50/60 p-5 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                    <CheckCircle2 className="h-6 w-6 text-brand-gold-600" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-brand-green-900">
                    Message Received Successfully!
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your inquiry has been logged under ticket reference:
                  </p>
                  <span className="mt-2 inline-block font-mono text-sm font-bold text-brand-green-800 bg-white border border-brand-green-200 px-3 py-1 rounded-lg">
                    {inquiryResult.id}
                  </span>
                  <p className="mt-3 text-[0.75rem] text-brand-green-800 font-medium">
                    A representative will contact you shortly at {inquiryResult.phone} or {inquiryResult.email}.
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-green-700 px-4 py-2 text-xs font-bold text-white hover:bg-brand-green-800"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Chat Instantly on WhatsApp
                    </a>
                    <button
                      onClick={() => setInquiryResult(null)}
                      className="rounded-xl border border-brand-green-200 bg-white px-4 py-2 text-xs font-semibold text-brand-green-800 hover:bg-brand-green-50"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-brand-green-800">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="e.g. Tariq Mansour"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className={cn('border-brand-green-100', errors.fullName && 'border-red-400')}
                      />
                      {errors.fullName && (
                        <p className="text-[0.68rem] text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-brand-green-800">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="tel"
                        placeholder="+966 5X XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={cn('border-brand-green-100', errors.phone && 'border-red-400')}
                      />
                      {errors.phone && (
                        <p className="text-[0.68rem] text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-brand-green-800">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={cn('border-brand-green-100', errors.email && 'border-red-400')}
                    />
                    {errors.email && (
                      <p className="text-[0.68rem] text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-brand-green-800">
                      Subject / Topic
                    </Label>
                    <Input
                      placeholder="e.g. Group transfer quote / Jeddah Airport pickup question"
                      value={formData.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      className="border-brand-green-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-brand-green-800">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      placeholder="Please let us know your dates, passenger numbers, flight details, or specific needs..."
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className={cn(
                        'min-h-[110px] resize-none border-brand-green-100',
                        errors.message && 'border-red-400'
                      )}
                    />
                    {errors.message && (
                      <p className="text-[0.68rem] text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green-700 py-3 text-xs font-bold text-white transition-colors hover:bg-brand-green-800 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Submitting Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  );
}
