import { memo } from 'react';
import { Handle, Position, useEdges } from '@xyflow/react';
import { Calendar } from 'lucide-react';
import { WeekdaysNodeData } from '@/types/flow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
                  style={{ right: '-1em' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

WeekdaysNode.displayName = 'WeekdaysNode';