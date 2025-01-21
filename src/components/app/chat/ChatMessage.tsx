import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Reply, Copy, Forward, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { ForwardDialog } from "./dialogs/ForwardDialog";
import { DeleteDialog } from "./dialogs/DeleteDialog";

interface ChatMessageProps {
  message: ChatMessageType;
  isCurrentUser: boolean;
  currentUser: { name: string; avatar?: string };
  onMessageAction: (action: 'reply' | 'copy' | 'forward' | 'delete', messageId: string, deleteType?: 'all' | 'me') => void;
  onScrollToMessage?: (messageId: string) => void;
  isRepliedMessage?: boolean;
}

export function ChatMessage({ 
  message, 
  isCurrentUser, 
  currentUser, 
  onMessageAction,
  onScrollToMessage,
  isRepliedMessage 
}: ChatMessageProps) {
  const { toast } = useToast();
  const isNote = message.content.startsWith("**Nota**");
  const messageRef = useRef<HTMLDivElement>(null);
  const [isForwardDialogOpen, setIsForwardDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (isRepliedMessage && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
      messageRef.current.classList.add('highlight-message');
      setTimeout(() => {
        if (messageRef.current) {
          messageRef.current.classList.remove('highlight-message');
        }
      }, 1200);
    }
  }, [isRepliedMessage]);

  const handleQuoteClick = (messageId: string) => {
    if (onScrollToMessage) {
      onScrollToMessage(messageId);
    }
  };

  const formatMessage = (content: string) => {
    const lines = content.split('\n');
    const formattedLines = lines.map(line => {
      if (line.startsWith('>')) {
        const messageId = message.id;
        return `<div class="text-muted-foreground bg-muted/50 p-2 rounded-md my-1 border-l-2 border-primary cursor-pointer" data-message-id="${messageId}">${line.substring(2)}</div>`;
      }
      return line;
    });
    
    return formattedLines
      .join('<br />')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  useEffect(() => {
    const quotedMessages = document.querySelectorAll('[data-message-id]');
    quotedMessages.forEach(element => {
      element.addEventListener('click', (e) => {
        const messageId = (e.currentTarget as HTMLElement).getAttribute('data-message-id');
        if (messageId) {
          handleQuoteClick(messageId);
        }
      });
    });

    return () => {
      quotedMessages.forEach(element => {
        element.removeEventListener('click', () => {});
      });
    };
  }, [message.content]);

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDropdownOpen(false);
  };

  const handleCloseForwardDialog = () => {
    setIsForwardDialogOpen(false);
    setDropdownOpen(false);
  };

  const handleDelete = (type: 'all' | 'me') => {
    onMessageAction('delete', message.id, type);
    handleCloseDeleteDialog();
  };

  const handleForward = (contactId: string) => {
    onMessageAction('forward', message.id);
    handleCloseForwardDialog();
  };

  return (
    <div
      ref={messageRef}
      className={`flex ${isCurrentUser ? 'justify-end lead-message' : 'justify-start attendant-message'} relative group`}
    >
      {!isCurrentUser && (
        <Avatar className="w-8 h-8 mr-2">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[70%] rounded-lg p-3 relative ${
          isNote 
            ? 'bg-[#fae389]'
            : isCurrentUser
            ? 'bg-[#f6ffed]'
            : 'bg-muted'
        }`}
      >
        <div 
          className="text-sm"
          dangerouslySetInnerHTML={{ 
            __html: formatMessage(
              isNote 
                ? message.content.replace("**Nota**\n", "") 
                : message.content
            )
          }}
        />
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {isCurrentUser && (
            <span className="text-xs opacity-70">
              {message.status === 'read' ? '✓✓' : '✓'}
            </span>
          )}
        </div>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button 
              className={`absolute top-1/2 -translate-y-1/2 ${
                isCurrentUser ? '-left-8' : '-right-8'
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              <MoreVertical className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isCurrentUser ? "start" : "end"}>
            <DropdownMenuItem onClick={() => onMessageAction('reply', message.id)}>
              <Reply className="h-4 w-4 mr-2" />
              Responder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMessageAction('copy', message.id)}>
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsForwardDialogOpen(true)}>
              <Forward className="h-4 w-4 mr-2" />
              Encaminhar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Apagar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isCurrentUser && (
        <Avatar className="w-8 h-8 ml-2">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
      )}

      <ForwardDialog
        isOpen={isForwardDialogOpen}
        onOpenChange={handleCloseForwardDialog}
        onForward={handleForward}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={handleCloseDeleteDialog}
        onDelete={handleDelete}
      />
    </div>
  );
}