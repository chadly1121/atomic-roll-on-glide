
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Calendar, Clock } from 'lucide-react';

export type CalendarView = 'month' | 'week' | 'day';

interface CalendarViewSelectorProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

const CalendarViewSelector: React.FC<CalendarViewSelectorProps> = ({
  currentView,
  onViewChange,
}) => {
  const views = [
    { id: 'month' as const, label: 'Month', icon: Calendar },
    { id: 'week' as const, label: 'Week', icon: CalendarDays },
    { id: 'day' as const, label: 'Day', icon: Clock },
  ];

  return (
    <div className="flex gap-1 border rounded-lg p-1">
      {views.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={currentView === id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(id)}
          className="flex items-center gap-2"
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default CalendarViewSelector;
