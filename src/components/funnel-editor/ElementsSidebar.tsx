import { MessageSquare, Video, Music, GitFork, Clock, HelpCircle, Tags, Share2, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const widgets = [
  {
    type: "text",
    label: "Mensagem de Texto",
    icon: MessageSquare,
    description: "Envie uma mensagem de texto para o cliente"
  },
  {
    type: "video",
    label: "Mensagem de Vídeo",
    icon: Video,
    description: "Envie um vídeo para o cliente"
  },
  {
    type: "audio",
    label: "Mensagem de Áudio",
    icon: Music,
    description: "Envie uma mensagem de áudio"
  },
  {
    type: "file",
    label: "Arquivos",
    icon: FileText,
    description: "Envie um arquivo para o cliente"
  },
  {
    type: "paths",
    label: "Caminhos",
    icon: GitFork,
    description: "Crie caminhos baseados em respostas"
  },
  {
    type: "delay",
    label: "Tempo",
    icon: Clock,
    description: "Adicione um intervalo de tempo"
  },
  {
    type: "question",
    label: "Pergunta",
    icon: HelpCircle,
    description: "Faça uma pergunta e salve a resposta"
  },
  {
    type: "tags",
    label: "Tags",
    icon: Tags,
    description: "Adicione tags para métricas"
  },
  {
    type: "forwarding",
    label: "Encaminhamento Automático",
    icon: Share2,
    description: "Configure regras de encaminhamento automático"
  }
];

export function ElementsSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-80 bg-zinc-900/50 backdrop-blur-sm border-r border-zinc-800 flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold">Elementos</h2>
        <p className="text-sm text-muted-foreground">
          Arraste os elementos para o canvas
        </p>
      </div>
      
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-3">
          {widgets.map((widget, index) => (
            <div
              key={widget.type}
              draggable
              onDragStart={(e) => onDragStart(e, widget.type)}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 hover:border-orange-500/50 hover:bg-zinc-800/50 cursor-move transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-orange-500/10 p-2">
                  <widget.icon className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-100 text-sm">{widget.label}</h3>
                  <p className="text-xs text-zinc-400">
                    {widget.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}