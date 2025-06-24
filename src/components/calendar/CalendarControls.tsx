
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarViewSelector, { CalendarView } from './CalendarViewSelector';

interface CalendarControlsProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  viewTitle: string;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const CalendarControls: React.FC<CalendarControlsProps> = ({
  currentView,
  onViewChange,
  viewTitle,
  onNavigate,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <CalendarViewSelector
          currentView={currentView}
          onViewChange={onViewChange}
        />
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onNavigate('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold min-w-[200px] text-center">{viewTitle}</h3>
          <Button variant="outline" size="sm" onClick={() => onNavigate('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarControls;
