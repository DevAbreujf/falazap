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
    <div className="glass-card p-6 min-w-[320px] shadow-xl border-primary/20">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {data.label}
          </h3>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-primary">
              <Clock className="h-4 w-4" />
              Tempo mínimo
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                step={1}
                value={data.timeValue ?? 0}
                onChange={handleTimeValueChange}
                onKeyDown={handleKeyDown}
                className="w-24 bg-black/20 border-white/10 focus-visible:ring-primary"
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
            <Label className="flex items-center gap-2 text-primary">
              <Filter className="h-4 w-4" />
              Condição
            </Label>
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
            <Label className="text-primary">Termo</Label>
            <Input
              value={data.term}
              onChange={(e) => data.onTermChange?.(e.target.value)}
              placeholder="Digite o termo para disparo"
              className="w-full bg-black/20 border-white/10 focus-visible:ring-primary"
            />
          </div>
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