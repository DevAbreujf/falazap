import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DepartmentSelect } from "@/components/app/users/DepartmentSelect";
import { ContactsPagination } from "@/components/app/contacts/ContactsPagination";
import { useDepartmentStore } from "@/stores/departmentStore";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  cpf: string;
}

const ITEMS_PER_PAGE = 8;

export default function Users() {
  const { departments } = useDepartmentStore();
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      department: "1", // Agora usando o ID do departamento
      cpf: "123.456.789-00",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      department: formData.get('department') as string,
      cpf: formData.get('cpf') as string,
    };

    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
    toast({
      title: "Usuário adicionado com sucesso!",
      description: "O novo usuário foi cadastrado no sistema.",
    });
  };

  const handleEditUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedUser) return;

    const formData = new FormData(event.currentTarget);
    const updatedUser: User = {
      ...selectedUser,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      department: formData.get('department') as string,
      cpf: formData.get('cpf') as string,
    };

    setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "Usuário atualizado com sucesso!",
      description: "As informações do usuário foram atualizadas.",
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "Usuário removido com sucesso!",
      description: "O usuário foi removido do sistema.",
    });
  };

  const UserForm = ({ onSubmit, initialData }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, initialData?: User }) => (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" defaultValue={initialData?.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={initialData?.email} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Setor</Label>
        <input type="hidden" name="department" value={initialData?.department || ""} />
        <DepartmentSelect 
          value={initialData?.department || ""} 
          onValueChange={(value) => {
            const input = document.querySelector('input[name="department"]') as HTMLInputElement;
            if (input) input.value = value;
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input 
          id="cpf" 
          name="cpf" 
          defaultValue={initialData?.cpf}
          required
          maxLength={14}
          onChange={(e) => {
            e.target.value = formatCPF(e.target.value);
          }}
        />
      </div>
      <Button type="submit" className="w-full">
        {initialData ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
      </Button>
    </form>
  );

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find(dept => dept.id.toString() === departmentId);
    return department ? department.name : "Sem setor";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10">
            <div className="bg-white rounded-xl p-6 mb-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                  Gerenciar Usuários
                </h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Usuário
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                    </DialogHeader>
                    <UserForm onSubmit={handleAddUser} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getDepartmentName(user.department)}</TableCell>
                        <TableCell>{user.cpf}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <ContactsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </main>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          <UserForm onSubmit={handleEditUser} initialData={selectedUser || undefined} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o usuário.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
