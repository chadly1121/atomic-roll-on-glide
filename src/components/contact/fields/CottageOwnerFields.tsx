import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface CottageOwnerFieldsProps {
  form: UseFormReturn<any>;
}

const cottageLocations = [
  'Lake Muskoka',
  'Lake Rosseau',
  'Lake Joseph',
  'Other',
];

const propertyTypes = [
  'Seasonal cottage',
  'Year-round home',
  'Luxury / estate property',
];

const propertyValues = [
  'Under $1M',
  '$1M–$3M',
  '$3M–$7M',
  '$7M+',
];

const CottageOwnerFields: React.FC<CottageOwnerFieldsProps> = ({ form }) => {
  const ownsCottage = form.watch('ownsCottage');
  const cottageLocation = form.watch('cottageLocation');

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="ownsCottage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you own a cottage?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {ownsCottage === 'Yes' && (
        <div className="space-y-4 pl-0 border-l-2 border-atomic-orange/20 pl-4 animate-in fade-in duration-300">
          <FormField
            control={form.control}
            name="cottageLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where is your cottage located?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a lake" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cottageLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {cottageLocation === 'Other' && (
            <FormField
              control={form.control}
              name="cottageLocationOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please specify location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, lake, or area" {...field} maxLength={200} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyValueRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximate value of property</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyValues.map((val) => (
                      <SelectItem key={val} value={val}>{val}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CottageOwnerFields;
