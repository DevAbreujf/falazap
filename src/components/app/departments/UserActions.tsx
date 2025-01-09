import { Button } from "@/components/ui/button";

interface UserActionsProps {
  onRemoveClick: () => void;
  onChangeClick: () => void;
}

export function UserActions({ onRemoveClick, onChangeClick }: UserActionsProps) {
  return (
    <div className="space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onRemoveClick}
      >
        Remover do Setor
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onChangeClick}
      >
        Trocar Setor / Adicionar Setor
      </Button>
    </div>
  );
}