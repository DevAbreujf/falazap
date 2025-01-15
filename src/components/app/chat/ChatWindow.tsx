import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send, Info, MessageSquare, StickyNote, SmilePlus, Bot, Plus, Edit, X, ArrowDown } from "lucide-react";
import { ChatContact, ChatMessage } from "@/types/chat";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChatHeaderInfo } from "./ChatHeaderInfo";
import { ChatActions } from "./ChatActions";
import { ChatDetailsSidebar } from "./ChatDetailsSidebar";
import { EmojiPicker } from "@/components/tags/EmojiPicker";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockAttendants = [
  { id: "1", name: "John Doe", departmentId: "1" },
  { id: "2", name: "Jane Smith", departmentId: "2" },
];

const mockDepartments = [
  { id: "1", name: "Support" },
  { id: "2", name: "Sales" },
];

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
  currentUser
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [chatMode, setChatMode] = useState<"message" | "notes">("message");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(currentUser.name);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isSignatureEnabled, setIsSignatureEnabled] = useState(false);
  const [isEditingSignature, setIsEditingSignature] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [autoScroll, setAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const inactivityTimer = setInterval(() => {
      const inactiveTime = Date.now() - lastActivityTime;
      if (inactiveTime >= 15 * 60 * 1000) {
        handleEndSupport();
      }
    }, 60000);

    return () => clearInterval(inactivityTimer);
  }, [lastActivityTime]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setAutoScroll(true);
    setShowScrollButton(false);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    setAutoScroll(isNearBottom);
    setShowScrollButton(!isNearBottom);
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const messageContent = chatMode === "notes" 
        ? `**Nota**\n${newMessage}`
        : isSignatureEnabled 
          ? `${editedName}:\n${newMessage}`
          : newMessage;
          
      onSendMessage(messageContent);
      setNewMessage("");
      setLastActivityTime(Date.now());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage(prev => prev + emoji.native);
    setIsEmojiPickerOpen(false);
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

  const formatMessage = (content: string) => {
    return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
  };

  const handleEndSupport = () => {
    const endMessage = "**Sistema:**\nAtendimento encerrado. Obrigado por utilizar nosso suporte!";
    onSendMessage(endMessage);
    
    if (onUpdateContactStatus && contact.isSupport) {
      onUpdateContactStatus(contact.id, false);
    }
    
    toast({
      title: "Atendimento encerrado",
      description: "O atendimento foi finalizado com sucesso.",
    });
  };

  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Hoje';
    if (date.toDateString() === yesterday.toDateString()) return 'Ontem';

    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return weekdays[date.getDay()];
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const handleSaveName = () => {
    if (editedName.trim()) {
      toast({
        title: "Nome atualizado",
        description: "O nome do lead foi atualizado com sucesso.",
      });
      setIsEditingName(false);
    }
  };

  const handleSaveSignature = () => {
    setIsEditingSignature(false);
    toast({
      title: "Assinatura atualizada",
      description: "Sua assinatura foi atualizada com sucesso.",
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-primary/10 bg-card flex items-center justify-between">
        <ChatHeaderInfo contact={contact} />
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDetailsSidebarOpen(true)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Detalhes da conversa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ChatActions
            onChangeDepartment={onChangeDepartment}
            onEndSupport={onEndSupport}
            onTransferChat={onTransferChat}
            attendants={mockAttendants}
            departments={mockDepartments}
          />
        </div>
      </div>

      <ScrollArea 
        className="flex-1 relative"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div className="p-4 space-y-4">
          {hoveredDate && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="sticky top-2 z-10 flex justify-center">
                    <span className="bg-muted px-3 py-1 rounded-full text-sm">
                      {formatMessageDate(hoveredDate)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{formatFullDate(hoveredDate)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="space-y-4">
            {messages.map((message) => {
              const isNote = message.content.startsWith("**Nota**");
              return (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  onMouseEnter={() => setHoveredDate(new Date(message.timestamp))}
                >
                  {message.senderId === 'me' && (
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      isNote 
                        ? 'bg-[#fae389]'
                        : message.senderId === 'me'
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
                      {message.senderId === 'me' && (
                        <span className="text-xs opacity-70">
                          {message.status === 'read' ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {showScrollButton && (
          <Button
            className="fixed bottom-24 right-8 rounded-full p-2 shadow-lg"
            onClick={scrollToBottom}
            size="icon"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-primary/10 bg-card space-y-4">
        <div className="flex items-center justify-between border-b border-primary/10 pb-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isSignatureEnabled}
              onCheckedChange={setIsSignatureEnabled}
            />
            <span className="text-sm">
              {isSignatureEnabled ? (
                <button 
                  onClick={() => setIsEditingSignature(true)}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  {editedName}
                  <Edit className="h-4 w-4" />
                </button>
              ) : (
                "Assinar"
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={chatMode === "message" ? "default" : "ghost"}
              size="sm"
              onClick={() => setChatMode("message")}
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Mensagem
            </Button>
            <Button
              variant={chatMode === "notes" ? "default" : "ghost"}
              size="sm"
              onClick={() => setChatMode("notes")}
              className="gap-2"
            >
              <StickyNote className="h-4 w-4" />
              Notas
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={chatMode === "notes" ? "Digite uma nota..." : "Digite uma mensagem..."}
            className={`flex-1 bg-muted/50 rounded-md p-2 min-h-[100px] max-h-[200px] resize-y focus:outline-none focus:ring-1 focus:ring-primary text-sm ${
              chatMode === "notes" ? "border-[#fae389]" : ""
            }`}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="*/*"
                      />
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Anexar arquivo</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsEmojiPickerOpen(true)}
                    >
                      <SmilePlus className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Inserir emoji</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bot className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={() => console.log("Selected Funnel 1")}>
                    Funil de Vendas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log("Selected Funnel 2")}>
                    Funil de Suporte
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button onClick={handleSend} size="icon" disabled={!newMessage.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isEditingSignature} onOpenChange={setIsEditingSignature}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edição de assinatura</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Digite sua assinatura"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Mantenha vazio se quiser utilizar o nome salvo no seu perfil como assinatura.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingSignature(false)}>
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
        onEmojiSelect={handleEmojiSelect}
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
          onSaveName={handleSaveName}
          onCancelEdit={() => setIsEditingName(false)}
        />
      )}
    </div>
  );
}
