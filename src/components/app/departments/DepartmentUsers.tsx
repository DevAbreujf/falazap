import { Department, DepartmentUser } from "@/types/chat";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserActions } from "./UserActions";

interface DepartmentUsersProps {
  departmentName: string;
  users: DepartmentUser[];
  onAddUser: (user: DepartmentUser) => void;
  onRemoveUser: (userId: string) => void;
  onChangeDepartment: (userId: string, newDepartment: string, action: "change" | "add") => void;
  departments: Department[];
}

export function DepartmentUsers({
  departmentName,
  users,
  onAddUser,
  onRemoveUser,
  onChangeDepartment,
  departments
}: DepartmentUsersProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{departmentName}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <UserActions
                  onRemoveClick={() => onRemoveUser(user.id)}
                  onChangeClick={() => onChangeDepartment(user.id, "", "change")}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button 
        onClick={() => onAddUser({ 
          id: `${Date.now()}`, 
          name: "Novo Usuário", 
          email: "", 
          department: departmentName 
        })}
      >
        Adicionar Usuário
      </Button>
    </div>
  );
}