import PublicLayout from '@/components/shared/PublicLayout';
import Hero from '@/components/sections/Hero';
import ServicesIconsRow from '@/components/sections/ServicesIconsRow';
import FareCalculator from '@/components/sections/FareCalculator';
import HowItWorks from '@/components/sections/HowItWorks';
import PopularRoutes from '@/components/sections/PopularRoutes';
import FleetPreview from '@/components/sections/FleetPreview';
import ZiyaratGuide from '@/components/sections/ZiyaratGuide';
import PilgrimPerks from '@/components/sections/PilgrimPerks';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import VideoSection from '@/components/sections/VideoSection';
import TestimonialsPreview from '@/components/sections/TestimonialsPreview';
import StatsSection from '@/components/sections/StatsSection';
import FAQSection from '@/components/sections/FAQSection';
import BookingForm from '@/components/shared/BookingForm';
import SectionHeading from '@/components/shared/SectionHeading';

export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <ServicesIconsRow />
      <FareCalculator />
      <HowItWorks />
      <PopularRoutes />
      <FleetPreview />
      <ZiyaratGuide />
      <PilgrimPerks />
      <WhyChooseUs />

      {/* Main Interactive Booking Section */}
      <section id="book" className="section-padding bg-gradient-to-b from-brand-green-50/40 via-white to-brand-green-50/30">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Direct Online Reservation"
            title="Book Your Private"
            highlight="Chauffeur Ride"
            description="Complete the form below to lock in guaranteed fixed pricing and receive your driver details on WhatsApp."
          />
          <div className="mt-12">
            <BookingForm />
          </div>
        </div>
      </section>

      <VideoSection />
      <TestimonialsPreview />
      <StatsSection />
      <FAQSection />
    </PublicLayout>
  );
}
