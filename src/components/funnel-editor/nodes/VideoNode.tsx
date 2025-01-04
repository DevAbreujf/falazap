import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Upload, X } from "lucide-react";
import { VideoNodeData } from "@/types/flow";

export function VideoNode({ data, id }: { data: VideoNodeData; id: string }) {
  const { setNodes } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Vídeo</h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {data.videoUrl ? (
          <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center">
            <Video className="h-8 w-8 text-muted-foreground" />
          </div>
        ) : (
          <Button variant="outline" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Vídeo
          </Button>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Ação após o vídeo</label>
          <Input
            placeholder="Ex: Clique para continuar"
            value={data.actionLabel}
          />
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
    </div>
  );
}