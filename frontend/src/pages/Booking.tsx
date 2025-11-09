import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, User, Phone } from "lucide-react";


const Booking = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  // remove seat selection: users will book without choosing specific seats
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultPassengers = parseInt(params.get('passengers') || '1', 10) || 1;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // kept for backward-compat but unused
  const [passengerCount, setPassengerCount] = useState<number>(defaultPassengers);
  const [passengerInfo, setPassengerInfo] = useState({
    name: "",
    phone: "",
  });

  const pricePerSeat = 3500;
  const totalPrice = passengerCount * pricePerSeat;

  const handleProceedToPayment = () => {
    if (passengerInfo.name.trim().length === 0 || passengerInfo.phone.trim().length === 0) {
      toast.error("Please fill in passenger information");
      return;
    }
    
    // TODO: Create booking via API
    // api.post(endpoints.bookings.create, { tripId, seats: selectedSeats, ...passengerInfo })
    
    // send booking data (without specific seats)
    navigate(`/payment/${tripId}`, { 
      state: { passengerCount, passengerInfo, totalPrice } 
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form (no seat selection) */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Seats will be assigned by the operator. Provide passenger details and number of passengers to continue.</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="passenger-count">Passengers</Label>
                      <Input
                        id="passenger-count"
                        type="number"
                        min={1}
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(Math.max(1, parseInt(e.target.value || '1', 10)))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passenger-name">Primary Passenger Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="passenger-name"
                          placeholder="Full name"
                          className="pl-10"
                          value={passengerInfo.name}
                          onChange={(e) => setPassengerInfo({ ...passengerInfo, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passenger-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="passenger-phone"
                          placeholder="+250 XXX XXX XXX"
                          className="pl-10"
                          value={passengerInfo.phone}
                          onChange={(e) => setPassengerInfo({ ...passengerInfo, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Passenger Summary */}
                  <div className="mb-4">
                    <Label>Passengers</Label>
                    <div className="mt-2">
                      <p className="text-sm">{passengerCount} {passengerCount === 1 ? 'passenger' : 'passengers'}</p>
                    </div>
                  </div>

                  {/* Primary Passenger */}
                  <div className="space-y-4">
                    <div>
                      <Label>Primary Passenger</Label>
                      <p className="text-sm mt-2">{passengerInfo.name || '—'}</p>
                      <p className="text-sm text-muted-foreground">{passengerInfo.phone || '—'}</p>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price per seat</span>
                      <span className="font-medium">{pricePerSeat.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{totalPrice.toLocaleString()} RWF</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleProceedToPayment}
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;

