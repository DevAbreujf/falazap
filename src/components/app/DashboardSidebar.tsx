import {
  BarChart3,
  Filter,
  MessageSquare,
  Users,
  Phone,
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
      icon: MessageSquare,
      label: "SMS",
      description: "Envie mensagens",
      onClick: () => console.log("SMS clicked"),
    },
    {
      icon: Users,
      label: "Contatos",
      description: "Gerencie seus contatos",
      onClick: () => console.log("Contatos clicked"),
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