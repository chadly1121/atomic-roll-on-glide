
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar, Briefcase, Users, UserCheck, ChevronDown } from 'lucide-react';

const navigationItems = [
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Jobs",
    url: "/jobs", 
    icon: Briefcase,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: UserCheck,
  },
  {
    title: "Customers", 
    url: "/customers",
    icon: Users,
  },
];

interface ManagementDropdownProps {
  currentPage: string;
}

export function ManagementDropdown({ currentPage }: ManagementDropdownProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentItem = navigationItems.find(item => 
    item.url === location.pathname || item.title.toLowerCase() === currentPage
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {currentItem?.icon && <currentItem.icon className="h-4 w-4" />}
          {currentItem?.title || 'Management'}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white border shadow-lg z-50">
        {navigationItems.map((item) => (
          <DropdownMenuItem 
            key={item.title}
            onClick={() => navigate(item.url)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
