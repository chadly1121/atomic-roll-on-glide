
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Phone, Mail, User } from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { Employee } from '@/types/employee';
import EmployeeForm from './EmployeeForm';

const EmployeeList: React.FC = () => {
  const { employees, deleteEmployee } = useEmployees();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsEditFormOpen(true);
  };

  const handleDelete = (employeeId: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employeeId);
    }
  };

  const handleCloseEditForm = () => {
    setEditingEmployee(null);
    setIsEditFormOpen(false);
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No employees yet</h3>
        <p className="text-gray-600">Add your first employee to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Card key={employee.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {employee.firstName} {employee.lastName}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {employee.color && (
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                      style={{ backgroundColor: employee.color }}
                      title="Employee Color"
                    />
                  )}
                  <Badge variant={employee.isActive ? "default" : "secondary"}>
                    {employee.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600">{employee.role}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{employee.phone}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(employee)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(employee.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EmployeeForm
        isOpen={isEditFormOpen}
        onClose={handleCloseEditForm}
        employee={editingEmployee || undefined}
      />
    </>
  );
};

export default EmployeeList;
