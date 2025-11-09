import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CreditCard, Smartphone, ArrowLeft } from "lucide-react";

const Payment = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, passengerInfo, totalPrice } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'card'>('mobile_money');
  const [provider, setProvider] = useState<'mtn' | 'airtel'>('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (paymentMethod === 'mobile_money' && !phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    setProcessing(true);

    try {
      // TODO: Integrate with actual payment API
      // const response = await api.post(endpoints.payments.initiate, {
      //   booking_id: bookingId,
      //   amount: totalPrice,
      //   payment_method: paymentMethod,
      //   provider: provider,
      //   phone_number: phoneNumber,
      // });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Payment initiated! Check your phone for confirmation.");
      
      // Navigate to confirmation page
      navigate('/booking/confirmation/MOCK123');
      
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (!selectedSeats || !passengerInfo) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="p-6">
            <p className="text-center mb-4">Invalid booking session</p>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Method Selection */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                    {/* Mobile Money */}
                    <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="mobile_money" id="mobile_money" />
                      <div className="flex-1">
                        <Label htmlFor="mobile_money" className="flex items-center gap-2 cursor-pointer">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Mobile Money</span>
                        </Label>
                        
                        {paymentMethod === 'mobile_money' && (
                          <div className="mt-4 space-y-4">
                            <RadioGroup value={provider} onValueChange={(value: any) => setProvider(value)}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mtn" id="mtn" />
                                <Label htmlFor="mtn" className="cursor-pointer">MTN Mobile Money</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="airtel" id="airtel" />
                                <Label htmlFor="airtel" className="cursor-pointer">Airtel Money</Label>
                              </div>
                            </RadioGroup>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                placeholder="+250 XXX XXX XXX"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">
                                You will receive a USSD prompt to authorize the payment
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Payment */}
                    <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Credit/Debit Card</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Passenger</p>
                    <p className="font-medium">{passengerInfo.name}</p>
                    <p className="text-sm text-muted-foreground">{passengerInfo.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Seats</p>
                    <p className="font-medium">{selectedSeats.join(', ')}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total Amount</span>
                      <span className="text-primary">{totalPrice.toLocaleString()} RWF</span>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handlePayment}
                      disabled={processing}
                    >
                      {processing ? 'Processing...' : 'Complete Payment'}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By completing this payment, you agree to our terms and conditions
                  </p>
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

export default Payment;
