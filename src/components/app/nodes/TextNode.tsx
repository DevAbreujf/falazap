import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface TextNodeProps {
  data: {
    message: string;
    onMessageChange?: (value: string) => void;
  };
}

function TextNode({ data }: TextNodeProps) {
  return (
    <div className="glass-card p-6 min-w-[320px] shadow-xl border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <MessageSquare className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Mensagem de Texto</h3>
        </div>

        <div className="space-y-2">
          <Label className="text-primary">Conteúdo da mensagem</Label>
          <Textarea
            value={data.message}
            onChange={(e) => data.onMessageChange?.(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
            className="min-h-[120px] bg-black/20 border-white/10 focus-visible:ring-primary"
          />
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2 !border-primary/50"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2 !border-primary/50"
      />
    </div>
  );
}

export default memo(TextNode);