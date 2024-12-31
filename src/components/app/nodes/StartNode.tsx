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
    // Only call if we have a valid number and the handler exists
    if (value && !isNaN(Number(value)) && data.onTimeValueChange) {
      data.onTimeValueChange(Number(value));
    }
  };

  return (
    <div className="p-4 rounded-lg bg-[#1A1F2C] text-white min-w-[300px]">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{data.label}</h3>
          <p className="text-sm text-gray-400">{data.description}</p>
        </div>

        <div className="space-y-2">
          <Label>Tempo mínimo</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              value={data.timeValue || 0}
              onChange={handleTimeValueChange}
              className="w-24 bg-transparent border-gray-700"
            />
            <Select
              value={data.timeUnit}
              onValueChange={(value: "seconds" | "minutes" | "hours") =>
                data.onTimeUnitChange?.(value)
              }
            >
              <SelectTrigger className="w-32 bg-transparent border-gray-700">
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
          <Label>Condição</Label>
          <Select
            value={data.condition}
            onValueChange={(value) => data.onConditionChange?.(value)}
          >
            <SelectTrigger className="w-full bg-transparent border-gray-700">
              <SelectValue placeholder="Selecione a condição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exact">Exata</SelectItem>
              <SelectItem value="contains">Contenha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Termo</Label>
          <Input
            value={data.term}
            onChange={(e) => data.onTermChange?.(e.target.value)}
            placeholder="Digite o termo para disparo"
            className="w-full bg-transparent border-gray-700"
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-orange-500 !w-3 !h-3 !border-2 !border-orange-600"
      />
    </div>
  );
}

export default memo(StartNode);