
export interface Job {
  id: string;
  jobName: string;
  employee?: string; // Keep for backward compatibility
  employees: string[];
  foreman?: string;
  location: string;
  startDate?: Date;
  endDate?: Date;
  status: 'Scheduled' | 'In Progress' | 'Complete';
  notes?: string;
  files: string[];
  links: string[];
  customerId?: string;
  tags: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobFormData {
  jobName: string;
  employee?: string;
  employees: string[];
  foreman?: string;
  location: string;
  startDate?: Date;
  endDate?: Date;
  status: 'Scheduled' | 'In Progress' | 'Complete';
  notes?: string;
  files: string[];
  links: string[];
  customerId?: string;
  tags: string[];
  active: boolean;
}
