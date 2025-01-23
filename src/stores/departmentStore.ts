import { create } from 'zustand';
import { Department } from '@/types/chat';

interface DepartmentStore {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  addDepartment: (department: Department) => void;
  removeDepartment: (id: string) => void;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  setDepartments: (departments) => set({ departments }),
  addDepartment: (department) => 
    set((state) => ({ 
      departments: [...state.departments, department] 
    })),
  removeDepartment: (id) =>
    set((state) => ({
      departments: state.departments.filter((d) => d.id !== id)
    })),
}));