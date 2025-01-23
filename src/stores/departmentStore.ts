import { create } from 'zustand';

export interface User {
  id: number;
  name: string;
  email: string;
  department: string;
}

export interface Department {
  id: number;
  name: string;
  users: User[];
}

interface DepartmentStore {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  addDepartment: (department: Department) => void;
  removeDepartment: (id: number) => void;
  updateDepartment: (id: number, data: Partial<Department>) => void;
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