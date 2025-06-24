
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import JobCalendar from '../components/calendar/JobCalendar';
import { CalendarSidebar } from '../components/calendar/CalendarSidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Calendar - Roll On Painting</title>
        <meta name="description" content="Roll On Painting project calendar and scheduling" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar activeSection="calendar" />
      
      <SidebarProvider>
        <div className="flex w-full">
          <CalendarSidebar />
          <SidebarInset className="flex-1">
            <div className="pt-24">
              <div className="sticky top-24 z-10 bg-background border-b p-4 flex items-center gap-4">
                <SidebarTrigger className="h-8 w-8" />
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
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CalendarPage;
