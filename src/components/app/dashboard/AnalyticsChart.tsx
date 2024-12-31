import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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

export function AnalyticsChart() {
  return (
    <Card className="hover-glow transition-all duration-300">
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
  );
}