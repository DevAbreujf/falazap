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
    <div className="bg-[#1f1f2a] rounded-2xl w-[300px] shadow-lg shadow-black/20">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="bg-[#1f1f2a] px-4 py-2 flex items-center justify-between border-b border-[#434358]/50">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Dias da Semana</h3>
        </div>
      </div>

      <div className="p-4">
        {days.map((day) => (
          <div key={day.day} className="flex items-center justify-between py-2 border-t border-[#434358] first:border-t-0">
            <span className={`text-sm ${day.enabled ? 'text-zinc-100' : 'text-zinc-400'}`}>
              {day.day}
            </span>
            <span className={`inline-block w-3 h-3 rounded-full ${day.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[4.5em]"
      />
    </div>
  );
});

WeekdaysNode.displayName = 'WeekdaysNode';