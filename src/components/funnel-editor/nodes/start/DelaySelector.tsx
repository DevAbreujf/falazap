
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DelaySelectorProps {
  value: number;
  unit: "seconds" | "minutes" | "hours";
  onChange: (value: number, unit: "seconds" | "minutes" | "hours") => void;
}

export function DelaySelector({ value, unit, onChange }: DelaySelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-primary flex items-center gap-2">
        <Clock3 className="h-4 w-4" />
        Tempo de Execução
      </Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value), unit)}
          className="bg-white border-gray-200 text-gray-900 focus:border-primary/30 focus:ring-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Select
          value={unit}
          onValueChange={(newUnit) =>
            onChange(value, newUnit as "seconds" | "minutes" | "hours")
          }
        >
          <SelectTrigger className="w-[180px] bg-white border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seconds">Segundos</SelectItem>
            <SelectItem value="minutes">Minutos</SelectItem>
            <SelectItem value="hours">Horas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
