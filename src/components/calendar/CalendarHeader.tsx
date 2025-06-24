
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CalendarHeaderProps {
  onCreateJob: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ onCreateJob }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-atomic-navy">Project Calendar</h2>
        <p className="text-gray-600">Schedule and manage painting projects</p>
      </div>
      <Button onClick={onCreateJob} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  );
};

export default CalendarHeader;
