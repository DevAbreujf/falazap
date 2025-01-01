import { useNavigate } from "react-router-dom";
import { SidebarMenuItem } from "./dashboard/SidebarMenuItem";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarLogout } from "./dashboard/SidebarLogout";
import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  Users,
  GitBranch,
  Broadcast,
  Settings,
  PhoneCall,
} from "lucide-react";

export function DashboardSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Painel",
      onClick: () => navigate("/painel"),
    },
    {
      icon: MessageSquare,
      label: "Conversas",
      onClick: () => navigate("/conversas"),
    },
    {
      icon: Bell,
      label: "Lembretes",
      onClick: () => navigate("/lembretes"),
    },
    {
      icon: Users,
      label: "Contatos",
      onClick: () => navigate("/contatos"),
    },
    {
      icon: GitBranch,
      label: "Funis",
      onClick: () => navigate("/funis"),
    },
    {
      icon: Broadcast,
      label: "Disparos",
      onClick: () => navigate("/disparos"),
    },
    {
      icon: PhoneCall,
      label: "Conexão",
      onClick: () => navigate("/conexao"),
    },
    {
      icon: Settings,
      label: "Configurações",
      onClick: () => navigate("/configuracoes"),
    },
  ];

  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bottom-0 z-50 border-r bg-card">
      <div className="flex flex-col flex-1 gap-2">
        <div className="h-16 flex items-center justify-center border-b">
          <SidebarLogo />
        </div>

        <nav className="space-y-0.5 px-2">
          {menuItems.map((item, index) => (
            <SidebarMenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </nav>
      </div>

      <SidebarLogout />
    </aside>
  );
}