import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, ArrowLeft } from "lucide-react";
import { ChatContact, ChatMessage } from "@/types/chat";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChatHeaderInfo } from "./ChatHeaderInfo";
import { ChatActions } from "./ChatActions";
import { ChatDetailsSidebar } from "./ChatDetailsSidebar";
import { EmojiPicker } from "@/components/tags/EmojiPicker";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatWindowProps {
  contact: ChatContact;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onUpdateContactStatus?: (contactId: string, isSupport: boolean) => void;
  onEndSupport: () => void;
  onTransferChat: (attendantId: string) => void;
  onChangeDepartment: (departmentId: string) => void;
  currentDepartment: { id: string; name: string };
  currentUser: { id: string; name: string; avatar?: string };
  onMessageAction: (action: 'reply' | 'copy' | 'forward' | 'delete', message: ChatMessage) => void;
  departments: Array<{ id: string; name: string }>;
  onCloseChat: () => void;
}

export function ChatWindow({ 
  contact, 
  messages, 
  onSendMessage,
  onUpdateContactStatus,
  onEndSupport,
  onTransferChat,
  onChangeDepartment,
  currentDepartment,
  currentUser,
  onMessageAction,
  departments,
  onCloseChat
}: ChatWindowProps) {
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [chatMode, setChatMode] = useState<"message" | "notes">("message");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(currentUser.name);
  const [tempEditedName, setTempEditedName] = useState(editedName);
  const [isSignatureEnabled, setIsSignatureEnabled] = useState(false);
  const [isEditingSignature, setIsEditingSignature] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (replyingTo) {
      const replyContent = `> ${replyingTo.content}\n\n${content}`;
      onSendMessage(replyContent);
      setReplyingTo(null);
    } else {
      onSendMessage(content);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "O arquivo é muito grande. O tamanho máximo permitido é 5MB.",
          variant: "destructive",
        });
        return;
      }
      setLastActivityTime(Date.now());
      console.log("File to upload:", file);
    }
  };

  const handleCancelSignature = () => {
    setTempEditedName(editedName);
    setIsEditingSignature(false);
  };

  const handleSaveSignature = () => {
    setEditedName(tempEditedName);
    setIsEditingSignature(false);
    toast({
      title: "Assinatura atualizada",
      description: "Sua assinatura foi atualizada com sucesso.",
    });
  };

  const handleMessageAction = (action: 'reply' | 'copy' | 'forward' | 'delete', messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    if (action === 'reply') {
      setReplyingTo(message);
    } else if (action === 'copy') {
      navigator.clipboard.writeText(message.content);
      toast({
        title: "Mensagem copiada",
        description: "Conteúdo copiado para a área de transferência",
      });
    } else {
      onMessageAction(action, message);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-primary/10 bg-card flex items-center justify-between">
        <ChatHeaderInfo contact={contact} />
        <div className="flex items-center gap-2">
          <ChatActions
            onChangeDepartment={onChangeDepartment}
            onEndSupport={onEndSupport}
            onTransferChat={onTransferChat}
            onSendMessage={onSendMessage}
            attendants={[
              { id: "1", name: "John Doe", departmentId: "1" },
              { id: "2", name: "Jane Smith", departmentId: "2" },
            ]}
            departments={departments}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCloseChat}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Fechar janela de conversa
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fechar chat atual</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="p-4 space-y-4">
          {hoveredDate && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="sticky top-2 z-10 flex justify-center">
                    <span className="bg-muted px-3 py-1 rounded-full text-sm">
                      {new Date(hoveredDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{new Date(hoveredDate).toLocaleDateString('pt-BR')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessageComponent
                key={message.id}
                message={message}
                isCurrentUser={message.senderId === 'me'}
                currentUser={currentUser}
                onMessageAction={handleMessageAction}
                onScrollToMessage={(messageId) => {
                  const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
                  if (messageElement) {
                    messageElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                isRepliedMessage={false}
              />
            ))}
          </div>
        </div>
      </ScrollArea>

      <ChatInput
        onSendMessage={handleSendMessage}
        isSignatureEnabled={isSignatureEnabled}
        setIsSignatureEnabled={setIsSignatureEnabled}
        editedName={editedName}
        setIsEditingSignature={setIsEditingSignature}
        chatMode={chatMode}
        setChatMode={setChatMode}
        setIsEmojiPickerOpen={setIsEmojiPickerOpen}
        handleFileUpload={handleFileUpload}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
      />

      <Dialog open={isEditingSignature} onOpenChange={setIsEditingSignature}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edição de assinatura</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={tempEditedName}
              onChange={(e) => setTempEditedName(e.target.value)}
              placeholder="Digite sua assinatura"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Mantenha vazio se quiser utilizar o nome salvo no seu perfil como assinatura.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelSignature}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSaveSignature}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EmojiPicker
        isOpen={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        onEmojiSelect={(emoji: any) => {
          setIsEmojiPickerOpen(false);
        }}
      />

      {isDetailsSidebarOpen && (
        <ChatDetailsSidebar
          contact={contact}
          isOpen={isDetailsSidebarOpen}
          onClose={() => setIsDetailsSidebarOpen(false)}
          onEditName={(newName) => {
            setEditedName(newName);
            setIsEditingName(true);
          }}
          currentDepartment={currentDepartment}
          currentUser={currentUser}
          isEditingName={isEditingName}
          editedName={editedName}
          onSaveName={() => {
            if (editedName.trim()) {
              toast({
                title: "Nome atualizado",
                description: "O nome do lead foi atualizado com sucesso.",
              });
              setIsEditingName(false);
            }
          }}
          onCancelEdit={() => setIsEditingName(false)}
        />
      )}
    </div>
  );
}