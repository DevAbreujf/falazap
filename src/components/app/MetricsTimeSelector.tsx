import { Button } from "@/components/ui/button";

type TimeRange = "day" | "week" | "month";

interface MetricsTimeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

export function MetricsTimeSelector({ selected, onChange }: MetricsTimeSelectorProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={selected === "day" ? "default" : "outline"}
        onClick={() => onChange("day")}
      >
        Dia
      </Button>
      <Button
        variant={selected === "week" ? "default" : "outline"}
        onClick={() => onChange("week")}
      >
        Semana
      </Button>
      <Button
        variant={selected === "month" ? "default" : "outline"}
        onClick={() => onChange("month")}
      >
        Mês
      </Button>
    </div>
  );
}