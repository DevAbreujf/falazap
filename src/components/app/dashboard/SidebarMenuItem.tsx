import { LucideIcon } from "lucide-react";
import {
  SidebarMenuItem as BaseSidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
}

export function SidebarMenuItemComponent({
  icon: Icon,
  label,
  description,
  onClick,
}: SidebarMenuItemProps) {
  return (
    <BaseSidebarMenuItem>
      <SidebarMenuButton
        onClick={onClick}
        className="group relative flex w-full items-center gap-3 p-3 mb-2 transition-all duration-200 hover:bg-primary/10"
      >
        <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="block font-medium text-white text-sm leading-tight">
            {label}
          </span>
          <span className="block text-xs text-muted-foreground/80 mt-0.5 leading-tight">
            {description}
          </span>
        </div>
      </SidebarMenuButton>
    </BaseSidebarMenuItem>
  );
}