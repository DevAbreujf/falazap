import { Menu, CheckCircle2 } from "lucide-react";
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

export function DashboardSidebar() {
  const navigate = useNavigate();
  
  // Mock data for connected phones - in a real app, this would come from a context or API
  const connectedPhones: { number: string; isConnected: boolean }[] = [
    { number: "+55 11 99999-9999", isConnected: true },
    { number: "+55 11 88888-8888", isConnected: true },
    { number: "+55 11 77777-7777", isConnected: true },
  ];

  // Mock company data - in a real app, this would come from a context or API
  const companyData = {
    nome_fantasia: "Empresa LTDA",
    isConnected: true,
  };

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
          {companyData.isConnected && (
            <div className="flex items-center gap-2 mb-3 text-sm text-primary">
              <span>{companyData.nome_fantasia}</span>
              <CheckCircle2 className="h-4 w-4" />
            </div>
          )}
          <SidebarUserProfile />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/departments')}
              className="w-full justify-start"
            >
              <span className="truncate">Setores</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/users')}
              className="w-full justify-start"
            >
              <span className="truncate">Usuários</span>
            </Button>
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
    </Sidebar>
  );
}