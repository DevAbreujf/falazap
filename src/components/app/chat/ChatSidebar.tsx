import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatContact } from "@/types/chat";
import { Search } from "lucide-react";

interface ChatSidebarProps {
  contacts: ChatContact[];
  selectedContactId?: string;
  onSelectContact: (contact: ChatContact) => void;
}

export function ChatSidebar({ contacts, selectedContactId, onSelectContact }: ChatSidebarProps) {
  const supportContacts = contacts.filter(contact => contact.isSupport);
  const regularContacts = contacts.filter(contact => !contact.isSupport);

  return (
    <div className="w-72 border-r border-primary/10 bg-card">
      <div className="p-3 border-b border-primary/10">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Buscar contatos..."
            className="w-full pl-8 pr-3 py-2 bg-muted/50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-9rem)]">
        {supportContacts.length > 0 && (
          <div className="p-3 border-b border-primary/10">
            <h2 className="text-xs font-semibold text-primary mb-2">Suporte Pendente</h2>
            {supportContacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                isSelected={contact.id === selectedContactId}
                onClick={() => onSelectContact(contact)}
              />
            ))}
          </div>
        )}

        <div className="p-3">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2">Todas as Conversas</h2>
          {regularContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={contact.id === selectedContactId}
              onClick={() => onSelectContact(contact)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function ContactItem({ contact, isSelected, onClick }: { 
  contact: ChatContact; 
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-lg mb-2 transition-colors ${
        isSelected ? 'bg-primary/10' : 'hover:bg-muted/50'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={contact.avatar} />
            <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {contact.status === 'online' && (
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium truncate">{contact.name}</span>
            {contact.lastMessage && (
              <span className="text-[10px] text-muted-foreground">
                {new Date(contact.lastMessage.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
              {contact.funnelName || 'Geral'}
            </Badge>
            {contact.unreadCount > 0 && (
              <Badge variant="default" className="text-[10px] px-1 py-0 h-4">
                {contact.unreadCount}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {contact.lastMessage?.content}
          </p>
        </div>
      </div>
    </button>
  );
}