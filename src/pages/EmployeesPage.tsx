
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { ManagementDropdown } from '../components/calendar/ManagementDropdown';

const EmployeesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Employees - Roll On Painting</title>
        <meta name="description" content="Manage employees and team members" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-24">
        <div className="sticky top-24 z-10 bg-background border-b p-4 flex items-center gap-4">
          <ManagementDropdown currentPage="employees" />
          <h1 className="text-lg font-semibold text-atomic-navy">Employee Management</h1>
        </div>
        <div className="p-4">
          <div className="container mx-auto">
            <p className="text-gray-600">Manage your team members and employees.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
