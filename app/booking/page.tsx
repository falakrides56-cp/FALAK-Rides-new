import PublicLayout from '@/components/shared/PublicLayout';
import BookingForm from '@/components/shared/BookingForm';
import SectionHeading from '@/components/shared/SectionHeading';

export default function BookingPage() {
  return (
    <PublicLayout>
      {/* Page header */}
      <section className="relative h-[32vh] min-h-[220px] overflow-hidden bg-brand-green-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-brand-gold-400" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-brand-gold-400" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-300">Reserve Your Ride</span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">Book Now</h1>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            Fill in your trip details and confirm instantly via WhatsApp
          </p>
        </div>
      </section>

      {/* Booking form */}
      <section className="section-padding bg-gradient-to-b from-brand-green-50/30 to-white">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Booking Form"
            title="Plan Your"
            highlight="Trip"
            description="Complete the form below — our team will confirm your booking right away"
          />
          <div className="mt-10">
            <BookingForm />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
