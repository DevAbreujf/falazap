import { Handle, Position } from "@xyflow/react";
import { Textarea } from "@/components/ui/textarea";

interface TextNodeData {
  label: string;
  content: string;
}

export function TextNode({ data }: { data: TextNodeData }) {
  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-2">
        <h3 className="font-medium">{data.label}</h3>
        <Textarea
          placeholder="Digite sua mensagem..."
          value={data.content}
          className="min-h-[100px]"
        />
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
    </div>
  );
}