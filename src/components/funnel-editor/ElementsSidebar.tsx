import { Button } from "@/components/ui/button";

interface ElementsSidebarProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export function ElementsSidebar({ onDragStart }: ElementsSidebarProps) {
  return (
    <div className="w-64 h-full bg-background/95 backdrop-blur-lg border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-lg">Adicionar Elementos</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Mensagens</h4>
          <div className="space-y-2">
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
              onDragStart={(e) => onDragStart(e, "textNode")}
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Texto
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
              onDragStart={(e) => onDragStart(e, "audioNode")}
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Áudio
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
              onDragStart={(e) => onDragStart(e, "videoNode")}
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Vídeo
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
              onDragStart={(e) => onDragStart(e, "fileNode")}
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Arquivo
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Lógicas</h4>
          <div className="space-y-2">
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
              onDragStart={(e) => onDragStart(e, "pathNode")}
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Caminhos
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Perguntas
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Tempo de espera
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Tags
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Variáveis
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 text-sm"
              draggable
            >
              <span className="w-4 h-4 rounded-full bg-primary/20" />
              Botões
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}