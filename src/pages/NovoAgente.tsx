import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

export default function NovoAgente() {
  const { setOpenMobile } = useSidebar();
  const navigate = useNavigate();

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
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Criar Novo Agente
              </h1>

              <Card className="p-6">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome do Agente</Label>
                      <Input
                        id="name"
                        placeholder="Ex: Assistente de Vendas"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva a função principal do seu agente..."
                        className="mt-1.5 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="department">Departamento</Label>
                      <Input
                        id="department"
                        placeholder="Ex: Vendas, Suporte, Marketing"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate('/agentes')}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => navigate('/configurar-agente')}
                    >
                      Continuar
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
