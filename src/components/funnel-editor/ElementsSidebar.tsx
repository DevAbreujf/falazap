import { MessageSquare, Video, Music, GitFork, Clock, HelpCircle, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  }
];

export function ElementsSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-80 border-r bg-card">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Elementos</h2>
        <p className="text-sm text-muted-foreground">
          Arraste os elementos para o canvas
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4 space-y-4">
          {widgets.map((widget, index) => (
            <div key={widget.type}>
              {index > 0 && <Separator className="my-4" />}
              <div
                draggable
                onDragStart={(e) => onDragStart(e, widget.type)}
                className="rounded-lg border bg-card p-4 hover:border-primary/50 hover:bg-accent cursor-move transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <widget.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{widget.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {widget.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}