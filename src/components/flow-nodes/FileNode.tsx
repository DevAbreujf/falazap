import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Upload, FileIcon } from "lucide-react";

export function FileNode({ data }: { data: { fileName?: string } }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border min-w-[300px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="space-y-2">
        <h3 className="font-medium text-sm">Arquivo</h3>
        {data.fileName ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
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
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}