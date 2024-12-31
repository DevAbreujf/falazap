import { Handle, Position } from "@xyflow/react";
import { MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function TextNode() {
  return (
    <div className="glass-card w-[320px] p-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        <span className="font-medium">Mensagem de texto</span>
      </div>

      <div className="mt-4">
        <Textarea
          placeholder="Digite sua mensagem..."
          className="min-h-[120px] resize-none"
        />
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!bg-yellow-500 !border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-yellow-500 !border-background"
      />
    </div>
  );
}