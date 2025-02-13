
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Department, User } from "@/stores/departmentStore";
import { DepartmentChangeDialog } from "./DepartmentChangeDialog";
import { DepartmentUsers } from "./DepartmentUsers";

interface DepartmentsListProps {
  departments: Department[];
  users: User[];
  onSaveDepartment: (department: Department) => void;
  onUpdateDepartment: (department: Department) => void;
  onDeleteDepartment: (id: string) => void;
  onUpdateUser?: (user: User) => void;
  parentDepartments?: Department[];
}

export function DepartmentsList({
  departments,
  users,
  onSaveDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
  onUpdateUser,
  parentDepartments
}: DepartmentsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showUsers, setShowUsers] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDialog = (department?: Department) => {
    setSelectedDepartment(department || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedDepartment(null);
    setIsDialogOpen(false);
  };

  const handleSave = (department: Department) => {
    if (selectedDepartment) {
      onUpdateDepartment(department);
    } else {
      onSaveDepartment(department);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    onDeleteDepartment(id);
  };

  const toggleUsers = (departmentId: string) => {
    setShowUsers(showUsers === departmentId ? null : departmentId);
  };

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Buscar departamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => handleOpenDialog()}>Novo Departamento</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Usuários</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDepartments.map((department) => (
              <>
                <TableRow key={department.id}>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => toggleUsers(department.id)}
                    >
                      Ver Usuários
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleOpenDialog(department)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(department.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {showUsers === department.id && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <DepartmentUsers
                        users={users.filter(u => u.departmentId === department.id)}
                        onUpdateUser={onUpdateUser}
                        departments={departments}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      <DepartmentChangeDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        department={selectedDepartment}
        parentDepartments={parentDepartments}
      />
    </div>
  );
}
