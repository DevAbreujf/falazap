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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 !-top-3"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Tempo</h3>
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
        <div className="flex items-center gap-3 bg-zinc-50 rounded-lg p-3">
          <Clock className="h-5 w-5 text-zinc-400" />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={data.seconds}
              className="w-20 bg-white border-zinc-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={0}
            />
            <span className="text-sm text-zinc-600">segundos</span>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-zinc-300"
      />
    </div>
  );
}