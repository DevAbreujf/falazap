import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { MetricsTimeSelector } from "@/components/app/MetricsTimeSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pricing } from "@/components/Pricing";

const mockData = [
  { name: "Jan", messages: 400, leads: 240 },
  { name: "Fev", messages: 300, leads: 139 },
  { name: "Mar", messages: 200, leads: 980 },
  { name: "Abr", messages: 278, leads: 390 },
  { name: "Mai", messages: 189, leads: 480 },
  { name: "Jun", messages: 239, leads: 380 },
  { name: "Jul", messages: 349, leads: 430 },
];

const config = {
  messages: {
    label: "Mensagens",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
  leads: {
    label: "Leads",
    theme: {
      light: "hsl(var(--secondary))",
      dark: "hsl(var(--secondary))",
    },
  },
};

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
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Escolha seu plano</DialogTitle>
                      <DialogDescription>
                        Selecione o plano ideal para o seu negócio
                      </DialogDescription>
                    </DialogHeader>
                    <Pricing />
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

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Análise Comparativa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ChartContainer config={config}>
                    <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="messages"
                        name="messages"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="leads"
                        name="leads"
                        stroke="hsl(var(--secondary))"
                        fill="hsl(var(--secondary))"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}