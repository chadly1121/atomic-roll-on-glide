
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import JobCalendar from '../components/calendar/JobCalendar';

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
          <div className="max-w-7xl mx-auto">
            <JobCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
