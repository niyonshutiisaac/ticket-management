import { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MapPin,
  Bus,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Clock,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Route {
  id: string;
  from: string;
  to: string;
  companies: Array<{
    id: string;
    name: string;
    logo?: string;
  }>;
  duration: string;
  distance: string;
  price: {
    min: number;
    max: number;
  };
  frequency: string;
  schedules: Array<{
    departureTime: string;
    arrivalTime: string;
  }>;
}

// Mock data - replace with API call
const mockRoutes: Route[] = [
  {
    id: "1",
    from: "Kigali",
    to: "Huye",
    companies: [
      { id: "1", name: "Volcano Express" },
      { id: "2", name: "Ritco Express" }
    ],
    duration: "2h 30m",
    distance: "130 km",
    price: {
      min: 3000,
      max: 5000
    },
    frequency: "Every 30 minutes",
    schedules: [
      { departureTime: "06:00", arrivalTime: "08:30" },
      { departureTime: "07:00", arrivalTime: "09:30" },
      { departureTime: "08:00", arrivalTime: "10:30" }
    ]
  },
  {
    id: "2",
    from: "Kigali",
    to: "Musanze",
    companies: [
      { id: "1", name: "Volcano Express" },
      { id: "3", name: "Virunga Express" }
    ],
    duration: "2h",
    distance: "100 km",
    price: {
      min: 2500,
      max: 4000
    },
    frequency: "Every hour",
    schedules: [
      { departureTime: "07:00", arrivalTime: "09:00" },
      { departureTime: "09:00", arrivalTime: "11:00" },
      { departureTime: "11:00", arrivalTime: "13:00" }
    ]
  },
  {
    id: "3",
    from: "Kigali",
    to: "Rubavu",
    companies: [
      { id: "1", name: "Volcano Express" },
      { id: "2", name: "Ritco Express" },
      { id: "3", name: "Virunga Express" }
    ],
    duration: "3h",
    distance: "150 km",
    price: {
      min: 4000,
      max: 6000
    },
    frequency: "Every 2 hours",
    schedules: [
      { departureTime: "06:30", arrivalTime: "09:30" },
      { departureTime: "08:30", arrivalTime: "11:30" },
      { departureTime: "10:30", arrivalTime: "13:30" }
    ]
  }
];

const popularCities = [
  "Kigali", "Huye", "Musanze", "Rubavu", "Nyagatare", "Muhanga", "Rusizi", "Nyanza"
];

const RoutesPage = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    company: "",
    sortBy: "popular" // popular, duration, price
  });

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await api.routes.getAll();
        // setRoutes(response.data);
        setRoutes(mockRoutes);
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const filteredRoutes = routes.filter(route => {
    const fromMatch = filters.from ? 
      route.from.toLowerCase().includes(filters.from.toLowerCase()) : true;
    const toMatch = filters.to ? 
      route.to.toLowerCase().includes(filters.to.toLowerCase()) : true;
    const companyMatch = filters.company ? 
      route.companies.some(c => c.name.toLowerCase().includes(filters.company.toLowerCase())) : true;
    
    return fromMatch && toMatch && companyMatch;
  });

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    switch (filters.sortBy) {
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      case "price":
        return a.price.min - b.price.min;
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-8">All Routes</h1>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <Input
                    placeholder="Departure city"
                    value={filters.from}
                    onChange={(e) => setFilters(f => ({ ...f, from: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <Input
                    placeholder="Destination city"
                    value={filters.to}
                    onChange={(e) => setFilters(f => ({ ...f, to: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <Input
                    placeholder="Transport company"
                    value={filters.company}
                    onChange={(e) => setFilters(f => ({ ...f, company: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters(f => ({ ...f, sortBy: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Cities */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Popular Cities</h2>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters(f => ({ ...f, from: city }))}
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {city}
                </Button>
              ))}
            </div>
          </div>

          {/* Routes List */}
          {loading ? (
            <p className="text-center py-8">Loading routes...</p>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Available Routes</h2>
                <p className="text-sm text-muted-foreground">
                  {sortedRoutes.length} routes found
                </p>
              </div>

              <div className="grid gap-4">
                {sortedRoutes.map((route) => (
                  <Card key={route.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6 justify-between">
                        {/* Route Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-primary" />
                              <span className="font-medium">{route.from}</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground" />
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-primary" />
                              <span className="font-medium">{route.to}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{route.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bus className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{route.distance}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{route.frequency}</span>
                            </div>
                            <div className="text-sm font-medium text-primary">
                              {route.price.min.toLocaleString()} - {route.price.max.toLocaleString()} RWF
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {route.companies.map((company) => (
                              <Link 
                                key={company.id}
                                to={`/companies/${company.id}`}
                                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                              >
                                <Bus className="w-4 h-4" />
                                {company.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Schedules */}
                        <div className="md:w-64 flex flex-col justify-between">
                          <div className="space-y-2">
                            {route.schedules.slice(0, 3).map((schedule, idx) => (
                              <div key={idx} className="text-sm flex justify-between p-2 bg-muted/50 rounded">
                                <span>{schedule.departureTime}</span>
                                <ArrowRight className="w-4 h-4" />
                                <span>{schedule.arrivalTime}</span>
                              </div>
                            ))}
                          </div>
                          <Link 
                            to={`/search?from=${route.from}&to=${route.to}`}
                            className="w-full"
                          >
                            <Button className="w-full mt-4">
                              View Schedule
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoutesPage;