import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { RemindersForm } from "@/components/app/reminders/RemindersForm";
import { RemindersHeader } from "@/components/app/reminders/RemindersHeader";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function Reminders() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <div className="flex items-center justify-end p-4 lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="hover:bg-primary/20 bg-black/50"
            >
              <SidebarTrigger>
                <Menu className="h-6 w-6 text-primary" />
              </SidebarTrigger>
            </Button>
          </div>
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <RemindersHeader />
              <RemindersForm />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}