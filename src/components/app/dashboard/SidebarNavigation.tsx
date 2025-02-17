
import { useNavigate, useLocation } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Filter,
  MessageSquare,
  Phone,
  Send,
  Bell,
  Calendar,
  Home,
  Bot,
  Tag,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      description: "Visão geral",
      path: "/dashboard",
    },
    {
      icon: Phone,
      label: "Conexão",
      description: "Configure seu WhatsApp",
      path: "/connection",
    },
    {
      icon: MessageSquare,
      label: "Conversas",
      description: "Chat em tempo real",
      path: "/chatboard",
    },
    {
      icon: Bot,
      label: "Agentes",
      description: "Gerencie seus agentes",
      path: "/agentes",
    },
    {
      icon: Filter,
      label: "Funis",
      description: "Gerencie seus funis",
      path: "/funnels",
    },
    {
      icon: Tag,
      label: "Etiquetas",
      description: "Gerencie suas etiquetas",
      path: "/etiquetas",
    },
    {
      icon: Send,
      label: "Disparos",
      description: "Gerencie seus disparos",
      path: "/broadcasts",
    },
    {
      icon: Bell,
      label: "Agendamentos",
      description: "Gerencie seus agendamentos",
      path: "/reminders",
    },
    {
      icon: Calendar,
      label: "Lista de Agendamentos",
      description: "Visualize seus agendamentos",
      path: "/schedules",
    },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarMenu className="space-y-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  onClick={() => navigate(item.path)}
                  className={`group relative flex w-full items-center gap-3 rounded-lg p-2.5 hover:bg-slate-50 transition-all duration-200 ${
                    location.pathname === item.path ? 'bg-primary/10 text-primary' : ''
                  }`}
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
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </TooltipProvider>
  );
}
