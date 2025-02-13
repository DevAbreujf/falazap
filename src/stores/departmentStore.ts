
import { create } from 'zustand';
import { BaseEntity } from '@/types/chat';

export interface User extends BaseEntity {
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'inactive';
  avatar?: string;
  lastLogin?: string;
  preferences?: {
    theme?: string;
    notifications?: boolean;
    language?: string;
  };
}

export interface Department extends BaseEntity {
  name: string;
  users: User[];
  description?: string;
  color?: string;
  parentId?: string;
  order?: number;
  metadata?: {
    totalChats?: number;
    activeChats?: number;
    avgResponseTime?: number;
  };
}

interface DepartmentStore {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  addDepartment: (department: Department) => void;
  removeDepartment: (id: string) => void;
  updateDepartment: (id: string, data: Partial<Department>) => void;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  setDepartments: (departments) => set({ departments }),
  addDepartment: (department) =>
    set((state) => ({
      departments: [...state.departments, department],
    })),
  removeDepartment: (id) =>
    set((state) => ({
      departments: state.departments.filter((dept) => dept.id !== id),
    })),
  updateDepartment: (id, data) =>
    set((state) => ({
      departments: state.departments.map((dept) =>
        dept.id === id ? { ...dept, ...data } : dept
      ),
    })),
}));
