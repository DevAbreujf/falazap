import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Bot, Plus } from "lucide-react";

export default function Agentes() {
  const { setOpenMobile } = useSidebar();
  const navigate = useNavigate();

  const agents = [
    {
      id: 1,
      name: "Assistente de Vendas",
      description: "Especializado em converter leads em vendas",
      status: "active",
    },
    {
      id: 2,
      name: "Suporte Técnico",
      description: "Auxilia clientes com problemas técnicos",
      status: "training",
    },
    {
      id: 3,
      name: "Atendimento ao Cliente",
      description: "Responde dúvidas gerais e direcionamentos",
      status: "active",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          {/* Header Mobile Fixo */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b md:hidden">
            <div className="flex items-center justify-between px-4 h-14">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenMobile(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <main className="container mx-auto p-4 md:p-6 lg:px-8 xl:px-10 flex-1 overflow-auto pt-16 md:pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gradient-primary">Meus Agentes</h1>
                <p className="text-muted-foreground mt-2">
                  Gerencie seus assistentes virtuais
                </p>
              </div>
              <Button
                onClick={() => navigate("/novo-agente")}
                className="w-full md:w-auto bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Novo Agente
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card
                  key={agent.id}
                  className="p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/configurar-agente/${agent.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Bot className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {agent.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        agent.status === "active"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {agent.status === "active" ? "Ativo" : "Em treinamento"}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
