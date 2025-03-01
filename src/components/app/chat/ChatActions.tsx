import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, XOctagon, Search, User, CheckCircle, Circle, X, ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
interface ChatActionsProps {
  onEndSupport: () => void;
  onTransferChat: (attendantId: string) => void;
  onChangeDepartment: (departmentId: string) => void;
  attendants: Array<{
    id: string;
    name: string;
    departmentId: string;
    avatar?: string;
    isOnline?: boolean;
  }>;
  departments: Array<{
    id: string;
    name: string;
  }>;
  onSendMessage?: (content: string) => void;
}
export function ChatActions({
  onEndSupport,
  onTransferChat,
  onChangeDepartment,
  attendants,
  departments,
  onSendMessage
}: ChatActionsProps) {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDepartmentTerm, setSearchDepartmentTerm] = useState("");
  const [selectedAttendant, setSelectedAttendant] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isEditMessageOpen, setIsEditMessageOpen] = useState(false);
  const [isEndSupportOpen, setIsEndSupportOpen] = useState(false);
  const [endMessage, setEndMessage] = useState("Atendimento finalizado");
  const {
    toast
  } = useToast();
  const sortedAttendants = [...attendants].sort((a, b) => {
    if (a.isOnline === b.isOnline) return 0;
    return a.isOnline ? -1 : 1;
  });
  const filteredAttendants = sortedAttendants.filter(attendant => attendant.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredDepartments = departments.filter(department => department.name.toLowerCase().includes(searchDepartmentTerm.toLowerCase()));
  const handleTransfer = () => {
    if (selectedAttendant) {
      onTransferChat(selectedAttendant);
      setIsTransferOpen(false);
      setSelectedAttendant(null);
      setSearchTerm("");
    }
  };
  const handleDepartmentTransfer = () => {
    if (selectedDepartment) {
      onChangeDepartment(selectedDepartment);
      setIsDepartmentOpen(false);
      setSelectedDepartment(null);
      setSearchDepartmentTerm("");
    }
  };
  const handleEndSupport = async () => {
    try {
      if (onSendMessage) {
        await onSendMessage(endMessage);
      }
      await onEndSupport();
      setIsEndSupportOpen(false);
      toast({
        title: "Atendimento finalizado",
        description: "O atendimento foi encerrado com sucesso."
      });
    } catch (error) {
      console.error('Error ending support:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao finalizar o atendimento.",
        variant: "destructive"
      });
    }
  };
  const handleSaveEndMessage = () => {
    setIsEditMessageOpen(false);
    toast({
      title: "Mensagem atualizada",
      description: "A mensagem de finalização foi atualizada com sucesso."
    });
  };
  return <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="sm" onClick={() => setIsTransferOpen(true)} className="bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 border border-primary/20 text-primary hover:text-primary/80 shadow-sm">
              <ArrowRight className="h-4 w-4 mr-2" />
              Transferir conversa
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Transferir conversa para outro atendente</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="sm" onClick={() => setIsDepartmentOpen(true)} className="bg-gradient-to-r from-primary/10 to-transparent hover:from-primary/20 hover:to-primary/5 transition-all duration-300 border border-primary/20 text-primary hover:text-primary/80 shadow-sm group flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              Outro setor
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enviar para outro setor</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="relative group hover:bg-destructive/10 hover:text-destructive transition-all duration-300 border border-destructive/20" onClick={() => setIsEndSupportOpen(true)}>
              <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <XOctagon className="h-4 w-4 text-destructive group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-background rounded-full cursor-pointer hover:bg-muted/80 flex items-center justify-center border border-destructive/20" onClick={e => {
              e.stopPropagation();
              setIsEditMessageOpen(true);
            }}>
                <div className="h-1 w-1 rounded-full bg-destructive/50" />
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Finalizar atendimento</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Sheet open={isTransferOpen} onOpenChange={open => {
      setIsTransferOpen(open);
      if (!open) {
        setSelectedAttendant(null);
        setSearchTerm("");
      }
    }}>
        <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
          <SheetHeader className="mb-6 border-b pb-4">
            <SheetTitle className="text-xl font-semibold">Transferir conversa</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar atendente" className="pl-9 bg-muted/50" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>

            <div className="space-y-2 flex-1">
              {filteredAttendants.length === 0 ? <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-muted/50">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Nenhum atendente encontrado</span>
                </div> : <div className="grid gap-2">
                  {filteredAttendants.map(attendant => <div key={attendant.id} className={cn("flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200", "hover:bg-muted/80", selectedAttendant === attendant.id ? "bg-muted ring-2 ring-primary ring-offset-2" : "bg-muted/50")} onClick={() => setSelectedAttendant(attendant.id)}>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10 border-2 border-background">
                            {attendant.avatar ? <AvatarImage src={attendant.avatar} alt={attendant.name} /> : <AvatarFallback className="bg-primary/10">
                                <User className="h-5 w-5 text-primary" />
                              </AvatarFallback>}
                          </Avatar>
                          <div className={cn("absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-background", attendant.isOnline ? "bg-green-500" : "bg-gray-300")} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{attendant.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {attendant.isOnline ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>
                      {selectedAttendant === attendant.id && <CheckCircle className="h-5 w-5 text-primary" />}
                    </div>)}
                </div>}
            </div>
          </div>

          <div className="pt-6 border-t mt-auto">
            <Button size="lg" disabled={!selectedAttendant} onClick={handleTransfer} className="w-full bg-emerald-400 hover:bg-emerald-300">
              Transferir conversa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isDepartmentOpen} onOpenChange={open => {
      setIsDepartmentOpen(open);
      if (!open) {
        setSelectedDepartment(null);
        setSearchDepartmentTerm("");
      }
    }}>
        <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
          <SheetHeader className="mb-6 border-b pb-4">
            <SheetTitle className="text-xl font-semibold">Enviar para outro setor</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar setor" className="pl-9 bg-muted/50" value={searchDepartmentTerm} onChange={e => setSearchDepartmentTerm(e.target.value)} />
            </div>

            <div className="space-y-2 flex-1">
              {filteredDepartments.length === 0 ? <div className="flex items-center justify-center p-4 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Nenhum setor encontrado</span>
                </div> : <div className="grid gap-2">
                  {filteredDepartments.map(department => <div key={department.id} className={cn("flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200", "hover:bg-muted/80", selectedDepartment === department.id ? "bg-muted ring-2 ring-primary ring-offset-2" : "bg-muted/50")} onClick={() => setSelectedDepartment(department.id)}>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{department.name}</span>
                      </div>
                      {selectedDepartment === department.id && <CheckCircle className="h-5 w-5 text-primary" />}
                    </div>)}
                </div>}
            </div>
          </div>

          <div className="pt-6 border-t mt-auto">
            <Button size="lg" disabled={!selectedDepartment} onClick={handleDepartmentTransfer} className="w-full bg-emerald-400 hover:bg-emerald-300">
              Transferir para setor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isEditMessageOpen} onOpenChange={setIsEditMessageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Mensagem de Finalização</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea value={endMessage} onChange={e => setEndMessage(e.target.value)} placeholder="Digite a mensagem de finalização" className="min-h-[100px]" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMessageOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={handleSaveEndMessage}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEndSupportOpen} onOpenChange={open => {
      setIsEndSupportOpen(open);
      if (!open) {
        setEndMessage("Atendimento finalizado");
      }
    }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar Atendimento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja finalizar este atendimento?
              <p className="mt-2 text-sm text-muted-foreground">
                Mensagem de finalização: "{endMessage}"
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEndSupportOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleEndSupport}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}