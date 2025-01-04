import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Trigger } from "@/types/flow";

interface TriggerSelectorProps {
  trigger: Trigger;
  onUpdate: (updates: Partial<Trigger>) => void;
  onRemove: () => void;
}

export function TriggerSelector({ trigger, onUpdate, onRemove }: TriggerSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={trigger.triggerType}
        onValueChange={(value) => onUpdate({ triggerType: value as Trigger["triggerType"] })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="contains">Contém</SelectItem>
          <SelectItem value="exact">Exato</SelectItem>
          <SelectItem value="any">Qualquer</SelectItem>
          <SelectItem value="integration">Integração</SelectItem>
        </SelectContent>
      </Select>

      {trigger.triggerType !== "any" && trigger.triggerType !== "integration" && (
        <Input
          placeholder="Termo do gatilho"
          value={trigger.triggerTerm || ""}
          onChange={(e) => onUpdate({ triggerTerm: e.target.value })}
          className="flex-1"
        />
      )}

      {trigger.triggerType === "integration" && (
        <>
          <Select
            value={trigger.platform}
            onValueChange={(value) => onUpdate({ platform: value as Trigger["platform"] })}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Plataforma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kiwify">Kiwify</SelectItem>
              <SelectItem value="hotmart">Hotmart</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={trigger.event}
            onValueChange={(value) => onUpdate({ event: value as Trigger["event"] })}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Evento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abandoned">Abandono</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}

      <Button variant="ghost" size="icon" onClick={onRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}