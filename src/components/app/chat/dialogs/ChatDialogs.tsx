import { DeleteDialog } from "./DeleteDialog";
import { ForwardDialog } from "./ForwardDialog";
import { ChatMessage } from "@/types/chat";
import { useEffect } from "react";

interface ChatDialogsProps {
  isDeleteDialogOpen: boolean;
  isForwardDialogOpen: boolean;
  selectedMessage: ChatMessage | null;
  onCloseDeleteDialog: () => void;
  onCloseForwardDialog: () => void;
  onDelete: (type: 'all' | 'me') => void;
  onForward: (contactId: string) => void;
}

export function ChatDialogs({
  isDeleteDialogOpen,
  isForwardDialogOpen,
  selectedMessage,
  onCloseDeleteDialog,
  onCloseForwardDialog,
  onDelete,
  onForward
}: ChatDialogsProps) {
  // Limpar estados quando os diálogos são fechados
  useEffect(() => {
    if (!isDeleteDialogOpen) {
      document.body.style.pointerEvents = 'auto';
    }
  }, [isDeleteDialogOpen]);

  useEffect(() => {
    if (!isForwardDialogOpen) {
      document.body.style.pointerEvents = 'auto';
    }
  }, [isForwardDialogOpen]);

  return (
    <>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            onCloseDeleteDialog();
            document.body.style.pointerEvents = 'auto';
          }
        }}
        onDelete={(type) => {
          onDelete(type);
          document.body.style.pointerEvents = 'auto';
        }}
      />
      <ForwardDialog
        isOpen={isForwardDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            onCloseForwardDialog();
            document.body.style.pointerEvents = 'auto';
          }
        }}
        onForward={(contactId) => {
          onForward(contactId);
          document.body.style.pointerEvents = 'auto';
        }}
      />
    </>
  );
}