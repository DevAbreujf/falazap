
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatContact } from "@/types/chat";
import { Clock, MessageSquare, Tag } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChatHeaderInfoProps {
  contact: ChatContact;
}

export function ChatHeaderInfo({ contact }: ChatHeaderInfoProps) {
  const availableTags = [
    { id: "1", name: "Cliente VIP" },
    { id: "2", name: "Interessado" },
    { id: "3", name: "Em negociação" },
    { id: "4", name: "Aguardando retorno" },
  ];

  const handleAddTag = (tagName: string) => {
    // Here you would implement the actual tag addition logic
    toast.success(`Tag "${tagName}" adicionada com sucesso`);
  };

  return (
    <div className="flex items-center gap-3 group">
      <div className="relative">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar className="h-10 w-10 border-2 border-primary/10 transition-all duration-200 group-hover:border-primary/20 cursor-pointer">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback className="bg-primary/5 text-primary">
                {contact.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">{contact.name}</h4>
                <Badge 
                  variant="outline" 
                  className="bg-primary/5 text-xs"
                >
                  {contact.status}
                </Badge>
              </div>
              {contact.responseTime && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Tempo médio de resposta: {contact.responseTime}min</span>
                </div>
              )}
              {contact.tags && contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {contact.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              {contact.lastSeen && (
                <p className="text-xs text-muted-foreground mt-2">
                  Último acesso: {new Date(contact.lastSeen).toLocaleString()}
                </p>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
        {contact.status === 'online' && (
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background animate-pulse" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">{contact.name}</h2>
          <div className="flex items-center gap-2">
            {contact.responseTime && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{contact.responseTime}min</span>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-primary/5"
                >
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {availableTags.map((tag) => (
                  <DropdownMenuItem
                    key={tag.id}
                    onClick={() => handleAddTag(tag.name)}
                    className="cursor-pointer"
                  >
                    {tag.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className="text-xs bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            {contact.funnelName || 'Geral'}
          </Badge>
          {contact.tags && contact.tags.length > 0 && (
            <div className="flex items-center gap-1">
              {contact.tags.slice(0, 2).map((tag) => (
                <Badge 
                  key={tag}
                  variant="outline" 
                  className="text-xs bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {contact.tags.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{contact.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
