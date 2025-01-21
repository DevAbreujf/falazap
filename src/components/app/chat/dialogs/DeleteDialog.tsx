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

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (type: 'all' | 'me') => void;
}

export function DeleteDialog({ isOpen, onOpenChange, onDelete }: DeleteDialogProps) {
  const handleDelete = (type: 'all' | 'me') => {
    onDelete(type);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja apagar?</AlertDialogTitle>
          <AlertDialogDescription>
            Escolha como você deseja apagar esta mensagem
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel 
            onClick={handleCancel}
            className="mt-0"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete('all')}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Apagar para todos
          </AlertDialogAction>
          <AlertDialogAction
            onClick={() => handleDelete('me')}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Apagar para mim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}