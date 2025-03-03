import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface EndChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
}

export function EndChatDialog({ isOpen, onClose, onConfirm }: EndChatDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("Atendimento finalizado");
  const { toast } = useToast();

  const handleConfirm = () => {
    onConfirm(message);
    onClose();
  };

  const handleSaveMessage = () => {
    setIsEditing(false);
    toast({
      title: "Mensagem atualizada",
      description: "A mensagem de finalização foi atualizada com sucesso.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Atendimento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
          {!isEditing ? (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-primary/5"
                onClick={handleConfirm}
              >
                <Check className="mr-2 h-4 w-4 text-primary" />
                Finalizar Atendimento
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-primary/5 group"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="mr-2 h-4 w-4 text-primary" />
                <span className="flex-1 text-left">
                  Editar Mensagem
                  <span className="block text-sm text-muted-foreground truncate group-hover:text-clip">
                    "{message}"
                  </span>
                </span>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Mensagem de finalização
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite a mensagem de finalização"
                  className="min-h-[100px] resize-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button onClick={handleSaveMessage}>
                  <Check className="mr-2 h-4 w-4" />
                  Confirmar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}