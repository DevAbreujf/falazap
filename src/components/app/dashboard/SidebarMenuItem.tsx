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
        className="group relative flex w-full flex-col items-start gap-1 p-4 transition-all duration-200 hover:bg-primary/10"
      >
        <div className="flex w-full items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-medium text-white">{label}</span>
        </div>
        <span className="pl-12 text-sm text-muted-foreground/80">
          {description}
        </span>
      </SidebarMenuButton>
    </BaseSidebarMenuItem>
  );
}