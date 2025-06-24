import React, { useState, useMemo } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { CalendarViewType } from '@/types/calendarView';
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

const JobCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<CalendarViewType>('month');
  const [calendarView, setCalendarView] = useState<'calendar' | 'employee'>('calendar');
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState<CalendarFiltersType>({
    search: '',
    status: '',
    employee: '',
    customer: '',
    tags: [],
  });

  const { jobs } = useJobs();
  const { getAllTags } = useTags();

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
          job.title.toLowerCase().includes(searchTerm) ||
          job.description?.toLowerCase().includes(searchTerm) ||
          job.address?.toLowerCase().includes(searchTerm);
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
      const jobDate = new Date(job.startDate);
      return isWithinInterval(jobDate, { start: startDate, end: endDate });
    });
  }, [filteredJobs, currentDate, viewType]);

  const handleCreateJob = (date?: Date) => {
    setSelectedDate(date || null);
    setIsJobFormOpen(true);
  };

  const renderCalendarView = () => {
    const commonProps = {
      currentDate,
      onDateChange: setCurrentDate,
      onCreateJob: handleCreateJob,
      jobs: dateRangeFilteredJobs,
    };

    if (calendarView === 'employee') {
      switch (viewType) {
        case 'month':
          return <EmployeeMonthView {...commonProps} />;
        case 'week':
          return <EmployeeWeekView {...commonProps} />;
        case 'day':
          return <EmployeeDayView {...commonProps} />;
        default:
          return <EmployeeMonthView {...commonProps} />;
      }
    } else {
      switch (viewType) {
        case 'month':
          return <MonthViewGrid {...commonProps} />;
        case 'week':
          return <WeekView {...commonProps} />;
        case 'day':
          return <DayView {...commonProps} />;
        default:
          return <MonthViewGrid {...commonProps} />;
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
          viewType={calendarView}
          onViewChange={setCalendarView}
        />
      </div>

      {renderCalendarView()}

      <JobForm
        isOpen={isJobFormOpen}
        onClose={() => {
          setIsJobFormOpen(false);
          setSelectedDate(null);
        }}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default JobCalendar;
