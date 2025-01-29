import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TimeIntervalInput } from './schedule/TimeIntervalInput';
import { 
  DEFAULT_INTERVALS,
  TimeInterval,
  splitInterval,
  validateIntervalSequence,
  mergeIntervals,
  getDuration
} from '@/utils/timeIntervals';

const mainTimeZones = [
  { value: 'America/Sao_Paulo', label: 'São Paulo (UTC-03:00)' },
  { value: 'America/New_York', label: 'Nova York (UTC-05:00)' },
  { value: 'Europe/London', label: 'Londres (UTC+00:00)' },
  { value: 'Europe/Paris', label: 'Paris (UTC+01:00)' },
  { value: 'Europe/Berlin', label: 'Berlim (UTC+01:00)' },
  { value: 'Asia/Tokyo', label: 'Tóquio (UTC+09:00)' },
  { value: 'Asia/Shanghai', label: 'Xangai (UTC+08:00)' },
  { value: 'Australia/Sydney', label: 'Sydney (UTC+10:00)' },
  { value: 'America/Mexico_City', label: 'Cidade do México (UTC-06:00)' },
  { value: 'America/Buenos_Aires', label: 'Buenos Aires (UTC-03:00)' },
  { value: 'Europe/Madrid', label: 'Madrid (UTC+01:00)' },
  { value: 'Europe/Rome', label: 'Roma (UTC+01:00)' },
  { value: 'Asia/Dubai', label: 'Dubai (UTC+04:00)' },
  { value: 'Asia/Singapore', label: 'Singapura (UTC+08:00)' },
  { value: 'Africa/Johannesburg', label: 'Joanesburgo (UTC+02:00)' }
];

interface ScheduleNodeData {
  label: string;
  timezone: string;
  intervals: TimeInterval[];
}

interface ScheduleNodeProps {
  data: ScheduleNodeData;
}

export const ScheduleNode = memo(({ data }: ScheduleNodeProps) => {
  const [intervals, setIntervals] = useState<TimeInterval[]>(
    data.intervals || DEFAULT_INTERVALS
  );
  const { toast } = useToast();

  const handleAddInterval = () => {
    // Encontra o maior intervalo para dividir
    const largestInterval = intervals.reduce((largest, current) => {
      const currentDuration = getDuration(current.start, current.end);
      const largestDuration = getDuration(largest.start, largest.end);
      return currentDuration > largestDuration ? current : largest;
    }, intervals[0]);

    // Calcula o ponto médio do intervalo
    const startTime = new Date(`2000-01-01T${largestInterval.start}`);
    const endTime = new Date(`2000-01-01T${largestInterval.end}`);
    if (endTime <= startTime) endTime.setDate(2);
    
    const midpoint = new Date((startTime.getTime() + endTime.getTime()) / 2);
    const splitTimeStr = midpoint.toTimeString().slice(0, 5);

    const newIntervals = splitInterval(intervals, largestInterval.id, splitTimeStr);
    
    if (newIntervals !== intervals) {
      setIntervals(newIntervals);
    } else {
      toast({
        title: "Erro ao adicionar intervalo",
        description: "Não foi possível dividir o intervalo selecionado",
        variant: "destructive"
      });
    }
  };

  const handleTimeChange = (id: string, field: 'start' | 'end', value: string) => {
    const newIntervals = intervals.map(interval => {
      if (interval.id === id) {
        return { ...interval, [field]: value };
      }
      return interval;
    });

    if (validateIntervalSequence(newIntervals)) {
      setIntervals(newIntervals);
    } else {
      toast({
        title: "Horário inválido",
        description: "Os intervalos devem ser sequenciais e cobrir 24 horas",
        variant: "destructive"
      });
    }
  };

  const handleRemoveInterval = (id: string) => {
    if (id === '1' || id === '2') {
      toast({
        title: "Operação não permitida",
        description: "Os intervalos padrão não podem ser removidos",
        variant: "destructive"
      });
      return;
    }

    const newIntervals = mergeIntervals(intervals, id);
    if (newIntervals !== intervals) {
      setIntervals(newIntervals);
    } else {
      toast({
        title: "Erro ao remover intervalo",
        description: "A remoção causaria uma sequência inválida de horários",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 left-1/2 -translate-x-1/2"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Horários</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-zinc-600">Fuso horário</label>
            <Select defaultValue="America/Sao_Paulo">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o fuso horário" />
              </SelectTrigger>
              <SelectContent>
                {mainTimeZones.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-600">Intervalos de horários</label>
            <div className="space-y-3">
              {intervals.map((interval) => (
                <TimeIntervalInput
                  key={interval.id}
                  interval={interval}
                  isDefault={interval.id === '1' || interval.id === '2'}
                  onTimeChange={handleTimeChange}
                  onRemove={handleRemoveInterval}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-50 border-t border-zinc-100 rounded-b-lg">
        <Button
          variant="ghost"
          onClick={handleAddInterval}
          className="w-full justify-center text-zinc-500 hover:text-zinc-600"
        >
          + intervalo
        </Button>
      </div>
    </div>
  );
});

ScheduleNode.displayName = 'ScheduleNode';
