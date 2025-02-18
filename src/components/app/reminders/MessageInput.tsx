
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function MessageInput({ value, onChange }: MessageInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">
        Mensagem do lembrete
      </Label>
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Digite a mensagem que será enviada..."
          className="min-h-[120px] resize-none bg-white border-2 border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-lg shadow-sm focus:shadow-md"
        />
      </div>
    </div>
  );
}
