import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Separator } from "@/components/ui/separator";
import { FunnelCard } from "@/components/app/FunnelCard";
import { Menu, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

const mockFunnels = [
  {
    id: 1,
    name: "Funil de Vendas Principal",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-10"),
    isActive: true,
  },
  {
    id: 2,
    name: "Funil de Captação de Leads",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-08"),
    isActive: false,
  },
];

export default function Funnels() {
  const [funnels, setFunnels] = useState(mockFunnels);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCreateFunnel = () => {
    navigate("/funnels/editor");
  };

  const handleEditFunnel = (id: number) => {
    navigate(`/funnels/editor/${id}`);
  };

  const handleMetrics = (id: number) => {
    navigate(`/funnels/metrics/${id}`);
  };

  const handleDuplicateFunnel = (id: number) => {
    const funnelToDuplicate = funnels.find(f => f.id === id);
    if (funnelToDuplicate) {
      const newFunnel = {
        ...funnelToDuplicate,
        id: Math.max(...funnels.map(f => f.id)) + 1,
        name: `${funnelToDuplicate.name} (Cópia)`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setFunnels([...funnels, newFunnel]);
      toast({
        title: "Funil duplicado",
        description: "O funil foi duplicado com sucesso!",
      });
    }
  };

  const handleDeleteFunnel = (id: number) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setFunnels(prevFunnels => prevFunnels.filter(funnel => funnel.id !== deleteId));
      setDialogOpen(false);
      toast({
        title: "Funil excluído",
        description: "O funil foi excluído com sucesso!",
      });
      setDeleteId(null);
    }
  };

  const handleToggleFunnel = (id: number) => {
    setFunnels(prevFunnels =>
      prevFunnels.map(funnel =>
        funnel.id === id ? { ...funnel, isActive: !funnel.isActive } : funnel
      )
    );
    toast({
      title: "Status atualizado",
      description: "O status do funil foi atualizado com sucesso!",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Funis
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
              </div>
              <div className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  asChild 
                  className="hover:bg-primary/20 bg-black/50"
                >
                  <SidebarTrigger>
                    <Menu className="h-6 w-6 text-primary" />
                  </SidebarTrigger>
                </Button>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <p className="text-muted-foreground text-lg">
                Crie fluxos de conversas para serem disparados automaticamente quando um cliente entrar em contato com você.
              </p>
              <p className="text-xl font-semibold text-gradient-primary">
                Exibindo {funnels.length} funis criados
              </p>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-between items-center mb-8">
              <p className="text-lg font-medium text-primary">
                Clique em '+ Novo Funil' para criar um novo fluxo
              </p>
              <Button
                onClick={handleCreateFunnel}
                size="lg"
                className="text-white hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-primary/20 bg-gradient-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Novo Funil
              </Button>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <div 
                onClick={handleCreateFunnel}
                className="group border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:bg-primary/5"
              >
                <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <span className="text-xl font-semibold text-primary group-hover:scale-105 transition-transform duration-300">
                  Criar Novo Funil
                </span>
              </div>

              {funnels.map((funnel) => (
                <FunnelCard
                  key={funnel.id}
                  funnel={funnel}
                  onEdit={handleEditFunnel}
                  onMetrics={handleMetrics}
                  onDuplicate={handleDuplicateFunnel}
                  onDelete={handleDeleteFunnel}
                  onToggle={handleToggleFunnel}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      <AlertDialog 
        open={dialogOpen} 
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Funil</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este funil? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
