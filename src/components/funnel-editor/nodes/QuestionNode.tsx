import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface QuestionNodeData {
  label: string;
  question: string;
  variableName: string;
  recovery?: {
    time: number;
    unit: "days" | "hours" | "minutes" | "seconds";
  };
}

export function QuestionNode({ id, data }: { id: string; data: QuestionNodeData }) {
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryTime, setRecoveryTime] = useState(5);
  const [recoveryUnit, setRecoveryUnit] = useState<"days" | "hours" | "minutes" | "seconds">("days");
  const { setNodes } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 left-1/2 -translate-x-1/2"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <h3 className="text-sm font-medium text-zinc-900">Perguntar</h3>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 text-zinc-400 hover:text-zinc-500"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-zinc-600">Salvar Conteúdo:</label>
          <Input
            placeholder="Escolha ou crie uma variável"
            value={data.variableName}
            className="bg-white border-zinc-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-600">Mensagem / Pergunta:</label>
          <Input
            placeholder="Sua pergunta. Ex.: Qual seu nome?"
            value={data.question}
            className="bg-white border-zinc-200"
          />
        </div>

        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-zinc-300"
        />

        {!showRecovery ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowRecovery(true)}
          >
            Se não responder...
          </Button>
        ) : (
          <div className="relative space-y-3 pt-4 border-t border-zinc-200">
            <label className="text-sm text-zinc-600">
              Caso o cliente não responda em:
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={recoveryTime}
                onChange={(e) => setRecoveryTime(Number(e.target.value))}
                className="w-20 bg-white border-zinc-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Select
                value={recoveryUnit}
                onValueChange={(value: "days" | "hours" | "minutes" | "seconds") => 
                  setRecoveryUnit(value)
                }
              >
                <SelectTrigger className="bg-white border-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Dias</SelectItem>
                  <SelectItem value="hours">Horas</SelectItem>
                  <SelectItem value="minutes">Minutos</SelectItem>
                  <SelectItem value="seconds">Segundos</SelectItem>
                </SelectContent>
              </Select>

              <Handle
                type="source"
                position={Position.Right}
                id="recovery"
                className="w-3 h-3 !bg-zinc-300"
                style={{ transform: 'translateX(3em) !important' }}
              />
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowRecovery(false)}
            >
              Remover recuperação
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}