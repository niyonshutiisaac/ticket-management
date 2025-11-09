import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Mail, Smartphone } from "lucide-react";

const BookingConfirmation = () => {
  const { bookingId } = useParams();

  // TODO: Fetch actual booking details from API
  const bookingDetails = {
    reference: bookingId || "MOCK123",
    passenger: "John Doe",
    phone: "+250 788 123 456",
    route: "Kigali → Huye",
    departure: "Jan 20, 2024 at 8:00 AM",
    seats: ["1A", "1B"],
    total: 7000,
    qr_code_url: "/placeholder.svg",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-success/10 mb-4">
              <CheckCircle2 className="h-16 w-16 text-success" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Your tickets have been successfully booked
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="grid gap-6">
                {/* Booking Reference */}
                <div className="text-center pb-6 border-b">
                  <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                  <p className="text-3xl font-bold text-primary">{bookingDetails.reference}</p>
                </div>

                {/* Trip Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Passenger</p>
                    <p className="font-semibold">{bookingDetails.passenger}</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Route</p>
                    <p className="font-semibold">{bookingDetails.route}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Departure</p>
                    <p className="font-semibold">{bookingDetails.departure}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Seats</p>
                    <p className="font-semibold">{bookingDetails.seats.join(', ')}</p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="text-center py-6 border-t">
                  <p className="text-sm text-muted-foreground mb-4">Your Ticket QR Code</p>
                  <div className="inline-block p-4 bg-white rounded-lg shadow-inner">
                    <img 
                      src={bookingDetails.qr_code_url} 
                      alt="Booking QR Code" 
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
                    Show this QR code to the driver when boarding. Also sent to your email and phone.
                  </p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-6 border-t">
                  <span className="text-lg font-semibold">Total Paid</span>
                  <span className="text-2xl font-bold text-primary">
                    {bookingDetails.total.toLocaleString()} RWF
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Email Ticket
            </Button>
            <Button variant="outline" className="w-full">
              <Smartphone className="h-4 w-4 mr-2" />
              SMS Ticket
            </Button>
          </div>

          {/* Next Steps */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">What's Next?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>A confirmation SMS has been sent to your phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Arrive at the departure point at least 15 minutes before departure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Show your QR code to the driver when boarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>You can cancel your booking up to 24 hours before departure</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link to="/profile/bookings">
              <Button variant="outline" size="lg">
                View My Bookings
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg">
                Book Another Trip
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
