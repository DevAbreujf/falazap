import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Trigger {
  id: string;
  triggerType: "contains" | "exact" | "any" | "integration";
  triggerTerm?: string;
  platform?: "kiwify" | "hotmart";
  event?: "abandoned" | "approved";
}

interface StartNodeData {
  label: string;
  triggers: Trigger[];
  delay: {
    value: number;
    unit: "seconds" | "minutes" | "hours";
  };
}

export function StartNode({ data }: { data: StartNodeData }) {
  const [triggers, setTriggers] = useState<Trigger[]>(data.triggers);

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

  return (
    <div className="bg-primary/10 rounded-xl border-2 border-primary p-4 min-w-[300px]">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-lg">{data.label}</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tempo de Execução</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={data.delay.value}
                className="w-20"
                min={0}
              />
              <Select defaultValue={data.delay.unit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">Segundos</SelectItem>
                  <SelectItem value="minutes">Minutos</SelectItem>
                  <SelectItem value="hours">Horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {triggers.map((trigger, index) => (
            <div key={trigger.id} className="space-y-2 border-t pt-4">
              <Select 
                defaultValue={trigger.triggerType}
                onValueChange={(value) => updateTrigger(trigger.id, { 
                  triggerType: value as Trigger["triggerType"],
                  platform: undefined,
                  event: undefined,
                  triggerTerm: undefined
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">Contenha</SelectItem>
                  <SelectItem value="exact">Exata</SelectItem>
                  <SelectItem value="any">Qualquer mensagem</SelectItem>
                  <SelectItem value="integration">Integração</SelectItem>
                </SelectContent>
              </Select>

              {(trigger.triggerType === "contains" || trigger.triggerType === "exact") && (
                <Input
                  placeholder="Digite o termo..."
                  value={trigger.triggerTerm}
                  onChange={(e) => updateTrigger(trigger.id, { 
                    triggerTerm: e.target.value 
                  })}
                />
              )}

              {trigger.triggerType === "integration" && (
                <div className="space-y-2">
                  <Select
                    value={trigger.platform}
                    onValueChange={(value) => updateTrigger(trigger.id, { 
                      platform: value as "kiwify" | "hotmart" 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kiwify">Kiwify</SelectItem>
                      <SelectItem value="hotmart">Hotmart</SelectItem>
                    </SelectContent>
                  </Select>

                  {trigger.platform && (
                    <Select
                      value={trigger.event}
                      onValueChange={(value) => updateTrigger(trigger.id, { 
                        event: value as "abandoned" | "approved" 
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o evento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abandoned">Carrinho abandonado</SelectItem>
                        <SelectItem value="approved">Venda aprovada</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}

              <Handle
                type="source"
                position={Position.Bottom}
                id={`trigger-${index}`}
                className="!bg-primary !w-3 !h-3 !border-2"
                style={{ bottom: "-15px" }}
              />
            </div>
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