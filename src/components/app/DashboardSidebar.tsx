import {
  BarChart3,
  Filter,
  Users,
  Phone,
  Send,
  Bell,
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
      label: "Lembretes",
      description: "Gerencie seus lembretes",
      onClick: () => navigate("/reminders"),
    },
    {
      icon: Users,
      label: "Contatos",
      description: "Gerencie seus contatos",
      onClick: () => navigate("/contacts"),
    },
    {
      icon: Phone,
      label: "Conexão",
      description: "Configure seu WhatsApp",
      onClick: () => console.log("Conexão clicked"),
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-3">
        <SidebarLogo />
        <div className="mt-3 px-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-sidebar-border to-transparent" />
          <div className="mt-3 flex items-center gap-2 justify-center">
            <p className="text-sm font-medium text-gradient-primary">Bem-vindo,</p>
            <h3 className="text-lg font-semibold text-sidebar-foreground">
              João Silva
            </h3>
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
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              <SidebarLogout />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}