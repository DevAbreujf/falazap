import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
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
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="font-medium mb-2">Dias da Semana</div>
      <div className="text-sm text-gray-600">
        {days.map((day) => (
          <div key={day.day} className={`flex items-center ${day.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
            <span className="mr-2">{day.day}</span>
            <span className={`inline-block w-3 h-3 rounded-full ${day.enabled ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>
        ))}
      </div>
    </div>
  );
});

WeekdaysNode.displayName = 'WeekdaysNode';