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
    <div className="bg-white rounded-xl border border-zinc-200 shadow-lg w-[320px] overflow-hidden">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 !-top-3"
      />
      
      <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-200 bg-gradient-to-r from-white to-zinc-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-md">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900">Dias da Semana</h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-600">Fuso horário</label>
          <Select defaultValue="America/Sao_Paulo">
            <SelectTrigger className="w-full text-sm bg-zinc-50/50 border-zinc-200">
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

        <div className="space-y-1.5">
          {days.map((day, index) => (
            <div 
              key={day.day} 
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              <span className="text-sm font-medium text-zinc-700">
                {day.day}
              </span>
              <div className="flex items-center gap-4">
                <span 
                  className={`inline-block w-2.5 h-2.5 rounded-full transition-colors ${
                    isDayConnected(day.day.toLowerCase()) 
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-200' 
                      : 'bg-red-400 shadow-sm shadow-red-200'
                  }`} 
                />
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${day.day.toLowerCase()}-handle`}
                  className="!relative !transform-none !right-0 w-2.5 h-2.5 !bg-zinc-300"
                  style={{ right: '-2em' }}
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