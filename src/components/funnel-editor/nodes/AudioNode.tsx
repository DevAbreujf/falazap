import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Music, Upload, X } from "lucide-react";
import "@/styles/flow-nodes.css";

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
    <div className="flow-node" style={{ overflow: 'visible' }}>
      <div className="flow-node-header">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Áudio</h3>
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
      
      <div className="flow-node-content">
        {data.audioUrl ? (
          <div className="bg-[#272733] rounded-lg p-4 flex items-center gap-3">
            <Music className="h-6 w-6 text-zinc-400" />
            <span className="text-sm text-zinc-400">Áudio carregado</span>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full bg-[#272733] hover:bg-[#323244] text-white border-[#434358]"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Áudio
          </Button>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[2em]"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
}