
import { useNavigate } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { BarChart3, Filter, MessageSquare, Phone, Send, Bell, Calendar, Home, Bot, Tag, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SidebarNavigation() {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
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
    onClick: () => navigate("/reminders"),
    children: [{
      icon: Calendar,
      label: "Lista de Agendamentos",
      description: "Visualize seus agendamentos",
      onClick: () => navigate("/schedules")
    }]
  }];

  return (
    <SidebarMenu>
      {menuItems.map(item => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton 
            onClick={item.children ? () => toggleExpanded(item.label) : item.onClick}
            className={cn(
              "group relative flex w-full items-center gap-3 rounded-lg p-2.5 transition-all duration-200 mx-0 my-[4px]",
              item.children && "justify-between"
            )}
          >
            <div className="flex items-center gap-3">
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
            </div>
            {item.children && (
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-slate-400 transition-transform duration-200",
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
                    className="flex items-center gap-2"
                  >
                    <child.icon className="h-4 w-4" />
                    <span>{child.label}</span>
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
