
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ManagementDropdown } from '../components/calendar/ManagementDropdown';
import EmployeeForm from '../components/employee/EmployeeForm';

const EmployeesPage = () => {
  const [isEmployeeFormOpen, setIsEmployeeFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Employees - Roll On Painting</title>
        <meta name="description" content="Manage employees and team members" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-24">
        <div className="sticky top-24 z-10 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ManagementDropdown currentPage="employees" />
            <h1 className="text-lg font-semibold text-atomic-navy">Employee Management</h1>
          </div>
          <Button onClick={() => setIsEmployeeFormOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
        <div className="p-4">
          <div className="container mx-auto">
            <p className="text-gray-600">Manage your team members and employees.</p>
          </div>
        </div>
      </div>

      <EmployeeForm
        isOpen={isEmployeeFormOpen}
        onClose={() => setIsEmployeeFormOpen(false)}
      />
    </div>
  );
};

export default EmployeesPage;
