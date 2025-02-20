
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { RemindersForm } from "@/components/app/reminders/RemindersForm";
import { RemindersHeader } from "@/components/app/reminders/RemindersHeader";
import { Button } from "@/components/ui/button";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function Reminders() {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1">
          {/* Header Mobile Fixo */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b md:hidden">
            <div className="flex items-center justify-between px-4 h-14">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenMobile(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <main className="container mx-auto p-4 md:p-6 lg:px-8 xl:px-10 flex-1 overflow-auto pt-16 md:pt-6">
            <div className="max-w-4xl mx-auto">
              <RemindersHeader />
              <RemindersForm />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
