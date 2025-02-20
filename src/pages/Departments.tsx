import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { DepartmentsList } from "@/components/app/departments/DepartmentsList";
import { DepartmentUsers } from "@/components/app/departments/DepartmentUsers";
import { useDepartmentStore } from "@/stores/departmentStore";
import type { Department, User } from "@/stores/departmentStore";

export default function Departments() {
  const { departments, setDepartments, addDepartment } = useDepartmentStore();
  const { setOpenMobile } = useSidebar();
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
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b md:hidden">
            <div className="flex items-center justify-between px-4 h-14">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenMobile(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <main className="container mx-auto p-4 md:p-6 lg:px-8 xl:px-10 flex-1 overflow-auto pt-16 md:pt-6">
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
