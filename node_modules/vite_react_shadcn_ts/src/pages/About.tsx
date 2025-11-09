import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Award, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "We partner only with verified and licensed transport companies to ensure your safety.",
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We're here to make travel booking simple and reliable.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Committed to providing excellent service and support throughout your journey.",
    },
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description: "Connecting all major cities and towns across Rwanda with convenient travel options.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient text-primary-foreground py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About RwandaTravel</h1>
            <p className="text-lg md:text-xl opacity-90">
              Rwanda's leading online platform for bus ticket booking and travel management
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-muted-foreground text-center leading-relaxed">
                  To revolutionize bus travel in Rwanda by providing a seamless, secure, and efficient 
                  online booking platform that connects passengers with reliable transport services 
                  across the country. We believe everyone deserves access to safe, comfortable, 
                  and affordable travel options.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-primary/10">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                RwandaTravel was founded with a simple vision: to make bus travel booking 
                accessible, transparent, and convenient for everyone in Rwanda. We recognized 
                the challenges passengers faced when trying to book tickets – long queues, 
                uncertainty about seat availability, and limited payment options.
              </p>
              <p>
                Our platform brings together trusted transport companies and provides passengers 
                with real-time information, secure payment options including mobile money, and 
                the convenience of booking from anywhere, anytime.
              </p>
              <p>
                Today, we're proud to serve thousands of travelers across Rwanda, connecting 
                cities and communities while supporting local transport businesses. We continue 
                to innovate and improve our services to make travel better for everyone.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
