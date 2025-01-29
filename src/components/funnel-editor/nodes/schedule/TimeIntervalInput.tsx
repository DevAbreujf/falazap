import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2 } from "lucide-react";
import { TimeInterval } from "@/utils/timeIntervals";

interface TimeIntervalInputProps {
  interval: TimeInterval;
  isDefault: boolean;
  onTimeChange: (id: string, field: 'start' | 'end', value: string) => void;
  onRemove: (id: string) => void;
}

export const TimeIntervalInput = ({
  interval,
  isDefault,
  onTimeChange,
  onRemove
}: TimeIntervalInputProps) => {
  return (
    <div className="relative h-10">
      <div className="absolute inset-0 flex items-center gap-2">
        <Input
          type="time"
          value={interval.start}
          onChange={(e) => onTimeChange(interval.id, 'start', e.target.value)}
          className="w-full"
          readOnly={true}
        />
        <ArrowRight className="w-4 h-4 text-zinc-400 flex-shrink-0" />
        <Input
          type="time"
          value={interval.end}
          onChange={(e) => onTimeChange(interval.id, 'end', e.target.value)}
          className="w-full"
        />
        {!isDefault && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(interval.id)}
            className="text-zinc-400 hover:text-red-500 flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};