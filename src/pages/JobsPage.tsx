
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { CalendarSidebar } from '../components/calendar/CalendarSidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Jobs - Roll On Painting</title>
        <meta name="description" content="Manage painting jobs and projects" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <SidebarProvider>
        <div className="flex w-full pt-24">
          <CalendarSidebar />
          <SidebarInset>
            <main className="flex-1">
              <div className="sticky top-0 z-10 bg-background border-b p-4 flex items-center gap-4">
                <SidebarTrigger className="h-8 w-8" />
                <h1 className="text-lg font-semibold text-atomic-navy">Jobs Management</h1>
              </div>
              <div className="p-4">
                <div className="container mx-auto">
                  <p className="text-gray-600">Manage your painting jobs and projects.</p>
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default JobsPage;
