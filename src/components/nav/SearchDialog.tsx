
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { navLinks } from './NavLinks';
import { services } from '../services/ServicesData';
import { blogPosts } from '@/data/blogData';

// Define the search result types
type SearchResultType = {
  title: string;
  url: string;
  type: 'navigation' | 'service' | 'blog' | 'page';
  description?: string;
};

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Combine all searchable content
  const searchResults: SearchResultType[] = [
    // Navigation items
    ...navLinks.map(link => ({
      title: link.name,
      url: link.href,
      type: 'navigation' as const,
      description: `Navigate to ${link.name}`
    })),
    
    // Services
    ...services.map(service => ({
      title: service.title,
      url: '#services',
      type: 'service' as const,
      description: service.description
    })),
    
    // Blog posts
    ...blogPosts.map(post => ({
      title: post.title,
      url: `/blog/${post.id}`,
      type: 'blog' as const,
      description: post.excerpt
    })),
    
    // Additional pages
    { title: 'About Us', url: '#about', type: 'page' as const, description: 'Learn about Roll On Painting Muskoka' },
    { title: 'Contact', url: '#contact', type: 'page' as const, description: 'Get in touch with us' },
    { title: 'Free Touch-Ups', url: '#', type: 'page' as const, description: 'Information about our free touch-ups offer' }
  ];
  
  const filteredResults = searchQuery === '' 
    ? [] 
    : searchResults.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleSelect = useCallback((item: SearchResultType) => {
    setSearchQuery('');
    onClose();
    
    // Handle navigation based on the URL
    if (item.url.startsWith('/')) {
      navigate(item.url);
    } else if (item.url.startsWith('#')) {
      // If on homepage, scroll to section
      const element = document.querySelector(item.url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If not on homepage, navigate to homepage with hash
        navigate(`/${item.url}`);
      }
    }
  }, [navigate, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search for services, pages, blog posts..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-11"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {filteredResults.length > 0 && (
              <>
                <CommandGroup heading="Navigation">
                  {filteredResults
                    .filter(item => item.type === 'navigation')
                    .map(item => (
                      <CommandItem 
                        key={item.title} 
                        onSelect={() => handleSelect(item)}
                        className="flex items-center cursor-pointer p-2 hover:bg-slate-100"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
                
                <CommandGroup heading="Services">
                  {filteredResults
                    .filter(item => item.type === 'service')
                    .map(item => (
                      <CommandItem 
                        key={item.title} 
                        onSelect={() => handleSelect(item)}
                        className="flex items-center cursor-pointer p-2 hover:bg-slate-100"
                      >
                        <div>
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground truncate max-w-xs">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
                
                <CommandGroup heading="Blog Posts">
                  {filteredResults
                    .filter(item => item.type === 'blog')
                    .map(item => (
                      <CommandItem 
                        key={item.title} 
                        onSelect={() => handleSelect(item)}
                        className="flex items-center cursor-pointer p-2 hover:bg-slate-100"
                      >
                        <div>
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground truncate max-w-xs">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
                
                <CommandGroup heading="Pages">
                  {filteredResults
                    .filter(item => item.type === 'page')
                    .map(item => (
                      <CommandItem 
                        key={item.title} 
                        onSelect={() => handleSelect(item)}
                        className="flex items-center cursor-pointer p-2 hover:bg-slate-100"
                      >
                        <div>
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
