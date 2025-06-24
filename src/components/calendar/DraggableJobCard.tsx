
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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

  const sizeClasses = {
    small: 'text-xs p-2',
    medium: 'text-sm p-3',
    large: 'text-base p-4'
  };

  // Use job color if available, otherwise use status color
  const cardStyle = job.color ? {
    backgroundColor: job.color,
    color: getContrastTextColor(job.color),
    borderLeftColor: job.color
  } : {};

  const cardClassName = job.color 
    ? 'border-l-4' 
    : `border-l-4 ${getStatusColor(job.status)}`;

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all duration-200 relative group ${cardClassName} ${
        isDragging ? 'opacity-50 transform rotate-2' : ''
      }`}
      style={cardStyle}
      onClick={() => onJobClick(job)}
      draggable
      onDragStart={(e) => handleDragStart(e, 'move')}
    >
      {/* Resize handles */}
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

      <CardContent className={sizeClasses[size]}>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold truncate pr-6">{job.jobName}</h4>
            <Badge 
              className={`${job.color ? 'bg-white/20 text-inherit' : getStatusColor(job.status)} text-xs`} 
              variant="outline"
            >
              {job.status}
            </Badge>
          </div>
          
          {size !== 'small' && (
            <div className="space-y-1 text-xs opacity-80">
              {customer && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="truncate">{customer.firstName} {customer.lastName}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{job.location}</span>
              </div>
              
              {job.startDate && job.endDate && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{format(new Date(job.startDate), 'HH:mm')}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DraggableJobCard;
