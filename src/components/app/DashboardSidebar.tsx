
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarUserProfile } from "./dashboard/SidebarUserProfile";
import { SidebarPhoneSection } from "./dashboard/SidebarPhoneSection";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { ThemeToggle } from "./dashboard/ThemeToggle";
import { MessageSquare, RefreshCw, BookOpen } from "lucide-react";

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
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Logo Section with Notifications */}
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

        <div>
          {/* Support Section */}
          <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center p-1.5 h-auto hover:bg-primary/5"
              >
                <MessageSquare className="h-4 w-4 text-slate-600 mb-1" />
                <span className="text-[10px] text-slate-600 font-medium">Suporte</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center p-1.5 h-auto hover:bg-primary/5"
              >
                <RefreshCw className="h-4 w-4 text-slate-600 mb-1" />
                <span className="text-[10px] text-slate-600 font-medium">Atualizações</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center p-1.5 h-auto hover:bg-primary/5"
              >
                <BookOpen className="h-4 w-4 text-slate-600 mb-1" />
                <span className="text-[10px] text-slate-600 font-medium">Tutorial</span>
              </Button>
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
