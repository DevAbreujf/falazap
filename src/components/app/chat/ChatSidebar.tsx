import { Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarUserProfile } from "./dashboard/SidebarUserProfile";
import { SidebarPhoneSection } from "./dashboard/SidebarPhoneSection";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { SidebarNotifications } from "./dashboard/SidebarNotifications";
import { ThemeToggle } from "./dashboard/ThemeToggle";

export function ChatSidebar() {
  const navigate = useNavigate();
  
  const connectedPhones = [
    { number: "+55 11 99999-9999", isConnected: true },
    { number: "+55 11 88888-8888", isConnected: true },
    { number: "+55 11 77777-7777", isConnected: true },
  ];

  return (
    <div className="w-96 border-r border-slate-200 bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-start gap-2 p-4 border-b border-primary/10 bg-card/50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="hover:bg-primary/10 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voltar para o dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <SidebarHeader>
        <div className="p-4">
          <SidebarUserProfile />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/departments')}
              className="w-full justify-start dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span className="truncate">Setores</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/users')}
              className="w-full justify-start dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span className="truncate">Usuários</span>
            </Button>
          </div>
          <SidebarPhoneSection connectedPhones={connectedPhones} />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarNavigation />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}