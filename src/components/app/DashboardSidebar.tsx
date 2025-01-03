import {
  BarChart3,
  Filter,
  Users,
  Phone,
  Send,
  Bell,
  Calendar,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { Button } from "../ui/button";
import { SidebarMenu } from "./dashboard/SidebarMenu";
import { UserInfo } from "./dashboard/UserInfo";
import { SidebarHeader as CustomSidebarHeader } from "./dashboard/SidebarHeader";

export function DashboardSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: BarChart3,
      label: "Métricas",
      description: "Visualize suas estatísticas",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: Phone,
      label: "Conexão",
      description: "Configure seu WhatsApp",
      onClick: () => navigate("/connection"),
    },
    {
      icon: Filter,
      label: "Funis",
      description: "Gerencie seus funis",
      onClick: () => navigate("/funnels"),
    },
    {
      icon: Send,
      label: "Disparos",
      description: "Gerencie seus disparos",
      onClick: () => navigate("/broadcasts"),
    },
    {
      icon: Bell,
      label: "Agendamentos",
      description: "Gerencie seus agendamentos",
      onClick: () => navigate("/reminders"),
    },
    {
      icon: Calendar,
      label: "Lista de Agendamentos",
      description: "Visualize seus agendamentos",
      onClick: () => navigate("/schedules"),
    },
    {
      icon: Users,
      label: "Contatos",
      description: "Gerencie seus contatos",
      onClick: () => navigate("/contacts"),
    },
  ];

  return (
    <Sidebar className="border-r border-border/40">
      <div className="flex items-center gap-4 p-4">
        <div className="block lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="hover:bg-primary/20 bg-black/50"
          >
            <SidebarTrigger>
              <Menu className="h-6 w-6 text-primary" />
            </SidebarTrigger>
          </Button>
        </div>
        <SidebarLogo />
      </div>
      
      <SidebarHeader>
        <CustomSidebarHeader />
        <div className="p-3">
          <UserInfo />
          <div className="mt-3">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-sidebar-border to-transparent opacity-30" />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu items={menuItems} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}