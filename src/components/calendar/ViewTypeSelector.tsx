
import React from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase, Users } from 'lucide-react';
import { CalendarViewType } from '@/types/calendarView';

interface ViewTypeSelectorProps {
  currentViewType: CalendarViewType;
  onViewTypeChange: (viewType: CalendarViewType) => void;
}

const ViewTypeSelector: React.FC<ViewTypeSelectorProps> = ({
  currentViewType,
  onViewTypeChange,
}) => {
  const viewTypes = [
    { id: 'jobs' as const, label: 'Jobs', icon: Briefcase },
    { id: 'employees' as const, label: 'Employees', icon: Users },
  ];

  return (
    <div className="flex gap-1 border rounded-lg p-1">
      {viewTypes.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={currentViewType === id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewTypeChange(id)}
          className="flex items-center gap-2"
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ViewTypeSelector;
