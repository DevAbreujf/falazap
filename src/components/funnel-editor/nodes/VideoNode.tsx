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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Video className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Vídeo</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 text-zinc-400 hover:text-zinc-500"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-4">
        {data.videoUrl ? (
          <div className="relative aspect-video bg-zinc-50 rounded-lg flex items-center justify-center">
            <Video className="h-8 w-8 text-zinc-400" />
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Vídeo
          </Button>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-600">Ação após o vídeo</label>
          <Input
            placeholder="Ex: Clique para continuar"
            value={data.actionLabel}
            className="w-full"
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-zinc-300"
      />
    </div>
  );
}