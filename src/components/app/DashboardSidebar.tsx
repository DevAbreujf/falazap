import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  ChevronFirst,
  ChevronLast,
  LayoutDashboard,
  MessageSquare,
  Users,
  Megaphone,
  Bell,
  Calendar,
  Link2,
  Settings,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DashboardSidebar() {
  const navigate = useNavigate();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "relative z-30 flex h-screen w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        isCollapsed && "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
        <div
          className={cn(
            "flex items-center gap-3 text-xl font-bold text-sidebar-primary",
            isCollapsed && "hidden"
          )}
        >
          <Share2 className="h-6 w-6" />
          <span>Whats</span>
        </div>
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {isCollapsed ? (
            <ChevronLast className="h-5 w-5" />
          ) : (
            <ChevronFirst className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-2 p-3">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !isCollapsed && "px-3"
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          {!isCollapsed && <span>Dashboard</span>}
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate("/funnels")}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !isCollapsed && "px-3"
          )}
        >
          <MessageSquare className="h-5 w-5" />
          {!isCollapsed && <span>Funis</span>}
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate("/contacts")}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !isCollapsed && "px-3"
          )}
        >
          <Users className="h-5 w-5" />
          {!isCollapsed && <span>Contatos</span>}
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate("/broadcasts")}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !isCollapsed && "px-3"
          )}
        >
          <Megaphone className="h-5 w-5" />
          {!isCollapsed && <span>Broadcasts</span>}
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate("/reminders")}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !isCollapsed && "px-3"
          )}
        >
          <Bell className="h-5 w-5" />
          {!isCollapsed && <span>Lembretes</span>}
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate("/schedules")}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !isCollapsed && "px-3"
          )}
        >
          <Calendar className="h-5 w-5" />
          {!isCollapsed && <span>Agendamentos</span>}
        </Button>
      </nav>

      <div className="mt-3 flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/connection")}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Link2 className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="mt-2 flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/settings")}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </aside>
  );
}