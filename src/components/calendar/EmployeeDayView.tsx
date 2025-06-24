
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Employee } from '@/types/employee';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  onDateClick,
}) => {
  const getJobsForEmployeeAndDate = (employeeName: string, date: Date) => {
    return jobs.filter(job => {
      if (!job.startDate) return false;
      if (!isSameDay(new Date(job.startDate), date)) return false;
      return job.employees.includes(employeeName) || job.foreman === employeeName;
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Employee Schedule - {format(selectedDate, 'EEEE, MMMM d, yyyy')}
      </h3>
      
      <div className="grid gap-4">
        {employees.map((employee) => {
          const employeeJobs = getJobsForEmployeeAndDate(`${employee.firstName} ${employee.lastName}`, selectedDate);
          
          return (
            <Card key={employee.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  {employee.color && (
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: employee.color }}
                    />
                  )}
                  {employee.firstName} {employee.lastName}
                  <span className="text-sm text-gray-500 font-normal">({employee.role})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {employeeJobs.length > 0 ? (
                  <div className="space-y-2">
                    {employeeJobs.map((job) => (
                      <Badge 
                        key={job.id} 
                        variant="outline" 
                        className="mr-2 mb-2 p-2 block"
                      >
                        <div>
                          <div className="font-medium">{job.jobName}</div>
                          <div className="text-xs text-gray-500">{job.location}</div>
                          <div className="text-xs">
                            Status: <span className="font-medium">{job.status}</span>
                          </div>
                        </div>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No jobs scheduled</div>
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
