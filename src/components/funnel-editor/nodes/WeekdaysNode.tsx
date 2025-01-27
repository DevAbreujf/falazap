import { memo } from 'react';
import { Handle, Position, useEdges } from '@xyflow/react';
import { Calendar } from 'lucide-react';
import { WeekdaysNodeData } from '@/types/flow';

interface WeekdaysNodeProps {
  data: WeekdaysNodeData;
  id: string;
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

export const WeekdaysNode = memo(({ data, id }: WeekdaysNodeProps) => {
  const days = data?.days || defaultDays;
  const edges = useEdges();

  const isDayConnected = (dayId: string) => {
    return edges.some(edge => 
      edge.source === id && edge.sourceHandle === `${dayId}-handle`
    );
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 !-top-3"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Dias da Semana</h3>
        </div>
      </div>

      <div className="p-4">
        {days.map((day, index) => (
          <div 
            key={day.day} 
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <span className="text-sm text-zinc-900">
              {day.day}
            </span>
            <div className="flex items-center gap-4">
              <span 
                className={`inline-block w-3 h-3 rounded-full ${
                  isDayConnected(day.day.toLowerCase()) ? 'bg-green-500' : 'bg-red-500'
                }`} 
              />
              <Handle
                type="source"
                position={Position.Right}
                id={`${day.day.toLowerCase()}-handle`}
                className="!relative !transform-none !right-0 w-3 h-3 !bg-zinc-300"
                style={{ right: '-1.1em !important' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

WeekdaysNode.displayName = 'WeekdaysNode';