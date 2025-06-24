
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { useCustomers } from '@/hooks/useCustomers';

export interface CalendarFiltersType {
  search: string;
  status: string;
  employee: string;
  customer: string;
  tags: string[];
}

interface CalendarFiltersProps {
  filters: CalendarFiltersType;
  onFiltersChange: (filters: CalendarFiltersType) => void;
  availableTags: string[];
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTags,
}) => {
  const { employees } = useEmployees();
  const { customers } = useCustomers();

  const handleFilterChange = (key: keyof CalendarFiltersType, value: string | string[]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: '',
      employee: '',
      customer: '',
      tags: [],
    });
  };

  const hasActiveFilters = filters.search || filters.status || filters.employee || filters.customer || filters.tags.length > 0;

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status Filter */}
        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Complete">Complete</SelectItem>
          </SelectContent>
        </Select>

        {/* Employee Filter */}
        <Select value={filters.employee} onValueChange={(value) => handleFilterChange('employee', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Employees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Employees</SelectItem>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={`${employee.firstName} ${employee.lastName}`}>
                {employee.firstName} {employee.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Customer Filter */}
        <Select value={filters.customer} onValueChange={(value) => handleFilterChange('customer', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Customers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Customers</SelectItem>
            {customers.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
                {customer.companyName && ` (${customer.companyName})`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      {availableTags.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Tags:</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = filters.tags.includes(tag);
              return (
                <Badge
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newTags = isSelected
                      ? filters.tags.filter(t => t !== tag)
                      : [...filters.tags, tag];
                    handleFilterChange('tags', newTags);
                  }}
                >
                  {tag}
                  {isSelected && <X className="h-3 w-3 ml-1" />}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-2 border-t">
          <div className="text-sm text-gray-600">
            Active filters: {[
              filters.search && `Search: "${filters.search}"`,
              filters.status && `Status: ${filters.status}`,
              filters.employee && `Employee: ${filters.employee}`,
              filters.customer && `Customer: ${customers.find(c => c.id === filters.customer)?.firstName} ${customers.find(c => c.id === filters.customer)?.lastName}`,
              ...filters.tags.map(tag => `Tag: ${tag}`)
            ].filter(Boolean).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarFilters;
