import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualTriggerDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  selectedTrigger: string;
  setSelectedTrigger: (trigger: string) => void;
  handleManualTrigger: () => void;
}

export function ManualTriggerDialog({
  isOpen,
  setIsOpen,
  phoneNumber,
  setPhoneNumber,
  selectedTrigger,
  setSelectedTrigger,
  handleManualTrigger,
}: ManualTriggerDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disparo Manual do Funil</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Gatilho</Label>
            <select
              className="w-full p-2 rounded-md border"
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value)}
            >
              <option value="">Selecione um gatilho</option>
              {/* Adicionar opções de gatilho aqui */}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Número do Cliente</Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+55 (99) 99999-9999"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleManualTrigger}>
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}