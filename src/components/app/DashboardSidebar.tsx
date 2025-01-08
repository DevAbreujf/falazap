import {
  BarChart3,
  Filter,
  MessageSquare,
  Users,
  Phone,
  Send,
  Bell,
  Calendar,
  Settings,
  Menu,
  User,
  LogOut,
  ChevronDown,
  Home,
  Bot,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardSidebar() {
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
    <Sidebar className="border-r border-slate-200 bg-white">
      <div className="flex items-center gap-4 p-4">
        <div className="block lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="hover:bg-slate-100"
          >
            <SidebarTrigger>
              <Menu className="h-6 w-6 text-slate-600" />
            </SidebarTrigger>
          </Button>
        </div>
        <SidebarLogo />
      </div>
      
      <SidebarHeader>
        <div className="p-4">
          <div className="p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-900 truncate">
                  João Silva
                </h3>
                <p className="text-xs text-slate-500">
                  Administrador
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
                    <Settings className="h-4 w-4 text-slate-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log("Logout clicked")} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Phone number selection moved here */}
          <div className="mt-2 p-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-all duration-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-slate-50 p-1.5 h-auto"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-600" />
                    <span className="text-sm">+55 11 99999-9999</span>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs">
                      conectado
                    </Badge>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="hover:bg-slate-50">
                  +55 11 88888-8888
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-50">
                  +55 11 77777-7777
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
