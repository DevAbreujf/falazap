import { useNavigate } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Filter,
  MessageSquare,
  Users,
  Phone,
  Send,
  Bell,
  Calendar,
  Home,
  Bot,
  User,
} from "lucide-react";

export function SidebarNavigation() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      description: "Visão geral",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: Phone,
      label: "Conexão",
      description: "Configure seu WhatsApp",
      onClick: () => navigate("/connection"),
    },
    {
      icon: MessageSquare,
      label: "Conversas",
      description: "Chat em tempo real",
      onClick: () => navigate("/chatboard"),
    },
    {
      icon: Bot,
      label: "Agentes",
      description: "Gerencie seus agentes",
      onClick: () => navigate("/agentes"),
    },
    {
      icon: User,
      label: "Usuários",
      description: "Gerencie seus usuários",
      onClick: () => navigate("/users"),
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
    <SidebarMenu className="space-y-1">
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            onClick={item.onClick}
            className="group relative flex w-full items-center gap-3 rounded-lg p-2.5 hover:bg-slate-50 transition-all duration-200"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 group-hover:border-slate-300 transition-all duration-200">
              <item.icon className="h-4 w-4 text-slate-600 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900 leading-tight">
                {item.label}
              </span>
              <span className="text-xs text-slate-500 leading-tight">
                {item.description}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}