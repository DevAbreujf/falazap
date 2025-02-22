
import { useState } from "react";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { MetricsTimeSelector } from "@/components/app/MetricsTimeSelector";
import { Menu } from "lucide-react";
import { PricingDialog } from "@/components/app/PricingDialog";
import { MetricsGrid } from "@/components/app/dashboard/MetricsGrid";
import { AnalyticsChart } from "@/components/app/dashboard/AnalyticsChart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarPhoneSection } from "@/components/app/dashboard/SidebarPhoneSection";

function DashboardContent() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [isConnected] = useState(false);
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  
  const connectedPhones = [{
    number: "+55 11 99999-9999",
    isConnected: true
  }, {
    number: "+55 11 88888-8888",
    isConnected: true
  }, {
    number: "+55 11 77777-7777",
    isConnected: true
  }];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-auto bg-[#03201E]">
      {/* Header Mobile Fixo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 md:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenMobile(true)}
            className="text-white/80 hover:text-teal-400"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 container mx-auto p-4 md:p-6 lg:px-8 xl:px-10 pt-16 md:pt-6">
        {/* Header Section */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="w-full md:w-auto">
              <div className="mb-4">
                <SidebarPhoneSection connectedPhones={connectedPhones} />
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white/90">
                  Olá, João!
                </h1>
              </div>
              <div className="h-px w-full bg-white/10 mt-3" />
              <p className="text-white/60 text-base mt-3">
                Bem-vindo ao seu painel de controle
              </p>
            </div>
            <div className="flex flex-col items-end">
              <Button
                variant="default"
                onClick={() => setIsPricingOpen(true)}
                className="w-full md:w-auto bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600"
              >
                Atualizar plano
              </Button>
              <p className="text-sm text-white/60 mt-2">
                Plano atual: <span className="font-medium text-teal-400">Pro</span>
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Time Selector */}
        <div className="mb-6">
          <MetricsTimeSelector selected={timeRange} onChange={setTimeRange} />
        </div>

        {/* Dashboard Content */}
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid gap-4">
            <MetricsGrid timeRange={timeRange} />
          </div>

          {/* Analytics Chart */}
          <div className="glass-card p-4">
            <AnalyticsChart />
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600"
              onClick={() => {/* Add support action here */}}
            >
              <svg
                className="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.5 21L6.39139 20.3229C6.77584 20.22 7.18306 20.2791 7.53937 20.4565C8.88029 21.1244 10.3922 21.5 12 21.5C13.6078 21.5 15.1197 21.1244 16.4606 20.4565C16.8169 20.2791 17.2242 20.22 17.6086 20.3229L21.5 21L20.8229 17.6006C20.72 17.2161 20.7791 16.8088 20.9565 16.4525C21.6244 15.1116 22 13.5997 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" />
                <path d="M15 16C16.6569 16 18 14.6569 18 13C18 11.3431 16.6569 10 15 10C13.3431 10 12 11.3431 12 13C12 14.6569 13.3431 16 15 16Z" stroke="currentColor" strokeWidth="2" />
                <path d="M9 16C10.6569 16 12 14.6569 12 13C12 11.3431 10.6569 10 9 10C7.34315 10 6 11.3431 6 13C6 14.6569 7.34315 16 9 16Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Suporte</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PricingDialog open={isPricingOpen} onOpenChange={setIsPricingOpen} />
    </div>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </SidebarProvider>
  );
}
