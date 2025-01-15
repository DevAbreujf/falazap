import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Reply, Copy, Forward, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Search, Plus, Upload } from "lucide-react";

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
  const [isAddContactMode, setIsAddContactMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newContact, setNewContact] = useState({ name: "", phone: "", avatar: null as File | null });

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
        // Extract message ID from the quoted text if available
        const messageId = message.id;
        return `<div class="text-muted-foreground bg-muted/50 p-2 rounded-md my-1 border-l-2 border-primary cursor-pointer" data-message-id="${messageId}">${line.substring(2)}</div>`;
      }
      return line;
    });
    
    return formattedLines
      .join('<br />')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewContact(prev => ({ ...prev, avatar: file }));
    }
  };

  useEffect(() => {
    // Add click event listener to quoted messages
    const quotedMessages = document.querySelectorAll('[data-message-id]');
    quotedMessages.forEach(element => {
      element.addEventListener('click', (e) => {
        const messageId = (e.currentTarget as HTMLElement).getAttribute('data-message-id');
        if (messageId) {
          handleQuoteClick(messageId);
        }
      });
    });

    // Cleanup
    return () => {
      quotedMessages.forEach(element => {
        element.removeEventListener('click', () => {});
      });
    };
  }, [message.content]);

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
            <DropdownMenuItem onClick={() => setIsForwardDialogOpen(true)}>
              <Forward className="h-4 w-4 mr-2" />
              Encaminhar
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Apagar
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => onMessageAction('delete', message.id, 'all')}>
                  Apagar para todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMessageAction('delete', message.id, 'me')}>
                  Apagar para mim
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isCurrentUser && (
        <Avatar className="w-8 h-8 ml-2">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
      )}

      <Dialog open={isForwardDialogOpen} onOpenChange={setIsForwardDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isAddContactMode ? "Novo Contato" : "Lista de Contatos"}
            </DialogTitle>
          </DialogHeader>
          
          {isAddContactMode ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={newContact.avatar ? URL.createObjectURL(newContact.avatar) : undefined} />
                    <AvatarFallback>
                      <Upload className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddContactMode(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => {
                  // Handle save contact logic here
                  setIsAddContactMode(false);
                  toast({
                    title: "Contato salvo",
                    description: "O contato foi salvo com sucesso.",
                  });
                }}>
                  Salvar
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou número"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button size="icon" onClick={() => setIsAddContactMode(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="h-[300px] overflow-y-auto">
                {/* Contact list would go here */}
                <div className="text-center text-sm text-muted-foreground pt-8">
                  Nenhum contato encontrado
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}