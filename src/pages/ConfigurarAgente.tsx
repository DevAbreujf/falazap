import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { WizardSteps } from "@/components/agent-config/WizardSteps";

export default function ConfigurarAgente() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10">
            <WizardSteps />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}