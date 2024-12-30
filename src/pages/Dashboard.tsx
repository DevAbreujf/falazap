import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { MetricsTimeSelector } from "@/components/app/MetricsTimeSelector";
import { MetricCard } from "@/components/app/MetricCard";
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
import { TrendingUp, Users, MessageSquare, Target } from "lucide-react";

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
          <main className="container mx-auto px-8 py-10">
            {/* Header section */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Olá, João!
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Bem-vindo ao seu painel de controle
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">
                  Plano atual: <span className="font-medium text-primary">Pro</span>
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="hover-glow bg-primary/90 hover:bg-primary transition-all duration-300">
                      Upgrade de Plano
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl w-[95vw] p-0 gap-0 bg-background/95 backdrop-blur-sm border border-primary/10">
                    <DialogHeader className="p-6 pb-0">
                      <DialogTitle className="text-3xl font-bold text-gradient-primary">
                        Escolha seu plano
                      </DialogTitle>
                      <DialogDescription className="text-lg text-muted-foreground">
                        Selecione o plano ideal para o seu negócio
                      </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[80vh] p-6 pt-0 scrollbar-hide">
                      <Pricing />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <MetricsTimeSelector selected={timeRange} onChange={setTimeRange} />

            {/* Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-4 mt-8">
              <MetricCard
                title="Mensagens Enviadas"
                value="2,345"
                trend="+20.1% em relação ao período anterior"
                icon={MessageSquare}
              />
              <MetricCard
                title="Novos Leads"
                value="345"
                trend="+10.5% em relação ao período anterior"
                icon={Users}
              />
              <MetricCard
                title="Taxa de Conversão"
                value="14.2%"
                trend="+2.3% em relação ao período anterior"
                icon={Target}
              />
              <MetricCard
                title="Funis Ativos"
                value="3"
                trend="+1 em relação ao período anterior"
                icon={Target}
              />
            </div>

            {/* Chart Card */}
            <Card className="mt-8 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Análise Comparativa
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[450px] p-4">
                <ChartContainer config={config} className="w-full h-full">
                  <AreaChart 
                    data={mockData} 
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
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
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="hsl(var(--border))" 
                      opacity={0.2} 
                    />
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