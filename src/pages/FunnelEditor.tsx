
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Download, Upload, Save } from "lucide-react";
import { ElementsSidebar } from "@/components/funnel-editor/ElementsSidebar";
import { FunnelEditorCanvas } from "@/components/funnel-editor/FunnelEditorCanvas";
import { useToast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function FunnelEditor() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [funnelName, setFunnelName] = useState("Novo Funil");
  const { toast } = useToast();

  const handleBack = () => navigate("/funnels");
  
  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/api/funnels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: funnelName,
          isActive,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar funil');
      }

      toast({
        title: "Sucesso",
        description: "Funil salvo com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o funil",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    try {
      console.log("Exporting funnel...");
    } catch (error) {
      console.error('Erro ao exportar:', error);
      toast({
        title: "Erro",
        description: "Não foi possível exportar o funil",
        variant: "destructive",
      });
    }
  };

  const handleImport = () => {
    try {
      console.log("Importing funnel...");
    } catch (error) {
      console.error('Erro ao importar:', error);
      toast({
        title: "Erro",
        description: "Não foi possível importar o funil",
        variant: "destructive",
      });
    }
  };

  const handleRename = () => {
    const newName = prompt("Digite o novo nome do funil:", funnelName);
    if (newName) setFunnelName(newName);
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
      <header className="w-full bg-[#212c42] border-b border-[#334155]">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-white">{funnelName}</h1>
              <Button variant="ghost" size="sm" onClick={handleRename} className="text-gray-300 hover:text-white hover:bg-white/10">
                Renomear
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">
                {isActive ? "Ativo" : "Inativo"}
              </span>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
            
            <Button variant="outline" size="sm" onClick={handleImport} className="text-white bg-white/10 hover:bg-white/20 border-[#334155]">
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleExport} className="text-white bg-white/10 hover:bg-white/20 border-[#334155]">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            
            <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover text-white">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 relative bg-background">
        <FunnelEditorCanvas />
        <div className="absolute left-0 top-0 z-50">
          <ElementsSidebar />
        </div>
      </div>
    </div>
  );
}
