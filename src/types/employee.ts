
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  color?: string; // Add color field
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
