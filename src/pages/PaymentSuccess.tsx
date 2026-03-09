import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service') || 'your service';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Payment Successful | Roll On Painting</title>
      </Helmet>

      <Navbar activeSection="" />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you for booking <strong>{decodeURIComponent(service)}</strong>.
            We've sent a confirmation to your email.
          </p>
          <div className="bg-muted/50 p-6 rounded-xl text-left space-y-3 mb-8">
            <h3 className="font-semibold text-foreground">What happens next?</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Our team reviews your booking</li>
              <li>We'll contact you within 24 hours to schedule</li>
              <li>We confirm the date & time that works for you</li>
            </ol>
          </div>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors min-h-[48px]"
          >
            Back to Home
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
