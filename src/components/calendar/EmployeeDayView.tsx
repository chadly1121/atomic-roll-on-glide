
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Employee } from '@/types/employee';
import { Job } from '@/types/job';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users } from 'lucide-react';

interface EmployeeDayViewProps {
  selectedDate: Date;
  employees: Employee[];
  jobs: Job[];
  onDateClick: (date: Date) => void;
}

const EmployeeDayView: React.FC<EmployeeDayViewProps> = ({
  selectedDate,
  employees,
  jobs,
}) => {
  const getJobsForEmployeeAndDate = (employeeName: string, date: Date) => {
    return jobs.filter(job => {
      if (!job.startDate) return false;
      if (!isSameDay(new Date(job.startDate), date)) return false;
      return job.employees.includes(employeeName) || job.foreman === employeeName;
    });
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Employee Schedule - {format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
      
      <div className="grid gap-4">
        {employees.map((employee) => {
          const employeeName = `${employee.firstName} ${employee.lastName}`;
          const dayJobs = getJobsForEmployeeAndDate(employeeName, selectedDate);
          
          return (
            <Card key={employee.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <div className="text-lg">{employeeName}</div>
                    <div className="text-sm text-gray-500 font-normal">{employee.role}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dayJobs.length} {dayJobs.length === 1 ? 'Job' : 'Jobs'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dayJobs.length > 0 ? (
                  <div className="grid gap-3">
                    {dayJobs.map((job) => (
                      <Card key={job.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{job.jobName}</h4>
                              <Badge className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </div>
                            
                            {job.employees.length > 0 && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="h-3 w-3" />
                                Team: {job.employees.join(', ')}
                                {job.foreman && (
                                  <span className="text-blue-600 font-medium">
                                    (Foreman: {job.foreman})
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {job.startDate && job.endDate && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-3 w-3" />
                                {format(new Date(job.startDate), 'MMM d')} - {format(new Date(job.endDate), 'MMM d')}
                              </div>
                            )}

                            {job.notes && (
                              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                {job.notes}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No jobs scheduled for this employee today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeDayView;
