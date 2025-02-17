
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteFunnelDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export function DeleteFunnelDialog({ isOpen, onOpenChange, onDelete }: DeleteFunnelDialogProps) {
  const handleDelete = () => {
    onDelete();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent 
        className="sm:max-w-[425px]" 
        onCloseAutoFocus={() => {
          document.body.style.pointerEvents = 'auto';
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Funil</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir este funil? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={() => {
              onOpenChange(false);
              document.body.style.pointerEvents = 'auto';
            }}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
