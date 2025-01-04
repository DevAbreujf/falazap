import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";

interface QuestionNodeData {
  label: string;
  question: string;
  variableName: string;
}

export function QuestionNode({ data }: { data: QuestionNodeData }) {
  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <h3 className="font-medium">{data.label}</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Pergunta</label>
          <Input
            placeholder="Digite a pergunta..."
            value={data.question}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Nome da variável</label>
          <Input
            placeholder="Ex: nome_cliente"
            value={data.variableName}
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