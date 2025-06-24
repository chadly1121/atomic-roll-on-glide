
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Users, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CalendarHeaderProps {
  onCreateJob: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ onCreateJob }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-atomic-navy">Project Calendar</h2>
        <p className="text-gray-600">Schedule and manage painting projects</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={() => navigate('/employees')} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          New Employee
        </Button>
        <Button 
          onClick={() => navigate('/customers')} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          New Customer
        </Button>
        <Button onClick={onCreateJob} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
