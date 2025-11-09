import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { SearchForm } from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, CreditCard, HeadphonesIcon, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const popularRoutes = [
    { from: "Kigali", to: "Huye", price: "3,500" },
    { from: "Kigali", to: "Rubavu", price: "4,500" },
    { from: "Kigali", to: "Muhanga", price: "2,000" },
    { from: "Huye", to: "Rusizi", price: "3,000" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Book with confidence. All transport companies are verified and licensed.",
    },
    {
      icon: Clock,
      title: "Real-Time Booking",
      description: "Instant confirmation and live seat availability updates.",
    },
    {
      icon: CreditCard,
      title: "Easy Payment",
      description: "Pay with MTN Mobile Money, Airtel Money, or card.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Our customer support team is always here to help you.",
    },
    {
      icon: Phone,
      title: "USSD Ticketing",
      description: "Buy tickets via USSD — dial our short code from any mobile to purchase without internet.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient text-primary-foreground py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Travel Across Rwanda
                <span className="block mt-2">With Confidence</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Book bus tickets online with ease. Compare prices, select your seat, and travel comfortably across Rwanda.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <SearchForm />
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Routes</h2>
              <p className="text-muted-foreground">Quick access to frequently traveled destinations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularRoutes.map((route, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">{route.from}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-semibold text-lg">{route.to}</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {route.price} <span className="text-sm font-normal">RWF</span>
                      </div>
                      <Link to={`/search?origin=${route.from}&destination=${route.to}`}>
                        <Button variant="outline" className="w-full" size="sm">
                          View Trips
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RwandaTravel?</h2>
              <p className="text-muted-foreground">Your trusted partner for bus travel across Rwanda</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who trust RwandaTravel for their bus booking needs
            </p>
            <Link to="/auth/register">
              <Button size="lg" variant="secondary" className="px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
