
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Calendar, MapPin, Users } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { useCustomers } from '@/hooks/useCustomers';
import { Job } from '@/types/job';
import JobForm from '@/components/job-form/JobForm';
import { format } from 'date-fns';

const JobsPage = () => {
  const { jobs, deleteJob } = useJobs();
  const { customers } = useCustomers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.jobName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.employees.some(emp => emp.toLowerCase().includes(searchTerm.toLowerCase())) ||
    job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerName = (customerId?: string) => {
    if (!customerId) return 'No customer assigned';
    const customer = customers.find(c => c.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown customer';
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

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingJob(undefined);
  };

  const handleCreateJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    // This will be handled by the JobForm component
  };

  const handleUpdateJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    // This will be handled by the JobForm component
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Jobs - Roll On Painting</title>
        <meta name="description" content="Manage painting jobs and projects" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar activeSection="jobs" />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-atomic-navy">Jobs</h1>
                <p className="text-gray-600">Manage your painting projects and jobs</p>
              </div>
              <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Job
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{job.jobName}</CardTitle>
                        <p className="text-sm text-gray-600">{getCustomerName(job.customerId)}</p>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="text-sm">{job.location}</p>
                    </div>
                    
                    {job.startDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <p className="text-sm">
                          {format(new Date(job.startDate), 'MMM d, yyyy')}
                          {job.endDate && ` - ${format(new Date(job.endDate), 'MMM d, yyyy')}`}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <p className="text-sm">{job.employees.length} employee{job.employees.length !== 1 ? 's' : ''}</p>
                    </div>

                    {job.foreman && (
                      <div>
                        <p className="text-sm text-gray-600">Foreman</p>
                        <p className="text-sm">{job.foreman}</p>
                      </div>
                    )}

                    {job.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {job.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(job)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(job.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No jobs found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <JobForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
        job={editingJob}
      />
    </div>
  );
};

export default JobsPage;
