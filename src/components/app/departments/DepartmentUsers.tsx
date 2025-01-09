import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
}

interface DepartmentUsersProps {
  departmentName: string;
  users: User[];
  onAddUser: (user: User) => void;
  onRemoveUser: (userId: number) => void;
  onChangeDepartment: (userId: number, newDepartment: string) => void;
  departments: { id: number; name: string }[];
}

export function DepartmentUsers({ 
  departmentName, 
  users, 
  onAddUser, 
  onRemoveUser,
  onChangeDepartment,
  departments 
}: DepartmentUsersProps) {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userToRemove, setUserToRemove] = useState<User | null>(null);
  const [userToChangeDepartment, setUserToChangeDepartment] = useState<User | null>(null);

  // Mock data for all users - in a real app, this would come from an API
  const allUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", department: "Sales" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Support" },
  ];

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUserToDepartment = (user: User) => {
    onAddUser(user);
    setIsAddingUser(false);
  };

  const handleRemoveUser = () => {
    if (userToRemove) {
      onRemoveUser(userToRemove.id);
      setUserToRemove(null);
    }
  };

  const handleChangeDepartment = (newDepartment: string) => {
    if (userToChangeDepartment) {
      onChangeDepartment(userToChangeDepartment.id, newDepartment);
      setUserToChangeDepartment(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Usuários do Setor</h2>
          <p className="text-sm text-gray-500">{departmentName}</p>
        </div>
        <Button onClick={() => setIsAddingUser(true)}>
          Adicionar Usuário ao Setor
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setUserToRemove(user)}
                >
                  Remover do Setor
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setUserToChangeDepartment(user)}
                >
                  Trocar Setor
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog para adicionar usuário */}
      <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Adicionar Usuário ao Setor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddUserToDepartment(user)}
                      >
                        Adicionar ao Setor
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* AlertDialog para confirmar remoção */}
      <AlertDialog open={!!userToRemove} onOpenChange={() => setUserToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Remoção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover {userToRemove?.name} do setor {departmentName}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveUser}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog para trocar de setor */}
      <Dialog open={!!userToChangeDepartment} onOpenChange={() => setUserToChangeDepartment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trocar Setor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant="outline"
                onClick={() => handleChangeDepartment(dept.name)}
                className="justify-start"
                disabled={dept.name === departmentName}
              >
                {dept.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}