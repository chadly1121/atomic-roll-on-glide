
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, MapPin, Clock } from 'lucide-react';
import { Job } from '@/types/job';
import { useCustomers } from '@/hooks/useCustomers';

interface MonthViewGridProps {
  selectedDate: Date;
  onDateClick: (date: Date) => void;
  daysWithJobs: Date[];
  selectedDateJobs: Job[];
  onJobClick: (job: Job) => void;
  onCreateJobForDate: (date: Date) => void;
}

const MonthViewGrid: React.FC<MonthViewGridProps> = ({
  selectedDate,
  onDateClick,
  daysWithJobs,
  selectedDateJobs,
  onJobClick,
  onCreateJobForDate,
}) => {
  const { getCustomerById } = useCustomers();
  
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Filter to get only active jobs
  const activeJobs = selectedDateJobs.filter(job => job.active);

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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Job Schedule - {format(selectedDate, 'MMMM yyyy')}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-50 text-left font-medium min-w-[250px]">Active Jobs</th>
              {monthDays.map((day) => (
                <th 
                  key={day.toISOString()} 
                  className={`border p-1 text-xs font-medium cursor-pointer hover:bg-gray-100 ${
                    isToday(day) ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                  onClick={() => onDateClick(day)}
                >
                  <div className="text-center">
                    <div className="text-gray-500">{format(day, 'EEE')}</div>
                    <div className={isToday(day) ? 'text-blue-600 font-semibold' : ''}>{format(day, 'd')}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeJobs.length > 0 ? (
              activeJobs.map((job) => {
                const customer = job.customerId ? getCustomerById(job.customerId) : null;
                return (
                  <tr key={job.id}>
                    <td className="border p-2 font-medium bg-gray-50">
                      <div 
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                        onClick={() => onJobClick(job)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {job.color && (
                            <div 
                              className="w-4 h-4 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: job.color }}
                            />
                          )}
                          <div className="font-semibold text-sm">{job.jobName}</div>
                          <Badge 
                            className={`${getStatusColor(job.status)} text-xs ml-auto`}
                            variant="outline"
                          >
                            {job.status}
                          </Badge>
                        </div>
                        
                        {customer && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                            <Users className="h-3 w-3" />
                            {customer.firstName} {customer.lastName}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        
                        {job.employees.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Users className="h-3 w-3" />
                            <span className="truncate">{job.employees.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    {monthDays.map((day) => {
                      const hasJobOnDay = job.startDate && isSameDay(new Date(job.startDate), day);
                      return (
                        <td 
                          key={day.toISOString()} 
                          className="border p-1 text-xs cursor-pointer hover:bg-gray-50"
                          onClick={() => onDateClick(day)}
                        >
                          {hasJobOnDay && (
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                              ●
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={monthDays.length + 1} className="border p-8 text-center text-gray-500">
                  <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active projects for this month</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => onCreateJobForDate(selectedDate)}
                  >
                    Schedule a Project
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthViewGrid;
