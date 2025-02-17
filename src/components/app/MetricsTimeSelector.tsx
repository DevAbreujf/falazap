
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
        variant={selected === "day" ? "default" : "secondary"}
        onClick={() => onChange("day")}
        className={selected === "day" ? "" : "border border-slate-200 hover:bg-slate-100"}
      >
        Dia
      </Button>
      <Button
        variant={selected === "week" ? "default" : "secondary"}
        onClick={() => onChange("week")}
        className={selected === "week" ? "" : "border border-slate-200 hover:bg-slate-100"}
      >
        Semana
      </Button>
      <Button
        variant={selected === "month" ? "default" : "secondary"}
        onClick={() => onChange("month")}
        className={selected === "month" ? "" : "border border-slate-200 hover:bg-slate-100"}
      >
        Mês
      </Button>
    </div>
  );
}
