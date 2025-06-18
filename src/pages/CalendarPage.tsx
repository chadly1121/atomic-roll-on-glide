
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Calendar - Roll On Painting</title>
        <meta name="description" content="Roll On Painting project calendar and scheduling" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar activeSection="calendar" />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-atomic-navy mb-4">
                Project Calendar
              </h1>
              <p className="text-lg text-gray-600">
                Schedule and manage painting projects
              </p>
            </div>
            
            {/* Embedded Job Scribe Calendar */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://job-scribe-calendar.lovable.app"
                className="w-full h-[800px] border-0"
                title="Roll On Painting Calendar"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalendarPage;
