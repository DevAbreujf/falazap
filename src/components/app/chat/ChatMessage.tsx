import { useState } from "react";
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
import { MoreVertical, Copy, Trash2, Forward } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    quoted?: boolean;
  };
  isFromCurrentUser: boolean;
  onDelete: (id: string, deleteType: 'all' | 'me') => void;
  onForward: () => void;
  onCopy: () => void;
  currentUser: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export function ChatMessage({
  message,
  isFromCurrentUser,
  onDelete,
  onForward,
  onCopy,
  currentUser,
}: ChatMessageProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = (deleteType: 'all' | 'me') => {
    onDelete(message.id, deleteType);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col gap-2 p-4 rounded-lg",
          isFromCurrentUser ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-muted",
          message.quoted && "mt-2"
        )}
      >
        <p>{message.content}</p>
        
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onCopy}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onForward}
          >
            <Forward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja apagar?</AlertDialogTitle>
            <AlertDialogDescription>
              Escolha como deseja apagar esta mensagem
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction 
              onClick={() => handleDelete('all')}
              className="w-full"
            >
              Apagar para todos
            </AlertDialogAction>
            <AlertDialogAction 
              onClick={() => handleDelete('me')}
              className="w-full"
            >
              Apagar para mim
            </AlertDialogAction>
            <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
