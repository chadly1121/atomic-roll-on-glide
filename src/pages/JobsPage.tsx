import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Calendar, Users, MapPin, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ManagementDropdown } from '../components/calendar/ManagementDropdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JobForm from '../components/job-form/JobForm';
import { useJobs } from '@/hooks/useJobs';
import { useCustomers } from '@/hooks/useCustomers';
import { Job } from '@/types/job';
import { format } from 'date-fns';

const JobsPage = () => {
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  const { jobs, createJob, updateJob } = useJobs();
  const { getCustomerById } = useCustomers();

  console.log('All jobs:', jobs);
  console.log('Jobs length:', jobs.length);

  const filteredJobs = jobs.filter(job => {
    const searchLower = searchTerm.toLowerCase();
    const isActive = job.active !== false; // Include jobs where active is true or undefined
    console.log(`Job ${job.jobName}: active=${job.active}, isActive=${isActive}`);
    
    return isActive && (
      job.jobName.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower) ||
      job.notes?.toLowerCase().includes(searchLower) ||
      job.employees.some(emp => emp.toLowerCase().includes(searchLower))
    );
  });

  console.log('Filtered jobs:', filteredJobs);
  console.log('Filtered jobs length:', filteredJobs.length);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Complete':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateJob = () => {
    setEditingJob(undefined);
    setIsJobFormOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsJobFormOpen(true);
  };

  const handleJobSubmit = (jobData: any) => {
    console.log('Submitting job data:', jobData);
    
    if (editingJob) {
      console.log('Updating existing job:', editingJob.id);
      updateJob(editingJob.id, jobData);
    } else {
      console.log('Creating new job');
      const newJob = createJob(jobData);
      console.log('Created job:', newJob);
    }
    setIsJobFormOpen(false);
    setEditingJob(undefined);
  };

  const handleCloseForm = () => {
    setIsJobFormOpen(false);
    setEditingJob(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Jobs - Roll On Painting</title>
        <meta name="description" content="Manage painting jobs and projects" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-24">
        <div className="sticky top-24 z-10 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ManagementDropdown currentPage="jobs" />
            <h1 className="text-lg font-semibold text-atomic-navy">Jobs Management</h1>
          </div>
          <Button onClick={handleCreateJob} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </div>
        
        <div className="p-4">
          <div className="container mx-auto space-y-6">
            {/* Search and Stats */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Badge variant="secondary" className="ml-auto">
                {filteredJobs.length} active job{filteredJobs.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            {/* Job Cards Grid */}
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? 'No jobs found matching your search.' : 'No active jobs yet.'}
                  </p>
                  <Button onClick={handleCreateJob}>
                    Create Your First Job
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => {
                  const customer = job.customerId ? getCustomerById(job.customerId) : null;
                  
                  return (
                    <Card 
                      key={job.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleEditJob(job)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          {job.color && (
                            <div 
                              className="w-3 h-3 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: job.color }}
                            />
                          )}
                          <span className="truncate">{job.jobName}</span>
                          <Badge 
                            className={`${getStatusColor(job.status)} text-xs ml-auto flex-shrink-0`} 
                            variant="outline"
                          >
                            {job.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="pt-0 space-y-3">
                        {customer && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{customer.firstName} {customer.lastName}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        
                        {job.employees && job.employees.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{job.employees.join(', ')}</span>
                          </div>
                        )}
                        
                        {job.startDate && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">
                              {format(new Date(job.startDate), 'MMM d, yyyy')}
                              {job.endDate && ` - ${format(new Date(job.endDate), 'MMM d, yyyy')}`}
                            </span>
                          </div>
                        )}

                        {job.notes && (
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {job.notes}
                          </div>
                        )}

                        {job.tags && job.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {job.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {job.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <JobForm
        isOpen={isJobFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleJobSubmit}
        job={editingJob}
      />
    </div>
  );
};

export default JobsPage;
