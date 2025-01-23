import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { useDepartmentStore } from "@/stores/departmentStore";

interface DepartmentChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDepartment: string;
  onChangeDepartment: (newDepartment: string, action: 'change' | 'add') => void;
}

export function DepartmentChangeDialog({
  open,
  onOpenChange,
  currentDepartment,
  onChangeDepartment,
}: DepartmentChangeDialogProps) {
  const [selectedAction, setSelectedAction] = useState<'change' | 'add' | null>(null);
  const { departments } = useDepartmentStore();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerenciar Setor do Usuário</DialogTitle>
        </DialogHeader>
        {!selectedAction ? (
          <div className="grid gap-4">
            <Button
              variant="outline"
              onClick={() => setSelectedAction('change')}
              className="justify-start"
            >
              Trocar de Setor
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedAction('add')}
              className="justify-start"
            >
              Adicionar a Outro Setor
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="text-sm text-muted-foreground mb-2">
              {selectedAction === 'change' ? 'Selecione o novo setor:' : 'Selecione o setor adicional:'}
            </div>
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant="outline"
                onClick={() => onChangeDepartment(dept.name, selectedAction)}
                className="justify-start gap-2"
                disabled={dept.name === currentDepartment && selectedAction === 'change'}
              >
                <Building2 className="h-4 w-4" />
                {dept.name}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setSelectedAction(null)}
              className="mt-2"
            >
              Voltar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}