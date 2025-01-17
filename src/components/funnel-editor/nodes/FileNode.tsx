import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X } from "lucide-react";
import { useReactFlow } from "@xyflow/react";

interface FileNodeData {
  label: string;
  fileUrl?: string;
}

export function FileNode({ data, id }: { data: FileNodeData; id: string }) {
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
          <FileText className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Arquivo</h3>
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
        <Button 
          variant="outline" 
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Arquivo
        </Button>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-zinc-300"
      />
    </div>
  );
}