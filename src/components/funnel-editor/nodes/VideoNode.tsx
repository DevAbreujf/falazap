import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Upload } from "lucide-react";

interface VideoNodeData {
  label: string;
  videoUrl?: string;
  actionType: "click" | "auto";
  actionLabel?: string;
}

export function VideoNode({ data }: { data: VideoNodeData }) {
  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <h3 className="font-medium">{data.label}</h3>
        
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