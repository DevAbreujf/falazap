import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TimeIntervalInput } from './schedule/TimeIntervalInput';
import { Clock } from 'lucide-react';
import { 
  DEFAULT_INTERVALS,
  TimeInterval,
  splitInterval,
  validateIntervalSequence,
  mergeIntervals,
  getDuration,
  timeToMinutes,
  minutesToTime
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
    const nonDefaultIntervals = intervals.filter(interval => interval.id !== '1' && interval.id !== '2');
    const defaultIntervals = intervals.filter(interval => interval.id === '1' || interval.id === '2');
    
    let largestInterval;
    
    if (nonDefaultIntervals.length > 0) {
      largestInterval = nonDefaultIntervals.reduce((largest, current) => {
        const currentDuration = getDuration(current.start, current.end);
        const largestDuration = getDuration(largest.start, largest.end);
        return currentDuration > largestDuration ? current : largest;
      }, nonDefaultIntervals[0]);
    } else {
      largestInterval = defaultIntervals.reduce((largest, current) => {
        const currentDuration = getDuration(current.start, current.end);
        const largestDuration = getDuration(largest.start, largest.end);
        return currentDuration > largestDuration ? current : largest;
      }, defaultIntervals[0]);
    }

    const startMinutes = timeToMinutes(largestInterval.start);
    const endMinutes = timeToMinutes(largestInterval.end);
    const midMinutes = Math.floor((startMinutes + endMinutes) / 2);
    const splitTimeStr = minutesToTime(midMinutes);

    const newIntervals = splitInterval(intervals, largestInterval.id, splitTimeStr);
    
    if (newIntervals !== intervals) {
      const reorderedIntervals = [
        ...newIntervals.filter(interval => interval.id === '1' || interval.id === '2'),
        ...newIntervals.filter(interval => interval.id !== '1' && interval.id !== '2')
      ];
      setIntervals(reorderedIntervals);
    } else {
      toast({
        title: "Erro ao adicionar intervalo",
        description: "Não foi possível dividir o intervalo selecionado",
        variant: "destructive"
      });
    }
  };

  const handleTimeChange = (id: string, field: 'start' | 'end', value: string) => {
    let newIntervals = intervals.map((interval, index) => {
      // Se estamos alterando o fim de um intervalo, atualiza o início do próximo
      if (interval.id === id && field === 'end' && index < intervals.length - 1) {
        const nextInterval = intervals[index + 1];
        return { ...interval, [field]: value };
      }
      // Se estamos alterando o início do primeiro intervalo, atualiza o fim do último
      if (interval.id === intervals[0].id && field === 'start') {
        return { ...interval, [field]: value };
      }
      // Se este é o próximo intervalo após o que está sendo editado
      if (index > 0 && intervals[index - 1].id === id && field === 'end') {
        return { ...interval, start: value };
      }
      // Se este é o último intervalo e o primeiro está sendo editado
      if (index === intervals.length - 1 && intervals[0].id === id && field === 'start') {
        return { ...interval, end: value };
      }
      return interval;
    });

    if (validateIntervalSequence(newIntervals)) {
      const reorderedIntervals = [
        ...newIntervals.filter(interval => interval.id === '1' || interval.id === '2'),
        ...newIntervals.filter(interval => interval.id !== '1' && interval.id !== '2')
      ];
      setIntervals(reorderedIntervals);
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
      const reorderedIntervals = [
        ...newIntervals.filter(interval => interval.id === '1' || interval.id === '2'),
        ...newIntervals.filter(interval => interval.id !== '1' && interval.id !== '2')
      ];
      setIntervals(reorderedIntervals);
    } else {
      toast({
        title: "Erro ao remover intervalo",
        description: "A remoção causaria uma sequência inválida de horários",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[320px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 left-1/2 -translate-x-1/2"
      />
      
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium">Horários</h3>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-600">Fuso horário</label>
          <Select defaultValue="America/Sao_Paulo">
            <SelectTrigger>
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
          <label className="text-sm font-medium text-zinc-600">Intervalos de horários</label>
          <div className="space-y-3">
            {intervals.map((interval, index) => (
              <TimeIntervalInput
                key={interval.id}
                interval={interval}
                isDefault={interval.id === '1' || interval.id === '2'}
                isFirstInterval={index === 0}
                onTimeChange={handleTimeChange}
                onRemove={handleRemoveInterval}
              />
            ))}
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