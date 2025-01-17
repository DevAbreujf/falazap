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
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (type: 'all' | 'me') => void;
}

export function DeleteDialog({ isOpen, onOpenChange, onDelete }: DeleteDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja apagar?</AlertDialogTitle>
          <AlertDialogDescription>
            Escolha como você deseja apagar esta mensagem
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancelar
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete('all');
              onOpenChange(false);
            }}
          >
            Apagar para todos
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete('me');
              onOpenChange(false);
            }}
          >
            Apagar para mim
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}