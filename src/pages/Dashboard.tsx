import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { MetricsTimeSelector } from "@/components/app/MetricsTimeSelector";
import { Circle, Menu, ChevronDown, Phone, Bell } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [isConnected] = useState(false);
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10">
            {/* Header Section */}
            <div className="bg-white rounded-xl p-6 mb-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="w-full md:w-auto">
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                      Olá, João!
                    </h1>
                    <div className="block lg:hidden">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        asChild 
                        className="hover:bg-slate-100"
                      >
                        <SidebarTrigger>
                          <Menu className="h-6 w-6 text-slate-600" />
                        </SidebarTrigger>
                      </Button>
                    </div>
                  </div>
                  <div className="h-px w-full bg-slate-200 mt-4" />
                  <p className="text-slate-600 text-base md:text-lg mt-4">
                    Bem-vindo ao seu painel de controle
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Circle
                        className={`h-3 w-3 fill-current animate-pulse ${
                          isConnected ? "text-emerald-500" : "text-red-500"
                        }`}
                      />
                      <span className="text-sm text-slate-600">
                        {isConnected ? "Conectado" : "Não conectado"}
                      </span>
                    </div>
                    {!isConnected && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-sm hover:bg-slate-50"
                        onClick={() => navigate("/connection")}
                      >
                        Conectar número
                      </Button>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-auto flex items-center gap-4">
                  <div className="bg-white border border-slate-200 hover:border-slate-300 p-3 rounded-lg flex-1 md:flex-none transition-all duration-300">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-slate-600" />
                            <span>+55 11 99999-9999</span>
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                              conectado
                            </Badge>
                          </div>
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem className="hover:bg-slate-50">
                          +55 11 88888-8888
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-50">
                          +55 11 77777-7777
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2">
                      Plano atual: <span className="font-medium text-primary">Pro</span>
                    </p>
                    <PricingDialog />
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Time Selector */}
            <div className="mb-8">
              <MetricsTimeSelector selected={timeRange} onChange={setTimeRange} />
            </div>

            {/* Dashboard Content */}
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid gap-6">
                <MetricsGrid timeRange={timeRange} />
              </div>

              {/* Analytics Chart */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                <AnalyticsChart />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}