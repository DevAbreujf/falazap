import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TimeInterval } from "@/utils/timeIntervals";
import { useState, useEffect } from "react";

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
  const [startValue, setStartValue] = useState(interval.start);
  const [endValue, setEndValue] = useState(interval.end);

  const formatTimeValue = (value: string) => {
    // Remove non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 2) {
      return numbers;
    }
    
    const hours = numbers.slice(0, 2);
    const minutes = numbers.slice(2, 4);
    
    if (parseInt(hours) > 23) return '23:' + minutes;
    if (parseInt(minutes) > 59) return hours + ':59';
    
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = (field: 'start' | 'end', value: string) => {
    const formattedValue = formatTimeValue(value);
    if (field === 'start') {
      setStartValue(formattedValue);
      if (formattedValue.length === 5) {
        onTimeChange(interval.id, field, formattedValue);
      }
    } else {
      setEndValue(formattedValue);
      if (formattedValue.length === 5) {
        onTimeChange(interval.id, field, formattedValue);
      }
    }
  };

  useEffect(() => {
    setStartValue(interval.start);
    setEndValue(interval.end);
  }, [interval]);

  return (
    <div className="flex items-center gap-2 group">
      <div className="flex-1 flex items-center gap-2">
        <Input
          type="text"
          value={startValue}
          onChange={(e) => handleTimeChange('start', e.target.value)}
          className="w-24 text-center font-medium"
          placeholder="00:00"
          maxLength={5}
        />
        <span className="text-muted-foreground">até</span>
        <Input
          type="text"
          value={endValue}
          onChange={(e) => handleTimeChange('end', e.target.value)}
          className="w-24 text-center font-medium"
          placeholder="00:00"
          maxLength={5}
        />
      </div>
      {!isDefault && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(interval.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};