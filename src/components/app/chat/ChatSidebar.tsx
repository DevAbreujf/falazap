import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChatContact } from "@/types/chat";
import { MessageSquare, AlertCircle } from "lucide-react";

interface ChatSidebarProps {
  onSelectContact: (contact: ChatContact) => void;
}

export function ChatSidebar({ onSelectContact }: ChatSidebarProps) {
  // Mockup data - replace with real data later
  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "João Silva",
      status: "online",
      unreadCount: 3,
      isSupport: true,
      priority: "high",
      lastMessage: {
        id: "msg1",
        content: "Preciso de ajuda com o produto",
        senderId: "1",
        timestamp: new Date().toISOString(),
        status: "delivered",
        type: "text"
      }
    },
    // ... Add more mock contacts as needed
  ];

  const supportContacts = contacts.filter(contact => contact.isSupport);
  const regularContacts = contacts.filter(contact => !contact.isSupport);

  return (
    <div className="w-80 border-r border-primary/10 bg-[#272733] flex flex-col">
      <div className="p-4 border-b border-primary/10">
        <h2 className="text-lg font-semibold text-primary">Conversas</h2>
      </div>

      <ScrollArea className="flex-1">
        {supportContacts.length > 0 && (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 text-orange-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Suporte Pendente</span>
            </div>
            {supportContacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} onClick={() => onSelectContact(contact)} />
            ))}
          </div>
        )}

        <div className="p-4 space-y-4">
          {regularContacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} onClick={() => onSelectContact(contact)} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function ContactItem({ contact, onClick }: { contact: ChatContact; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors text-left"
    >
      <Avatar className="flex-shrink-0">
        <AvatarImage src={contact.avatar} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {contact.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm text-foreground">{contact.name}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(contact.lastMessage?.timestamp || "").toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <MessageSquare className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground truncate">
            {contact.lastMessage?.content}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {contact.status === "online" && (
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 text-xs">
              Online
            </Badge>
          )}
          {contact.unreadCount > 0 && (
            <Badge className="bg-primary text-xs">{contact.unreadCount}</Badge>
          )}
          {contact.isSupport && (
            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 text-xs">
              Suporte
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}