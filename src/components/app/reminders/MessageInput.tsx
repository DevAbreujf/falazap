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
      <div className="glass-card p-1 hover:border-primary/20 transition-all duration-300">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Digite a mensagem do lembrete..."
          className="min-h-[120px] bg-background/50 border-0 focus:border-0 focus:ring-0 rounded-xl placeholder:text-muted-foreground/50 resize-none"
        />
      </div>
    </div>
  );
}