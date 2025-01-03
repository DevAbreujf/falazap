import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function AudioNode({ data }: { data: { audioUrl?: string } }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border min-w-[300px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="space-y-2">
        <h3 className="font-medium text-sm">Mensagem de Áudio</h3>
        {data.audioUrl ? (
          <div className="space-y-2">
            <audio controls src={data.audioUrl} className="w-full" />
            <Button variant="outline" size="sm" className="w-full">
              Trocar áudio
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Anexar áudio
          </Button>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}