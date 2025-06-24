
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { useJobs } from '@/hooks/useJobs';
import { Job } from '@/types/job';
import JobForm from '@/components/job-form/JobForm';
import { CalendarView } from './CalendarViewSelector';
import WeekView from './WeekView';
import DayView from './DayView';
import CalendarFilters, { CalendarFiltersType } from './CalendarFilters';
import CalendarHeader from './CalendarHeader';
import CalendarControls from './CalendarControls';
import MonthViewGrid from './MonthViewGrid';

const JobCalendar: React.FC = () => {
  const { jobs, createJob, updateJob, deleteJob } = useJobs();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  
  const [filters, setFilters] = useState<CalendarFiltersType>({
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
      <CalendarHeader onCreateJob={() => handleCreateJobForDate()} />

      <CalendarFilters
        filters={filters}
        onFiltersChange={setFilters}
        availableTags={availableTags}
      />

      <CalendarControls
        currentView={currentView}
        onViewChange={setCurrentView}
        viewTitle={getViewTitle()}
        onNavigate={navigateDate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentView === 'month' && (
          <MonthViewGrid
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            daysWithJobs={getDaysWithJobs()}
            selectedDateJobs={selectedDateJobs}
            onJobClick={handleEditJob}
            onCreateJobForDate={handleCreateJobForDate}
          />
        )}

        {currentView === 'week' && (
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
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
