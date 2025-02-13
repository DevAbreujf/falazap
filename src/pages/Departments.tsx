
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { DepartmentsList } from "@/components/app/departments/DepartmentsList";
import { Department, User, useDepartmentStore } from "@/stores/departmentStore";

export default function Departments() {
  const { departments, setDepartments, addDepartment } = useDepartmentStore();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");

  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDepartment: Department = {
        id: `${Date.now()}`,
        name: newDepartmentName.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addDepartment(newDepartment);
      setNewDepartmentName("");
      setIsAddingDepartment(false);
    }
  };

  const handleAddUserToDepartment = (user: User) => {
    if (selectedDepartment) {
      const updatedDepartments = departments.map(dept => {
        if (dept.id === selectedDepartment.id) {
          return {
            ...dept,
            users: [...(dept.users || []), user]
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      setSelectedDepartment({
        ...selectedDepartment,
        users: [...(selectedDepartment.users || []), user]
      });
    }
  };

  const handleRemoveUserFromDepartment = (userId: string) => {
    if (selectedDepartment) {
      const updatedDepartments = departments.map(dept => {
        if (dept.id === selectedDepartment.id) {
          return {
            ...dept,
            users: (dept.users || []).filter(user => user.id !== userId)
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      setSelectedDepartment({
        ...selectedDepartment,
        users: (selectedDepartment.users || []).filter(user => user.id !== userId)
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10">
            <DepartmentsList
              departments={departments}
              users={[]}
              onSaveDepartment={handleAddDepartment}
              onUpdateDepartment={(department) => {
                const updatedDepartments = departments.map(d =>
                  d.id === department.id ? department : d
                );
                setDepartments(updatedDepartments);
              }}
              onDeleteDepartment={(id) => {
                const updatedDepartments = departments.filter(d => d.id !== id);
                setDepartments(updatedDepartments);
              }}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
