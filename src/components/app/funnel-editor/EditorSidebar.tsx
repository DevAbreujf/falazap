import { MessageSquare, Image, Music, Mic, Video, FileText, Filter, Clock, Mail, Tag, Variable } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    section: "Mensagens",
    items: [
      { icon: MessageSquare, label: "Texto" },
      { icon: Image, label: "Imagem" },
      { icon: Music, label: "Música" },
      { icon: Mic, label: "Áudio" },
      { icon: Video, label: "Vídeo" },
      { icon: FileText, label: "Documento" },
    ],
  },
  {
    section: "Lógica",
    items: [
      { icon: Filter, label: "Caminhos" },
      { icon: Clock, label: "Esperar" },
      { icon: Mail, label: "Perguntar" },
      { icon: Tag, label: "Tags", isNew: true },
      { icon: Variable, label: "Variáveis" },
    ],
  },
];

export function EditorSidebar() {
  return (
    <div className="flex w-80 flex-col gap-8 border-r border-border/50 bg-sidebar p-6">
      {menuItems.map((section) => (
        <div key={section.section} className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            {section.section}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {section.items.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "group relative flex h-[72px] flex-col items-center justify-center gap-2 rounded-lg bg-black/20 p-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/30 hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                draggable
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.isNew && (
                  <span className="absolute right-2 top-2 rounded bg-yellow-500 px-1.5 py-0.5 text-xs font-medium text-black">
                    Novo
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}