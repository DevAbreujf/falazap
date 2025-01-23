import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { DepartmentsList } from "@/components/app/departments/DepartmentsList";
import { DepartmentUsers } from "@/components/app/departments/DepartmentUsers";
import { useDepartmentStore } from "@/stores/departmentStore";
import type { Department, User } from "@/stores/departmentStore";

export default function Departments() {
  const { departments, setDepartments, addDepartment } = useDepartmentStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(
    null
  );
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");

  const itemsPerPage = 8;
  const totalPages = Math.ceil(departments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDepartments = departments.slice(startIndex, endIndex);

  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDepartment: Department = {
        id: departments.length + 1,
        name: newDepartmentName.trim(),
        users: [],
      };
      addDepartment(newDepartment);
      setNewDepartmentName("");
      setIsAddingDepartment(false);
      console.log("Departments after adding:", departments); // Debug log
    }
  };

  const handleAddUserToDepartment = (user: User) => {
    if (selectedDepartment) {
      const updatedDepartments = departments.map(dept => {
        if (dept.id === selectedDepartment.id) {
          return {
            ...dept,
            users: [...dept.users, user]
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      setSelectedDepartment({
        ...selectedDepartment,
        users: [...selectedDepartment.users, user]
      });
    }
  };

  const handleRemoveUserFromDepartment = (userId: number) => {
    if (selectedDepartment) {
      const updatedDepartments = departments.map(dept => {
        if (dept.id === selectedDepartment.id) {
          return {
            ...dept,
            users: dept.users.filter(user => user.id !== userId)
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      setSelectedDepartment({
        ...selectedDepartment,
        users: selectedDepartment.users.filter(user => user.id !== userId)
      });
    }
  };

  const handleChangeDepartment = (userId: number, newDepartmentName: string, action: 'change' | 'add') => {
    if (selectedDepartment) {
      const userToMove = selectedDepartment.users.find(user => user.id === userId);
      if (!userToMove) return;

      const updatedDepartments = departments.map(dept => {
        if (dept.name === newDepartmentName) {
          return {
            ...dept,
            users: [...dept.users, { ...userToMove, department: newDepartmentName }]
          };
        }
        if (dept.id === selectedDepartment.id && action === 'change') {
          return {
            ...dept,
            users: dept.users.filter(user => user.id !== userId)
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      
      if (action === 'change') {
        setSelectedDepartment({
          ...selectedDepartment,
          users: selectedDepartment.users.filter(user => user.id !== userId)
        });
      }
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10">
            {!selectedDepartment ? (
              <DepartmentsList
                departments={departments}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentDepartments={currentDepartments}
                setSelectedDepartment={setSelectedDepartment}
                isAddingDepartment={isAddingDepartment}
                setIsAddingDepartment={setIsAddingDepartment}
                newDepartmentName={newDepartmentName}
                setNewDepartmentName={setNewDepartmentName}
                handleAddDepartment={handleAddDepartment}
              />
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <button 
                    className="px-4 py-2 border rounded-md hover:bg-slate-50"
                    onClick={() => setSelectedDepartment(null)}
                  >
                    Voltar
                  </button>
                  <h1 className="text-2xl font-bold">
                    Setor: {selectedDepartment.name}
                  </h1>
                </div>
                <DepartmentUsers 
                  departmentName={selectedDepartment.name}
                  users={selectedDepartment.users}
                  onAddUser={handleAddUserToDepartment}
                  onRemoveUser={handleRemoveUserFromDepartment}
                  onChangeDepartment={handleChangeDepartment}
                  departments={departments}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}