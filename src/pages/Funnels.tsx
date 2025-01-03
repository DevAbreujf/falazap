import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Separator } from "@/components/ui/separator";
import { FunnelCard } from "@/components/app/FunnelCard";
import { Menu, Plus } from "lucide-react";

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
  const [viewMode] = useState<"grid" | "list">("grid");
  const [funnels, setFunnels] = useState(mockFunnels);
  const navigate = useNavigate();
  
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
    console.log("Duplicating funnel:", id);
  };

  const handleDeleteFunnel = (id: number) => {
    console.log("Deleting funnel:", id);
  };

  const handleToggleFunnel = (id: number) => {
    setFunnels(prevFunnels =>
      prevFunnels.map(funnel =>
        funnel.id === id ? { ...funnel, isActive: !funnel.isActive } : funnel
      )
    );
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto px-8 py-10">
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

            <div className="space-y-6">
              <p className="text-muted-foreground text-lg">
                Crie fluxos de conversas para serem disparados automaticamente quando um cliente entrar em contato com você.
              </p>
              <p className="text-xl font-semibold text-gradient-primary">
                Exibindo {funnels.length} funis criados
              </p>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-medium text-primary">
                Clique em '+ Novo Funil' para criar um novo fluxo
              </p>
              <Button
                onClick={handleCreateFunnel}
                size="lg"
                className="hover-scale hover-glow"
              >
                + Novo Funil
              </Button>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              <div className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col items-center justify-center p-8 cursor-pointer min-h-[300px]"
                   onClick={handleCreateFunnel}>
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <span className="text-xl font-semibold text-gradient-primary">Novo Funil</span>
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
    </SidebarProvider>
  );
}
