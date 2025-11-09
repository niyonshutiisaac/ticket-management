import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, QrCode } from "lucide-react";

// Mock data
const mockBookings = [
  {
    id: "1",
    booking_reference: "TKT123456",
    trip: {
      route: { origin_city: "Kigali", destination_city: "Huye" },
      departure_time: "2024-01-25T08:00:00",
    },
    seats: [{ seat: { seat_number: "1A" } }, { seat: { seat_number: "1B" } }],
    total_amount: 7000,
    booking_status: "confirmed",
    payment_status: "paid",
    created_at: "2024-01-15T10:00:00",
  },
  {
    id: "2",
    booking_reference: "TKT789012",
    trip: {
      route: { origin_city: "Kigali", destination_city: "Rubavu" },
      departure_time: "2024-01-20T10:00:00",
    },
    seats: [{ seat: { seat_number: "3C" } }],
    total_amount: 4500,
    booking_status: "completed",
    payment_status: "paid",
    created_at: "2024-01-10T14:30:00",
  },
];

const MyBookings = () => {
  const [bookings] = useState(mockBookings);

  const upcomingBookings = bookings.filter(b => 
    b.booking_status === 'confirmed' && new Date(b.trip.departure_time) > new Date()
  );
  
  const pastBookings = bookings.filter(b => 
    b.booking_status === 'completed' || new Date(b.trip.departure_time) < new Date()
  );

  const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={booking.booking_status === 'confirmed' ? 'default' : 'secondary'}>
                {booking.booking_status.toUpperCase()}
              </Badge>
              <span className="text-lg font-bold text-primary">{booking.booking_reference}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {booking.trip.route.origin_city} → {booking.trip.route.destination_city}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(booking.trip.departure_time).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(booking.trip.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Seats:</span>
              {booking.seats.map((s, idx) => (
                <Badge key={idx} variant="outline">{s.seat.seat_number}</Badge>
              ))}
            </div>

            <div className="text-lg font-bold">
              {booking.total_amount.toLocaleString()} <span className="text-sm font-normal">RWF</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link to={`/booking/confirmation/${booking.id}`}>
              <Button variant="outline" className="w-full md:w-auto">
                <QrCode className="h-4 w-4 mr-2" />
                View Ticket
              </Button>
            </Link>
            {booking.booking_status === 'confirmed' && (
              <Button variant="destructive" size="sm" className="w-full md:w-auto">
                Cancel Booking
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6 space-y-4">
              {upcomingBookings.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No upcoming bookings</p>
                  <Link to="/">
                    <Button>Book a Trip</Button>
                  </Link>
                </Card>
              ) : (
                upcomingBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6 space-y-4">
              {pastBookings.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No past bookings</p>
                </Card>
              ) : (
                pastBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
