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
    <div className="bg-[#1f1f2a] rounded-2xl w-[300px] shadow-lg shadow-black/20">
      <div className="bg-[#1f1f2a] px-4 py-2 flex items-center justify-between border-b border-[#434358]/50">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Tempo</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 text-zinc-400 hover:text-white hover:bg-white/5"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-3 bg-[#272733] rounded-lg p-3">
          <Clock className="h-5 w-5 text-zinc-400" />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={data.seconds}
              className="w-20 bg-[#272733] border-[#434358] text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-1 focus:ring-orange-500/50"
              min={0}
            />
            <span className="text-sm text-zinc-400">segundos</span>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[2em]"
      />
    </div>
  );
}