import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatContact, ChatMessage } from "@/types/chat";
import { 
  MoreVertical, 
  Send, 
  Paperclip,
  Archive,
  Edit,
  UserPlus,
  Check,
  CheckCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatWindowProps {
  contact: ChatContact;
}

export function ChatWindow({ contact }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  
  // Mockup messages - replace with real data later
  const messages: ChatMessage[] = [
    {
      id: "1",
      content: "Olá, como posso ajudar?",
      senderId: "agent",
      timestamp: new Date().toISOString(),
      status: "read",
      type: "text"
    },
    {
      id: "2",
      content: "Preciso de suporte com o produto",
      senderId: contact.id,
      timestamp: new Date().toISOString(),
      status: "delivered",
      type: "text"
    }
  ];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Implement send message logic here
    setNewMessage("");
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <header className="px-6 py-4 border-b border-primary/10 bg-[#272733] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={contact.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {contact.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="font-semibold text-foreground">{contact.name}</h2>
            <span className="text-sm text-muted-foreground">
              {contact.status === "online" ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Archive className="w-4 h-4 mr-2" />
                Arquivar conversa
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Editar contato
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus className="w-4 h-4 mr-2" />
                Adicionar ao grupo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === "agent" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === "agent"
                    ? "bg-[#434358] text-white"
                    : "bg-[#333340] text-white"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.senderId === "agent" && (
                    <span className="text-xs text-muted-foreground">
                      {message.status === "sent" && <Check className="w-3 h-3" />}
                      {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
                      {message.status === "read" && (
                        <CheckCheck className="w-3 h-3 text-blue-400" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="px-6 py-4 border-t border-primary/10 bg-[#272733]">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-background/50"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          
          <Button 
            size="icon"
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}