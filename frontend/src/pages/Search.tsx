import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Bus as BusIcon } from "lucide-react";

// Mock data - will be replaced with API calls
const mockTrips = [
  {
    id: "1",
    company: { name: "Volcano Express", logo_url: "", rating: 4.5 },
    route: { origin_city: "Kigali", destination_city: "Huye", distance_km: 136 },
    departure_time: "2024-01-20T08:00:00",
    arrival_time: "2024-01-20T10:30:00",
    current_price: 3500,
    available_seats: 12,
    vehicle: { vehicle_type: "bus", amenities: ["AC", "WiFi"] },
  },
  {
    id: "2",
    company: { name: "Rwanda Tours", logo_url: "", rating: 4.8 },
    route: { origin_city: "Kigali", destination_city: "Huye", distance_km: 136 },
    departure_time: "2024-01-20T10:00:00",
    arrival_time: "2024-01-20T12:30:00",
    current_price: 4000,
    available_seats: 8,
    vehicle: { vehicle_type: "express", amenities: ["AC", "WiFi", "Entertainment"] },
  },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const [trips, setTrips] = useState(mockTrips);
  const [loading, setLoading] = useState(true);

  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";
  const passengers = searchParams.get("passengers") || "1";

  useEffect(() => {
    // TODO: Replace with actual API call
    // api.get(endpoints.routes.search + `?origin=${origin}&destination=${destination}&date=${date}&passengers=${passengers}`)
    //   .then(data => setTrips(data))
    //   .finally(() => setLoading(false));
    
    setTimeout(() => setLoading(false), 500);
  }, [origin, destination, date, passengers]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const calculateDuration = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Search Summary */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Available Trips</h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{origin} → {destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{passengers} {parseInt(passengers) === 1 ? 'passenger' : 'passengers'}</span>
              </div>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Searching for available trips...</p>
            </div>
          ) : trips.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                No trips found for your search criteria
              </p>
              <Link to="/">
                <Button>Try Different Search</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {trips.map((trip) => (
                <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      {/* Company Info */}
                      <div className="lg:col-span-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <BusIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{trip.company.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <span>★ {trip.company.rating}</span>
                              <Badge variant="outline" className="ml-2 capitalize">
                                {trip.vehicle.vehicle_type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Time & Route */}
                      <div className="lg:col-span-5">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{formatTime(trip.departure_time)}</p>
                            <p className="text-sm text-muted-foreground">{trip.route.origin_city}</p>
                          </div>
                          
                          <div className="flex-1 px-4">
                            <div className="border-t-2 border-dashed relative">
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-2">
                                <p className="text-xs text-muted-foreground whitespace-nowrap">
                                  {calculateDuration(trip.departure_time, trip.arrival_time)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <p className="text-2xl font-bold">{formatTime(trip.arrival_time)}</p>
                            <p className="text-sm text-muted-foreground">{trip.route.destination_city}</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex gap-2 mt-4 flex-wrap">
                          {trip.vehicle.amenities.map((amenity, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="lg:col-span-4 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">
                            {trip.current_price.toLocaleString()} <span className="text-sm font-normal">RWF</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {trip.available_seats} seats left
                          </p>
                        </div>
                        <Link to={`/booking/${trip.id}`} className="w-full lg:w-auto">
                          <Button className="w-full lg:w-auto px-8">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
