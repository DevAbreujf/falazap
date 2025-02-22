
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarUserProfile } from "./dashboard/SidebarUserProfile";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { RefreshCw, BookOpen, ArrowLeft } from "lucide-react";

export function DashboardSidebar() {
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="border-r border-slate-200 bg-white dark:bg-[#03201E] dark:border-slate-700 hidden md:block h-full">
      <div className="flex flex-col h-full">
        {/* Floating Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenMobile(false)}
          className="md:hidden absolute right-4 top-20 z-50 h-8 w-8 rounded-full 
            bg-white/10 hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-800/80
            backdrop-blur-sm border border-white/20 dark:border-slate-700 shadow-lg
            transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4 text-slate-600 dark:text-slate-200" />
        </Button>

        {/* Header Section */}
        <div className="flex-none bg-slate-50 dark:bg-[#03201E]">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <SidebarLogo />
          </div>
          
          <SidebarHeader className="py-4">
            <div className="px-4">
              <SidebarUserProfile />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/departments')} 
                  className="w-full justify-center h-10 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <span className="truncate">Setores</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/users')} 
                  className="w-full justify-center h-10 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <span className="truncate">Usuários</span>
                </Button>
              </div>
            </div>
          </SidebarHeader>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 bg-slate-50 dark:bg-[#03201E]">
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent className="space-y-2">
                <SidebarNavigation />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>

        {/* Footer Section */}
        <div className="flex-none border-t border-slate-200 dark:border-slate-700">
          <div className="p-4 bg-slate-50 dark:bg-[#03201E]">
            <div className="flex flex-col gap-4">
              <button 
                className="relative w-full h-24 rounded-xl overflow-hidden group 
                  transition-all duration-300 hover:shadow-lg bg-slate-100 dark:bg-slate-800/50
                  hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <div className="relative h-full flex flex-col items-center justify-center gap-3 text-slate-700 dark:text-white">
                  <RefreshCw className="h-6 w-6 group-hover:rotate-180 transition-all duration-500" />
                  <span className="text-sm font-medium">Atualizações</span>
                </div>
              </button>

              <button 
                className="relative w-full h-24 rounded-xl overflow-hidden group 
                  transition-all duration-300 hover:shadow-lg bg-slate-100 dark:bg-slate-800/50
                  hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <div className="relative h-full flex flex-col items-center justify-center gap-3 text-slate-700 dark:text-white">
                  <BookOpen className="h-6 w-6 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-sm font-medium">Tutorial</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
