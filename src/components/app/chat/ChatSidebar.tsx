import { ChatContact, Department } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const getLastMessage = (contact: ChatContact) => {
    if (!contact.lastMessage) return '';
    const content = contact.lastMessage.content;
    return content.length > 40 ? `${content.substring(0, 40)}...` : content;
  };

  return (
    <div className="w-96 border-r border-border bg-background">
      <div className="p-4 border-b">
        <Select value={currentDepartment.id} onValueChange={onDepartmentChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Suporte Técnico</SelectItem>
            <SelectItem value="2">Vendas</SelectItem>
            <SelectItem value="3">Financeiro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-2">
          {contacts.map((contact) => (
            <Button
              key={contact.id}
              variant="ghost"
              className={`w-full justify-start px-2 py-6 ${
                selectedContactId === contact.id ? 'bg-muted' : ''
              }`}
              onClick={() => onSelectContact(contact)}
            >
              <div className="flex items-start gap-3 w-full">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start gap-1 w-full min-w-0">
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-medium truncate">{contact.name}</span>
                    {contact.unreadCount > 0 && (
                      <Badge variant="default" className="ml-auto">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground truncate w-full">
                    {getLastMessage(contact)}
                  </span>
                  {contact.funnelName && (
                    <Badge variant="outline" className="mt-1">
                      {contact.funnelName}
                    </Badge>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}