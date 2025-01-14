import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatContact } from "@/types/chat";
import { Edit2, Tag, X, MessageSquare, Download, Bot, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ChatDetailsSidebarProps {
  contact: ChatContact;
  isOpen: boolean;
  onClose: () => void;
  onEditName: (newName: string) => void;
  currentDepartment: { id: string; name: string };
  currentUser: { id: string; name: string; avatar?: string };
  isEditingName: boolean;
  editedName: string;
  onSaveName: () => void;
  onCancelEdit: () => void;
}

export function ChatDetailsSidebar({
  contact,
  isOpen,
  onClose,
  onEditName,
  currentDepartment,
  currentUser,
  isEditingName,
  editedName,
  onSaveName,
  onCancelEdit,
}: ChatDetailsSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute right-0 top-0 h-full w-96 bg-background shadow-lg">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Detalhes da conversa</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            {/* Contact Info */}
            <div className="mb-6 text-center">
              <Avatar className="mx-auto h-20 w-20">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {isEditingName ? (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Número</label>
                    <input
                      type="text"
                      value="+55 11 99999-9999"
                      disabled
                      className="w-full rounded-md border bg-muted px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => onEditName(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={onCancelEdit} className="flex-1">
                      Cancelar
                    </Button>
                    <Button onClick={onSaveName} className="flex-1">
                      Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-center gap-2">
                  <h3 className="text-lg font-medium">{contact.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditName(contact.name)}
                    className="h-6 w-6"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-medium">Etiquetas da conversa</h4>
              <Button variant="outline" className="w-full">
                <Tag className="mr-2 h-4 w-4" />
                Adicionar etiquetas
              </Button>
            </div>

            {/* Department */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-medium">Setor</h4>
              <Badge variant="outline">{currentDepartment.name}</Badge>
            </div>

            {/* Attendants */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-medium">Atendentes</h4>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">está atendendo</p>
                </div>
              </div>
            </div>

            {/* Viewers */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-medium">Quem está vendo</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{currentUser.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Creation Date */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-medium">Data de criação</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-muted-foreground">
                      {new Date(contact.lastMessage?.timestamp || new Date()).toLocaleString('pt-BR')}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      <p>Data: {new Date(contact.lastMessage?.timestamp || new Date()).toLocaleDateString('pt-BR')}</p>
                      <p>
                        Tempo no sistema:{' '}
                        {formatDistanceToNow(new Date(contact.lastMessage?.timestamp || new Date()), { locale: ptBR, addSuffix: true })}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Additional Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Todas as conversas deste contato
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Baixar esta conversa
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bot className="mr-2 h-4 w-4" />
                Chatbots executados nesta conversa
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Logs de atividade desta conversa
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
