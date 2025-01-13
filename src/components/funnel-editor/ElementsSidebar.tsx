import { MessageSquare, Video, Music, GitFork, Clock, HelpCircle, Tags, Share2, FileText, Calendar, Users, Star, UserCheck, Tag, Bell, XCircle } from "lucide-react";
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
    type: "schedule",
    label: "Horários",
    icon: Clock,
    group: "Configurações",
    description: "Configure horários de atendimento"
  },
  {
    type: "weekdays",
    label: "Dias da Semana",
    icon: Calendar,
    group: "Configurações",
    description: "Configure dias de atendimento"
  },
  {
    type: "transferDepartment",
    label: "Transferir para Setor",
    icon: Users,
    group: "Transferências",
    description: "Transfere para um setor"
  },
  {
    type: "requestRating",
    label: "Pedir Avaliação",
    icon: Star,
    group: "Interações",
    description: "Solicita avaliação do cliente"
  },
  {
    type: "transferAgent",
    label: "Transferir p/ Atendente",
    icon: UserCheck,
    group: "Transferências",
    description: "Transfere para um atendente"
  },
  {
    type: "editTags",
    label: "Editar Etiquetas",
    icon: Tag,
    group: "Gerenciamento",
    description: "Gerencia etiquetas da conversa"
  },
  {
    type: "notifyAgent",
    label: "Notificar Atendente",
    icon: Bell,
    group: "Notificações",
    description: "Envia notificação ao atendente"
  },
  {
    type: "endChat",
    label: "Finalizar Conversa",
    icon: XCircle,
    group: "Gerenciamento",
    description: "Encerra a conversa atual"
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
    <div className="w-72 bg-gradient-to-b from-[#0f172a]/80 to-[#1e293b]/80 backdrop-blur-sm border-r border-[#334155]">
      <div className="p-4 border-b border-[#334155]">
        <h2 className="text-lg font-semibold text-white">Elementos</h2>
        <p className="text-sm text-gray-400">
          Arraste os elementos para o canvas
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-3">
          {Object.entries(groupedWidgets).map(([group, items]) => (
            <div key={group} className="mb-4">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-1">
                {group}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {items.map((widget) => (
                  <div
                    key={widget.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, widget.type)}
                    className="relative group rounded-lg border border-[#334155] bg-white hover:bg-gray-50 hover:border-primary/30 p-2.5 cursor-move transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-md bg-primary/10 p-2">
                        <widget.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {widget.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}