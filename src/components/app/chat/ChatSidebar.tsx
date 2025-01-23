import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChatContact, Department } from "@/types/chat";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, CheckCircle2, Search } from "lucide-react";

interface ChatSidebarProps {
  contacts: ChatContact[];
  selectedContactId?: string;
  onSelectContact: (contact: ChatContact) => void;
  onDepartmentChange: (departmentId: string) => void;
  currentDepartment?: Department;
  departments: Department[];
  onCreateDepartment: () => void;
}

export function ChatSidebar({ 
  contacts, 
  selectedContactId, 
  onSelectContact, 
  onDepartmentChange, 
  currentDepartment,
  departments,
  onCreateDepartment
}: ChatSidebarProps) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showTeamChat, setShowTeamChat] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<'incoming' | 'waiting' | 'finished'>('incoming');
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");

  return (
    <div className="w-96 border-r border-primary/10 bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-start gap-2 p-4 border-b border-primary/10 bg-card/50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="hover:bg-primary/10 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voltar para o dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <SidebarHeader>
        <div className="p-4">
          <h1 className="text-lg font-semibold">Contatos</h1>
          <div className="mt-3">
            <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="w-full">
              Selecionar Setor
            </Button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            {contacts.map(contact => (
              <div key={contact.id} onClick={() => onSelectContact(contact)} className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedContactId === contact.id ? 'bg-primary/10' : ''}`}>
                <span className="font-medium">{contact.name}</span>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Selecionar Setor</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar setor..."
                value={departmentSearchTerm}
                onChange={(e) => setDepartmentSearchTerm(e.target.value)}
                className="pl-9"
                disabled={departments.length === 0}
              />
            </div>

            <ScrollArea className="h-[300px] pr-4">
              {departments.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <Building2 className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h3 className="font-medium">Nenhum setor cadastrado</h3>
                    <p className="text-sm text-muted-foreground">
                      Você precisa criar um setor antes de continuar
                    </p>
                  </div>
                  <Button onClick={onCreateDepartment}>
                    Criar Setor
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => onDepartmentChange(dept.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${currentDepartment?.id === dept.id ? 'bg-primary/10 ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{dept.name}</p>
                          {dept.description && (
                            <p className="text-sm text-muted-foreground">{dept.description}</p>
                          )}
                        </div>
                      </div>
                      {currentDepartment?.id === dept.id && (
                        <CheckCircle2 className="h-5 w-5 text-primary animate-scale-in" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
