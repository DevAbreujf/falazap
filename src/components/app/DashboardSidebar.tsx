import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarLogo } from "./dashboard/SidebarLogo";
import { SidebarContent } from "./dashboard/SidebarContent";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-3">
        <SidebarLogo />
        <div className="mt-3 px-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-sidebar-border to-transparent" />
          <div className="mt-3 flex items-center gap-2 justify-center">
            <p className="text-sm font-medium text-gradient-primary">Bem-vindo,</p>
            <h3 className="text-lg font-semibold text-sidebar-foreground">
              João Silva
            </h3>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent />
    </Sidebar>
  );
}