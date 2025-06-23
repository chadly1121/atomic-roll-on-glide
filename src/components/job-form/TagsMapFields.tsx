
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { JobFormData } from './jobFormSchema';

interface TagsMapFieldsProps {
  control: Control<JobFormData>;
}

const TagsMapFields: React.FC<TagsMapFieldsProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <Input 
              placeholder="Enter tags separated by commas" 
              value={field.value?.join(', ') || ''}
              onChange={(e) => field.onChange(e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TagsMapFields;
