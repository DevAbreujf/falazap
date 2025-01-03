import { 
  MessageSquare, 
  Image as ImageIcon, 
  Music, 
  Mic, 
  Video, 
  FileText,
  SplitSquareHorizontal,
  Clock,
  MessagesSquare,
  Tags,
  Variable
} from "lucide-react";

export function ElementsSidebar() {
  return (
    <div className="w-72 bg-black/20 backdrop-blur-sm border-r border-white/10 p-6">
      <div className="space-y-6">
        {/* Messages Section */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Mensagens</h2>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              Texto
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              Imagem
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <Music className="h-4 w-4" />
              Música
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <Mic className="h-4 w-4" />
              Áudio
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <Video className="h-4 w-4" />
              Vídeo
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              Documento
            </button>
          </div>
        </div>

        {/* Logic Section */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Lógica</h2>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <SplitSquareHorizontal className="h-4 w-4" />
              Caminhos
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Esperar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <MessagesSquare className="h-4 w-4" />
              Perguntar
            </button>
            <button className="relative flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <Tags className="h-4 w-4" />
              Tags
              <span className="absolute -top-1 -right-1 bg-amber-500 text-[10px] px-1 rounded">Novo</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 hover:bg-black/60 transition-colors text-sm text-muted-foreground">
              <Variable className="h-4 w-4" />
              Variáveis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}