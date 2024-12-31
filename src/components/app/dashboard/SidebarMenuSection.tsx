import { LucideIcon } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

interface SubMenuItem {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface SidebarMenuSectionProps {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
  subItems?: SubMenuItem[];
}

export function SidebarMenuSection({
  icon: Icon,
  label,
  description,
  onClick,
  subItems,
}: SidebarMenuSectionProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={onClick}
        className="group relative flex w-full items-center gap-3 p-5 mb-4 transition-all duration-200 hover:bg-primary/10 rounded-lg"
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
      {subItems && (
        <SidebarMenuSub>
          {subItems.map((subItem) => (
            <SidebarMenuSubItem key={subItem.label}>
              <SidebarMenuSubButton
                onClick={subItem.onClick}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <subItem.icon className="h-4 w-4" />
                <span>{subItem.label}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}