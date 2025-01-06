import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DelayNodeData {
  label: string;
  seconds: number;
}

export function DelayNode({ data, id }: { data: DelayNodeData; id: string }) {
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
          <h3 className="font-medium">Tempo</h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-white"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3 bg-[#333] rounded-lg p-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={data.seconds}
              className="w-20 bg-[#333] border-[#444] text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={0}
            />
            <span className="text-sm text-muted-foreground">segundos</span>
          </div>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !left-1/2 !-translate-x-1/2"
      />
    </div>
  );
}