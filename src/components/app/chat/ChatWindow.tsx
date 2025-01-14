import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send, Info, MessageSquare, StickyNote, SmilePlus, Bot, Plus } from "lucide-react";
import { ChatContact, ChatMessage } from "@/types/chat";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChatHeaderInfo } from "./ChatHeaderInfo";
import { ChatActions } from "./ChatActions";
import { ChatDetailsSidebar } from "./ChatDetailsSidebar";
import { EmojiPicker } from "@/components/tags/EmojiPicker";
import { useNavigate } from "react-router-dom";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data for attendants and departments
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
  const [editedName, setEditedName] = useState(contact.name);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const inactivityTimer = setInterval(() => {
      const inactiveTime = Date.now() - lastActivityTime;
      if (inactiveTime >= 15 * 60 * 1000) { // 15 minutes
        handleEndSupport();
      }
    }, 60000); // Check every minute

    return () => clearInterval(inactivityTimer);
  }, [lastActivityTime]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const messagePrefix = chatMode === "notes" ? "" : "";
      onSendMessage(messagePrefix + newMessage);
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

      <ScrollArea className="flex-1">
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
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                onMouseEnter={() => setHoveredDate(new Date(message.timestamp))}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.type === 'note' 
                      ? 'bg-[#fae389]'
                      : message.senderId === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p 
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
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
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-primary/10 bg-card space-y-4">
        <div className="flex items-center gap-2 border-b border-primary/10 pb-2">
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
                  {/* Mock funnel data - replace with actual funnels */}
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

      <EmojiPicker
        isOpen={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        onEmojiSelect={handleEmojiSelect}
      />

      <Dialog open={isTagModalOpen} onOpenChange={setIsTagModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Etiquetas</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Button 
              onClick={() => navigate('/tags')} 
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Criar nova etiqueta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
