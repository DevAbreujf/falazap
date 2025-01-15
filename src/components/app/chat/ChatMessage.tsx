import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Reply, Copy, Forward, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ChatMessageProps {
  message: ChatMessageType;
  isCurrentUser: boolean;
  currentUser: { name: string; avatar?: string };
  onMessageAction: (action: 'reply' | 'copy' | 'forward' | 'delete', messageId: string) => void;
}

export function ChatMessage({ message, isCurrentUser, currentUser, onMessageAction }: ChatMessageProps) {
  const { toast } = useToast();
  const isNote = message.content.startsWith("**Nota**");

  const formatMessage = (content: string) => {
    return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
  };

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} relative group`}
    >
      {isCurrentUser && (
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
        <p 
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
        <DropdownMenu>
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
            <DropdownMenuItem onClick={() => onMessageAction('forward', message.id)}>
              <Forward className="h-4 w-4 mr-2" />
              Encaminhar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onMessageAction('delete', message.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Apagar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isCurrentUser && (
        <Avatar className="w-8 h-8 ml-2">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}