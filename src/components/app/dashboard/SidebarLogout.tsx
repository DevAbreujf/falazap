import { LogOut } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function SidebarLogout() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => console.log("Logout clicked")}
        className="group flex w-full items-center gap-3 p-4 text-destructive transition-all duration-200 hover:bg-destructive/10"
      >
        <div className="rounded-lg bg-destructive/10 p-2 text-destructive transition-colors group-hover:bg-destructive/20">
          <LogOut className="h-5 w-5" />
        </div>
        <span className="font-medium">Sair</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}