import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Plus } from "lucide-react";

interface StartNodeProps {
  data: {
    label: string;
    description: string;
    condition: string;
    term: string;
    onConditionChange?: (value: string) => void;
    onTermChange?: (value: string) => void;
    timeValue?: number;
    onTimeValueChange?: (value: number) => void;
    timeUnit?: "seconds" | "minutes" | "hours";
    onTimeUnitChange?: (value: "seconds" | "minutes" | "hours") => void;
  };
}

function StartNode({ data }: StartNodeProps) {
  const handleTimeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !isNaN(Number(value)) && data.onTimeValueChange) {
      const numValue = Math.max(0, Number(value));
      data.onTimeValueChange(numValue);
    }
  };

  return (
    <div className="min-w-[320px] bg-[#1E1E26] rounded-lg border border-white/5 shadow-xl">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-[#FFB800]">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Início</span>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-xs text-zinc-400">
              Define tempo mínimo para o funil ser disparado novamente
            </Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                type="number"
                min={0}
                value={data.timeValue ?? 0}
                onChange={handleTimeValueChange}
                className="w-20 bg-[#0B0B0F] border-white/5 text-zinc-300"
              />
              <Select
                value={data.timeUnit}
                onValueChange={(value: "seconds" | "minutes" | "hours") =>
                  data.onTimeUnitChange?.(value)
                }
              >
                <SelectTrigger className="w-32 bg-[#0B0B0F] border-white/5 text-zinc-300">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">Segundos</SelectItem>
                  <SelectItem value="minutes">Minutos</SelectItem>
                  <SelectItem value="hours">Horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs text-zinc-400">Condição</Label>
            <Select
              value={data.condition}
              onValueChange={(value) => data.onConditionChange?.(value)}
            >
              <SelectTrigger className="w-full bg-[#0B0B0F] border-white/5 text-zinc-300 mt-1.5">
                <SelectValue placeholder="Selecione a condição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exact">Exata</SelectItem>
                <SelectItem value="contains">Contenha</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-zinc-400">Termo</Label>
            <Input
              value={data.term}
              onChange={(e) => data.onTermChange?.(e.target.value)}
              placeholder="Digite o termo para disparo"
              className="w-full bg-[#0B0B0F] border-white/5 text-zinc-300 mt-1.5"
            />
          </div>

          <button className="w-full h-9 flex items-center justify-center gap-2 rounded bg-[#0B0B0F] border border-white/5 text-zinc-300 text-xs hover:bg-[#0B0B0F]/80 transition-colors">
            <Plus className="h-4 w-4" />
            Adicionar gatilho
          </button>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-[#FFB800] !w-3 !h-3 !border-2 !border-[#FFB800]/50"
      />
    </div>
  );
}

export default memo(StartNode);