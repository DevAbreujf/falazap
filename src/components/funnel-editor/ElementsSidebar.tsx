import { MessageSquare, Video, Music, GitFork, Clock, HelpCircle, Tags, Share2, FileText, Calendar, Users, Star, UserCheck, Tag, Bell, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

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
    type: "transferAgent",
    label: "Transferir p/ Atendente",
    icon: UserCheck,
    group: "Transferências",
    description: "Transfere para um atendente"
  },
  {
    type: "requestRating",
    label: "Pedir Avaliação",
    icon: Star,
    group: "Interações",
    description: "Solicita avaliação do cliente"
  },
  {
    type: "notifyAgent",
    label: "Notificar Atendente",
    icon: Bell,
    group: "Notificações",
    description: "Envia notificação ao atendente"
  },
  {
    type: "editTags",
    label: "Editar Etiquetas",
    icon: Tag,
    group: "Gerenciamento",
    description: "Gerencia etiquetas da conversa"
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
  const [searchTerm, setSearchTerm] = useState("");

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const filteredWidgets = useMemo(() => {
    if (!searchTerm.trim()) return widgets;
    
    const term = searchTerm.toLowerCase();
    return widgets.filter(widget => 
      widget.label.toLowerCase().includes(term) ||
      widget.description.toLowerCase().includes(term) ||
      widget.group.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const groupedWidgets = filteredWidgets.reduce((acc, widget) => {
    if (!acc[widget.group]) {
      acc[widget.group] = [];
    }
    acc[widget.group].push(widget);
    return acc;
  }, {} as Record<string, typeof widgets>);

  return (
    <div className="w-[360px] mx-4 my-6 bg-gradient-to-b from-[#0f172a]/80 to-[#1e293b]/80 backdrop-blur-sm rounded-lg border border-[#334155] shadow-xl">
      <div className="p-6 border-b border-[#334155]">
        <h2 className="text-xl font-semibold text-white mb-2">Elementos</h2>
        <p className="text-sm text-gray-400 mb-4">
          Arraste os elementos para o canvas
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar elementos..." 
            className="pl-10 bg-white/5 border-[#334155] text-white placeholder:text-gray-400 focus-visible:ring-primary/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-12rem-3rem)] px-4">
        <div className="py-4 space-y-8 pb-6">
          {Object.entries(groupedWidgets).map(([group, items]) => (
            <div key={group} className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider px-2">
                {group}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {items.map((widget) => (
                  <div
                    key={widget.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, widget.type)}
                    className="group relative rounded-lg border border-[#334155] bg-white/5 hover:bg-white/10 hover:border-primary/30 p-4 cursor-move transition-all duration-200"
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2.5">
                        <widget.icon className="h-5 w-5 text-primary-light" />
                      </div>
                      <div className="space-y-1.5">
                        <span className="block text-sm font-medium text-white group-hover:text-primary-light transition-colors">
                          {widget.label}
                        </span>
                        <span className="block text-xs text-gray-400 line-clamp-2">
                          {widget.description}
                        </span>
                      </div>
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