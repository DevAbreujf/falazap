import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
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
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Arquivo</h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-white"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Button variant="outline" className="w-full bg-[#333] hover:bg-[#444] text-white">
          <Upload className="h-4 w-4 mr-2" />
          Upload Arquivo
        </Button>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !left-1/2 !-translate-x-1/2"
      />
    </div>
  );
}