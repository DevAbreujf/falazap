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
    <div className="w-80 border-r border-primary/10 bg-card">
      <div className="p-4 border-b border-primary/10">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Buscar contatos..."
            className="w-full pl-9 pr-4 py-2 bg-muted/50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-5rem)]">
        {supportContacts.length > 0 && (
          <div className="p-4 border-b border-primary/10">
            <h2 className="text-sm font-semibold text-primary mb-3">Suporte Pendente</h2>
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

        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Todas as Conversas</h2>
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
      className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
        isSelected ? 'bg-primary/10' : 'hover:bg-muted/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={contact.avatar} />
            <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {contact.status === 'online' && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-medium truncate">{contact.name}</span>
            {contact.lastMessage && (
              <span className="text-xs text-muted-foreground">
                {new Date(contact.lastMessage.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-muted-foreground truncate">
              {contact.lastMessage?.content}
            </span>
            {contact.unreadCount > 0 && (
              <Badge variant="default" className="ml-2">
                {contact.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}