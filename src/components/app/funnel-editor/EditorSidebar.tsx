import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EditorSidebar() {
  return (
    <aside className="w-64 p-4 border-r border-border/50 bg-sidebar">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-sidebar-foreground">Mensagens</h2>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">💬</span>
              Texto
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">🖼️</span>
              Imagem
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">🎵</span>
              Música
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">🎤</span>
              Áudio
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">🎥</span>
              Vídeo
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">📄</span>
              Documento
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 text-sidebar-foreground">Lógica</h2>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">🔀</span>
              Caminhos
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">⏲️</span>
              Esperar
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">❓</span>
              Perguntar
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground",
                "relative"
              )}
            >
              <span className="text-lg">🏷️</span>
              Tags
              <span className="absolute -top-1 -right-1 bg-primary text-xs px-1.5 py-0.5 rounded-full">
                Novo
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
            >
              <span className="text-lg">📝</span>
              Variáveis
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}