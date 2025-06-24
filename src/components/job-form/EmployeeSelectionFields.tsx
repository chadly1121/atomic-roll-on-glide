
import React from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { JobFormData } from './jobFormSchema';
import { useEmployees } from '@/hooks/useEmployees';

interface EmployeeSelectionFieldsProps {
  control: Control<JobFormData>;
}

const EmployeeSelectionFields: React.FC<EmployeeSelectionFieldsProps> = ({ control }) => {
  const { employees } = useEmployees();

  return (
    <div className="grid grid-cols-1 gap-4">
      <FormField
        control={control}
        name="employees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employees</FormLabel>
            <div className="space-y-2">
              <Select
                onValueChange={(value) => {
                  if (value && !field.value?.includes(value)) {
                    const newEmployees = [...(field.value || []), value];
                    field.onChange(newEmployees);
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employees..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem 
                      key={employee.id} 
                      value={`${employee.firstName} ${employee.lastName}`}
                      disabled={field.value?.includes(`${employee.firstName} ${employee.lastName}`)}
                    >
                      <div className="flex items-center gap-2">
                        {employee.color && (
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: employee.color }}
                          />
                        )}
                        {employee.firstName} {employee.lastName}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Selected employees */}
              {field.value && field.value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {field.value.map((employeeName) => {
                    const employee = employees.find(emp => 
                      `${emp.firstName} ${emp.lastName}` === employeeName
                    );
                    return (
                      <Badge key={employeeName} variant="secondary" className="flex items-center gap-1">
                        {employee?.color && (
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: employee.color }}
                          />
                        )}
                        {employeeName}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => {
                            const newEmployees = field.value?.filter(name => name !== employeeName) || [];
                            field.onChange(newEmployees);
                          }}
                        />
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="foreman"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foreman (Optional)</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || undefined}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select foreman..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">No foreman</SelectItem>
                {employees.map((employee) => (
                  <SelectItem 
                    key={employee.id} 
                    value={`${employee.firstName} ${employee.lastName}`}
                  >
                    <div className="flex items-center gap-2">
                      {employee.color && (
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: employee.color }}
                        />
                      )}
                      {employee.firstName} {employee.lastName}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EmployeeSelectionFields;
