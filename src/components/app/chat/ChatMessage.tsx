import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Reply, Copy, Forward, Trash2, Check, CheckCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
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
        return `<div class="text-muted-foreground bg-muted/50 p-2 rounded-md my-1 border-l-2 border-primary cursor-pointer hover:bg-muted/70 transition-colors" data-message-id="${messageId}">${line.substring(2)}</div>`;
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

  return (
    <div
      ref={messageRef}
      className={`flex ${isCurrentUser ? 'justify-end lead-message' : 'justify-start attendant-message'} relative group animate-fade-up`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 relative ${
          isNote 
            ? 'bg-[#fae389]/10 border border-[#fae389]/20'
            : isCurrentUser
            ? 'bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm hover:shadow-md'
            : 'bg-gradient-to-br from-muted/80 to-muted/50 shadow-sm hover:shadow-md'
        } transition-all duration-200`}
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
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {isCurrentUser && (
            <span className="text-xs text-primary/70">
              {message.status === 'read' ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
            </span>
          )}
        </div>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button 
              className={`absolute top-1/2 -translate-y-1/2 ${
                isCurrentUser ? '-left-8' : '-right-8'
              } opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted/80 p-1 rounded-full`}
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isCurrentUser ? "start" : "end"}>
            <DropdownMenuItem onClick={() => onMessageAction('reply', message.id)} className="gap-2">
              <Reply className="h-4 w-4" />
              Responder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMessageAction('copy', message.id)} className="gap-2">
              <Copy className="h-4 w-4" />
              Copiar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMessageAction('forward', message.id)} className="gap-2">
              <Forward className="h-4 w-4" />
              Encaminhar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onMessageAction('delete', message.id)} 
              className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Apagar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isCurrentUser && (
        <Avatar className="w-8 h-8 ml-2 border-2 border-primary/10 transition-all duration-200 group-hover:border-primary/20">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback className="bg-primary/5 text-primary">
            {currentUser.name[0]}
          </AvatarFallback>
        </Avatar>
      )}

      <ForwardDialog
        isOpen={isForwardDialogOpen}
        onOpenChange={() => setIsForwardDialogOpen(false)}
        onForward={(contactId) => onMessageAction('forward', message.id)}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(false)}
        onDelete={(type) => onMessageAction('delete', message.id, type)}
      />
    </div>
  );
}
