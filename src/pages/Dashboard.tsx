
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [isConnected] = useState(false);
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto relative">
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10">
            {/* Header Section */}
            <div className="bg-white rounded-xl p-6 mb-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="w-full md:w-auto">
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                      Olá, João!
                    </h1>
                  </div>
                  <div className="h-px w-full bg-slate-200 mt-4" />
                  <p className="text-slate-600 text-base md:text-lg mt-4">
                    Bem-vindo ao seu painel de controle
                  </p>
                </div>

                <div className="w-full md:w-auto flex items-center gap-4">
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

          {/* Floating Support Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90"
                  onClick={() => {/* Add support action here */}}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.5 21L6.39139 20.3229C6.77584 20.22 7.18306 20.2791 7.53937 20.4565C8.88029 21.1244 10.3922 21.5 12 21.5C13.6078 21.5 15.1197 21.1244 16.4606 20.4565C16.8169 20.2791 17.2242 20.22 17.6086 20.3229L21.5 21L20.8229 17.6006C20.72 17.2161 20.7791 16.8088 20.9565 16.4525C21.6244 15.1116 22 13.5997 22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 16C16.6569 16 18 14.6569 18 13C18 11.3431 16.6569 10 15 10C13.3431 10 12 11.3431 12 13C12 14.6569 13.3431 16 15 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M9 16C10.6569 16 12 14.6569 12 13C12 11.3431 10.6569 10 9 10C7.34315 10 6 11.3431 6 13C6 14.6569 7.34315 16 9 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Suporte</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </SidebarProvider>
  );
}
