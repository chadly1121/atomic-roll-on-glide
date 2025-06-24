
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
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

  return (
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
            onSelect={(date) => date && onDateClick(date)}
            modifiers={{
              hasJobs: daysWithJobs,
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
                  onClick={() => onJobClick(job)}
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
                onClick={() => onCreateJobForDate(selectedDate)}
              >
                Schedule a Project
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MonthViewGrid;
