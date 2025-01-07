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
    <div className="relative bg-[#1f1f2a] rounded-2xl w-[300px] shadow-lg shadow-black/20">
      <div className="bg-[#1f1f2a] px-4 py-2 flex items-center justify-between border-b border-[#434358]/50">
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Início</h3>
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

      <div className="px-4 py-3 bg-[#272733]/50">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addTrigger}
          className="w-full bg-[#333] border-[#444] text-white hover:bg-[#444] hover:border-[#555]"
        >
          <Plus className="h-4 w-4 mr-2 opacity-70" />
          Adicionar Gatilho
        </Button>
      </div>
    </div>
  );
}