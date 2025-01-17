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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Áudio</h3>
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
      
      <div className="p-4">
        {data.audioUrl ? (
          <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-3">
            <Music className="h-6 w-6 text-zinc-400" />
            <span className="text-sm text-zinc-600">Áudio carregado</span>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Áudio
          </Button>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-zinc-300"
      />
    </div>
  );
}