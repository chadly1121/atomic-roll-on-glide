
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ManagementDropdown } from '../components/calendar/ManagementDropdown';
import CustomerForm from '../components/customer/CustomerForm';
import CustomerList from '../components/customer/CustomerList';
import { useCustomers } from '@/hooks/useCustomers';
import { Customer } from '@/types/customer';

const CustomersPage = () => {
  const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();
  const { createCustomer, updateCustomer } = useCustomers();

  const handleCreateCustomer = (customerData: any) => {
    createCustomer(customerData);
    setIsCustomerFormOpen(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsCustomerFormOpen(true);
  };

  const handleUpdateCustomer = (customerData: any) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, customerData);
    }
    setIsCustomerFormOpen(false);
    setEditingCustomer(undefined);
  };

  const handleCloseForm = () => {
    setIsCustomerFormOpen(false);
    setEditingCustomer(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Customers - Roll On Painting</title>
        <meta name="description" content="Manage customers and client information" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-24">
        <div className="sticky top-24 z-10 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ManagementDropdown currentPage="customers" />
            <h1 className="text-lg font-semibold text-atomic-navy">Customer Management</h1>
          </div>
          <Button onClick={() => setIsCustomerFormOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
        <div className="p-4">
          <div className="container mx-auto">
            <CustomerList onEditCustomer={handleEditCustomer} />
          </div>
        </div>
      </div>

      <CustomerForm
        isOpen={isCustomerFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingCustomer ? handleUpdateCustomer : handleCreateCustomer}
        customer={editingCustomer}
      />
    </div>
  );
};

export default CustomersPage;
