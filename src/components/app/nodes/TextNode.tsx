import { memo } from "react";
import { MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import BaseNode from "./BaseNode";

interface TextNodeProps {
  data: {
    message: string;
    onMessageChange?: (value: string) => void;
  };
}

function TextNode({ data }: TextNodeProps) {
  return (
    <BaseNode
      data={{
        label: "Mensagem de Texto",
        icon: <MessageSquare className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <Textarea
              value={data.message}
              onChange={(e) => data.onMessageChange?.(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="min-h-[120px] bg-black/20 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        ),
      }}
    />
  );
}

export default memo(TextNode);