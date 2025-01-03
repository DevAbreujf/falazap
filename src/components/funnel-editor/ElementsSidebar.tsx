import { Button } from "@/components/ui/button";
import { MessageSquare, FileAudio, FileVideo, File, GitFork } from "lucide-react";

interface ElementsSidebarProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export function ElementsSidebar({ onDragStart }: ElementsSidebarProps) {
  return (
    <div className="w-64 bg-zinc-900/50 backdrop-blur-sm border-r border-zinc-800 p-4 flex flex-col gap-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Mensagens</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start bg-zinc-800/50 hover:bg-zinc-800"
            draggable
            onDragStart={(e) => onDragStart(e, "textNode")}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Texto
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start bg-zinc-800/50 hover:bg-zinc-800"
            draggable
            onDragStart={(e) => onDragStart(e, "audioNode")}
          >
            <FileAudio className="h-4 w-4 mr-2" />
            Áudio
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start bg-zinc-800/50 hover:bg-zinc-800"
            draggable
            onDragStart={(e) => onDragStart(e, "videoNode")}
          >
            <FileVideo className="h-4 w-4 mr-2" />
            Vídeo
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start bg-zinc-800/50 hover:bg-zinc-800"
            draggable
            onDragStart={(e) => onDragStart(e, "fileNode")}
          >
            <File className="h-4 w-4 mr-2" />
            Arquivo
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Lógicas</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start bg-zinc-800/50 hover:bg-zinc-800"
            draggable
            onDragStart={(e) => onDragStart(e, "pathNode")}
          >
            <GitFork className="h-4 w-4 mr-2" />
            Caminhos
          </Button>
        </div>
      </div>
    </div>
  );
}