
import { z } from 'zod';

export const jobSchema = z.object({
  jobName: z.string().min(1, 'Job name is required'),
  employee: z.string().optional(), // Keep for backward compatibility
  employees: z.array(z.string()).min(1, 'At least one employee is required'),
  foreman: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum(['Scheduled', 'In Progress', 'Complete']),
  notes: z.string().optional(),
  files: z.array(z.string()).default([]),
  links: z.array(z.string()).default([]),
  customerId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  color: z.string().optional(), // Add color field
  active: z.boolean().default(true),
});

export type JobFormData = z.infer<typeof jobSchema>;
