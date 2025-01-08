import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
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
  DialogDescription,
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
import { ContactsPagination } from "@/components/app/contacts/ContactsPagination";

interface Department {
  id: string;
  name: string;
  users: User[];
}

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  cpf: string;
}

const ITEMS_PER_PAGE = 8;

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Suporte",
      users: [],
    },
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const totalPages = Math.ceil(departments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDepartments = departments.slice(startIndex, endIndex);

  const handleAddDepartment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDepartment: Department = {
      id: (departments.length + 1).toString(),
      name: formData.get('name') as string,
      users: [],
    };

    setDepartments([...departments, newDepartment]);
    setIsAddDialogOpen(false);
    toast({
      title: "Setor adicionado com sucesso!",
      description: "O novo setor foi cadastrado no sistema.",
    });
  };

  const handleDeleteDepartment = () => {
    if (!selectedDepartment) return;
    setDepartments(departments.filter(dept => dept.id !== selectedDepartment.id));
    setIsDeleteDialogOpen(false);
    setSelectedDepartment(null);
    toast({
      title: "Setor removido com sucesso!",
      description: "O setor foi removido do sistema.",
    });
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
                  Gerenciar Setores
                </h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Setor
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Setor</DialogTitle>
                      <DialogDescription>
                        Crie um novo setor para organizar os usuários.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddDepartment} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome do Setor</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <Button type="submit" className="w-full">
                        Cadastrar Setor
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Setor</TableHead>
                      <TableHead>Quantidade de Usuários</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDepartments.map((department) => (
                      <TableRow key={department.id}>
                        <TableCell>{department.name}</TableCell>
                        <TableCell>{department.users.length}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedDepartment(department);
                                setIsUsersDialogOpen(true);
                              }}
                            >
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedDepartment(department);
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

      {/* Users Dialog */}
      <Dialog open={isUsersDialogOpen} onOpenChange={setIsUsersDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Usuários do Setor: {selectedDepartment?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>CPF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDepartment?.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.cpf}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {selectedDepartment?.users.length === 0 && (
              <p className="text-center text-gray-500 my-4">
                Nenhum usuário cadastrado neste setor
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o setor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDepartment}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}