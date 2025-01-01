import { MessageCircle, MessageSquare } from "lucide-react";
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
        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 transition-all duration-300 shadow-lg hover:shadow-[#25D366]/20 py-6 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <MessageSquare className="w-5 h-5" />
        <span className="font-medium text-base">WhatsApp</span>
      </Button>
    </div>
  );
}