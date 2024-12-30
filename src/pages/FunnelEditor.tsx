import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FunnelWorkspace } from "@/components/funnel/FunnelWorkspace";
import { FunnelEditorSidebar } from "@/components/funnel/FunnelEditorSidebar";
import { useToast } from "@/components/ui/use-toast";

export default function FunnelEditor() {
  const { toast } = useToast();
  const navigate = useNavigate();
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
    <div className="flex min-h-screen w-full flex-col">
      <div className="border-b p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/funnels")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos Funis
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <FunnelEditorSidebar onToolDrop={handleChange} />
        <FunnelWorkspace
          autoSaveStatus={autoSaveStatus}
          onElementsChange={handleChange}
        />
      </div>
    </div>
  );
}