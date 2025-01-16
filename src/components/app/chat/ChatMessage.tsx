import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Reply, Copy, Forward, Trash2, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";

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
  const messageRef = useRef<HTMLDivElement>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (type: 'all' | 'me') => {
    onMessageAction('delete', message.id, type);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
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
            isCurrentUser ? 'bg-[#f6ffed]' : 'bg-muted'
          }`}
        >
          <div className="text-sm">
            {message.content}
          </div>
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
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja apagar?</AlertDialogTitle>
            <AlertDialogDescription>
              Escolha como você deseja apagar esta mensagem
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <div className="flex gap-2 w-full">
              <AlertDialogAction 
                className="w-full" 
                onClick={() => handleDelete('all')}
              >
                Apagar para todos
              </AlertDialogAction>
              <AlertDialogAction 
                className="w-full" 
                onClick={() => handleDelete('me')}
              >
                Apagar para mim
              </AlertDialogAction>
            </div>
            <AlertDialogCancel className="w-full mt-2">
              Cancelar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
