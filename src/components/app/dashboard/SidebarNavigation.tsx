
import { useNavigate } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { BarChart3, Filter, MessageSquare, Phone, Send, Bell, Calendar, Home, Bot, Tag } from "lucide-react";

export function SidebarNavigation() {
  const navigate = useNavigate();
  const menuItems = [{
    icon: Home,
    label: "Dashboard",
    description: "Visão geral",
    onClick: () => navigate("/dashboard")
  }, {
    icon: Phone,
    label: "Conexão",
    description: "Configure seu WhatsApp",
    onClick: () => navigate("/connection")
  }, {
    icon: MessageSquare,
    label: "Conversas",
    description: "Chat em tempo real",
    onClick: () => navigate("/chatboard")
  }, {
    icon: Bot,
    label: "Agentes",
    description: "Gerencie seus agentes",
    onClick: () => navigate("/agentes")
  }, {
    icon: Filter,
    label: "Funis",
    description: "Gerencie seus funis",
    onClick: () => navigate("/funnels")
  }, {
    icon: Tag,
    label: "Etiquetas",
    description: "Gerencie suas etiquetas",
    onClick: () => navigate("/etiquetas")
  }, {
    icon: Send,
    label: "Disparos",
    description: "Gerencie seus disparos",
    onClick: () => navigate("/broadcasts")
  }, {
    icon: Bell,
    label: "Agendamentos",
    description: "Gerencie seus agendamentos",
    onClick: () => navigate("/reminders")
  }, {
    icon: Calendar,
    label: "Lista de Agendamentos",
    description: "Visualize seus agendamentos",
    onClick: () => navigate("/schedules")
  }];

  return (
    <SidebarMenu className="space-y-4 py-2">
      {menuItems.map(item => (
        <SidebarMenuItem key={item.label} className="">
          <SidebarMenuButton 
            onClick={item.onClick} 
            className="group relative flex w-full items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-all duration-200"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 group-hover:border-slate-300 transition-all duration-200">
              <item.icon className="h-5 w-5 text-slate-600 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex flex-col gap-1">
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
