import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, QrCode, RefreshCw } from "lucide-react";

export default function Connection() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-end mb-6 lg:hidden">
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
          <div className="container max-w-3xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gradient-primary">
                  Conexão WhatsApp
                </h1>
                <p className="text-sm text-muted-foreground">
                  Status: <span className="text-red-500">Desconectado</span>
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="glass-card p-4">
                <h3 className="mb-2 text-base font-semibold">Como conectar:</h3>
                <ol className="ml-4 list-decimal space-y-1 text-sm text-muted-foreground">
                  <li>Abra o WhatsApp Business no seu celular</li>
                  <li>Toque em Menu (três pontos) ou Configurações</li>
                  <li>Toque em Dispositivos Conectados</li>
                  <li>Toque em Conectar um Dispositivo</li>
                  <li>Aponte a câmera do seu celular para o QR Code</li>
                </ol>
              </Card>

              <Card className="glass-card p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 rounded-full bg-primary/10 p-2">
                    <QrCode className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Escaneie o QR Code com seu WhatsApp Business
                  </p>
                  
                  <div className="relative aspect-square w-32 rounded-xl bg-white p-2">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-xs text-gray-500">
                        QR Code será exibido aqui
                      </p>
                    </div>
                  </div>

                  <Button size="sm" className="mt-3 gap-1 text-xs">
                    Gerar Novo QR Code
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}