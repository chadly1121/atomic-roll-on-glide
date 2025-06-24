
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface DropZoneProps {
  date: Date;
  onDrop: (date: Date) => void;
  onCreateJob?: (date: Date) => void;
  children?: React.ReactNode;
  className?: string;
}

const DropZone: React.FC<DropZoneProps> = ({
  date,
  onDrop,
  onCreateJob,
  children,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    onDrop(date);
  };

  return (
    <div
      className={`relative min-h-[60px] transition-all duration-200 ${
        isDragOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      
      {/* Drop indicator */}
      {isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 rounded">
          <div className="text-blue-600 font-medium text-sm">Drop here</div>
        </div>
      )}
      
      {/* Add job button when empty */}
      {!children && onCreateJob && (
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => onCreateJob(date)}
        >
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Plus className="h-3 w-3" />
            Add Job
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
