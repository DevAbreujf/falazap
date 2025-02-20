
import { SidebarNotifications } from "./SidebarNotifications";

export function SidebarLogo() {
  return (
    <div className="w-full flex items-center justify-center py-4 relative">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-gradient-primary">Fala</span>
          <span className="text-3xl font-bold text-emerald-800">ZAP</span>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <SidebarNotifications />
      </div>
    </div>
  );
}
