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
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Tempo</h3>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={data.seconds}
              className="w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={0}
            />
            <span className="text-sm text-muted-foreground">segundos</span>
          </div>
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