import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Plus, Play } from "lucide-react";
import { useState } from "react";
import { DelaySelector } from "./start/DelaySelector";
import { TriggerItem } from "./start/TriggerItem";
import type { StartNodeData, Trigger } from "@/types/flow";

export function StartNode({ data }: { data: StartNodeData }) {
  const [triggers, setTriggers] = useState<Trigger[]>(data.triggers);
  const [delay, setDelay] = useState(data.delay);

  const addTrigger = () => {
    const newTrigger: Trigger = {
      id: `trigger-${triggers.length + 1}`,
      triggerType: "contains",
    };
    setTriggers([...triggers, newTrigger]);
  };

  const updateTrigger = (triggerId: string, updates: Partial<Trigger>) => {
    setTriggers(triggers.map(t => 
      t.id === triggerId ? { ...t, ...updates } : t
    ));
  };

  const deleteTrigger = (triggerId: string) => {
    setTriggers(triggers.filter(t => t.id !== triggerId));
  };

  const updateDelay = (value: number, unit: "seconds" | "minutes" | "hours") => {
    setDelay({ value, unit });
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px] overflow-hidden">
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Início</h3>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <DelaySelector 
          value={delay.value} 
          unit={delay.unit} 
          onChange={updateDelay}
        />

        {triggers.map((trigger, index) => (
          <TriggerItem
            key={trigger.id}
            trigger={trigger}
            index={index}
            onUpdate={updateTrigger}
            onDelete={deleteTrigger}
          />
        ))}
      </div>

      <div className="px-4 py-3 bg-zinc-50 rounded-b-lg">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addTrigger}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Gatilho
        </Button>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
      />
    </div>
  );
}