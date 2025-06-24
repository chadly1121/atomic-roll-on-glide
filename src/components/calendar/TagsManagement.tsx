
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tags, Plus, X } from 'lucide-react';
import { useTags } from '@/hooks/useTags';
import { useToast } from '@/hooks/use-toast';

const TagsManagement: React.FC = () => {
  const { tags, addTag, removeTag } = useTags();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim()) {
      const success = addTag(newTag.trim());
      if (success) {
        toast({
          title: "Tag added",
          description: `"${newTag.trim()}" has been added to your tags.`,
        });
        setNewTag('');
      } else {
        toast({
          title: "Tag already exists",
          description: `"${newTag.trim()}" is already in your tag list.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    removeTag(tag);
    toast({
      title: "Tag removed",
      description: `"${tag}" has been removed from your tags.`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
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
              onKeyPress={handleKeyPress}
            />
            <Button onClick={handleAddTag} size="sm" disabled={!newTag.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Existing Tags ({tags.length})</h4>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-md bg-gray-50">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" 
                    onClick={() => handleRemoveTag(tag)}
                    title={`Remove "${tag}" tag`}
                  />
                </Badge>
              ))}
              {tags.length === 0 && (
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
