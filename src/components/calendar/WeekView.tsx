
import React from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import { Job } from '@/types/job';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import DraggableJobCard from './DraggableJobCard';
import DropZone from './DropZone';

interface WeekViewProps {
  selectedDate: Date;
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onDateClick: (date: Date) => void;
  onJobUpdate?: (jobId: string, updates: Partial<Job>) => void;
  onCreateJobForDate?: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ 
  selectedDate, 
  jobs, 
  onJobClick, 
  onDateClick, 
  onJobUpdate,
  onCreateJobForDate 
}) => {
  const { dragData, isDragging, startDrag, handleDrop } = useDragAndDrop();
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getJobsForDate = (date: Date) => {
    return jobs.filter(job => {
      if (!job.startDate) return false;
      return isSameDay(new Date(job.startDate), date);
    });
  };

  const handleJobDrop = (date: Date) => {
    if (onJobUpdate) {
      handleDrop(date, onJobUpdate);
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
            
            <DropZone
              date={day}
              onDrop={handleJobDrop}
              onCreateJob={onCreateJobForDate}
              className="flex-1 p-1 space-y-1 overflow-y-auto"
            >
              {dayJobs.map((job) => (
                <DraggableJobCard
                  key={job.id}
                  job={job}
                  onJobClick={onJobClick}
                  onDragStart={startDrag}
                  isDragging={isDragging && dragData?.job.id === job.id}
                  size="small"
                />
              ))}
            </DropZone>
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
