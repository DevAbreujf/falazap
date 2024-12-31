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
    <div className="min-w-[320px] bg-[#1E1E26] rounded-lg border border-white/5 shadow-xl">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-[#FFB800]">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium">Enviar Texto</span>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-xs text-zinc-400">Conteúdo da mensagem</Label>
            <Textarea
              value={data.message}
              onChange={(e) => data.onMessageChange?.(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
              className="min-h-[120px] bg-[#0B0B0F] border-white/5 text-zinc-300 mt-1.5 resize-none"
            />
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!bg-[#FFB800] !w-3 !h-3 !border-2 !border-[#FFB800]/50"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-[#FFB800] !w-3 !h-3 !border-2 !border-[#FFB800]/50"
      />
    </div>
  );
}

export default memo(TextNode);