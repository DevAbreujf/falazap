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
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarMenuItemComponent } from "./dashboard/SidebarMenuItem";
import { SidebarLogout } from "./dashboard/SidebarLogout";

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
    <Sidebar>
      <SidebarHeader className="p-3">
        <SidebarLogo />
        <div className="mt-6 px-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sidebar-border/30 to-transparent" />
          <div className="mt-6 rounded-xl bg-gradient-to-br from-sidebar-accent/5 to-sidebar-accent/10 backdrop-blur-lg border border-white/5 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center">
                <p className="text-lg font-semibold text-primary">JS</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gradient-primary">Bem-vindo,</p>
                <h3 className="text-lg font-semibold text-sidebar-foreground mt-1">
                  João Silva
                </h3>
              </div>
              <div className="w-full mt-4 space-y-2">
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
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
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