import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { MetricsTimeSelector } from "@/components/app/MetricsTimeSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pricing } from "@/components/Pricing";

export default function Dashboard() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <header className="border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SidebarTrigger />
                <span className="text-2xl font-bold text-primary">Fala</span>
                <span className="text-2xl font-bold">ZAP</span>
              </div>
              <Button variant="ghost" onClick={() => navigate("/")}>
                Sair
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Olá, João!</h1>
                <p className="text-muted-foreground">
                  Bem-vindo ao seu painel de controle
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">
                  Plano atual: <span className="font-medium">Pro</span>
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">Upgrade de Plano</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl scrollbar-hide">
                    <DialogHeader>
                      <DialogTitle>Escolha seu plano</DialogTitle>
                      <DialogDescription>
                        Selecione o plano ideal para o seu negócio
                      </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto scrollbar-hide">
                      <Pricing />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <MetricsTimeSelector selected={timeRange} onChange={setTimeRange} />

            <div className="grid gap-6 md:grid-cols-4 mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Mensagens Enviadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,345</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% em relação ao período anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Novos Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">345</div>
                  <p className="text-xs text-muted-foreground">
                    +10.5% em relação ao período anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taxa de Conversão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.3% em relação ao período anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Funis Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    +1 em relação ao período anterior
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}