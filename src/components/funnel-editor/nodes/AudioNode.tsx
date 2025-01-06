import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Music, Upload, X } from "lucide-react";

interface AudioNodeData {
  label: string;
  audioUrl?: string;
}

export function AudioNode({ data, id }: { data: AudioNodeData; id: string }) {
  const { setNodes } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <Handle type="target" position={Position.Top} />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Áudio</h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-white"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {data.audioUrl ? (
          <div className="bg-[#333] rounded-lg p-4 flex items-center gap-3">
            <Music className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Áudio carregado</span>
          </div>
        ) : (
          <Button variant="outline" className="w-full bg-[#333] hover:bg-[#444] text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload Áudio
          </Button>
        )}
      </div>
      
      <Handle type="source" position={Position.Right} />
    </div>
  );
}