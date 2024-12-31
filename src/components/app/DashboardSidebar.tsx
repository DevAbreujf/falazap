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
      <SidebarHeader className="p-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-gradient-primary">Fala</span>
            <span className="text-3xl font-bold text-white">ZAP</span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    onClick={item.onClick}
                    className="group relative flex w-full flex-col items-start gap-1 p-4 transition-all duration-200 hover:bg-primary/10"
                  >
                    <div className="flex w-full items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-white">{item.label}</span>
                    </div>
                    <span className="pl-12 text-sm text-muted-foreground/80">
                      {item.description}
                    </span>
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
                  className="group flex w-full items-center gap-3 p-4 text-destructive transition-all duration-200 hover:bg-destructive/10"
                >
                  <div className="rounded-lg bg-destructive/10 p-2 text-destructive transition-colors group-hover:bg-destructive/20">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}