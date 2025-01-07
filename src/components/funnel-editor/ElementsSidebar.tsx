import { MessageSquare, Video, Music, GitFork, Clock, HelpCircle, Tags, Share2, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const widgets = [
  {
    type: "text",
    label: "Texto",
    icon: MessageSquare,
    group: "Mensagens",
    description: "Envie uma mensagem de texto"
  },
  {
    type: "video",
    label: "Vídeo",
    icon: Video,
    group: "Mensagens",
    description: "Envie um vídeo"
  },
  {
    type: "audio",
    label: "Áudio",
    icon: Music,
    group: "Mensagens",
    description: "Envie uma mensagem de áudio"
  },
  {
    type: "file",
    label: "Documento",
    icon: FileText,
    group: "Mensagens",
    description: "Envie um arquivo"
  },
  {
    type: "paths",
    label: "Caminhos",
    icon: GitFork,
    group: "Lógica",
    description: "Crie caminhos baseados em respostas"
  },
  {
    type: "delay",
    label: "Esperar",
    icon: Clock,
    group: "Lógica",
    description: "Adicione um intervalo de tempo"
  },
  {
    type: "question",
    label: "Perguntar",
    icon: HelpCircle,
    group: "Lógica",
    description: "Faça uma pergunta"
  },
  {
    type: "tags",
    label: "Tags",
    icon: Tags,
    group: "Lógica",
    description: "Adicione tags"
  },
  {
    type: "forwarding",
    label: "Encaminhamento",
    icon: Share2,
    group: "Lógica",
    description: "Configure regras de encaminhamento"
  }
];

export function ElementsSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const groupedWidgets = widgets.reduce((acc, widget) => {
    if (!acc[widget.group]) {
      acc[widget.group] = [];
    }
    acc[widget.group].push(widget);
    return acc;
  }, {} as Record<string, typeof widgets>);

  return (
    <div className="w-72 bg-zinc-900/90 backdrop-blur-sm border-r border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-100">Elementos</h2>
        <p className="text-sm text-zinc-400">
          Arraste os elementos para o canvas
        </p>
      </div>
      
      <div className="p-3">
        {Object.entries(groupedWidgets).map(([group, items]) => (
          <div key={group} className="mb-4">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 px-1">
              {group}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {items.map((widget) => (
                <div
                  key={widget.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, widget.type)}
                  className="relative group rounded-lg border border-zinc-800/50 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-orange-500/30 p-2.5 cursor-move transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-orange-500/10 p-2">
                      <widget.icon className="h-4 w-4 text-orange-500" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">
                      {widget.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}