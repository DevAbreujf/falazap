import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TimeInterval } from "@/utils/timeIntervals";
import { useState, useEffect } from "react";
import { Handle, Position } from '@xyflow/react';

interface TimeIntervalInputProps {
  interval: TimeInterval;
  isDefault: boolean;
  isFirstInterval: boolean;
  isLastInterval?: boolean;
  onTimeChange: (id: string, field: 'start' | 'end', value: string) => void;
  onRemove: (id: string) => void;
}

export const TimeIntervalInput = ({
  interval,
  isDefault,
  isFirstInterval,
  isLastInterval,
  onTimeChange,
  onRemove
}: TimeIntervalInputProps) => {
  const [startValue, setStartValue] = useState(interval.start);
  const [endValue, setEndValue] = useState(interval.end);

  const formatTimeValue = (value: string) => {
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
    
    // Atualiza o estado local imediatamente
    if (field === 'start') {
      setStartValue(formattedValue);
    } else {
      setEndValue(formattedValue);
    }
    
    // Propaga a mudança para o componente pai imediatamente
    // Removida a verificação de length para atualização em tempo real
    onTimeChange(interval.id, field, formattedValue);
  };

  // Sincroniza os estados locais quando os props mudam
  useEffect(() => {
    setStartValue(interval.start);
    setEndValue(interval.end);
  }, [interval.start, interval.end]);

  const showDeleteButton = !isDefault && parseInt(interval.id) > 2;

  return (
    <div className="relative flex items-center gap-2">
      <div className="flex-1 flex items-center gap-2">
        <Input
          type="text"
          value={startValue}
          onChange={(e) => handleTimeChange('start', e.target.value)}
          className={`w-24 text-center font-medium ${!isFirstInterval ? 'bg-gray-100 text-muted-foreground' : ''}`}
          placeholder="00:00"
          maxLength={5}
          disabled={!isFirstInterval}
        />
        <span className="text-muted-foreground">até</span>
        <Input
          type="text"
          value={endValue}
          onChange={(e) => handleTimeChange('end', e.target.value)}
          className={`w-24 text-center font-medium ${isLastInterval ? 'text-muted-foreground' : ''}`}
          placeholder="00:00"
          maxLength={5}
          disabled={isLastInterval}
        />
      </div>
      {showDeleteButton && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(interval.id)}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id={`interval-${interval.id}`}
        className="w-3 h-3 !bg-zinc-300"
        style={{ right: -15 }}
      />
    </div>
  );
};