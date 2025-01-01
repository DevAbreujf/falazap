import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function MessageTypeSelector() {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">
        Tipo de mensagem
      </Label>
      <Button
        type="button"
        variant="default"
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 transition-all duration-300"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </Button>
    </div>
  );
}