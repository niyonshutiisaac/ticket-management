import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Last updated: November 9, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Rwanda Connect Ride's website and services, you accept 
                and agree to be bound by these Terms and Conditions. If you do not agree to 
                these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="mb-4">
                Rwanda Connect Ride provides an online platform for booking bus tickets and 
                related transportation services in Rwanda. We act as an intermediary between 
                passengers and transport companies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Use the service for lawful purposes only</li>
                <li>Not interfere with the platform's operation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Booking and Payments</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>All bookings are subject to availability</li>
                <li>Prices are in Rwandan Francs (RWF) and include applicable taxes</li>
                <li>Payment must be made at the time of booking</li>
                <li>We accept various payment methods including mobile money and cards</li>
                <li>Booking confirmations will be sent via email and SMS</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cancellation Policy</h2>
              <p className="mb-4">
                Cancellation policies vary by transport company. Generally:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Cancellations made 24 hours before departure may be eligible for refund</li>
                <li>Cancellation fees may apply</li>
                <li>No refunds for no-shows</li>
                <li>Force majeure situations will be handled case by case</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                Rwanda Connect Ride is not liable for:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Service delays or cancellations by transport companies</li>
                <li>Loss or damage of personal belongings during travel</li>
                <li>Indirect or consequential losses</li>
                <li>Technical issues beyond our control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be 
                effective immediately upon posting on our website. Your continued use of 
                our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
              <p className="mb-4">
                For questions about these terms, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p>Email: support@rwandaconnectride.com</p>
                <p>Phone: +250 788 123 456</p>
                <p>Address: Kigali, Rwanda</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;