
import React from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types/job';
import { useCustomers } from '@/hooks/useCustomers';
import { MapPin, Users, Clock } from 'lucide-react';

interface WeekViewProps {
  selectedDate: Date;
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onDateClick: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ selectedDate, jobs, onJobClick, onDateClick }) => {
  const { getCustomerById } = useCustomers();
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getJobsForDate = (date: Date) => {
    return jobs.filter(job => {
      if (!job.startDate) return false;
      return isSameDay(new Date(job.startDate), date);
    });
  };

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
    <div className="grid grid-cols-7 gap-1 h-[600px]">
      {weekDays.map((day, index) => {
        const dayJobs = getJobsForDate(day);
        const isCurrentDay = isToday(day);
        
        return (
          <div key={index} className="flex flex-col min-h-0">
            <div 
              className={`p-2 text-center border-b cursor-pointer hover:bg-gray-50 ${
                isCurrentDay ? 'bg-blue-50 border-blue-200' : 'bg-white'
              }`}
              onClick={() => onDateClick(day)}
            >
              <div className="text-xs text-gray-500 uppercase">
                {format(day, 'EEE')}
              </div>
              <div className={`text-lg font-semibold ${
                isCurrentDay ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {format(day, 'd')}
              </div>
            </div>
            
            <div className="flex-1 p-1 space-y-1 overflow-y-auto">
              {dayJobs.map((job) => {
                const customer = job.customerId ? getCustomerById(job.customerId) : null;
                return (
                  <Card 
                    key={job.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow text-xs border ${getStatusColor(job.status)}`}
                    onClick={() => onJobClick(job)}
                  >
                    <CardContent className="p-2">
                      <div className="font-medium truncate mb-1">{job.jobName}</div>
                      
                      <div className="space-y-1 text-xs opacity-80">
                        {customer && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span className="truncate">{customer.firstName} {customer.lastName}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        
                        {job.startDate && job.endDate && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{format(new Date(job.startDate), 'HH:mm')}</span>
                          </div>
                        )}
                      </div>
                      
                      <Badge 
                        className={`mt-1 text-xs ${getStatusColor(job.status)}`}
                        variant="outline"
                      >
                        {job.status}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
              
              {dayJobs.length === 0 && (
                <div 
                  className="h-8 border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center text-xs text-gray-400"
                  onClick={() => onDateClick(day)}
                >
                  + Add Job
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
