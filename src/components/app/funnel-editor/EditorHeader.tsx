import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function EditorHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border/50 bg-background/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium">Funil sem título</h1>
          <Button size="sm" variant="ghost">
            <Zap className="mr-2 h-4 w-4 text-yellow-500" />
            Disparo Manual
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm text-muted-foreground">Inativo</span>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline">Importar</Button>
          <Button variant="outline">Exportar</Button>
          <Button>Salvar</Button>
        </div>
      </div>
    </header>
  );
}