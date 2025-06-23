
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { JobFormData } from './jobFormSchema';

interface FilesLinksFieldsProps {
  control: Control<JobFormData>;
}

const FilesLinksFields: React.FC<FilesLinksFieldsProps> = ({ control }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="files"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Files</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter file names or paths (one per line)" 
                className="resize-none h-20"
                value={field.value?.join('\n') || ''}
                onChange={(e) => field.onChange(e.target.value.split('\n').filter(Boolean))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="links"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Links</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter links (one per line)" 
                className="resize-none h-20"
                value={field.value?.join('\n') || ''}
                onChange={(e) => field.onChange(e.target.value.split('\n').filter(Boolean))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FilesLinksFields;
