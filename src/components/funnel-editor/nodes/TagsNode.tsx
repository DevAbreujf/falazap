import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Tags } from "lucide-react";

interface TagsNodeData {
  label: string;
  tags: string[];
}

export function TagsNode({ data }: { data: TagsNodeData }) {
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
          <Tags className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Digite as tags separadas por vírgula..."
            value={data.tags.join(", ")}
          />
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