import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatContact } from "@/types/chat";

interface ChatHeaderInfoProps {
  contact: ChatContact;
}

export function ChatHeaderInfo({ contact }: ChatHeaderInfoProps) {
  if (!contact) return null;

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        {contact.avatar ? (
          <AvatarImage src={contact.avatar} alt={contact.name} />
        ) : (
          <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
      <div>
        <h2 className="font-semibold">{contact.name}</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {contact.funnelName || 'Geral'}
          </Badge>
        </div>
      </div>
    </div>
  );
}