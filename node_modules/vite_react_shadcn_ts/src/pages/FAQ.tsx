import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Booking & Reservations",
      questions: [
        {
          q: "How do I book a ticket?",
          a: "You can book a ticket through our website by selecting your departure and destination cities, choosing your preferred date and time, and following the booking process. You can also book via our USSD code or through our partner transport companies."
        },
        {
          q: "Can I book tickets for multiple passengers?",
          a: "Yes, you can book tickets for multiple passengers in a single booking. During the booking process, you'll be able to add the number of passengers and their details."
        },
        {
          q: "How far in advance can I book tickets?",
          a: "Most routes allow booking up to 30 days in advance. However, this may vary depending on the transport company and route."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept various payment methods including mobile money (MTN Mobile Money, Airtel Money), credit/debit cards, and bank transfers."
        }
      ]
    },
    {
      title: "Cancellations & Refunds",
      questions: [
        {
          q: "What is your cancellation policy?",
          a: "Cancellation policies vary by transport company. Generally, cancellations made at least 24 hours before departure may be eligible for a refund, subject to cancellation fees. Please check the specific terms when booking."
        },
        {
          q: "How do I cancel my booking?",
          a: "You can cancel your booking through your account dashboard under 'My Bookings'. Select the booking you wish to cancel and follow the cancellation process."
        },
        {
          q: "How long does it take to process refunds?",
          a: "Refunds are typically processed within 5-7 business days. The actual time to receive the refund may depend on your payment method and financial institution."
        }
      ]
    },
    {
      title: "Travel & Services",
      questions: [
        {
          q: "What should I bring for my journey?",
          a: "Please bring a valid ID, your booking confirmation (digital or printed), and any necessary travel documents. For comfort, you may want to bring water and snacks for your journey."
        },
        {
          q: "What is the luggage allowance?",
          a: "Standard luggage allowance typically includes one main bag (up to 20kg) and one small carry-on. Additional luggage may incur extra charges. Specific allowances vary by company."
        },
        {
          q: "How early should I arrive before departure?",
          a: "We recommend arriving at least 30 minutes before departure time to allow for check-in and luggage processing."
        }
      ]
    },
    {
      title: "Account & Technical Support",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on the 'Sign Up' button in the top right corner of our website. Fill in your details and verify your email address to complete the registration process."
        },
        {
          q: "I forgot my password. What should I do?",
          a: "Click on 'Login' and then 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password."
        },
        {
          q: "How can I view my booking history?",
          a: "Log into your account and go to 'My Bookings' to view all your past and upcoming bookings."
        }
      ]
    },
    {
      title: "Safety & COVID-19",
      questions: [
        {
          q: "What safety measures are in place?",
          a: "Our partner companies implement various safety measures including regular vehicle maintenance, professional driver training, and GPS tracking. During COVID-19, additional measures include regular sanitization and health screenings."
        },
        {
          q: "Are masks required during travel?",
          a: "Mask requirements may vary based on current health guidelines and company policies. Please check the specific requirements for your journey when booking."
        },
        {
          q: "What happens if my service is affected by COVID-19?",
          a: "If your service is affected by COVID-19 restrictions, we will notify you as soon as possible and provide options for rebooking or refunds."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            {faqCategories.map((category, index) => (
              <div key={index} className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, qIndex) => (
                      <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Please contact our customer support team.
            </p>
            <div className="space-y-2">
              <p>📧 Email: support@rwandaconnectride.com</p>
              <p>📞 Phone: +250 788 123 456</p>
              <p>⏰ Hours: Monday - Sunday, 24/7</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;