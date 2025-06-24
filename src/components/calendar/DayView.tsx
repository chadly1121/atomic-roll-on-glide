
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { useCustomers } from '@/hooks/useCustomers';
import { MapPin, Users, Clock, Plus } from 'lucide-react';

interface DayViewProps {
  selectedDate: Date;
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onCreateJob: () => void;
}

const DayView: React.FC<DayViewProps> = ({ selectedDate, jobs, onJobClick, onCreateJob }) => {
  const { getCustomerById } = useCustomers();
  
  const dayJobs = jobs.filter(job => {
    if (!job.startDate) return false;
    return isSameDay(new Date(job.startDate), selectedDate);
  });

  const timeSlots = Array.from({ length: 24 }, (_, hour) => {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    return { hour, time, jobs: [] as Job[] };
  });

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
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h3>
        <Button onClick={onCreateJob} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Schedule Job
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto">
        {dayJobs.length > 0 ? (
          dayJobs.map((job) => {
            const customer = job.customerId ? getCustomerById(job.customerId) : null;
            return (
              <Card 
                key={job.id}
                className={`cursor-pointer hover:shadow-lg transition-shadow border-l-4 ${getStatusColor(job.status)}`}
                onClick={() => onJobClick(job)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-lg">{job.jobName}</h4>
                    <Badge className={getStatusColor(job.status)} variant="outline">
                      {job.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    {customer && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{customer.firstName} {customer.lastName}</span>
                        {customer.companyName && (
                          <span className="text-gray-400">({customer.companyName})</span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    
                    {job.employees.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Team: {job.employees.join(', ')}</span>
                      </div>
                    )}
                    
                    {job.foreman && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Foreman: {job.foreman}</span>
                      </div>
                    )}
                    
                    {job.startDate && job.endDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(new Date(job.startDate), 'h:mm a')} - {format(new Date(job.endDate), 'h:mm a')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {job.notes && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                      <strong>Notes:</strong> {job.notes}
                    </div>
                  )}
                  
                  {job.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="border-2 border-dashed border-gray-200">
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No jobs scheduled</h4>
              <p className="text-gray-500 mb-4">
                Schedule a new job for {format(selectedDate, 'MMMM d, yyyy')}
              </p>
              <Button onClick={onCreateJob} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Job
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DayView;
