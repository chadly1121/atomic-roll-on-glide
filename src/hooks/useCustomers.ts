
import { useState } from 'react';
import { Customer } from '@/types/customer';

// Mock data for demonstration
const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(604) 555-0123',
    address: {
      street: '123 Main St',
      city: 'Vancouver',
      state: 'BC',
      zipCode: 'V6B 2W5',
    },
    companyName: '',
    notes: 'Prefers morning appointments',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@businesscorp.com',
    phone: '(604) 555-0456',
    address: {
      street: '456 Business Ave',
      city: 'Vancouver',
      state: 'BC',
      zipCode: 'V6C 3X7',
    },
    companyName: 'Business Corp',
    notes: 'Commercial client - office building',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const createCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id
          ? { ...customer, ...updates, updatedAt: new Date().toISOString() }
          : customer
      )
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  const getCustomerById = (id: string) => {
    return customers.find(customer => customer.id === id);
  };

  return {
    customers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
  };
};
