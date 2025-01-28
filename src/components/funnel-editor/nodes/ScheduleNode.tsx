import { memo, useState } from 'react';
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

export const ScheduleNode = memo(({ data }: ScheduleNodeProps) => {
  const [intervals, setIntervals] = useState<TimeInterval[]>(
    data.intervals || [
      { id: '1', start: '07:00', end: '18:00' },
      { id: '2', start: '18:00', end: '07:00' }
    ]
  );

  const handleAddInterval = () => {
    const newId = (intervals.length + 1).toString();
    setIntervals([
      ...intervals,
      { id: newId, start: '00:00', end: '23:59' }
    ]);
  };

  const handleRemoveInterval = (id: string) => {
    setIntervals(intervals.filter(interval => interval.id !== id));
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
                      onChange={(e) => {
                        const newIntervals = [...intervals];
                        const index = newIntervals.findIndex(i => i.id === interval.id);
                        newIntervals[index].start = e.target.value;
                        setIntervals(newIntervals);
                      }}
                      className="w-full"
                    />
                    <ArrowRight className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <Input
                      type="time"
                      value={interval.end}
                      onChange={(e) => {
                        const newIntervals = [...intervals];
                        const index = newIntervals.findIndex(i => i.id === interval.id);
                        newIntervals[index].end = e.target.value;
                        setIntervals(newIntervals);
                      }}
                      className="w-full"
                    />
                    {intervals.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveInterval(interval.id)}
                        className="text-zinc-400 hover:text-red-500 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
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
        >
          + intervalo
        </Button>
      </div>
    </div>
  );
});

ScheduleNode.displayName = 'ScheduleNode';