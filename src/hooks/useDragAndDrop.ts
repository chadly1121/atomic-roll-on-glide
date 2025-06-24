
import { useState, useCallback } from 'react';
import { Job } from '@/types/job';

export interface DragData {
  job: Job;
  sourceDate: Date;
  dragType: 'move' | 'resize-start' | 'resize-end';
}

export const useDragAndDrop = () => {
  const [dragData, setDragData] = useState<DragData | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = useCallback((job: Job, dragType: 'move' | 'resize-start' | 'resize-end' = 'move') => {
    const sourceDate = job.startDate ? new Date(job.startDate) : new Date();
    setDragData({ job, sourceDate, dragType });
    setIsDragging(true);
  }, []);

  const endDrag = useCallback(() => {
    setDragData(null);
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((targetDate: Date, onJobUpdate: (jobId: string, updates: Partial<Job>) => void) => {
    if (!dragData) return;

    const { job, dragType } = dragData;
    
    if (dragType === 'move') {
      // Move the entire job to the new date
      const timeDiff = targetDate.getTime() - new Date(job.startDate!).getTime();
      const newStartDate = targetDate;
      const newEndDate = job.endDate ? new Date(new Date(job.endDate).getTime() + timeDiff) : undefined;
      
      onJobUpdate(job.id, {
        startDate: newStartDate,
        endDate: newEndDate
      });
    } else if (dragType === 'resize-start') {
      // Resize from the start
      onJobUpdate(job.id, {
        startDate: targetDate
      });
    } else if (dragType === 'resize-end') {
      // Resize from the end
      onJobUpdate(job.id, {
        endDate: targetDate
      });
    }

    endDrag();
  }, [dragData, endDrag]);

  return {
    dragData,
    isDragging,
    startDrag,
    endDrag,
    handleDrop
  };
};
