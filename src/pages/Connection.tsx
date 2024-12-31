import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, RefreshCw } from "lucide-react";

export default function Connection() {
  return (
    <>
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gradient-primary">
              Conexão WhatsApp
            </h1>
            <p className="mt-2 text-muted-foreground">
              Conecte seu WhatsApp Business para começar a usar a plataforma
            </p>
          </div>

          <Card className="glass-card mb-8 p-6">
            <h3 className="mb-4 text-lg font-semibold">Como conectar:</h3>
            <ol className="ml-6 list-decimal space-y-2 text-muted-foreground">
              <li>Abra o WhatsApp Business no seu celular</li>
              <li>Toque em Menu (três pontos) ou Configurações</li>
              <li>Toque em Dispositivos Conectados</li>
              <li>Toque em Conectar um Dispositivo</li>
              <li>Aponte a câmera do seu celular para o QR Code abaixo</li>
            </ol>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-full bg-primary/10 p-4">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">QR Code</h2>
              <p className="mb-6 text-muted-foreground">
                Escaneie o QR Code com seu WhatsApp Business
              </p>
              
              <div className="relative aspect-square w-48 rounded-xl bg-white p-4">
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-500">
                    QR Code será exibido aqui
                  </p>
                </div>
              </div>

              <Button className="mt-6 gap-2">
                Gerar Novo QR Code
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}