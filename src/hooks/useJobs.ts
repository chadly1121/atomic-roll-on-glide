
import { useState, useEffect } from 'react';
import { Job, JobFormData } from '@/types/job';

// Mock data for demonstration
const mockJobs: Job[] = [
  {
    id: '1',
    jobName: 'Smith House Interior',
    employees: ['John Doe', 'Jane Smith'],
    foreman: 'John Doe',
    location: '123 Main St, Vancouver, BC',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-18'),
    status: 'Scheduled',
    notes: 'Interior painting - living room and bedrooms',
    files: [],
    links: [],
    customerId: '1',
    tags: ['interior', 'residential'],
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    jobName: 'Office Building Exterior',
    employees: ['Mike Johnson', 'Sarah Wilson'],
    foreman: 'Mike Johnson',
    location: '456 Business Ave, Vancouver, BC',
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-01-25'),
    status: 'In Progress',
    notes: 'Commercial exterior painting',
    files: [],
    links: [],
    customerId: '2',
    tags: ['exterior', 'commercial'],
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const createJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setJobs(prev => [...prev, newJob]);
    return newJob;
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === id
          ? { ...job, ...updates, updatedAt: new Date().toISOString() }
          : job
      )
    );
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  return {
    jobs,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
  };
};
