import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { MetricsTimeSelector } from "@/components/app/MetricsTimeSelector";
import { Circle } from "lucide-react";
import { PricingDialog } from "@/components/app/PricingDialog";
import { MetricsGrid } from "@/components/app/dashboard/MetricsGrid";
import { AnalyticsChart } from "@/components/app/dashboard/AnalyticsChart";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [isConnected] = useState(false);
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto px-8 py-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Olá, João!
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
                <p className="text-muted-foreground text-lg mt-2">
                  Bem-vindo ao seu painel de controle
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2">
                    <Circle
                      className={`h-3 w-3 fill-current ${
                        isConnected ? "text-emerald-500" : "text-red-500"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {isConnected ? "Conectado" : "Não conectado"}
                    </span>
                  </div>
                  {!isConnected && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm hover:bg-primary/10 transition-colors"
                      onClick={() => navigate("/connection")}
                    >
                      Conectar número
                    </Button>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">
                  Plano atual: <span className="font-medium text-primary">Pro</span>
                </p>
                <PricingDialog />
              </div>
            </div>

            <MetricsTimeSelector selected={timeRange} onChange={setTimeRange} />

            <div className="mt-8">
              <MetricsGrid timeRange={timeRange} />
            </div>

            <div className="mt-8">
              <AnalyticsChart />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}