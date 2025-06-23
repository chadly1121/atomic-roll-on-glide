
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CalendarDays, Users, MapPin, Clock } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { useJobs } from '@/hooks/useJobs';
import { useCustomers } from '@/hooks/useCustomers';
import { Job } from '@/types/job';
import JobForm from '@/components/job-form/JobForm';

const JobCalendar: React.FC = () => {
  const { jobs, createJob, updateJob, deleteJob } = useJobs();
  const { getCustomerById } = useCustomers();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();

  const getJobsForDate = (date: Date) => {
    return jobs.filter(job => {
      if (!job.startDate) return false;
      return isSameDay(new Date(job.startDate), date);
    });
  };

  const selectedDateJobs = selectedDate ? getJobsForDate(selectedDate) : [];

  const handleCreateJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    createJob(jobData);
  };

  const handleUpdateJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingJob) {
      updateJob(editingJob.id, jobData);
      setEditingJob(undefined);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsJobFormOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Complete':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysWithJobs = () => {
    return jobs
      .filter(job => job.startDate)
      .map(job => new Date(job.startDate!));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-atomic-navy">Project Calendar</h2>
          <p className="text-gray-600">Schedule and manage painting projects</p>
        </div>
        <Button onClick={() => setIsJobFormOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Calendar View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                hasJobs: getDaysWithJobs(),
              }}
              modifiersStyles={{
                hasJobs: {
                  backgroundColor: '#f3f4f6',
                  fontWeight: 'bold',
                  color: '#1f2937',
                },
              }}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Selected Date Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDateJobs.length > 0 ? (
              selectedDateJobs.map((job) => {
                const customer = job.customerId ? getCustomerById(job.customerId) : null;
                return (
                  <Card 
                    key={job.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleEditJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{job.jobName}</h4>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                        
                        {customer && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-3 w-3" />
                            {customer.firstName} {customer.lastName}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                        
                        {job.employees.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-3 w-3" />
                            {job.employees.join(', ')}
                          </div>
                        )}
                        
                        {job.startDate && job.endDate && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {format(new Date(job.startDate), 'MMM d')} - {format(new Date(job.endDate), 'MMM d')}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No projects scheduled for this date</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => setIsJobFormOpen(true)}
                >
                  Schedule a Project
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Job Form Dialog */}
      <JobForm
        isOpen={isJobFormOpen}
        onClose={() => {
          setIsJobFormOpen(false);
          setEditingJob(undefined);
        }}
        onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
        job={editingJob}
      />
    </div>
  );
};

export default JobCalendar;
