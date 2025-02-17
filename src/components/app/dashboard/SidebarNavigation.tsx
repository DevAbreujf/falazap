
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
                  className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-primary/10 text-primary hover:bg-primary/15' 
                      : 'hover:bg-primary/5'
                  }`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary/10'
                      : 'bg-card shadow-sm group-hover:shadow group-hover:bg-background'
                  }`}>
                    <item.icon className={`h-5 w-5 transition-colors ${
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </span>
                  </div>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex flex-col gap-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </TooltipProvider>
  );
}
