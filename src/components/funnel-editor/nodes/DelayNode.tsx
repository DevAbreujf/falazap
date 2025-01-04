import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface DelayNodeData {
  label: string;
  seconds: number;
}

export function DelayNode({ data }: { data: DelayNodeData }) {
  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <h3 className="font-medium">{data.label}</h3>
        
        <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={data.seconds}
              className="w-20"
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