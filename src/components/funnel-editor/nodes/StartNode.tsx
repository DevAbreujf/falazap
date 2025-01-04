import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

  const updateDelay = (value: number, unit: string) => {
    setDelay({ value, unit });
  };

  return (
    <div className="bg-primary/10 rounded-xl border-2 border-primary p-4 min-w-[300px]">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-lg">{data.label}</h3>
        </div>

        <div className="space-y-4">
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

        <div className="flex justify-center pt-4 border-t">
          <Button variant="outline" size="sm" onClick={addTrigger}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Gatilho
          </Button>
        </div>
      </div>
    </div>
  );
}