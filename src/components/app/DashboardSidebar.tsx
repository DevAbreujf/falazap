import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  // Mock data for connected phones - in a real app, this would come from a context or API
  const connectedPhones: { number: string; isConnected: boolean }[] = [
    { number: "+55 11 99999-9999", isConnected: true },
    { number: "+55 11 88888-8888", isConnected: true },
    { number: "+55 11 77777-7777", isConnected: true },
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
          <SidebarUserProfile />
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