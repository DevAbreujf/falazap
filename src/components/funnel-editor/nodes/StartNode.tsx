import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Plus, Play, Clock3 } from "lucide-react";
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
    <div className="bg-gradient-secondary rounded-lg border border-gray-200 shadow-lg w-[300px] overflow-visible">
      <div className="bg-gradient-primary px-4 py-3 flex items-center gap-2 rounded-t-lg">
        <Play className="h-4 w-4 text-white" />
        <h3 className="text-sm font-medium text-white">Início</h3>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <DelaySelector 
            value={delay.value} 
            unit={delay.unit} 
            onChange={updateDelay}
          />
          <p className="text-xs text-gray-500 mt-1 ml-1">
            Tempo para disparar novamente o funil
          </p>
        </div>

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

      <div className="px-4 py-3 bg-secondary/50 rounded-b-lg border-t border-gray-100">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addTrigger}
          className="w-full bg-white hover:bg-gray-50 border-gray-200 text-primary hover:text-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Gatilho
        </Button>
      </div>
    </div>
  );
}