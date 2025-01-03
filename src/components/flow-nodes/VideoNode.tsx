import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function VideoNode({ data }: { data: { videoUrl?: string } }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border min-w-[300px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="space-y-2">
        <h3 className="font-medium text-sm">Mensagem de Vídeo</h3>
        {data.videoUrl ? (
          <div className="space-y-2">
            <video controls src={data.videoUrl} className="w-full rounded-lg" />
            <Button variant="outline" size="sm" className="w-full">
              Trocar vídeo
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Anexar vídeo
          </Button>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}