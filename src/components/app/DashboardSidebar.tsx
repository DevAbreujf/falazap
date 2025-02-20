
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarUserProfile } from "./dashboard/SidebarUserProfile";
import { SidebarPhoneSection } from "./dashboard/SidebarPhoneSection";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { ThemeToggle } from "./dashboard/ThemeToggle";
import { RefreshCw, BookOpen } from "lucide-react";

export function DashboardSidebar() {
  const navigate = useNavigate();
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
    <Sidebar className="border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="flex flex-col h-full justify-between max-h-screen">
        <div className="overflow-y-auto flex-1">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <SidebarLogo />
          </div>
          
          <SidebarHeader className="py-0">
            <div className="p-3">
              <SidebarUserProfile />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/departments')} className="w-full justify-center dark:border-slate-700 dark:hover:bg-slate-800">
                  <span className="truncate">Setores</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/users')} className="w-full justify-center dark:border-slate-700 dark:hover:bg-slate-800">
                  <span className="truncate">Usuários</span>
                </Button>
              </div>
              <SidebarPhoneSection connectedPhones={connectedPhones} />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarNavigation />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700">
          {/* Updates and Tutorial Section */}
          <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col gap-3">
              <button
                className="relative w-full h-20 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg bg-slate-100 dark:bg-slate-800"
              >
                <div className="relative h-full flex flex-col items-center justify-center gap-2 text-slate-700 dark:text-white">
                  <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-all duration-500" />
                  <span className="text-sm font-medium">Atualizações</span>
                </div>
              </button>

              <button
                className="relative w-full h-20 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg bg-slate-100 dark:bg-slate-800"
              >
                <div className="relative h-full flex flex-col items-center justify-center gap-2 text-slate-700 dark:text-white">
                  <BookOpen className="h-5 w-5 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-sm font-medium">Tutorial</span>
                </div>
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
