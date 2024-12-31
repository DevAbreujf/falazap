import {
  BarChart3,
  Filter,
  Users,
  Phone,
  Send,
  Bell,
} from "lucide-react";
import {
  SidebarContent as BaseSidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { SidebarMenuSection } from "./SidebarMenuSection";
import { SidebarLogout } from "./SidebarLogout";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
}

export function SidebarContent() {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
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
    <BaseSidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="px-2">
            {menuItems.map((item) => (
              <SidebarMenuSection
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
    </BaseSidebarContent>
  );
}