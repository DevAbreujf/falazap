import { BarChart3, MessageSquare, Users, FolderGit2, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Métricas",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Funis",
    url: "/dashboard/funnels",
    icon: FolderGit2,
  },
  {
    title: "SMS",
    url: "/dashboard/sms",
    icon: MessageSquare,
  },
  {
    title: "Contatos",
    url: "/dashboard/contacts",
    icon: Users,
  },
  {
    title: "Conexão",
    url: "/dashboard/connection",
    icon: (props: any) => (
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M3 21l1.9-5.7a8.5 8.5 0 113.4 3.4z" />
      </svg>
    ),
  },
];

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-8">
        <div className="flex items-center space-x-2">
          <span className="text-5xl font-bold text-primary">Fala</span>
          <span className="text-5xl font-bold text-foreground">ZAP</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl px-8 mb-4">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="hover:bg-primary/10 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                  >
                    <a href={item.url} className="flex items-center gap-4 px-8 py-4">
                      <item.icon className="h-8 w-8" />
                      <span className="text-2xl font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-8 py-4 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-8 w-8" />
                  <span className="text-2xl font-medium">Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}