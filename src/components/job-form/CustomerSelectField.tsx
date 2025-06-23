
import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, User } from 'lucide-react';
import { JobFormData } from './jobFormSchema';
import { Customer } from '@/types/customer';
import { useCustomers } from '@/hooks/useCustomers';
import CustomerForm from '@/components/customer/CustomerForm';

interface CustomerSelectFieldProps {
  control: Control<JobFormData>;
}

const CustomerSelectField: React.FC<CustomerSelectFieldProps> = ({ control }) => {
  const { customers, createCustomer } = useCustomers();
  const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);

  const handleCreateCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    createCustomer(customerData);
    setIsCustomerFormOpen(false);
  };

  return (
    <>
      <FormField
        control={control}
        name="customerId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Customer</FormLabel>
            <div className="flex gap-2">
              <FormControl className="flex-1">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {customer.firstName} {customer.lastName}
                          {customer.companyName && (
                            <span className="text-muted-foreground">
                              - {customer.companyName}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsCustomerFormOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <CustomerForm
        isOpen={isCustomerFormOpen}
        onClose={() => setIsCustomerFormOpen(false)}
        onSubmit={handleCreateCustomer}
      />
    </>
  );
};

export default CustomerSelectField;
