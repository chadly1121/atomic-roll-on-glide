
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { Plus } from 'lucide-react';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import DraggableJobCard from './DraggableJobCard';
import DropZone from './DropZone';

interface DayViewProps {
  selectedDate: Date;
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onCreateJob: () => void;
  onJobUpdate?: (jobId: string, updates: Partial<Job>) => void;
}

const DayView: React.FC<DayViewProps> = ({ 
  selectedDate, 
  jobs, 
  onJobClick, 
  onCreateJob, 
  onJobUpdate 
}) => {
  const { dragData, isDragging, startDrag, handleDrop } = useDragAndDrop();
  
  const dayJobs = jobs.filter(job => {
    if (!job.startDate) return false;
    return isSameDay(new Date(job.startDate), selectedDate);
  });

  const handleJobDrop = (date: Date) => {
    if (onJobUpdate) {
      handleDrop(date, onJobUpdate);
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

      <DropZone
        date={selectedDate}
        onDrop={handleJobDrop}
        onCreateJob={() => onCreateJob()}
        className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto p-4 border-2 border-dashed border-gray-200 rounded-lg"
      >
        {dayJobs.length > 0 ? (
          dayJobs.map((job) => (
            <DraggableJobCard
              key={job.id}
              job={job}
              onJobClick={onJobClick}
              onDragStart={startDrag}
              isDragging={isDragging && dragData?.job.id === job.id}
              size="large"
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-lg font-medium text-gray-600 mb-2">No jobs scheduled</div>
            <p className="text-gray-500 mb-4">
              Schedule a new job for {format(selectedDate, 'MMMM d, yyyy')}
            </p>
            <Button onClick={onCreateJob} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Job
            </Button>
          </div>
        )}
      </DropZone>
    </div>
  );
};

export default DayView;
