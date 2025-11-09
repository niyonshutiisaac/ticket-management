import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Last updated: November 9, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                Rwanda Connect Ride ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and share information about you 
                when you use our website and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <h3 className="text-xl font-medium mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Name and contact information</li>
                <li>Account login credentials</li>
                <li>Payment information</li>
                <li>Travel preferences and history</li>
                <li>Device and location information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Process your bookings and payments</li>
                <li>Provide customer support</li>
                <li>Send booking confirmations and updates</li>
                <li>Improve our services</li>
                <li>Ensure platform security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
              <p className="mb-4">
                We share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Transport companies to fulfill your bookings</li>
                <li>Payment processors for transactions</li>
                <li>Service providers who assist our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information 
                from unauthorized access, alteration, or disclosure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our practices, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p>Email: privacy@rwandaconnectride.com</p>
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

export default PrivacyPolicy;