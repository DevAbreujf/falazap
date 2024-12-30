import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
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
  { name: "Jan", mensagens: 2345, leads: 345, conversao: 14.2 },
  { name: "Fev", mensagens: 1890, leads: 278, conversao: 12.8 },
  { name: "Mar", mensagens: 2567, leads: 412, conversao: 15.6 },
  { name: "Abr", mensagens: 2890, leads: 489, conversao: 16.9 },
  { name: "Mai", mensagens: 2345, leads: 345, conversao: 14.2 },
  { name: "Jun", mensagens: 2100, leads: 310, conversao: 13.5 },
  { name: "Jul", mensagens: 2345, leads: 345, conversao: 14.2 },
];

const config = {
  mensagens: {
    label: "Mensagens Enviadas",
    theme: {
      light: "#1cd8b6",
      dark: "#1cd8b6",
    },
  },
  leads: {
    label: "Novos Leads",
    theme: {
      light: "#4df1b5",
      dark: "#4df1b5",
    },
  },
  conversao: {
    label: "Taxa de Conversão (%)",
    theme: {
      light: "#39f18e",
      dark: "#39f18e",
    },
  },
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto px-6 py-8">
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
                    <Button size="sm" className="hover-glow">Upgrade de Plano</Button>
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
              <Card className="hover-glow">
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

              <Card className="hover-glow">
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

              <Card className="hover-glow">
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

              <Card className="hover-glow">
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

            <Card className="mt-6 hover-glow">
              <CardHeader>
                <CardTitle>Análise Comparativa</CardTitle>
              </CardHeader>
              <CardContent className="h-[450px]">
                <ChartContainer config={config} className="w-full h-full">
                  <AreaChart data={mockData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="mensagensGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1cd8b6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1cd8b6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4df1b5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4df1b5" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="conversaoGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39f18e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#39f18e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      dy={10}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      dx={-10}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="mensagens"
                      name="mensagens"
                      stroke="#1cd8b6"
                      fill="url(#mensagensGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      name="leads"
                      stroke="#4df1b5"
                      fill="url(#leadsGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="conversao"
                      name="conversao"
                      stroke="#39f18e"
                      fill="url(#conversaoGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
