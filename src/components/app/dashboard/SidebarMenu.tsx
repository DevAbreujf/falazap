import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarMenu as BaseSidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
}

interface SidebarMenuProps {
  items: MenuItem[];
}

export function SidebarMenu({ items }: SidebarMenuProps) {
  return (
    <BaseSidebarMenu className="space-y-2">
      {items.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            onClick={item.onClick}
            className="group relative flex w-full items-center gap-3 p-5 mb-4 transition-all duration-200 hover:bg-primary/10 rounded-lg"
          >
            <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
              <item.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-medium text-white text-sm leading-tight">
                {item.label}
              </span>
              <span className="block text-xs text-muted-foreground/80 mt-0.5 leading-tight">
                {item.description}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </BaseSidebarMenu>
  );
}