import { Plus, Building2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useDepartmentStore } from "@/stores/departmentStore";
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
interface DepartmentsListProps {
  departments: Department[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  currentDepartments: Department[];
  setSelectedDepartment: (department: Department) => void;
  isAddingDepartment: boolean;
  setIsAddingDepartment: (isAdding: boolean) => void;
  newDepartmentName: string;
  setNewDepartmentName: (name: string) => void;
  handleAddDepartment: () => void;
}
export function DepartmentsList({
  currentDepartments,
  setSelectedDepartment,
  currentPage,
  totalPages,
  setCurrentPage,
  isAddingDepartment,
  setIsAddingDepartment,
  newDepartmentName,
  setNewDepartmentName,
  handleAddDepartment
}: DepartmentsListProps) {
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const {
    removeDepartment
  } = useDepartmentStore();
  const handleDeleteDepartment = (department: Department) => {
    setDepartmentToDelete(department);
  };
  const confirmDelete = () => {
    if (departmentToDelete) {
      removeDepartment(departmentToDelete.id);
      setDepartmentToDelete(null);
    }
  };
  return <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Setores</h1>
        <Dialog open={isAddingDepartment} onOpenChange={setIsAddingDepartment}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-400 hover:bg-emerald-300">
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
                <input type="text" value={newDepartmentName} onChange={e => setNewDepartmentName(e.target.value)} className="w-full p-2 border rounded-md" />
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
            {currentDepartments.map(department => <TableRow key={department.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedDepartment(department)}>
                <TableCell>{department.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {department.users.length} usuários
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={e => {
                  e.stopPropagation();
                  setSelectedDepartment(department);
                }}>
                      Ver Usuários
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={e => {
                  e.stopPropagation();
                  handleDeleteDepartment(department);
                }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>

        {totalPages > 1 && <div className="py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
                </PaginationItem>
                {Array.from({
              length: totalPages
            }).map((_, index) => <PaginationItem key={index + 1}>
                    <PaginationLink href="#" onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>)}
                <PaginationItem>
                  <PaginationNext href="#" onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>}
      </div>

      <AlertDialog open={!!departmentToDelete} onOpenChange={() => setDepartmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o setor "{departmentToDelete?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDepartmentToDelete(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>;
}