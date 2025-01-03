import { Handle, Position } from "@xyflow/react";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

export function TextNode({ data, id }: { data: { text: string }, id: string }) {
  return (
    <div className="flow-node">
      <Handle type="target" position={Position.Top} />
      <div className="flow-node-header">
        <h3>Mensagem de Texto</h3>
        <button className="text-zinc-400 hover:text-zinc-100">
          <X size={16} />
        </button>
      </div>
      <div className="flow-node-content">
        <Textarea 
          placeholder="Digite sua mensagem..."
          value={data.text}
          onChange={(e) => {
            console.log("Texto atualizado:", e.target.value);
          }}
          className="min-h-[100px] resize-none bg-zinc-800/50 border-zinc-700"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}