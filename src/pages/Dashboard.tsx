import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { MetricsTimeSelector } from "@/components/app/MetricsTimeSelector";
import { Circle, Menu, ChevronDown, Phone } from "lucide-react";
import { PricingDialog } from "@/components/app/PricingDialog";
import { MetricsGrid } from "@/components/app/dashboard/MetricsGrid";
import { AnalyticsChart } from "@/components/app/dashboard/AnalyticsChart";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [isConnected] = useState(false);
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="w-full md:w-auto">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Olá, João!
                  </h1>
                  <div className="block lg:hidden">
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
                      <SidebarTrigger>
                        <Menu className="h-6 w-6 text-primary" />
                      </SidebarTrigger>
                    </Button>
                  </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
                <p className="text-muted-foreground text-base md:text-lg mt-2">
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
              <div className="w-full md:w-auto flex items-center gap-4">
                <div className="glass-card hover:bg-white/5 transition-all duration-300 p-3 rounded-lg flex-1 md:flex-none">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between hover:bg-primary/20">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <span>+55 11 99999-9999</span>
                          <span className="text-xs text-primary/80">(conectado)</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-primary" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem>
                        +55 11 88888-8888
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        +55 11 77777-7777
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Plano atual: <span className="font-medium text-primary">Pro</span>
                  </p>
                  <PricingDialog />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <MetricsTimeSelector selected={timeRange} onChange={setTimeRange} />
            </div>

            <div className="space-y-8">
              <div className="grid gap-6">
                <MetricsGrid timeRange={timeRange} />
              </div>

              <div className="bg-card rounded-lg p-4">
                <AnalyticsChart />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}