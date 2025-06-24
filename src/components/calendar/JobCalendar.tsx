
import React, { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CalendarDays, Users, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { useJobs } from '@/hooks/useJobs';
import { useCustomers } from '@/hooks/useCustomers';
import { Job } from '@/types/job';
import JobForm from '@/components/job-form/JobForm';
import CalendarViewSelector, { CalendarView } from './CalendarViewSelector';
import WeekView from './WeekView';
import DayView from './DayView';
import CalendarFilters, { CalendarFilters } from './CalendarFilters';

const JobCalendar: React.FC = () => {
  const { jobs, createJob, updateJob, deleteJob } = useJobs();
  const { getCustomerById } = useCustomers();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  
  const [filters, setFilters] = useState<CalendarFilters>({
    search: '',
    status: '',
    employee: '',
    customer: '',
    tags: [],
  });

  // Get all unique tags from jobs
  const availableTags = useMemo(() => {
    const allTags = jobs.flatMap(job => job.tags);
    return [...new Set(allTags)].sort();
  }, [jobs]);

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          job.jobName.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower) ||
          job.notes?.toLowerCase().includes(searchLower) ||
          job.employees.some(emp => emp.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && job.status !== filters.status) return false;

      // Employee filter
      if (filters.employee && !job.employees.includes(filters.employee) && job.foreman !== filters.employee) return false;

      // Customer filter
      if (filters.customer && job.customerId !== filters.customer) return false;

      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.some(tag => job.tags.includes(tag))) return false;

      return true;
    });
  }, [jobs, filters]);

  const getJobsForDate = (date: Date) => {
    return filteredJobs.filter(job => {
      if (!job.startDate) return false;
      return isSameDay(new Date(job.startDate), date);
    });
  };

  const selectedDateJobs = getJobsForDate(selectedDate);

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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (currentView === 'month') {
      setCurrentView('day');
    }
  };

  const handleCreateJobForDate = (date?: Date) => {
    if (date) setSelectedDate(date);
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
    return filteredJobs
      .filter(job => job.startDate)
      .map(job => new Date(job.startDate!));
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    switch (currentView) {
      case 'month':
        setSelectedDate(direction === 'next' ? addMonths(selectedDate, 1) : subMonths(selectedDate, 1));
        break;
      case 'week':
        setSelectedDate(direction === 'next' ? addWeeks(selectedDate, 1) : subWeeks(selectedDate, 1));
        break;
      case 'day':
        setSelectedDate(direction === 'next' ? addDays(selectedDate, 1) : subDays(selectedDate, 1));
        break;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      case 'week':
        return `Week of ${format(selectedDate, 'MMM d, yyyy')}`;
      case 'day':
        return format(selectedDate, 'EEEE, MMMM d, yyyy');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-atomic-navy">Project Calendar</h2>
          <p className="text-gray-600">Schedule and manage painting projects</p>
        </div>
        <Button onClick={() => handleCreateJobForDate()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <CalendarFilters
        filters={filters}
        onFiltersChange={setFilters}
        availableTags={availableTags}
      />

      {/* View Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <CalendarViewSelector
            currentView={currentView}
            onViewChange={setCurrentView}
          />
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-semibold min-w-[200px] text-center">{getViewTitle()}</h3>
            <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Views */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentView === 'month' && (
          <>
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
                  onSelect={(date) => date && handleDateClick(date)}
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
                  {format(selectedDate, 'MMMM d, yyyy')}
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
                      onClick={() => handleCreateJobForDate(selectedDate)}
                    >
                      Schedule a Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {currentView === 'week' && (
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Week View</CardTitle>
              </CardHeader>
              <CardContent>
                <WeekView
                  selectedDate={selectedDate}
                  jobs={filteredJobs}
                  onJobClick={handleEditJob}
                  onDateClick={handleDateClick}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === 'day' && (
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <DayView
                  selectedDate={selectedDate}
                  jobs={filteredJobs}
                  onJobClick={handleEditJob}
                  onCreateJob={() => handleCreateJobForDate(selectedDate)}
                />
              </CardContent>
            </Card>
          </div>
        )}
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
