import { 
  MessageSquare, 
  Video,
  Mic,
  GitFork,
  FileText,
  Clock,
  MessagesSquare,
  Tags,
  Variable,
} from "lucide-react";

export function ElementsSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-72 bg-black/20 backdrop-blur-sm border-r border-white/10 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Messages Section */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Mensagens</h2>
          <div className="grid grid-cols-2 gap-2">
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'text')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              Texto
            </button>
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'video')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <Video className="h-4 w-4" />
              Vídeo
            </button>
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'audio')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <Mic className="h-4 w-4" />
              Áudio
            </button>
          </div>
        </div>

        {/* Logic Section */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Lógica</h2>
          <div className="grid grid-cols-2 gap-2">
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'condition')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <GitFork className="h-4 w-4" />
              Condição
            </button>
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'form')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <FileText className="h-4 w-4" />
              Formulário
            </button>
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'delay')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <Clock className="h-4 w-4" />
              Tempo
            </button>
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'question')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <MessagesSquare className="h-4 w-4" />
              Pergunta
            </button>
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'variable')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <Variable className="h-4 w-4" />
              Variável
            </button>
            <button 
              draggable 
              onDragStart={(e) => onDragStart(e, 'tags')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground"
            >
              <Tags className="h-4 w-4" />
              Tags
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-muted-foreground">
            Arraste os elementos para o canvas para criar seu funil de vendas. 
            O nó de início é obrigatório e já está presente no canvas.
          </p>
        </div>
      </div>
    </aside>
  );
}