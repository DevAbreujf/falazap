import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Plus } from "lucide-react";
import { useState } from "react";
import { useDepartmentStore } from "@/stores/departmentStore";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Selecionar Setor</DialogTitle>
        </DialogHeader>
        {!selectedAction ? (
          <div className="grid gap-4">
            <Button
              variant="outline"
              onClick={() => setSelectedAction('change')}
              className="justify-start hover:bg-primary/5 transition-all duration-200"
            >
              Trocar de Setor
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedAction('add')}
              className="justify-start hover:bg-primary/5 transition-all duration-200"
            >
              Adicionar a Outro Setor
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="text-sm text-muted-foreground mb-2">
              {selectedAction === 'change' ? 'Selecione o novo setor:' : 'Selecione o setor adicional:'}
            </div>
            {departments.length > 0 ? (
              <div className="grid gap-2">
                {departments.map((dept) => (
                  <Button
                    key={dept.id}
                    variant="outline"
                    onClick={() => onChangeDepartment(dept.name, selectedAction)}
                    className="justify-start gap-2 hover:bg-primary/5 transition-all duration-200"
                    disabled={dept.name === currentDepartment && selectedAction === 'change'}
                  >
                    <Building2 className="h-4 w-4" />
                    {dept.name}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground text-center py-2">
                  Nenhum setor cadastrado. Crie setores na página de Departamentos.
                </div>
                <Button
                  onClick={() => navigate('/departments')}
                  className="w-full gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Criar setor
                </Button>
              </div>
            )}
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