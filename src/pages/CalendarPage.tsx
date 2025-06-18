
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-atomic-navy mb-4">
                Project Calendar
              </h1>
              <p className="text-lg text-gray-600">
                Schedule and manage painting projects
              </p>
            </div>
            
            {/* Calendar container - you can embed your Lovable calendar here */}
            <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px]">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-4">Calendar Component Ready</p>
                  <p className="text-sm">You can embed your Lovable calendar here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalendarPage;
