
import { useState, useEffect } from 'react';

// Mock data for demonstration - in a real app this would come from a database
const mockTags: string[] = ['interior', 'exterior', 'commercial', 'residential', 'urgent', 'maintenance'];

export const useTags = () => {
  const [tags, setTags] = useState<string[]>(mockTags);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags(prev => [...prev, trimmedTag].sort());
      return true;
    }
    return false;
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const getAllTags = () => {
    return tags.sort();
  };

  return {
    tags,
    addTag,
    removeTag,
    getAllTags,
  };
};
