import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DelaySelector({ 
  value, 
  unit, 
  onChange 
}: { 
  value: number;
  unit: "seconds" | "minutes" | "hours";
  onChange: (value: number, unit: "seconds" | "minutes" | "hours") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value), unit)}
        className="w-20"
      />
      <Select value={unit} onValueChange={(value) => onChange(value, value as typeof unit)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="seconds">Segundos</SelectItem>
          <SelectItem value="minutes">Minutos</SelectItem>
          <SelectItem value="hours">Horas</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}