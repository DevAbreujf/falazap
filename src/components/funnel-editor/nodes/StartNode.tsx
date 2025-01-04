import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

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
  return (
    <div className="bg-primary/10 rounded-xl border-2 border-primary p-4 min-w-[300px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{data.label}</h3>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Gatilho
          </Button>
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

          {data.triggers.map((trigger) => (
            <div key={trigger.id} className="space-y-2 border-t pt-4">
              <Select defaultValue={trigger.triggerType}>
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
                />
              )}

              {trigger.triggerType === "integration" && (
                <div className="space-y-2">
                  <Select defaultValue={trigger.platform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kiwify">Kiwify</SelectItem>
                      <SelectItem value="hotmart">Hotmart</SelectItem>
                    </SelectContent>
                  </Select>

                  {trigger.platform && (
                    <Select defaultValue={trigger.event}>
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
            </div>
          ))}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
    </div>
  );
}