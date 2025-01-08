import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Setores</h1>
                  <Dialog open={isAddingDepartment} onOpenChange={setIsAddingDepartment}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Setor
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Setor</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Nome do Setor</label>
                          <input
                            type="text"
                            value={newDepartmentName}
                            onChange={(e) => setNewDepartmentName(e.target.value)}
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <Button onClick={handleAddDepartment}>Cadastrar Setor</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="bg-white rounded-lg shadow">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome do Setor</TableHead>
                        <TableHead>Usuários</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentDepartments.map((department) => (
                        <TableRow
                          key={department.id}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <TableCell>{department.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              {department.users.length} usuários
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedDepartment(department)}
                            >
                              Ver Usuários
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {totalPages > 1 && (
                    <div className="py-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            />
                          </PaginationItem>
                          {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index + 1}>
                              <PaginationLink
                                href="#"
                                onClick={() => setCurrentPage(index + 1)}
                                isActive={currentPage === index + 1}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedDepartment(null)}
                  >
                    Voltar
                  </Button>
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