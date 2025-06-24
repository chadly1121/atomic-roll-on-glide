
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import JobCalendar from '../components/calendar/JobCalendar';
import { ManagementDropdown } from '../components/calendar/ManagementDropdown';

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Calendar - Roll On Painting</title>
        <meta name="description" content="Roll On Painting project calendar and scheduling" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar activeSection="calendar" />
      
      <div className="pt-24">
        <div className="sticky top-24 z-10 bg-background border-b p-4 flex items-center gap-4">
          <ManagementDropdown currentPage="calendar" />
          <h1 className="text-lg font-semibold text-atomic-navy">Management Dashboard</h1>
        </div>
        <div className="p-4">
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto">
              <JobCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
