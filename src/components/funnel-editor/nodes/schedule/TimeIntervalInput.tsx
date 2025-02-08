
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
  const [lastValidStart, setLastValidStart] = useState(interval.start);
  const [lastValidEnd, setLastValidEnd] = useState(interval.end);

  const formatTimeValue = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');
    
    // Se estiver vazio, retorna o último valor válido
    if (!numbers) {
      return '';
    }
    
    // Se tiver apenas 1 dígito, adiciona um 0 na frente
    if (numbers.length === 1) {
      return `0${numbers}:00`;
    }
    
    // Se tiver 2 dígitos, considera como hora
    if (numbers.length === 2) {
      const hours = parseInt(numbers);
      if (hours > 23) return '23:00';
      return `${numbers}:00`;
    }
    
    // Se tiver 3 dígitos, formata corretamente
    if (numbers.length === 3) {
      const hours = numbers.slice(0, 2);
      const minutes = `0${numbers.slice(2)}`;
      if (parseInt(hours) > 23) return '23:00';
      if (parseInt(minutes) > 59) return `${hours}:59`;
      return `${hours}:${minutes}`;
    }
    
    // Para 4 dígitos ou mais
    const hours = numbers.slice(0, 2);
    const minutes = numbers.slice(2, 4);
    
    if (parseInt(hours) > 23) return '23:59';
    if (parseInt(minutes) > 59) return `${hours}:59`;
    
    return `${hours}:${minutes}`;
  };

  const validateAndUpdateTime = (field: 'start' | 'end', value: string) => {
    const formattedValue = formatTimeValue(value);
    
    // Se o valor estiver vazio ou incompleto, apenas atualiza o estado local
    if (formattedValue.length < 5) {
      if (field === 'start') {
        setStartValue(formattedValue);
      } else {
        setEndValue(formattedValue);
      }
      return;
    }
    
    // Se o valor for válido, atualiza o último valor válido
    if (field === 'start') {
      setStartValue(formattedValue);
      setLastValidStart(formattedValue);
    } else {
      setEndValue(formattedValue);
      setLastValidEnd(formattedValue);
    }
    
    // Propaga a mudança apenas se o valor for válido e completo
    if (formattedValue.length === 5) {
      onTimeChange(interval.id, field, formattedValue);
    }
  };

  // Sincroniza os estados locais quando os props mudam
  useEffect(() => {
    setStartValue(interval.start);
    setEndValue(interval.end);
    setLastValidStart(interval.start);
    setLastValidEnd(interval.end);
  }, [interval.start, interval.end]);

  const showDeleteButton = !isDefault && parseInt(interval.id) > 2;

  return (
    <div className="relative flex items-center gap-2">
      <div className="flex-1 flex items-center gap-2">
        <Input
          type="text"
          value={startValue}
          onChange={(e) => validateAndUpdateTime('start', e.target.value)}
          onBlur={() => setStartValue(lastValidStart)}
          className={`w-24 text-center font-medium ${!isFirstInterval ? 'bg-gray-100 text-muted-foreground' : ''}`}
          placeholder="00:00"
          maxLength={5}
          disabled={!isFirstInterval}
        />
        <span className="text-muted-foreground">até</span>
        <Input
          type="text"
          value={endValue}
          onChange={(e) => validateAndUpdateTime('end', e.target.value)}
          onBlur={() => setEndValue(lastValidEnd)}
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
