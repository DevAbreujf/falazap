
import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  departmentId?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  users?: User[];
}

interface DepartmentStore {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  addDepartment: (department: Department) => void;
  updateDepartment: (department: Department) => void;
  removeDepartment: (id: string) => void;
  getDepartment: (id: string) => Department | undefined;
}

export const useDepartmentStore = create<DepartmentStore>((set, get) => ({
  departments: [],
  setDepartments: (departments) => set({ departments }),
  addDepartment: (department) => set((state) => ({
    departments: [...state.departments, department]
  })),
  updateDepartment: (department) => set((state) => ({
    departments: state.departments.map((d) =>
      d.id === department.id ? department : d
    )
  })),
  removeDepartment: (id) => set((state) => ({
    departments: state.departments.filter((d) => d.id !== id)
  })),
  getDepartment: (id) => get().departments.find((d) => d.id === id)
}));
