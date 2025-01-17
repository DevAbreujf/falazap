import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Upload, X } from "lucide-react";

interface VideoNodeData {
  label: string;
  videoUrl?: string;
  actionType: "click" | "auto";
  actionLabel?: string;
}

export function VideoNode({ data, id }: { data: VideoNodeData; id: string }) {
  const { setNodes } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="bg-[#1f1f2a] rounded-2xl w-[300px] shadow-lg shadow-black/20" style={{ overflow: 'visible' }}>
      <div className="bg-[#1f1f2a] px-4 py-2 flex items-center justify-between border-b border-[#434358]/50">
        <div className="flex items-center gap-2">
          <Video className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Vídeo</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 text-zinc-400 hover:text-white hover:bg-white/5"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-4">
        {data.videoUrl ? (
          <div className="relative aspect-video bg-[#272733] rounded-lg flex items-center justify-center">
            <Video className="h-8 w-8 text-zinc-400" />
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full bg-[#272733] hover:bg-[#323244] text-white border-[#434358]"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Vídeo
          </Button>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Ação após o vídeo</label>
          <Input
            placeholder="Ex: Clique para continuar"
            value={data.actionLabel}
            className="bg-[#272733] border-[#434358] text-white focus:ring-1 focus:ring-orange-500/50"
          />
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
}