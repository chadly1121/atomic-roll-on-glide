
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { jobSchema, JobFormData } from './jobFormSchema';
import { Job } from '@/types/job';
import BasicJobFields from './BasicJobFields';
import DateStatusFields from './DateStatusFields';
import FilesLinksFields from './FilesLinksFields';
import TagsMapFields from './TagsMapFields';

interface JobFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  job?: Job;
}

const JobForm: React.FC<JobFormProps> = ({ isOpen, onClose, onSubmit, job }) => {
  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobName: '',
      employees: [],
      foreman: '',
      location: '',
      status: 'Scheduled',
      notes: '',
      files: [],
      links: [],
      customerId: '',
      tags: [],
      active: true,
    },
  });

  // Reset form when job prop changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      if (job) {
        form.reset({
          jobName: job.jobName || '',
          employees: job.employees || [],
          foreman: job.foreman || '',
          location: job.location || '',
          startDate: job.startDate,
          endDate: job.endDate,
          status: job.status || 'Scheduled',
          notes: job.notes || '',
          files: job.files || [],
          links: job.links || [],
          customerId: job.customerId || '',
          tags: job.tags || [],
          active: job.active !== undefined ? job.active : true,
        });
      } else {
        form.reset({
          jobName: '',
          employees: [],
          foreman: '',
          location: '',
          status: 'Scheduled',
          notes: '',
          files: [],
          links: [],
          customerId: '',
          tags: [],
          active: true,
        });
      }
    }
  }, [job, isOpen, form]);

  const handleSubmit = (data: JobFormData) => {
    onSubmit({
      jobName: data.jobName,
      employees: data.employees,
      foreman: data.foreman,
      location: data.location,
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
      notes: data.notes,
      files: data.files,
      links: data.links,
      customerId: data.customerId,
      tags: data.tags,
      active: data.active,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job ? 'Edit Job' : 'Create New Job'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <BasicJobFields control={form.control} />
            <DateStatusFields control={form.control} />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional notes about the job..." 
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <TagsMapFields control={form.control} />
            <FilesLinksFields control={form.control} />
            
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">{job ? 'Update' : 'Create'} Job</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JobForm;
