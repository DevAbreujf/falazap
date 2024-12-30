import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { FunnelWorkspace } from "@/components/funnel/FunnelWorkspace";
import { FunnelEditorSidebar } from "@/components/funnel/FunnelEditorSidebar";
import { useToast } from "@/components/ui/use-toast";

export default function FunnelEditor() {
  const { toast } = useToast();
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saving" | "saved">("saved");

  // Simulate autosave
  const handleChange = () => {
    setAutoSaveStatus("saving");
    setTimeout(() => {
      setAutoSaveStatus("saved");
      toast({
        title: "Alterações salvas",
        description: "Todas as alterações foram salvas automaticamente.",
      });
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex flex-1 overflow-hidden">
          <FunnelEditorSidebar onToolDrop={handleChange} />
          <FunnelWorkspace
            autoSaveStatus={autoSaveStatus}
            onElementsChange={handleChange}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}