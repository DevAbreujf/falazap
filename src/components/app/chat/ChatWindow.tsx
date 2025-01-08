import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send } from "lucide-react";
import { ChatContact, ChatMessage } from "@/types/chat";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChatHeaderInfo } from "./ChatHeaderInfo";
import { ChatActions } from "./ChatActions";

interface ChatWindowProps {
  contact: ChatContact;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onUpdateContactStatus?: (contactId: string, isSupport: boolean) => void;
}

export function ChatWindow({ 
  contact, 
  messages, 
  onSendMessage,
  onUpdateContactStatus 
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const { toast } = useToast();

  // Mock data - Em produção, isso viria de uma API
  const mockAttendants = [
    { id: "1", name: "João Silva", departmentId: "1" },
    { id: "2", name: "Maria Santos", departmentId: "1" },
    { id: "3", name: "Pedro Souza", departmentId: "2" },
  ];

  const mockDepartments = [
    { id: "1", name: "Suporte Técnico" },
    { id: "2", name: "Vendas" },
    { id: "3", name: "Financeiro" },
  ];

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
      onSendMessage(newMessage);
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
    if (onUpdateContactStatus) {
      onUpdateContactStatus(contact.id, false);
    }
    toast({
      title: "Atendimento encerrado",
      description: "O atendimento foi finalizado com sucesso.",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 border-b border-primary/10 bg-card flex items-center justify-between">
        <ChatHeaderInfo contact={contact} />
        <ChatActions
          onAddAttendant={(attendantId) => {
            const attendant = mockAttendants.find(a => a.id === attendantId);
            if (attendant) {
              toast({
                title: "Atendente adicionado",
                description: `${attendant.name} foi adicionado ao atendimento.`,
              });
              setLastActivityTime(Date.now());
            }
          }}
          onChangeDepartment={(departmentId) => {
            const department = mockDepartments.find(d => d.id === departmentId);
            if (department) {
              toast({
                title: "Setor alterado",
                description: `Conversa transferida para ${department.name}.`,
              });
              setLastActivityTime(Date.now());
            }
          }}
          onEndSupport={handleEndSupport}
          attendants={mockAttendants}
          departments={mockDepartments}
        />
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === 'me'
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
      </ScrollArea>

      <div className="p-4 border-t border-primary/10 bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="*/*"
            />
            <Paperclip className="h-5 w-5" />
          </Button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite uma mensagem..."
            className="flex-1 bg-muted/50 rounded-md p-2 min-h-[2.5rem] max-h-32 resize-none focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            rows={1}
          />
          <Button onClick={handleSend} size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}