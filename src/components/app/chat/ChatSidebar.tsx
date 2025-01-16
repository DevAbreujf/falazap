import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  contacts: Contact[];
  selectedContactId: string | undefined;
  onSelectContact: (contact: Contact) => void;
  onDepartmentChange: (departmentId: string) => void;
  currentDepartment: Department;
}

export function ChatSidebar({
  contacts,
  selectedContactId,
  onSelectContact,
  onDepartmentChange,
  currentDepartment,
}: ChatSidebarProps) {
  const filteredContacts = contacts.filter(contact => contact.departmentId === currentDepartment.id);

  return (
    <aside className="w-96 border-r border-border bg-card flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Contatos</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={cn(
                "w-full text-left p-4 rounded-lg transition-colors",
                "hover:bg-accent group",
                selectedContactId === contact.id && "bg-accent"
              )}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {contact.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">
                      {contact.name}
                    </p>
                    {contact.unreadCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {contact.lastMessage?.content.substring(0, 50)}
                    {contact.lastMessage?.content.length > 50 ? '...' : ''}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
