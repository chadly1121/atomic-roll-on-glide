
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useIsMobile } from '@/hooks/use-mobile';

interface BreadcrumbProps {
  items?: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
}

const PageBreadcrumbs: React.FC<BreadcrumbProps> = ({ items, className }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // If no items are provided, generate them based on the current path
  const breadcrumbItems = items || generateBreadcrumbItems(location.pathname);
  
  if (breadcrumbItems.length <= 1 && location.pathname === '/') {
    return null; // Don't show breadcrumbs on the homepage
  }
  
  return (
    <div className={`py-2 px-4 bg-white/80 backdrop-blur-sm ${className}`}>
      <div className="container mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home is always first */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            
            {/* Dynamic items */}
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              
              // Don't show too many items on mobile
              if (isMobile && !isLast && breadcrumbItems.length > 3 && index !== 0) {
                return null;
              }
              
              return (
                <React.Fragment key={item.label}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href || '#'}>{item.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

// Helper function to generate breadcrumb items based on URL path
function generateBreadcrumbItems(path: string) {
  if (path === '/') return [];
  
  const segments = path.split('/').filter(Boolean);
  
  return segments.map((segment, index) => {
    // Convert segment to readable format (e.g., blog-post to Blog Post)
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Create path for this breadcrumb level
    const href = '/' + segments.slice(0, index + 1).join('/');
    
    return { label, href };
  });
}

export default PageBreadcrumbs;
