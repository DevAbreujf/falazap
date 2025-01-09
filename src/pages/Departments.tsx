import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { DepartmentsList } from "@/components/app/departments/DepartmentsList";
import { DepartmentUsers } from "@/components/app/departments/DepartmentUsers";

interface Department {
  id: number;
  name: string;
  users: User[];
}

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Suporte", users: [] },
    { id: 2, name: "Vendas", users: [] },
    { id: 3, name: "Financeiro", users: [] },
    { id: 4, name: "Administrativo", users: [] },
  ]);
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
      setDepartments([...departments, newDepartment]);
      setNewDepartmentName("");
      setIsAddingDepartment(false);
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
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}