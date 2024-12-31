import { Button } from "@/components/ui/button";
import { MessageSquare, Image, Music, Mic, Video, FileText, Navigation2, Timer, HelpCircle, Tag, Variable } from "lucide-react";

export function EditorSidebar() {
  return (
    <aside className="w-64 p-4 bg-[#0B0B0F] border-r border-[#1E1E26]">
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-zinc-400 mb-3">Mensagens</h2>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Texto</span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <Image className="h-5 w-5" />
              <span className="text-xs">Imagem</span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <Music className="h-5 w-5" />
              <span className="text-xs">Música</span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <Mic className="h-5 w-5" />
              <span className="text-xs">Áudio</span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <Video className="h-5 w-5" />
              <span className="text-xs">Vídeo</span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Documento</span>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-zinc-400 mb-3">Lógica</h2>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <Navigation2 className="h-5 w-5" />
              <span className="text-xs">Caminhos</span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <Timer className="h-5 w-5" />
              <span className="text-xs">Esperar</span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="text-xs">Perguntar</span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300 relative"
            >
              <Tag className="h-5 w-5" />
              <span className="text-xs">Tags</span>
              <span className="absolute -top-1 -right-1 bg-[#FFB800] text-[10px] px-1.5 py-0.5 rounded-full text-black font-medium">
                Novo
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-[72px] flex flex-col items-center justify-center gap-2 bg-[#1E1E26] hover:bg-[#2E2E36] border-transparent text-zinc-300"
            >
              <Variable className="h-5 w-5" />
              <span className="text-xs">Variáveis</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}