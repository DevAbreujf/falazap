import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Calendar } from 'lucide-react';
import { WeekdaysNodeData } from '@/types/flow';

interface WeekdaysNodeProps {
  data: WeekdaysNodeData;
}

const defaultDays = [
  { day: 'Segunda', enabled: true },
  { day: 'Terça', enabled: true },
  { day: 'Quarta', enabled: true },
  { day: 'Quinta', enabled: true },
  { day: 'Sexta', enabled: true },
  { day: 'Sábado', enabled: false },
  { day: 'Domingo', enabled: false },
];

export const WeekdaysNode = memo(({ data }: WeekdaysNodeProps) => {
  const days = data?.days || defaultDays;

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Dias da Semana</h3>
        </div>
      </div>

      <div className="p-4">
        {days.map((day) => (
          <div key={day.day} className="flex items-center justify-between py-2 border-t border-zinc-200 first:border-t-0">
            <span className={`text-sm ${day.enabled ? 'text-zinc-900' : 'text-zinc-400'}`}>
              {day.day}
            </span>
            <span className={`inline-block w-3 h-3 rounded-full ${day.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-zinc-300"
      />
    </div>
  );
});

WeekdaysNode.displayName = 'WeekdaysNode';