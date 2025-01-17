import { DeleteDialog } from "./DeleteDialog";
import { ForwardDialog } from "./ForwardDialog";
import { ChatMessage } from "@/types/chat";

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
  return (
    <>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={onCloseDeleteDialog}
        onDelete={onDelete}
      />
      <ForwardDialog
        isOpen={isForwardDialogOpen}
        onOpenChange={onCloseForwardDialog}
        onForward={onForward}
      />
    </>
  );
}