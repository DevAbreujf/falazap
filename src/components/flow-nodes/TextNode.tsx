import { Handle, Position } from "@xyflow/react";
import { Textarea } from "@/components/ui/textarea";

export function TextNode({ data, id }: { data: { text: string }, id: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border min-w-[300px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="space-y-2">
        <h3 className="font-medium text-sm">Mensagem de Texto</h3>
        <Textarea 
          placeholder="Digite sua mensagem..."
          value={data.text}
          onChange={(e) => {
            // Atualizar o texto do nó
            console.log("Texto atualizado:", e.target.value);
          }}
          className="min-h-[100px] resize-none"
        />
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}