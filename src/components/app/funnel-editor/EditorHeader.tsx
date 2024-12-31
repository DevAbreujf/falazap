import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bolt, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EditorHeaderProps {
  funnelTitle: string;
  setFunnelTitle: (title: string) => void;
  onSave: () => void;
}

export function EditorHeader({ funnelTitle, setFunnelTitle, onSave }: EditorHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 border-b border-border/50 bg-sidebar">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/funnels")}
          className="text-sidebar-foreground hover:text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Input
          value={funnelTitle}
          onChange={(e) => setFunnelTitle(e.target.value)}
          className="text-xl font-semibold bg-transparent border-none h-auto p-0 focus-visible:ring-0 w-[300px] text-sidebar-foreground"
        />
        <Button variant="outline" size="sm" className="gap-2 text-sidebar-foreground">
          <Bolt className="h-4 w-4" />
          Disparo Manual
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/funnels")} className="text-sidebar-foreground">
          Cancelar
        </Button>
        <Button onClick={onSave} className="gap-2 bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4" />
          Salvar
        </Button>
      </div>
    </header>
  );
}