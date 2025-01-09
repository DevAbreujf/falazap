import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
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
}

export function DepartmentUsers({ departmentName, users }: DepartmentUsersProps) {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    // In a real app, this would make an API call to add the user to the department
    console.log(`Adding user ${user.name} to department ${departmentName}`);
    setIsAddingUser(false);
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
                <Button variant="outline" size="sm">
                  Remover do Setor
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Adicionar Usuário ao Setor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
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
    </div>
  );
}