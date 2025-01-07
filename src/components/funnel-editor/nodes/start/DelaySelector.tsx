import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value), unit)}
        className="w-20 bg-[#1f1f2a] border-[#434358] text-zinc-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <Select
        value={unit}
        onValueChange={(newUnit) =>
          onChange(value, newUnit as "seconds" | "minutes" | "hours")
        }
      >
        <SelectTrigger className="w-[140px] bg-[#1f1f2a] border-[#434358] text-zinc-100">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#1f1f2a] border-[#434358]">
          <SelectItem value="seconds">Segundos</SelectItem>
          <SelectItem value="minutes">Minutos</SelectItem>
          <SelectItem value="hours">Horas</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}