import { Bell, Calendar, Home, MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarMenuSection } from "./SidebarMenuSection";
import { SidebarLogout } from "./SidebarLogout";
import type { LucideIcon } from 'lucide-react';

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
      icon: Home,
      label: "Início",
      description: "Voltar para a página inicial",
      onClick: () => navigate("/"),
    },
    {
      icon: Calendar,
      label: "Lembretes",
      description: "Gerenciar seus lembretes",
      onClick: () => navigate("/reminders"),
    },
    {
      icon: Users,
      label: "Contatos",
      description: "Gerenciar seus contatos",
      onClick: () => navigate("/contacts"),
    },
    {
      icon: MessageSquare,
      label: "Mensagens",
      description: "Ver suas mensagens",
      onClick: () => navigate("/messages"),
    },
    {
      icon: Bell,
      label: "Notificações",
      description: "Ver suas notificações",
      onClick: () => navigate("/notifications"),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarMenuSection
            key={item.label}
            icon={item.icon}
            label={item.label}
            description={item.description}
            onClick={item.onClick}
          />
        ))}
      </div>
      <SidebarLogout />
    </div>
  );
}