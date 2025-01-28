import { memo, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Clock, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface TimeInterval {
  start: string;
  end: string;
  id: string;
}

interface ScheduleNodeData {
  label: string;
  timezone: string;
  intervals: TimeInterval[];
}

interface ScheduleNodeProps {
  data: ScheduleNodeData;
}

interface TimeSlot {
  start: string;
  end: string;
}

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

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const ScheduleNode = memo(({ data }: ScheduleNodeProps) => {
  const [intervals, setIntervals] = useState<TimeInterval[]>(
    data.intervals || []
  );
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([
    { start: '00:00', end: '23:59' }
  ]);

  useEffect(() => {
    // Recalcular slots disponíveis quando os intervalos mudarem
    const usedSlots = intervals.map(interval => ({
      start: timeToMinutes(interval.start),
      end: timeToMinutes(interval.end)
    })).sort((a, b) => a.start - b.start);

    const freeSlots: TimeSlot[] = [];
    let currentTime = 0;
    const endOfDay = timeToMinutes('23:59');

    usedSlots.forEach(slot => {
      if (currentTime < slot.start) {
        freeSlots.push({
          start: minutesToTime(currentTime),
          end: minutesToTime(slot.start - 1)
        });
      }
      currentTime = slot.end + 1;
    });

    if (currentTime <= endOfDay) {
      freeSlots.push({
        start: minutesToTime(currentTime),
        end: '23:59'
      });
    }

    setAvailableSlots(freeSlots);
  }, [intervals]);

  const handleAddInterval = () => {
    if (availableSlots.length > 0) {
      const firstSlot = availableSlots[0];
      const newId = (intervals.length + 1).toString();
      setIntervals([
        ...intervals,
        { id: newId, start: firstSlot.start, end: firstSlot.end }
      ]);
    }
  };

  const handleRemoveInterval = (id: string) => {
    setIntervals(intervals.filter(interval => interval.id !== id));
  };

  const updateInterval = (id: string, field: 'start' | 'end', value: string) => {
    const currentInterval = intervals.find(i => i.id === id);
    if (!currentInterval) return;

    const newTime = timeToMinutes(value);
    const overlapping = intervals.some(interval => {
      if (interval.id === id) return false;
      const start = timeToMinutes(interval.start);
      const end = timeToMinutes(interval.end);
      return newTime >= start && newTime <= end;
    });

    if (!overlapping) {
      setIntervals(intervals.map(interval => 
        interval.id === id 
          ? { ...interval, [field]: value }
          : interval
      ));
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
                <div key={interval.id} className="relative h-10">
                  <div className="absolute inset-0 flex items-center gap-2">
                    <Input
                      type="time"
                      value={interval.start}
                      onChange={(e) => updateInterval(interval.id, 'start', e.target.value)}
                      className="w-full"
                    />
                    <ArrowRight className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <Input
                      type="time"
                      value={interval.end}
                      onChange={(e) => updateInterval(interval.id, 'end', e.target.value)}
                      className="w-full"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInterval(interval.id)}
                      className="text-zinc-400 hover:text-red-500 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={`interval-${interval.id}`}
                      className="!absolute !right-[-16.4px] !top-[10px] !w-3 !h-3 !bg-zinc-300"
                    />
                  </div>
                </div>
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
          disabled={availableSlots.length === 0}
        >
          + intervalo
        </Button>
      </div>
    </div>
  );
});

ScheduleNode.displayName = 'ScheduleNode';