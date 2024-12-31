import {
  BarChart3,
  Filter,
  MessageSquare,
  Users,
  LogOut,
  Phone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export function DashboardSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: BarChart3,
      label: "Métricas",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: Filter,
      label: "Funis",
      onClick: () => navigate("/funnels"),
    },
    {
      icon: MessageSquare,
      label: "SMS",
      onClick: () => console.log("SMS clicked"),
    },
    {
      icon: Users,
      label: "Contatos",
      onClick: () => console.log("Contatos clicked"),
    },
    {
      icon: Phone,
      label: "Conexão",
      onClick: () => console.log("Conexão clicked"),
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Fala</span>
          <span className="text-2xl font-bold">ZAP</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton onClick={item.onClick}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => console.log("Logout clicked")}
                  className="text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}