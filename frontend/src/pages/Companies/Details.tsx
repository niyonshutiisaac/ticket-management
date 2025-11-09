import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Bus, 
  Phone, 
  Mail,
  MapPin, 
  Clock, 
  Users,
  Shield,
  Calendar,
  ThumbsUp
} from "lucide-react";
import backendApi from "@/lib/api";

interface CompanyDetails {
  id: string;
  name: string;
  logo_url?: string;
  rating: number;
  total_reviews: number;
  description: string;
  long_description: string;
  founded_year: number;
  routes_count: number;
  contact: {
    phone: string;
    email: string;
    address: string;
    website?: string;
  };
  features: string[];
  vehicle_types: Array<{
    type: string;
    count: number;
    features: string[];
  }>;
  popular_routes: Array<{
    id: string;
    from: string;
    to: string;
    price: number;
    duration: string;
  }>;
  safety_measures: string[];
  certifications: string[];
}

// Mock data - replace with API call
const mockCompanyDetails: CompanyDetails = {
  id: "1",
  name: "Volcano Express",
  rating: 4.5,
  total_reviews: 1250,
  description: "Leading transportation provider in Rwanda, serving major cities with modern buses and professional service.",
  long_description: "Established in 2010, Volcano Express has grown to become one of Rwanda's most trusted transport companies. We prioritize safety, comfort, and reliability in all our services. Our modern fleet and professional staff ensure a pleasant journey across Rwanda's beautiful landscapes.",
  founded_year: 2010,
  routes_count: 24,
  contact: {
    phone: "+250 788 123 456",
    email: "info@volcanoexpress.rw",
    address: "Nyabugogo Bus Terminal, Kigali",
    website: "www.volcanoexpress.rw"
  },
  features: ["AC", "WiFi", "Refreshments", "Luggage Space", "Online Booking", "24/7 Support"],
  vehicle_types: [
    { 
      type: "VIP Bus",
      count: 8,
      features: ["Reclining Seats", "USB Charging", "Entertainment System", "Extra Legroom"]
    },
    { 
      type: "Express Bus",
      count: 15,
      features: ["Standard Comfort", "Air Conditioning", "WiFi"]
    }
  ],
  popular_routes: [
    {
      id: "r1",
      from: "Kigali",
      to: "Huye",
      price: 3500,
      duration: "2h 30m"
    },
    {
      id: "r2",
      from: "Kigali",
      to: "Rubavu",
      price: 4500,
      duration: "3h"
    }
  ],
  safety_measures: [
    "Regular Vehicle Maintenance",
    "Professional Driver Training",
    "GPS Tracking",
    "24/7 Road Assistance",
    "Safety Equipment"
  ],
  certifications: [
    "RURA Licensed",
    "ISO 9001:2015",
    "Safety Excellence Award 2024"
  ]
};

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await backendApi.companies.details(companyId);
        // setCompany(response.data);
        setCompany(mockCompanyDetails);
      } catch (error) {
        console.error("Failed to fetch company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto">
            <p className="text-center">Loading company details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto">
            <p className="text-center">Company not found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Company Header */}
          <div className="mb-8">
            <Link to="/companies" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
              ← Back to Companies
            </Link>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo & Basic Info */}
                  <div className="md:w-1/3">
                    <div className="w-24 h-24 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      {company.logo_url ? (
                        <img
                          src={company.logo_url}
                          alt={company.name}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <Bus className="w-12 h-12 text-primary" />
                      )}
                    </div>
                    <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{company.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">
                        ({company.total_reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                    <p className="text-muted-foreground">{company.description}</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span>Founded in {company.founded_year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bus className="w-5 h-5 text-muted-foreground" />
                        <span>{company.routes_count} Active Routes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-muted-foreground" />
                        <span>{company.certifications.length} Certifications</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <span>{company.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span>{company.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <span>{company.contact.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="routes" className="space-y-4">
            <TabsList>
              <TabsTrigger value="routes">Popular Routes</TabsTrigger>
              <TabsTrigger value="fleet">Our Fleet</TabsTrigger>
              <TabsTrigger value="safety">Safety & Quality</TabsTrigger>
            </TabsList>

            <TabsContent value="routes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Routes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {company.popular_routes.map((route) => (
                      <Card key={route.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-4">
                            <div className="space-y-1">
                              <div className="font-medium">{route.from} → {route.to}</div>
                              <div className="text-sm text-muted-foreground">{route.duration}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-primary">
                                {route.price.toLocaleString()} <span className="text-sm font-normal">RWF</span>
                              </div>
                            </div>
                          </div>
                          <Link to={`/search?company=${company.id}&from=${route.from}&to=${route.to}`}>
                            <Button className="w-full" variant="outline">View Schedule</Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fleet" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Our Fleet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {company.vehicle_types.map((vehicle, idx) => (
                      <Card key={idx}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Bus className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{vehicle.type}</h3>
                              <p className="text-sm text-muted-foreground">
                                {vehicle.count} vehicles available
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {vehicle.features.map((feature, fidx) => (
                              <Badge key={fidx} variant="secondary">{feature}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="safety" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Measures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">Safety Standards</h3>
                      <ul className="space-y-3">
                        {company.safety_measures.map((measure, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <span>{measure}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Certifications</h3>
                      <ul className="space-y-3">
                        {company.certifications.map((cert, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-primary" />
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDetails;