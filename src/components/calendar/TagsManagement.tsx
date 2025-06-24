
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tags, Plus, X } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';

const TagsManagement: React.FC = () => {
  const { jobs } = useJobs();
  const [isOpen, setIsOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  // Get all unique tags from jobs
  const allTags = Array.from(new Set(jobs.flatMap(job => job.tags))).sort();

  const handleAddTag = () => {
    if (newTag.trim()) {
      // In a real app, you'd want to save this to a tags collection
      console.log('Adding new tag:', newTag.trim());
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    // In a real app, you'd want to remove this tag from all jobs and delete it
    console.log('Removing tag:', tag);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Tags className="h-4 w-4" />
          Manage Tags
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter new tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button onClick={handleAddTag} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Existing Tags</h4>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {allTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
              {allTags.length === 0 && (
                <p className="text-sm text-gray-500">No tags found. Create some tags to organize your jobs.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagsManagement;
