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
    <div className="relative bg-[#1f1f2a] rounded-xl border border-[#434358] shadow-lg backdrop-blur-sm min-w-[320px]">
      <div className="flow-node-header border-b border-[#434358]/50 bg-[#272733]/50">
        <div className="flex items-center gap-2 px-4 py-3">
          <Play className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Início</h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <DelaySelector 
          value={delay.value} 
          unit={delay.unit} 
          onChange={updateDelay}
        />

        <div className="space-y-3">
          {triggers.map((trigger, index) => (
            <div 
              key={trigger.id}
              className="bg-[#272733] rounded-lg border border-[#434358] overflow-hidden"
            >
              <TriggerItem
                trigger={trigger}
                index={index}
                onUpdate={updateTrigger}
                onDelete={deleteTrigger}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-[#434358]/50 bg-[#272733]/30">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addTrigger}
          className="w-full bg-[#272733] hover:bg-[#2f2f3d] border-[#434358] text-zinc-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Gatilho
        </Button>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
        style={{ right: '-4em' }}
      />
    </div>
  );
}