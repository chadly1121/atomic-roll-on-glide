
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { JobFormData } from './jobFormSchema';
import CustomerSelectField from './CustomerSelectField';
import EmployeeSelectionFields from './EmployeeSelectionFields';

interface BasicJobFieldsProps {
  control: Control<JobFormData>;
}

const BasicJobFields: React.FC<BasicJobFieldsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="jobName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter job name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <EmployeeSelectionFields control={control} />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Enter job location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CustomerSelectField control={control} />
    </>
  );
};

export default BasicJobFields;
