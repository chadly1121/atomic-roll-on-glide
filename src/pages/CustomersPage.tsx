import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { CalendarSidebar } from '../components/calendar/CalendarSidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

const CustomersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Customers - Roll On Painting</title>
        <meta name="description" content="Manage customers and client information" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <SidebarProvider>
        <div className="flex w-full pt-24">
          <CalendarSidebar />
          <SidebarInset>
            <main className="flex-1 p-4">
              <div className="mb-4">
                <SidebarTrigger />
              </div>
              <div className="container mx-auto">
                {/* Customers page content will go here */}
                <h1 className="text-2xl font-bold text-atomic-navy mb-4">Customer Management</h1>
                <p className="text-gray-600">Manage your customers and client information.</p>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CustomersPage;
