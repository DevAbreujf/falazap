import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Music, Upload, X } from "lucide-react";
import { AudioNodeData } from "@/types/flow";

export function AudioNode({ data, id }: { data: AudioNodeData; id: string }) {
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
          <h3 className="font-medium">Áudio</h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {data.audioUrl ? (
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <Music className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Áudio carregado</span>
          </div>
        ) : (
          <Button variant="outline" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Áudio
          </Button>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
    </div>
  );
}