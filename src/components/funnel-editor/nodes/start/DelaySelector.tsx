import { Input } from "@xyflow/react";

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
      <select
        value={unit}
        onChange={(e) => onChange(value, e.target.value as "seconds" | "minutes" | "hours")}
        className="border rounded-md p-1"
      >
        <option value="seconds">Segundos</option>
        <option value="minutes">Minutos</option>
        <option value="hours">Horas</option>
      </select>
    </div>
  );
}
