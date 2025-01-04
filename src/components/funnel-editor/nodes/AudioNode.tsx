import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Music, Upload } from "lucide-react";

interface AudioNodeData {
  label: string;
  audioUrl?: string;
}

export function AudioNode({ data }: { data: AudioNodeData }) {
  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <h3 className="font-medium">{data.label}</h3>
        
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