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
import { Clock, Filter } from "lucide-react";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      
      const currentValue = data.timeValue ?? 0;
      let newValue = currentValue;
      
      if (e.key === 'ArrowUp') {
        newValue = currentValue + 1;
      } else if (e.key === 'ArrowDown') {
        newValue = Math.max(0, currentValue - 1);
      }

      if (data.onTimeValueChange) {
        data.onTimeValueChange(newValue);
      }
    }
  };

  return (
    <div className="p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white min-w-[320px] shadow-xl">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h3 className="font-semibold text-xl text-primary">{data.label}</h3>
          </div>
          <p className="text-sm text-white/70">{data.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-white/90">
            <Clock className="w-4 h-4" />
            <Label>Tempo mínimo</Label>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              step={1}
              value={data.timeValue ?? 0}
              onChange={handleTimeValueChange}
              onKeyDown={handleKeyDown}
              className="w-24 bg-black/20 border-white/10 text-white placeholder:text-white/40"
              onWheel={(e) => e.currentTarget.blur()}
            />
            <Select
              value={data.timeUnit}
              onValueChange={(value: "seconds" | "minutes" | "hours") =>
                data.onTimeUnitChange?.(value)
              }
            >
              <SelectTrigger className="w-32 bg-black/20 border-white/10">
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

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-white/90">
            <Filter className="w-4 h-4" />
            <Label>Condição</Label>
          </div>
          <Select
            value={data.condition}
            onValueChange={(value) => data.onConditionChange?.(value)}
          >
            <SelectTrigger className="w-full bg-black/20 border-white/10">
              <SelectValue placeholder="Selecione a condição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exact">Exata</SelectItem>
              <SelectItem value="contains">Contenha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white/90">Termo</Label>
          <Input
            value={data.term}
            onChange={(e) => data.onTermChange?.(e.target.value)}
            placeholder="Digite o termo para disparo"
            className="w-full bg-black/20 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2 !border-primary/50"
      />
    </div>
  );
}

export default memo(StartNode);