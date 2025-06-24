
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { Employee } from '@/types/employee';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';

interface EmployeeMonthViewProps {
  selectedDate: Date;
  employees: Employee[];
  jobs: Job[];
  onDateClick: (date: Date) => void;
}

const EmployeeMonthView: React.FC<EmployeeMonthViewProps> = ({
  selectedDate,
  employees,
  jobs,
  onDateClick,
}) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getJobsForEmployeeAndDate = (employeeName: string, date: Date) => {
    return jobs.filter(job => {
      if (!job.startDate) return false;
      if (!isSameDay(new Date(job.startDate), date)) return false;
      return job.employees.includes(employeeName) || job.foreman === employeeName;
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Employee Schedule - {format(selectedDate, 'MMMM yyyy')}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-50 text-left font-medium">Employee</th>
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
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border p-2 font-medium bg-gray-50">
                  <div>
                    <div>{employee.firstName} {employee.lastName}</div>
                    <div className="text-sm text-gray-500">{employee.role}</div>
                  </div>
                </td>
                {monthDays.map((day) => {
                  const dayJobs = getJobsForEmployeeAndDate(`${employee.firstName} ${employee.lastName}`, day);
                  return (
                    <td 
                      key={day.toISOString()} 
                      className="border p-1 text-xs cursor-pointer hover:bg-gray-50"
                      onClick={() => onDateClick(day)}
                    >
                      <div className="space-y-1">
                        {dayJobs.map((job) => (
                          <Badge 
                            key={job.id} 
                            variant="outline" 
                            className="text-xs p-1 block truncate"
                            title={job.jobName}
                          >
                            {job.jobName}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeMonthView;
