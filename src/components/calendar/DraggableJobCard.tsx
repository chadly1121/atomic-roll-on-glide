
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types/job';
import { useCustomers } from '@/hooks/useCustomers';
import { MapPin, Users, Clock, GripVertical } from 'lucide-react';
import { format } from 'date-fns';
import { getContrastTextColor } from '@/utils/colorUtils';

interface DraggableJobCardProps {
  job: Job;
  onJobClick: (job: Job) => void;
  onDragStart: (job: Job, dragType: 'move' | 'resize-start' | 'resize-end') => void;
  isDragging?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const DraggableJobCard: React.FC<DraggableJobCardProps> = ({
  job,
  onJobClick,
  onDragStart,
  isDragging = false,
  size = 'medium'
}) => {
  const { getCustomerById } = useCustomers();
  const customer = job.customerId ? getCustomerById(job.customerId) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Complete':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDragStart = (e: React.DragEvent, dragType: 'move' | 'resize-start' | 'resize-end') => {
    e.stopPropagation();
    onDragStart(job, dragType);
  };

  if (size === 'small') {
    return (
      <Card 
        className={`cursor-pointer hover:shadow-md transition-all duration-200 relative group ${
          isDragging ? 'opacity-50 transform rotate-2' : ''
        }`}
        onClick={() => onJobClick(job)}
        draggable
        onDragStart={(e) => handleDragStart(e, 'move')}
      >
        <div
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
          draggable
          onDragStart={(e) => handleDragStart(e, 'move')}
        >
          <GripVertical className="h-3 w-3 text-gray-400" />
        </div>

        <CardContent className="p-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-xs truncate pr-4">{job.jobName}</h4>
              <Badge 
                className={`${getStatusColor(job.status)} text-xs`} 
                variant="outline"
              >
                {job.status}
              </Badge>
            </div>
            
            <div className="text-xs text-gray-500 truncate">
              {job.location}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all duration-200 relative group ${
        isDragging ? 'opacity-50 transform rotate-2' : ''
      }`}
      onClick={() => onJobClick(job)}
      draggable
      onDragStart={(e) => handleDragStart(e, 'move')}
    >
      {/* Resize handles for larger sizes */}
      {size !== 'small' && (
        <>
          <div
            className="absolute left-0 top-0 h-full w-2 cursor-w-resize opacity-0 group-hover:opacity-100 bg-blue-500 rounded-l transition-opacity"
            draggable
            onDragStart={(e) => handleDragStart(e, 'resize-start')}
            title="Drag to resize start date"
          />
          <div
            className="absolute right-0 top-0 h-full w-2 cursor-e-resize opacity-0 group-hover:opacity-100 bg-blue-500 rounded-r transition-opacity"
            draggable
            onDragStart={(e) => handleDragStart(e, 'resize-end')}
            title="Drag to resize end date"
          />
        </>
      )}

      {/* Drag handle */}
      <div
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'move')}
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {job.color && (
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: job.color }}
            />
          )}
          {job.jobName}
          <Badge 
            className={`${getStatusColor(job.status)} text-xs ml-auto`} 
            variant="outline"
          >
            {job.status}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {customer && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span className="truncate">{customer.firstName} {customer.lastName}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{job.location}</span>
          </div>
          
          {job.employees && job.employees.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span className="truncate">{job.employees.join(', ')}</span>
            </div>
          )}
          
          {job.startDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>
                {format(new Date(job.startDate), 'MMM d')}
                {job.endDate && ` - ${format(new Date(job.endDate), 'MMM d')}`}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DraggableJobCard;
