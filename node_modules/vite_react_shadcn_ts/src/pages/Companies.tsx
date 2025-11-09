import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Bus, Phone, MapPin, Clock, Users } from "lucide-react";
import backendApi from "@/lib/api";

// Types for our companies
interface Company {
  id: string;
  name: string;
  logo_url?: string;
  rating: number;
  total_reviews: number;
  description: string;
  routes_count: number;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  features: string[];
  vehicle_types: Array<{
    type: string;
    count: number;
  }>;
}

// Mock data - replace with API call
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Volcano Express",
    rating: 4.5,
    total_reviews: 1250,
    description: "Leading transportation provider in Rwanda, serving major cities with modern buses and professional service.",
    routes_count: 24,
    contact: {
      phone: "+250 788 123 456",
      email: "info@volcanoexpress.rw",
      address: "Nyabugogo Bus Terminal, Kigali"
    },
    features: ["AC", "WiFi", "Refreshments", "Luggage Space"],
    vehicle_types: [
      { type: "Express Bus", count: 15 },
      { type: "Standard Bus", count: 25 }
    ]
  },
  {
    id: "2",
    name: "Rwanda Transport",
    rating: 4.3,
    total_reviews: 980,
    description: "Reliable and comfortable transport service connecting all major destinations in Rwanda.",
    routes_count: 18,
    contact: {
      phone: "+250 788 987 654",
      email: "bookings@rwandatransport.rw",
      address: "Downtown Kigali, KN 5 Rd"
    },
    features: ["AC", "WiFi", "Entertainment", "Snacks"],
    vehicle_types: [
      { type: "VIP Bus", count: 8 },
      { type: "Standard Bus", count: 20 }
    ]
  }
];

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await backendApi.companies.list();
        // setCompanies(response.data);
        setCompanies(mockCompanies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-muted-foreground">
          ({companies[0].total_reviews.toLocaleString()} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Transport Companies</h1>
            <p className="text-muted-foreground">
              Discover our trusted transport partners providing safe and comfortable travel across Rwanda.
            </p>
          </div>

          {/* Companies List */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading companies...</p>
              </div>
            ) : companies.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No companies found.</p>
                </CardContent>
              </Card>
            ) : (
              companies.map((company) => (
                <Card key={company.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Company Info */}
                      <div className="lg:col-span-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {company.logo_url ? (
                              <img
                                src={company.logo_url}
                                alt={company.name}
                                className="w-12 h-12 object-contain"
                              />
                            ) : (
                              <Bus className="w-8 h-8 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                            {renderRatingStars(company.rating)}
                            <p className="text-sm text-muted-foreground mt-2">
                              {company.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats & Features */}
                      <div className="lg:col-span-4">
                        <div className="space-y-4">
                          {/* Contact Info */}
                          <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{company.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{company.contact.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{company.routes_count} active routes</span>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2">
                            {company.features.map((feature, idx) => (
                              <Badge key={idx} variant="secondary">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Vehicles & Action */}
                      <div className="lg:col-span-4">
                        <div className="space-y-4">
                          {/* Vehicle Types */}
                          <div className="space-y-2">
                            {company.vehicle_types.map((vehicle, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <Bus className="w-4 h-4 text-muted-foreground" />
                                  <span>{vehicle.type}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4 text-muted-foreground" />
                                  <span>{vehicle.count} vehicles</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <Link to={`/companies/${company.id}`}>
                              <Button className="w-full" variant="outline">
                                View Details
                              </Button>
                            </Link>
                            <Link to={`/search?company=${company.id}`}>
                              <Button className="w-full">
                                Browse Routes
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Companies;