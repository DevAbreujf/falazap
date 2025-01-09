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
import { UserActions } from "./UserActions";
import { DepartmentChangeDialog } from "./DepartmentChangeDialog";
import { useToast } from "@/components/ui/use-toast";

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
  onChangeDepartment: (userId: number, newDepartment: string, action: 'change' | 'add') => void;
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
  const { toast } = useToast();

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
    toast({
      title: "Usuário adicionado",
      description: `${user.name} foi adicionado ao setor ${departmentName}`,
    });
  };

  const handleRemoveUser = () => {
    if (userToRemove) {
      onRemoveUser(userToRemove.id);
      setUserToRemove(null);
      toast({
        title: "Usuário removido",
        description: `${userToRemove.name} foi removido do setor ${departmentName}`,
      });
    }
  };

  const handleDepartmentChange = (newDepartment: string, action: 'change' | 'add') => {
    if (userToChangeDepartment) {
      onChangeDepartment(userToChangeDepartment.id, newDepartment, action);
      setUserToChangeDepartment(null);
      
      const actionText = action === 'change' ? 'movido para' : 'adicionado ao';
      toast({
        title: action === 'change' ? "Setor alterado" : "Adicionado a novo setor",
        description: `${userToChangeDepartment.name} foi ${actionText} setor ${newDepartment}`,
      });
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
              <TableCell>
                <UserActions
                  onRemoveClick={() => setUserToRemove(user)}
                  onChangeClick={() => setUserToChangeDepartment(user)}
                />
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
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
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

      {/* Dialog para trocar/adicionar setor */}
      <DepartmentChangeDialog
        open={!!userToChangeDepartment}
        onOpenChange={() => setUserToChangeDepartment(null)}
        departments={departments}
        currentDepartment={departmentName}
        onChangeDepartment={handleDepartmentChange}
      />
    </div>
  );
}