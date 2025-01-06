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
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Vídeo</h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-white"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {data.videoUrl ? (
          <div className="relative aspect-video bg-[#333] rounded-lg flex items-center justify-center">
            <Video className="h-8 w-8 text-muted-foreground" />
          </div>
        ) : (
          <Button variant="outline" className="w-full bg-[#333] hover:bg-[#444] text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload Vídeo
          </Button>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Ação após o vídeo</label>
          <Input
            placeholder="Ex: Clique para continuar"
            value={data.actionLabel}
            className="bg-[#333] border-[#444] text-white"
          />
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[2em]"
      />
    </div>
  );
}
