
import { User } from "@/types/users";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-medium">Nome</th>
              <th className="text-left py-4 px-6 font-medium">Email</th>
              <th className="text-left py-4 px-6 font-medium">Função</th>
              <th className="text-left py-4 px-6 font-medium">Departamento</th>
              <th className="text-left py-4 px-6 font-medium">Status</th>
              <th className="text-right py-4 px-6 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-none hover:bg-slate-50">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  <Badge variant="secondary" className="font-normal">
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </Badge>
                </td>
                <td className="py-4 px-6">{user.department}</td>
                <td className="py-4 px-6">
                  <Badge 
                    variant="secondary" 
                    className={`font-normal ${
                      user.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
