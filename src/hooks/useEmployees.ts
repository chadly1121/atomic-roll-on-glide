
import { useState } from 'react';
import { Employee } from '@/types/employee';

// Mock data for demonstration
const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@rollonpainting.com',
    phone: '(604) 555-1001',
    role: 'Lead Painter',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@rollonpainting.com',
    phone: '(604) 555-1002',
    role: 'Painter',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@rollonpainting.com',
    phone: '(604) 555-1003',
    role: 'Foreman',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@rollonpainting.com',
    phone: '(604) 555-1004',
    role: 'Painter',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  const createEmployee = (employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev =>
      prev.map(employee =>
        employee.id === id
          ? { ...employee, ...updates, updatedAt: new Date().toISOString() }
          : employee
      )
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(employee => employee.id !== id));
  };

  const getEmployeeById = (id: string) => {
    return employees.find(employee => employee.id === id);
  };

  return {
    employees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
  };
};
