import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, FileDown, FileUp, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EditorHeaderProps {
  funnelName: string;
  isEditing: boolean;
  isActive: boolean;
  setFunnelName: (name: string) => void;
  setIsEditing: (editing: boolean) => void;
  setIsActive: (active: boolean) => void;
  setIsManualTriggerOpen: (open: boolean) => void;
  handleSave: () => void;
  handleExport: () => void;
  handleImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EditorHeader({
  funnelName,
  isEditing,
  isActive,
  setFunnelName,
  setIsEditing,
  setIsActive,
  setIsManualTriggerOpen,
  handleSave,
  handleExport,
  handleImport,
}: EditorHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/funnels")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <Input
                value={funnelName}
                onChange={(e) => setFunnelName(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                className="h-9 w-[180px]"
                autoFocus
              />
            ) : (
              <h2
                className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => setIsEditing(true)}
              >
                {funnelName}
              </h2>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => setIsManualTriggerOpen(true)}
          >
            Disparo Manual
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <span className="text-sm font-medium">
              {isActive ? "Ativo" : "Inativo"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button variant="outline" asChild>
                <span>
                  <FileDown className="h-4 w-4 mr-2" />
                  Importar
                </span>
              </Button>
            </label>

            <Button variant="outline" onClick={handleExport}>
              <FileUp className="h-4 w-4 mr-2" />
              Exportar
            </Button>

            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}