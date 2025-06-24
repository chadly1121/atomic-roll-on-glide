
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';

export type CalendarView = 'month' | 'week' | 'day';

interface CalendarViewSelectorProps {
  currentDate: Date;
  viewType: CalendarView;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}

const CalendarViewSelector: React.FC<CalendarViewSelectorProps> = ({
  currentDate,
  viewType,
  onDateChange,
  onViewChange,
}) => {
  const views = [
    { id: 'month' as const, label: 'Month', icon: Calendar },
    { id: 'week' as const, label: 'Week', icon: CalendarDays },
    { id: 'day' as const, label: 'Day', icon: Clock },
  ];

  const handlePrevious = () => {
    switch (viewType) {
      case 'month':
        onDateChange(subMonths(currentDate, 1));
        break;
      case 'week':
        onDateChange(subWeeks(currentDate, 1));
        break;
      case 'day':
        onDateChange(subDays(currentDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (viewType) {
      case 'month':
        onDateChange(addMonths(currentDate, 1));
        break;
      case 'week':
        onDateChange(addWeeks(currentDate, 1));
        break;
      case 'day':
        onDateChange(addDays(currentDate, 1));
        break;
    }
  };

  const getDateDisplayText = () => {
    switch (viewType) {
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'week':
        return `Week of ${format(currentDate, 'MMM d, yyyy')}`;
      case 'day':
        return format(currentDate, 'EEEE, MMM d, yyyy');
      default:
        return format(currentDate, 'MMMM yyyy');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-[200px] text-center font-semibold">
          {getDateDisplayText()}
        </div>
        <Button variant="outline" size="sm" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-1 border rounded-lg p-1">
        {views.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={viewType === id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange(id)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalendarViewSelector;
