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
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Perguntar</h3>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-white"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Salvar Conteúdo:</label>
          <Input
            placeholder="Escolha ou crie uma variável"
            value={data.variableName}
            className="bg-[#333] border-[#444] text-white"
          />
        </div>

        <Handle
          type="source"
          position={Position.Right}
          id="main"
          className="!bg-primary !w-3 !h-3 !border-2"
          style={{ top: "30%" }}
        />

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Mensagem / Pergunta:</label>
          <Input
            placeholder="Sua pergunta. Ex.: Qual seu nome?"
            value={data.question}
            className="bg-[#333] border-[#444] text-white"
          />
        </div>

        {!showRecovery ? (
          <Button
            variant="secondary"
            className="w-full bg-[#333] hover:bg-[#444] text-white"
            onClick={() => setShowRecovery(true)}
          >
            Se não responder...
          </Button>
        ) : (
          <div className="space-y-3">
            <label className="text-sm text-muted-foreground">
              Caso o cliente não responda em:
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={recoveryTime}
                onChange={(e) => setRecoveryTime(Number(e.target.value))}
                className="w-20 bg-[#333] border-[#444] text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Select
                value={recoveryUnit}
                onValueChange={(value: "days" | "hours" | "minutes" | "seconds") => 
                  setRecoveryUnit(value)
                }
              >
                <SelectTrigger className="bg-[#333] border-[#444] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Dias</SelectItem>
                  <SelectItem value="hours">Horas</SelectItem>
                  <SelectItem value="minutes">Minutos</SelectItem>
                  <SelectItem value="seconds">Segundos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Handle
              type="source"
              position={Position.Right}
              id="recovery"
              className="!bg-primary !w-3 !h-3 !border-2"
              style={{ top: "70%" }}
            />

            <Button
              variant="secondary"
              className="w-full bg-[#333] hover:bg-[#444] text-white"
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