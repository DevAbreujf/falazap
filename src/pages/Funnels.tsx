import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { LayoutGrid, List, MoreVertical, Copy, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data for funnels
const mockFunnels = [
  {
    id: 1,
    name: "Funil de Vendas Principal",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: 2,
    name: "Funil de Captação de Leads",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-08"),
  },
  // Add more mock funnels as needed
];

export default function Funnels() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();
  
  const handleCreateFunnel = () => {
    navigate("/funnels/editor");
  };

  const handleEditFunnel = (id: number) => {
    navigate(`/funnels/editor/${id}`);
  };

  const handleDuplicateFunnel = (id: number) => {
    console.log("Duplicating funnel:", id);
    // Implementation for duplicating funnel
  };

  const handleDeleteFunnel = (id: number) => {
    console.log("Deleting funnel:", id);
    // Implementation for deleting funnel
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto px-8 py-10">
            {/* Header section */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Funis
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Gerencie seus funis de conversão
                </p>
              </div>
              <Button
                onClick={handleCreateFunnel}
                size="lg"
                className="hover-scale hover-glow"
              >
                Criar Novo Funil
              </Button>
            </div>

            {/* View mode toggle */}
            <div className="flex justify-end mb-6 gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Funnels grid/list */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {mockFunnels.map((funnel) => (
                <Card
                  key={funnel.id}
                  className={`${
                    viewMode === "list" ? "flex justify-between items-center" : ""
                  } hover-scale hover-glow`}
                >
                  <CardContent
                    className={`${
                      viewMode === "list" ? "flex-1 flex items-center" : ""
                    } pt-6`}
                  >
                    <h3 className="text-xl font-semibold mb-2">{funnel.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        Criado em:{" "}
                        {format(funnel.createdAt, "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                      <p>
                        Última modificação:{" "}
                        {format(funnel.updatedAt, "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter
                    className={`${
                      viewMode === "list" ? "justify-end" : "justify-between"
                    } pt-2`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditFunnel(funnel.id)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
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
