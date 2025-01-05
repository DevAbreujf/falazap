import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Download, Upload, Save } from "lucide-react";
import { ElementsSidebar } from "@/components/funnel-editor/ElementsSidebar";
import { FunnelEditorCanvas } from "@/components/funnel-editor/FunnelEditorCanvas";

export default function FunnelEditor() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [funnelName, setFunnelName] = useState("Novo Funil");

  const handleBack = () => navigate("/funnels");
  
  const handleSave = () => {
    console.log("Saving funnel...");
  };

  const handleExport = () => {
    console.log("Exporting funnel...");
  };

  const handleImport = () => {
    console.log("Importing funnel...");
  };

  const handleRename = () => {
    const newName = prompt("Digite o novo nome do funil:", funnelName);
    if (newName) setFunnelName(newName);
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
      <header className="w-full border-b bg-zinc-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{funnelName}</h1>
              <Button variant="ghost" size="sm" onClick={handleRename}>
                Renomear
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {isActive ? "Ativo" : "Inativo"}
              </span>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
            
            <Button variant="outline" size="sm" onClick={handleImport}>
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            
            <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <ElementsSidebar />
        <FunnelEditorCanvas />
      </div>
    </div>
  );
}