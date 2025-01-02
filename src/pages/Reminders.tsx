import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { RemindersForm } from "@/components/app/reminders/RemindersForm";
import { RemindersHeader } from "@/components/app/reminders/RemindersHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Reminders() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <RemindersHeader />
            <RemindersForm />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}