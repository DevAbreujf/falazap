import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarUserProfile } from "./dashboard/SidebarUserProfile";
import { SidebarPhoneSection } from "./dashboard/SidebarPhoneSection";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { SidebarNotifications } from "./dashboard/SidebarNotifications";
import { ThemeToggle } from "./dashboard/ThemeToggle";
import { useState } from "react";

export function DashboardSidebar() {
  const navigate = useNavigate();
  const [departments] = useState([
    { id: 1, name: "Suporte", users: [] },
    { id: 2, name: "Vendas", users: [] },
    { id: 3, name: "Financeiro", users: [] },
    { id: 4, name: "Administrativo", users: [] },
  ]);
  
  const connectedPhones = [
    { number: "+55 11 99999-9999", isConnected: true },
    { number: "+55 11 88888-8888", isConnected: true },
    { number: "+55 11 77777-7777", isConnected: true },
  ];

  return (
    <Sidebar className="border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="flex items-center gap-4 p-4">
        <div className="block lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <SidebarTrigger>
              <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </SidebarTrigger>
          </Button>
        </div>
        <SidebarLogo />
        <div className="ml-auto">
          <SidebarNotifications />
        </div>
      </div>
      
      <SidebarHeader>
        <div className="p-4">
          <SidebarUserProfile />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/departments')}
              className="w-full justify-start dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span className="truncate">Setores</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/users')}
              className="w-full justify-start dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span className="truncate">Usuários</span>
            </Button>
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-medium mb-2">Setores Disponíveis</h3>
            <div className="space-y-1">
              {departments.map((dept) => (
                <Button
                  key={dept.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/departments?id=${dept.id}`)}
                  className="w-full justify-start text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {dept.name}
                </Button>
              ))}
            </div>
          </div>
          <SidebarPhoneSection connectedPhones={connectedPhones} />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarNavigation />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </Sidebar>
  );
}