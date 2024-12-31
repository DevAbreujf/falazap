import {
  MessageSquare,
  Clock,
  GitFork,
  Settings,
  Upload,
  Image,
  AudioLines,
  MousePointer,
  FormInput,
  Webhook,
  FileText,
  Music,
  Video,
  FileBox,
  GitBranch,
  Timer,
  Tags,
  MessageCircle,
  Variable,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FunnelEditorSidebarProps {
  onToolDrop: () => void;
}

const tools = [
  {
    category: "Mensagens",
    items: [
      { type: "text", label: "Texto", icon: FileText },
      { type: "image", label: "Imagem", icon: Image },
      { type: "music", label: "Música", icon: Music },
      { type: "audio", label: "Áudio", icon: AudioLines },
      { type: "video", label: "Vídeo", icon: Video },
      { type: "document", label: "Documento", icon: FileBox },
    ],
  },
  {
    category: "Lógica",
    items: [
      { type: "paths", label: "Caminhos", icon: GitBranch },
      { type: "wait", label: "Esperar", icon: Timer },
      { type: "ask", label: "Perguntar", icon: MessageCircle },
      { type: "tags", label: "Tags", icon: Tags },
      { type: "variables", label: "Variáveis", icon: Variable },
    ],
  },
];

export function FunnelEditorSidebar({ onToolDrop }: FunnelEditorSidebarProps) {
  const handleDragStart = (e: React.DragEvent, toolType: string) => {
    e.dataTransfer.setData("toolType", toolType);
  };

  return (
    <Card className="flex w-80 flex-col gap-6 overflow-auto border-r border-[#333] bg-[#111] p-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ferramentas</h2>
      </div>

      <div className="flex flex-col gap-6">
        {tools.map((category) => (
          <div key={category.category}>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              {category.category}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {category.items.map((tool) => (
                <div
                  key={tool.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tool.type)}
                  onDragEnd={onToolDrop}
                  className="flex cursor-grab flex-col items-center gap-2 rounded-lg border border-[#333] bg-[#1A1A1A] p-3 text-center transition-colors hover:bg-[#252525]"
                >
                  <tool.icon className="h-6 w-6" />
                  <span className="text-xs">{tool.label}</span>
                </div>
              ))}
            </div>
            <Separator className="mt-4 bg-[#333]" />
          </div>
        ))}
      </div>
    </Card>
  );
}