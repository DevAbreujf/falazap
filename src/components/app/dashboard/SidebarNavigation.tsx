
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { BarChart3, Filter, MessageSquare, Phone, Send, Bell, Calendar, Home, Bot, Tag, ChevronDown, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function SidebarNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const currentPath = location.pathname;
    setExpandedItems([]);
    menuItems.forEach(item => {
      if (item.children && (
        currentPath.includes(item.path) || 
        item.children.some(child => currentPath.includes(child.path))
      )) {
        setExpandedItems(prev => [...prev, item.label]);
      }
    });
  }, [location.pathname]);

  const handleItemClick = (item: any) => {
    if (item.children) {
      setExpandedItems(prev => 
        prev.includes(item.label) ? prev.filter(i => i !== item.label) : [...prev, item.label]
      );
    }
    if (!item.children) {
      item.onClick();
    }
  };

  const menuItems = [{
    icon: Home,
    label: "Dashboard",
    description: "Visão geral",
    path: "/dashboard",
    onClick: () => navigate("/dashboard")
  }, {
    icon: Phone,
    label: "Conexão",
    description: "Configure seu WhatsApp",
    path: "/conexao",
    onClick: () => navigate("/conexao")
  }, {
    icon: MessageSquare,
    label: "Conversas",
    description: "Chat em tempo real",
    path: "/conversas",
    onClick: () => navigate("/conversas")
  }, {
    icon: Bot,
    label: "Agentes",
    description: "Gerencie seus agentes",
    path: "/agentes",
    onClick: () => navigate("/agentes")
  }, {
    icon: Filter,
    label: "Funis",
    description: "Gerencie seus funis",
    path: "/funnels",
    onClick: () => navigate("/funnels")
  }, {
    icon: Tag,
    label: "Etiquetas",
    description: "Gerencie suas etiquetas",
    path: "/etiquetas",
    onClick: () => navigate("/etiquetas")
  }, {
    icon: Send,
    label: "Disparos em massa",
    description: "Gerencie seus disparos",
    path: "/disparos",
    onClick: () => navigate("/disparos"),
    children: [{
      icon: Send,
      label: "Lista de disparos",
      description: "Visualize seus disparos",
      path: "/disparos/lista",
      onClick: () => navigate("/disparos/lista")
    }]
  }, {
    icon: Bell,
    label: "Agendamentos",
    description: "Gerencie seus agendamentos",
    path: "/reminders",
    onClick: () => navigate("/reminders"),
    children: [{
      icon: Calendar,
      label: "Lista de Agendamentos",
      description: "Visualize seus agendamentos",
      path: "/schedules",
      onClick: () => navigate("/schedules")
    }]
  }, {
    icon: Users,
    label: "Contatos",
    description: "Gerencie seus contatos",
    path: "/contacts",
    onClick: () => navigate("/contacts")
  }];

  return (
    <SidebarMenu>
      {menuItems.map(item => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton 
            onClick={() => handleItemClick(item)}
            className={cn(
              "group relative flex w-full items-center gap-2 rounded-lg p-1.5 transition-all duration-300 ease-in-out mx-0 my-[1px] cursor-pointer bg-white/5 hover:bg-teal-400/10",
              item.children && "justify-between"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 shadow-sm border border-white/10 group-hover:border-teal-400/30 transition-all duration-300">
                <item.icon className="h-4 w-4 text-white/60 group-hover:text-teal-400 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white/90 leading-tight group-hover:text-teal-400 transition-colors">
                  {item.label}
                </span>
                <span className="text-[11px] text-white/60 leading-tight group-hover:text-teal-400/60 transition-colors">
                  {item.description}
                </span>
              </div>
            </div>
            {item.children && (
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-white/40 hover:text-teal-400 transition-all duration-300 ease-in-out",
                  expandedItems.includes(item.label) && "transform rotate-180"
                )}
              />
            )}
          </SidebarMenuButton>

          {item.children && expandedItems.includes(item.label) && (
            <SidebarMenuSub>
              {item.children.map(child => (
                <SidebarMenuSubItem key={child.label}>
                  <SidebarMenuSubButton
                    onClick={child.onClick}
                    className="flex items-center gap-2 p-1.5 rounded-md hover:bg-teal-400/10 cursor-pointer transition-all duration-300 ease-in-out text-white/60 hover:text-teal-400"
                  >
                    <child.icon className="h-4 w-4" />
                    <span className="text-sm">{child.label}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
