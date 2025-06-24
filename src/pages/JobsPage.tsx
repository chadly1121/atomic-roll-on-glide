
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { ManagementDropdown } from '../components/calendar/ManagementDropdown';

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Jobs - Roll On Painting</title>
        <meta name="description" content="Manage painting jobs and projects" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-24">
        <div className="sticky top-24 z-10 bg-background border-b p-4 flex items-center gap-4">
          <ManagementDropdown currentPage="jobs" />
          <h1 className="text-lg font-semibold text-atomic-navy">Jobs Management</h1>
        </div>
        <div className="p-4">
          <div className="container mx-auto">
            <p className="text-gray-600">Manage your painting jobs and projects.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
