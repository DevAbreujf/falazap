
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
    item.onClick();
  };

  const toggleExpanded = (e: React.MouseEvent, label: string) => {
    e.stopPropagation();
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
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
    path: "/chatboard",
    onClick: () => navigate("/chatboard")
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
      path: "/disparos",
      onClick: () => navigate("/disparos")
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
              "group relative flex w-full items-center gap-2 rounded-lg p-2 transition-all duration-200 mx-0 my-[2px] cursor-pointer",
              item.children && "justify-between"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 group-hover:border-slate-300 transition-all duration-200">
                <item.icon className="h-4 w-4 text-slate-600 group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 leading-tight group-hover:text-primary transition-colors">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-500 leading-tight group-hover:text-slate-600 transition-colors">
                  {item.description}
                </span>
              </div>
            </div>
            {item.children && (
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-slate-400 hover:text-primary transition-all duration-200",
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
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 cursor-pointer transition-all duration-200 text-slate-600 hover:text-primary"
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
