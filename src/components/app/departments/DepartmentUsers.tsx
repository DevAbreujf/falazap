import { DepartmentUser } from "@/types/chat";

interface DepartmentUsersProps {
  departmentName: string;
  users: DepartmentUser[];
  onAddUser: (user: DepartmentUser) => void;
  onRemoveUser: (userId: string) => void;
  onChangeDepartment: (userId: string, newDepartment: string, action: "change" | "add") => void;
  departments: { id: string; name: string; }[];
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
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center">
            <span>{user.name}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => onRemoveUser(user.id)} className="text-red-500">Remover</button>
              <select onChange={(e) => onChangeDepartment(user.id, e.target.value, 'change')}>
                <option value="">Mudar setor</option>
                {departments.map(department => (
                  <option key={department.id} value={department.name}>{department.name}</option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => onAddUser({ id: `${Date.now()}`, name: "Novo Usuário", email: "", department: departmentName })} className="btn">Adicionar Usuário</button>
    </div>
  );
}
