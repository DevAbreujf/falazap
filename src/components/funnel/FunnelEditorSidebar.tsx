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
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FunnelEditorSidebarProps {
  onToolDrop: () => void;
}

const tools = [
  {
    category: "Interação",
    items: [
      { type: "multiple-choice", label: "Múltipla Escolha", icon: MessageSquare },
      { type: "free-text", label: "Texto Livre", icon: FormInput },
    ],
  },
  {
    category: "Controle de Fluxo",
    items: [
      { type: "timer", label: "Temporizador", icon: Clock },
      { type: "decision", label: "Decisão", icon: GitFork },
      { type: "condition", label: "Condição", icon: Settings },
    ],
  },
  {
    category: "Mídia",
    items: [
      { type: "file", label: "Upload de Arquivo", icon: Upload },
      { type: "image", label: "Imagem", icon: Image },
      { type: "audio", label: "Áudio", icon: AudioLines },
    ],
  },
  {
    category: "Formulários e Integrações",
    items: [
      { type: "button", label: "Botão", icon: MousePointer },
      { type: "form", label: "Formulário", icon: FormInput },
      { type: "api", label: "API", icon: Webhook },
    ],
  },
];

export function FunnelEditorSidebar({ onToolDrop }: FunnelEditorSidebarProps) {
  const handleDragStart = (e: React.DragEvent, toolType: string) => {
    e.dataTransfer.setData("toolType", toolType);
  };

  return (
    <Card className="flex w-80 flex-col gap-6 overflow-auto border-r p-6">
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
                  className="flex cursor-grab flex-col items-center gap-2 rounded-lg border bg-card p-3 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <tool.icon className="h-6 w-6" />
                  <span className="text-xs">{tool.label}</span>
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>
    </Card>
  );
}