import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicFormFieldsProps {
  reminderName: string;
  setReminderName: (value: string) => void;
  clientName: string;
  setClientName: (value: string) => void;
}

export function BasicFormFields({
  reminderName,
  setReminderName,
  clientName,
  setClientName
}: BasicFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Nome do Lembrete
        </Label>
        <Input
          placeholder="Digite um nome para identificar este lembrete"
          value={reminderName}
          onChange={(e) => setReminderName(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Nome do Cliente
        </Label>
        <Input
          placeholder="Digite o nome do cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full"
        />
      </div>
    </>
  );
}