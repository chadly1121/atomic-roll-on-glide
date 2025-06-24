
import React, { useState, useMemo } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, isSameDay } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarFilters, { CalendarFiltersType } from './CalendarFilters';
import ViewTypeSelector from './ViewTypeSelector';
import CalendarViewSelector from './CalendarViewSelector';
import MonthViewGrid from './MonthViewGrid';
import WeekView from './WeekView';
import DayView from './DayView';
import EmployeeMonthView from './EmployeeMonthView';
import EmployeeWeekView from './EmployeeWeekView';
import EmployeeDayView from './EmployeeDayView';
import JobForm from '../job-form/JobForm';
import { useJobs } from '@/hooks/useJobs';
import { useTags } from '@/hooks/useTags';
import { useEmployees } from '@/hooks/useEmployees';

export type CalendarView = 'month' | 'week' | 'day';
export type ViewType = 'calendar' | 'employee';

const JobCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<CalendarView>('month');
  const [calendarView, setCalendarView] = useState<ViewType>('calendar');
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filters, setFilters] = useState<CalendarFiltersType>({
    search: '',
    status: '',
    employee: '',
    customer: '',
    tags: [],
  });

  const { jobs, updateJob, createJob } = useJobs();
  const { getAllTags } = useTags();
  const { employees } = useEmployees();

  // Get all available tags from jobs and managed tags
  const availableTags = useMemo(() => {
    const jobTags = jobs.flatMap(job => job.tags || []);
    const managedTags = getAllTags();
    return [...new Set([...jobTags, ...managedTags])].sort();
  }, [jobs, getAllTags]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          job.jobName.toLowerCase().includes(searchTerm) ||
          job.notes?.toLowerCase().includes(searchTerm) ||
          job.location?.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && job.status !== filters.status) {
        return false;
      }

      // Employee filter
      if (filters.employee) {
        const hasEmployee = job.employees?.some(emp => 
          emp.toLowerCase().includes(filters.employee.toLowerCase())
        );
        if (!hasEmployee) return false;
      }

      // Customer filter
      if (filters.customer && job.customerId !== filters.customer) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const jobTags = job.tags || [];
        const hasMatchingTag = filters.tags.some(filterTag => 
          jobTags.includes(filterTag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [jobs, filters]);

  // Filter jobs by date range based on view
  const dateRangeFilteredJobs = useMemo(() => {
    let startDate: Date;
    let endDate: Date;

    switch (viewType) {
      case 'month':
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
        break;
      case 'week':
        startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
        endDate = endOfWeek(currentDate, { weekStartsOn: 0 });
        break;
      case 'day':
        startDate = new Date(currentDate);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(currentDate);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        return filteredJobs;
    }

    return filteredJobs.filter((job) => {
      if (!job.startDate) return false;
      const jobDate = new Date(job.startDate);
      return isWithinInterval(jobDate, { start: startDate, end: endDate });
    });
  }, [filteredJobs, currentDate, viewType]);

  // Get days with jobs for calendar highlighting
  const daysWithJobs = useMemo(() => {
    return jobs
      .filter(job => job.startDate)
      .map(job => new Date(job.startDate!))
      .filter((date, index, self) => 
        self.findIndex(d => isSameDay(d, date)) === index
      );
  }, [jobs]);

  // Get jobs for selected date
  const selectedDateJobs = useMemo(() => {
    return jobs.filter(job => {
      if (!job.startDate) return false;
      return isSameDay(new Date(job.startDate), selectedDate);
    });
  }, [jobs, selectedDate]);

  const handleCreateJob = (date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
    setIsJobFormOpen(true);
  };

  const handleJobClick = (job: any) => {
    console.log('Job clicked:', job);
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    setSelectedDate(date);
  };

  const handleJobSubmit = (jobData: any) => {
    createJob(jobData);
  };

  const renderCalendarView = () => {
    if (calendarView === 'employee') {
      switch (viewType) {
        case 'month':
          return (
            <EmployeeMonthView
              selectedDate={currentDate}
              employees={employees}
              jobs={dateRangeFilteredJobs}
              onDateClick={handleDateClick}
            />
          );
        case 'week':
          return (
            <EmployeeWeekView
              selectedDate={currentDate}
              employees={employees}
              jobs={dateRangeFilteredJobs}
              onDateClick={handleDateClick}
            />
          );
        case 'day':
          return (
            <EmployeeDayView
              selectedDate={currentDate}
              employees={employees}
              jobs={dateRangeFilteredJobs}
              onDateClick={handleDateClick}
            />
          );
        default:
          return (
            <EmployeeMonthView
              selectedDate={currentDate}
              employees={employees}
              jobs={dateRangeFilteredJobs}
              onDateClick={handleDateClick}
            />
          );
      }
    } else {
      switch (viewType) {
        case 'month':
          return (
            <MonthViewGrid
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              daysWithJobs={daysWithJobs}
              selectedDateJobs={selectedDateJobs}
              onJobClick={handleJobClick}
              onCreateJobForDate={handleCreateJob}
            />
          );
        case 'week':
          return (
            <WeekView
              selectedDate={currentDate}
              jobs={dateRangeFilteredJobs}
              onJobClick={handleJobClick}
              onDateClick={handleDateClick}
              onJobUpdate={updateJob}
              onCreateJobForDate={handleCreateJob}
            />
          );
        case 'day':
          return (
            <DayView
              selectedDate={currentDate}
              jobs={dateRangeFilteredJobs}
              onJobClick={handleJobClick}
              onCreateJob={() => handleCreateJob(currentDate)}
              onJobUpdate={updateJob}
            />
          );
        default:
          return (
            <MonthViewGrid
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              daysWithJobs={daysWithJobs}
              selectedDateJobs={selectedDateJobs}
              onJobClick={handleJobClick}
              onCreateJobForDate={handleCreateJob}
            />
          );
      }
    }
  };

  return (
    <div className="space-y-6">
      <CalendarHeader onCreateJob={() => handleCreateJob()} />
      
      <CalendarFilters
        filters={filters}
        onFiltersChange={setFilters}
        availableTags={availableTags}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CalendarViewSelector
          currentDate={currentDate}
          viewType={viewType}
          onDateChange={setCurrentDate}
          onViewChange={setViewType}
        />
        <ViewTypeSelector
          currentViewType={calendarView}
          onViewTypeChange={setCalendarView}
        />
      </div>

      {renderCalendarView()}

      <JobForm
        isOpen={isJobFormOpen}
        onClose={() => {
          setIsJobFormOpen(false);
        }}
        onSubmit={handleJobSubmit}
      />
    </div>
  );
};

export default JobCalendar;
