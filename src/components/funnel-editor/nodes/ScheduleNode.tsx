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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px] relative">
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
                <SelectItem value="America/Sao_Paulo">(UTC-03:00) America/Sao_Paulo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-600">Intervalos de horários</label>
            <div className="space-y-3">
              {intervals.map((interval) => (
                <div key={interval.id} className="flex items-center gap-2 pr-6 relative h-[38px]">
                  <Input
                    type="time"
                    value={interval.start}
                    onChange={(e) => {
                      const newIntervals = [...intervals];
                      const index = newIntervals.findIndex(i => i.id === interval.id);
                      newIntervals[index].start = e.target.value;
                      setIntervals(newIntervals);
                    }}
                    className="w-24"
                  />
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                  <Input
                    type="time"
                    value={interval.end}
                    onChange={(e) => {
                      const newIntervals = [...intervals];
                      const index = newIntervals.findIndex(i => i.id === interval.id);
                      newIntervals[index].end = e.target.value;
                      setIntervals(newIntervals);
                    }}
                    className="w-24"
                  />
                  {intervals.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInterval(interval.id)}
                      className="text-zinc-400 hover:text-red-500 absolute right-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`interval-${interval.id}`}
                    className="w-3 h-3 !bg-zinc-300"
                    style={{ 
                      position: 'absolute',
                      right: '-24px',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  />
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