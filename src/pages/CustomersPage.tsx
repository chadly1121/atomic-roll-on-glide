
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, User } from 'lucide-react';
import { useCustomers } from '@/hooks/useCustomers';
import { Customer } from '@/types/customer';
import CustomerForm from '@/components/customer/CustomerForm';

const CustomersPage = () => {
  const { customers, deleteCustomer } = useCustomers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCustomer(undefined);
  };

  const handleCreateCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    // This will be handled by the CustomerForm component
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Customers - Roll On Painting</title>
        <meta name="description" content="Manage customers and clients" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar activeSection="customers" />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-atomic-navy">Customers</h1>
                <p className="text-gray-600">Manage your customers and clients</p>
              </div>
              <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Customer
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <CardTitle className="text-lg">
                            {customer.firstName} {customer.lastName}
                          </CardTitle>
                          {customer.companyName && (
                            <p className="text-sm text-gray-600">{customer.companyName}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-sm">{customer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-sm">{customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-sm">
                        {customer.address.street}<br />
                        {customer.address.city}, {customer.address.state} {customer.address.zipCode}
                      </p>
                    </div>
                    {customer.notes && (
                      <div>
                        <p className="text-sm text-gray-600">Notes</p>
                        <p className="text-sm">{customer.notes}</p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(customer)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No customers found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <CustomerForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleCreateCustomer}
        customer={editingCustomer}
      />
    </div>
  );
};

export default CustomersPage;
