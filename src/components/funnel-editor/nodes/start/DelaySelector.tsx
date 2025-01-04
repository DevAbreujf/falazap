import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface DelaySelectorProps {
  value: number;
  unit: string;
  onChange?: (value: number, unit: string) => void;
}

export function DelaySelector({ value, unit, onChange }: DelaySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tempo de Execução</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={value}
          className="w-20"
          min={0}
          onChange={(e) => onChange?.(Number(e.target.value), unit)}
        />
        <Select 
          value={unit}
          onValueChange={(value) => onChange?.(value, unit)}
        >
          <SelectTrigger>
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