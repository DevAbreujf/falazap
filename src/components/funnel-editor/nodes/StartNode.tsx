import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TriggerSelector } from "./start/TriggerSelector";
import { DelaySelector } from "./start/DelaySelector";
import { StartNodeData, Trigger } from "@/types/flow";

export function StartNode({ data, id }: { data: StartNodeData; id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggers, setTriggers] = useState<Trigger[]>(data.triggers || []);
  const [delay, setDelay] = useState<{ value: number; unit: "seconds" | "minutes" | "hours" }>({
    value: data.delay?.value || 0,
    unit: data.delay?.unit || "seconds"
  });

  const handleAddTrigger = () => {
    const newTrigger: Trigger = {
      id: crypto.randomUUID(),
      triggerType: "contains",
    };

    setTriggers((current) => [...current, newTrigger]);
  };

  const handleRemoveTrigger = (triggerId: string) => {
    setTriggers((current) => current.filter((t) => t.id !== triggerId));
  };

  const handleUpdateTrigger = (triggerId: string, updates: Partial<Trigger>) => {
    setTriggers((current) =>
      current.map((trigger) =>
        trigger.id === triggerId ? { ...trigger, ...updates } : trigger
      )
    );
  };

  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2"
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Início do Funil</h3>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px]">
              <SheetHeader>
                <SheetTitle>Configurações do Início</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Gatilhos</h4>
                    <Button variant="outline" size="sm" onClick={handleAddTrigger}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {triggers.map((trigger) => (
                      <TriggerSelector
                        key={trigger.id}
                        trigger={trigger}
                        onUpdate={(updates) =>
                          handleUpdateTrigger(trigger.id, updates)
                        }
                        onRemove={() => handleRemoveTrigger(trigger.id)}
                      />
                    ))}

                    {triggers.length === 0 && (
                      <div className="text-sm text-muted-foreground text-center py-4">
                        Nenhum gatilho configurado
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Atraso inicial</h4>
                  <DelaySelector
                    value={delay.value}
                    unit={delay.unit}
                    onChange={(value, unit) => setDelay({ value, unit })}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="text-sm text-muted-foreground">
          {triggers.length === 0 ? (
            <span>Nenhum gatilho configurado</span>
          ) : (
            <span>{triggers.length} gatilho(s) configurado(s)</span>
          )}
          {delay.value > 0 && (
            <span className="block">
              Atraso de {delay.value}{" "}
              {delay.unit === "seconds"
                ? "segundo(s)"
                : delay.unit === "minutes"
                ? "minuto(s)"
                : "hora(s)"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}