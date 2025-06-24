
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { Employee } from '@/types/employee';
import EmployeeForm from '@/components/employee/EmployeeForm';

const EmployeesPage = () => {
  const { employees, deleteEmployee } = useEmployees();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingEmployee(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Employees - Roll On Painting</title>
        <meta name="description" content="Manage employees and team members" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar activeSection="employees" />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-atomic-navy">Employees</h1>
                <p className="text-gray-600">Manage your team members and employees</p>
              </div>
              <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Employee
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {employee.firstName} {employee.lastName}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{employee.role}</p>
                      </div>
                      <Badge variant={employee.isActive ? "default" : "secondary"}>
                        {employee.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-sm">{employee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-sm">{employee.phone}</p>
                    </div>
                    <div className="flex gap-2 pt-2">
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

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No employees found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <EmployeeForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        employee={editingEmployee}
      />
    </div>
  );
};

export default EmployeesPage;
