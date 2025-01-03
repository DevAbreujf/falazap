import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Clock, ChevronDown, ChevronUp, Plus, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TriggerNode } from './TriggerNode';

export interface StartNodeData extends Record<string, unknown> {
  label: string;
  description: string;
  time: number;
  triggers: Array<{
    id: string;
    triggerType: string;
    triggerTerm: string;
    platform: string;
    event: string;
  }>;
}

interface StartNodeProps extends NodeProps<StartNodeData> {
  isTimeSettingsOpen: boolean;
  onTimeSettingsToggle: () => void;
  onTimeChange: (value: number) => void;
  onAddTrigger: () => void;
  onUpdateTrigger: (triggerId: string, field: string, value: string) => void;
  onRemoveTrigger: (triggerId: string) => void;
}

export const StartNode = ({
  data,
  isTimeSettingsOpen,
  onTimeSettingsToggle,
  onTimeChange,
  onAddTrigger,
  onUpdateTrigger,
  onRemoveTrigger,
}: StartNodeProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="w-[280px] bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden" onClick={handleClick}>
      <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/50">
        <h3 className="text-sm font-medium text-zinc-100">{data.label}</h3>
      </div>

      <div className="divide-y divide-zinc-800/50">
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-2 cursor-pointer" onClick={onTimeSettingsToggle}>
            <Clock className="h-4 w-4 text-zinc-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-400">{data.description}</p>
                {isTimeSettingsOpen ? (
                  <ChevronUp className="h-4 w-4 text-zinc-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                )}
              </div>
            </div>
          </div>

          {isTimeSettingsOpen && (
            <div className="flex items-center gap-2">
              <div className="w-16 h-9 bg-zinc-950/50 border border-zinc-800 rounded flex items-center justify-center">
                <input
                  type="number"
                  min="0"
                  value={data.time}
                  className="w-12 text-center bg-transparent text-sm text-zinc-400 focus:outline-none"
                  onChange={(e) => onTimeChange(parseInt(e.target.value) || 0)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <Select>
                <SelectTrigger className="flex-1 h-9 bg-zinc-950/50 border-zinc-800 text-sm">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutos</SelectItem>
                  <SelectItem value="hours">Horas</SelectItem>
                  <SelectItem value="days">Dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {data.triggers.map((trigger) => (
          <TriggerNode
            key={trigger.id}
            data={trigger}
            onUpdate={(field, value) => onUpdateTrigger(trigger.id, field, value)}
            onRemove={() => onRemoveTrigger(trigger.id)}
          />
        ))}

        <div className="px-4 py-3 bg-zinc-900/50 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
            onClick={(e) => {
              e.stopPropagation();
              onAddTrigger();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar gatilho
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-primary border-2 border-primary-foreground rounded-full"
        style={{ bottom: -6 }}
      />
    </div>
  );
};