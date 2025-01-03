import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

export function AudioNode({ data }: { data: { audioUrl?: string } }) {
  return (
    <div className="flow-node">
      <Handle type="target" position={Position.Top} />
      <div className="flow-node-header">
        <h3>Mensagem de Áudio</h3>
        <button className="text-zinc-400 hover:text-zinc-100">
          <X size={16} />
        </button>
      </div>
      <div className="flow-node-content">
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
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}