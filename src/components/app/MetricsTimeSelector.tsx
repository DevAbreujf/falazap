
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
        className={`${
          selected === "day"
            ? "bg-primary text-white shadow-sm hover:opacity-90 hover:shadow-md hover:shadow-primary/20"
            : "bg-white border border-slate-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20"
        }`}
      >
        Dia
      </Button>
      <Button
        variant={selected === "week" ? "default" : "secondary"}
        onClick={() => onChange("week")}
        className={`${
          selected === "week"
            ? "bg-primary text-white shadow-sm hover:opacity-90 hover:shadow-md hover:shadow-primary/20"
            : "bg-white border border-slate-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20"
        }`}
      >
        Semana
      </Button>
      <Button
        variant={selected === "month" ? "default" : "secondary"}
        onClick={() => onChange("month")}
        className={`${
          selected === "month"
            ? "bg-primary text-white shadow-sm hover:opacity-90 hover:shadow-md hover:shadow-primary/20"
            : "bg-white border border-slate-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20"
        }`}
      >
        Mês
      </Button>
    </div>
  );
}
