import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FunnelWorkspace } from "@/components/funnel/FunnelWorkspace";
import { FunnelEditorSidebar } from "@/components/funnel/FunnelEditorSidebar";
import { useToast } from "@/hooks/use-toast";

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
    <div className="flex min-h-screen w-full flex-col bg-[#0A0A0A]">
      <div className="border-b border-[#333] bg-[#111] p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/funnels")}
          className="gap-2 text-white hover:bg-[#252525] hover:text-white"
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