import {
  BarChart3,
  Filter,
  MessageSquare,
  Users,
  Phone,
  Send,
  Bell,
  Calendar,
  Settings,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarMenuItemComponent } from "./dashboard/SidebarMenuItem";
import { SidebarLogout } from "./dashboard/SidebarLogout";
import { Button } from "../ui/button";

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
      <div className="flex items-center justify-between p-4 lg:justify-center">
        <SidebarLogo />
        <div className="lg:hidden">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
        </div>
      </div>
      
      <SidebarHeader className="p-3">
        <div className="mt-3 px-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-sidebar-border to-transparent opacity-30" />
          <div className="mt-4 flex flex-col items-center gap-2 p-3 glass-card hover:bg-white/5 transition-all duration-300">
            <p className="text-sm font-medium text-gradient-primary">Bem-vindo,</p>
            <h3 className="text-lg font-semibold text-sidebar-foreground">
              João Silva
            </h3>
            <div className="mt-3 w-full">
              <SidebarMenuItemComponent
                icon={Settings}
                label="Configurações"
                description="Gerencie suas configurações"
                onClick={() => navigate("/settings")}
              />
              <SidebarLogout />
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItemComponent
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  description={item.description}
                  onClick={item.onClick}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}