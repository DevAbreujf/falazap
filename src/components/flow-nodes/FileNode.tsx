import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Upload, FileIcon, X } from "lucide-react";

export function FileNode({ data }: { data: { fileName?: string } }) {
  return (
    <div className="flow-node">
      <Handle type="target" position={Position.Top} />
      <div className="flow-node-header">
        <h3>Arquivo</h3>
        <button className="text-zinc-400 hover:text-zinc-100">
          <X size={16} />
        </button>
      </div>
      <div className="flow-node-content">
        {data.fileName ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded-lg">
              <FileIcon className="h-4 w-4" />
              <span className="text-sm truncate">{data.fileName}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Trocar arquivo
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Anexar arquivo
          </Button>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}