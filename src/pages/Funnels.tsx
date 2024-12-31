import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { MoreVertical, Copy, Pencil, Trash2, BarChart2, Clock, Calendar } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";

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
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Funis
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
              </div>
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
              {funnels.map((funnel) => (
                <Card
                  key={funnel.id}
                  className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-gradient-primary">{funnel.name}</h3>
                      <Toggle
                        pressed={funnel.isActive}
                        onPressedChange={() => handleToggleFunnel(funnel.id)}
                        className={`${
                          funnel.isActive ? 'bg-primary/20' : 'bg-muted'
                        } hover:bg-primary/30`}
                        aria-label="Toggle funnel status"
                      >
                        <span className="sr-only">
                          {funnel.isActive ? 'Desativar funil' : 'Ativar funil'}
                        </span>
                        <div className="h-4 w-4">
                          {funnel.isActive ? '✓' : '×'}
                        </div>
                      </Toggle>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>Criado em: {" "}
                            {format(funnel.createdAt, "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>Última modificação: {" "}
                            {format(funnel.updatedAt, "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between pt-2 pb-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditFunnel(funnel.id)}
                        className="hover:bg-primary/10"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMetrics(funnel.id)}
                        className="hover:bg-primary/10"
                      >
                        <BarChart2 className="h-4 w-4 mr-2" />
                        Métricas
                      </Button>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleDuplicateFunnel(funnel.id)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteFunnel(funnel.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}