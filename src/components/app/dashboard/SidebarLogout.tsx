import { LogOut } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function SidebarLogout() {
  return (
    <SidebarMenuItem className="list-none">
      <SidebarMenuButton
        onClick={() => console.log("Logout clicked")}
        className="group relative flex w-full items-center gap-3 p-5 mb-4 transition-all duration-200 hover:bg-destructive/10 rounded-lg"
      >
        <div className="rounded-lg bg-destructive/10 p-2 text-destructive transition-colors group-hover:bg-destructive/20">
          <LogOut className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="block font-medium text-destructive text-sm leading-tight">
            Sair
          </span>
          <span className="block text-xs text-muted-foreground/80 mt-0.5 leading-tight">
            Encerrar sessão
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}