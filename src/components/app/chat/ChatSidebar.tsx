import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatContact } from "@/types/chat";
import { Search, Building2, MessageSquare, Users, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mockDepartments = [
  { id: "1", name: "Suporte Técnico" },
  { id: "2", name: "Vendas" },
  { id: "3", name: "Financeiro" },
];

interface ChatSidebarProps {
  contacts: ChatContact[];
  selectedContactId?: string;
  onSelectContact: (contact: ChatContact) => void;
  onDepartmentChange: (departmentId: string) => void;
  currentDepartment: typeof mockDepartments[0];
}

export function ChatSidebar({ 
  contacts, 
  selectedContactId, 
  onSelectContact, 
  onDepartmentChange, 
  currentDepartment 
}: ChatSidebarProps) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showTeamChat, setShowTeamChat] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<'incoming' | 'waiting' | 'finished'>('incoming');
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    switch (currentFilter) {
      case 'incoming':
        return matchesSearch && contact.status === 'new';
      case 'waiting':
        return matchesSearch && contact.status === 'waiting';
      case 'finished':
        return matchesSearch && contact.status === 'finished';
      default:
        return matchesSearch;
    }
  });

  const unreadCounts = {
    incoming: contacts.filter(c => c.status === 'new' && c.unreadCount > 0).length,
    waiting: contacts.filter(c => c.status === 'waiting' && c.unreadCount > 0).length,
    finished: contacts.filter(c => c.status === 'finished' && c.unreadCount > 0).length,
  };

  const handleDepartmentChange = (department: typeof mockDepartments[0]) => {
    onDepartmentChange(department.id);
    setIsDialogOpen(false);
    toast({
      title: "Setor alterado",
      description: `Alterado para o setor ${department.name}`,
    });
  };

  return (
    <div className="w-80 border-r border-primary/10 bg-card">
      <div className="flex items-center justify-start gap-2 p-4 border-b border-primary/10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voltar para o dashboard</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${!showTeamChat ? 'bg-primary/10' : ''}`}
                onClick={() => setShowTeamChat(false)}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Conversas com os clientes</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${showTeamChat ? 'bg-primary/10' : ''}`}
                onClick={() => setShowTeamChat(true)}
              >
                <Users className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Conversas com a equipe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {!showTeamChat ? (
        <>
          <div className="p-3 border-b border-primary/10">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar leads..."
                className="w-full pl-8 pr-3 py-2 bg-muted/50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-7 w-7"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <h4 className="font-medium">Filtrar por:</h4>
                    <Button variant="outline" className="w-full justify-start">
                      Etiqueta
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Atendente
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Data
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => setIsDialogOpen(true)}
              >
                <Building2 className="h-4 w-4" />
                Setores
              </Button>
              <Badge variant="outline" className="shrink-0">
                {currentDepartment.name}
              </Badge>
            </div>
          </div>

          <div className="flex gap-1 p-2">
            <Button
              variant={currentFilter === 'incoming' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1 relative"
              onClick={() => setCurrentFilter('incoming')}
            >
              Entrada
              {unreadCounts.incoming > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {unreadCounts.incoming}
                </Badge>
              )}
            </Button>
            <Button
              variant={currentFilter === 'waiting' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1 relative"
              onClick={() => setCurrentFilter('waiting')}
            >
              Andamento
              {unreadCounts.waiting > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {unreadCounts.waiting}
                </Badge>
              )}
            </Button>
            <Button
              variant={currentFilter === 'finished' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1 relative"
              onClick={() => setCurrentFilter('finished')}
            >
              Finalizados
              {unreadCounts.finished > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {unreadCounts.finished}
                </Badge>
              )}
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-3">
              {filteredContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  isSelected={contact.id === selectedContactId}
                  onClick={() => onSelectContact(contact)}
                />
              ))}
            </div>
          </ScrollArea>
        </>
      ) : (
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-3">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar atendentes..."
                className="w-full pl-8 pr-3 py-2 bg-muted/50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <h2 className="text-xs font-semibold text-muted-foreground mb-2">Equipe</h2>
            <div className="text-sm text-muted-foreground p-4 text-center">
              Lista de atendentes será implementada aqui
            </div>
          </div>
        </ScrollArea>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar Setor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {mockDepartments.map((dept) => (
              <Button
                key={dept.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleDepartmentChange(dept)}
              >
                {dept.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
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
