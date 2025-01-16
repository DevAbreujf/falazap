import { ChatContact, Department } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  contacts: ChatContact[];
  selectedContactId?: string;
  onSelectContact: (contact: ChatContact) => void;
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
  const truncateMessage = (message: string) => {
    if (!message) return "";
    return message.length > 50 ? `${message.substring(0, 50)}...` : message;
  };

  return (
    <div className="w-96 border-r border-border bg-card">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Conversas</h2>
      </div>

      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4 space-y-2">
          {contacts.map((contact) => (
            <Button
              key={contact.id}
              variant="ghost"
              className={cn(
                "w-full justify-start px-2",
                selectedContactId === contact.id && "bg-accent"
              )}
              onClick={() => onSelectContact(contact)}
            >
              <div className="flex items-start gap-3 w-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>
                    {contact.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{contact.name}</span>
                    {contact.unreadCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {contact.lastMessage ? truncateMessage(contact.lastMessage.content) : ""}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}