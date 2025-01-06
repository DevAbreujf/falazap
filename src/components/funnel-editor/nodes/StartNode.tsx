import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
    <div className="flow-node">
      <div className="flow-node-header">
        <h3>Início</h3>
      </div>

      <div className="flow-node-content">
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

      <div className="flow-node-footer">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addTrigger}
          className="w-full bg-background hover:bg-accent"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Gatilho
        </Button>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-1.5 !bg-transparent border-2 border-orange-500"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !right-0 !translate-x-[2em]"
      />
    </div>
  );
}
