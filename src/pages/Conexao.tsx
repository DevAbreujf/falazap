
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Shield, Link2, QrCode, RefreshCw, XCircle } from "lucide-react";
import { PageBreadcrumb } from "@/components/app/navigation/PageBreadcrumb";
import { useToast } from "@/hooks/use-toast";

export default function Conexao() {
  const { toast } = useToast();

  const handleRefreshQR = () => {
    toast({
      title: "QR Code atualizado",
      description: "Um novo QR Code foi gerado com sucesso.",
    });
  };

  const handleConnect = () => {
    toast({
      title: "Iniciando conexão",
      description: "Estabelecendo conexão com a API oficial...",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <div className="container max-w-6xl">
            <PageBreadcrumb />
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                Conexão WhatsApp
              </h1>
              <p className="text-sm text-muted-foreground">
                Escolha o tipo de conexão que deseja utilizar
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* API Oficial Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-full bg-emerald-50">
                      <Shield className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">API Oficial</h2>
                      <p className="text-sm text-muted-foreground">WhatsApp Business API</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Status:</span>
                      <div className="flex items-center gap-1.5">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-500">Desconectado</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center p-8">
                      <Button 
                        size="lg"
                        onClick={handleConnect}
                        className="w-full max-w-xs"
                      >
                        Conectar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* API Não Oficial Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-full bg-blue-50">
                      <Link2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">API Não Oficial</h2>
                      <p className="text-sm text-muted-foreground">Conexão Alternativa</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Status:</span>
                      <div className="flex items-center gap-1.5">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-500">Desconectado</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-3 p-2 rounded-full bg-primary/10">
                            <QrCode className="h-5 w-5 text-primary" />
                          </div>
                          
                          <div className="relative aspect-square w-48 rounded-xl bg-white p-2 border-2 border-dashed border-slate-200">
                            <div className="flex h-full items-center justify-center">
                              <p className="text-xs text-slate-500">
                                QR Code será exibido aqui
                              </p>
                            </div>
                          </div>

                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={handleRefreshQR}
                            className="mt-4 text-xs"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Gerar Novo QR Code
                          </Button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500">
                        <ul className="space-y-1 list-disc list-inside">
                          <li>Abra o WhatsApp no seu celular</li>
                          <li>Toque em Menu (três pontos) ou Configurações</li>
                          <li>Toque em Dispositivos Conectados</li>
                          <li>Toque em Conectar um Dispositivo</li>
                          <li>Aponte a câmera para o QR Code acima</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
