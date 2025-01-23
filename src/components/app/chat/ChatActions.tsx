import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight, XOctagon, Search, User, CheckCircle, Circle, X, Pencil } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  departments: Array<{ id: string; name: string }>;
}

export function ChatActions({
  onEndSupport,
  onTransferChat,
  onChangeDepartment,
  attendants,
  departments,
}: ChatActionsProps) {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDepartmentTerm, setSearchDepartmentTerm] = useState("");
  const [selectedAttendant, setSelectedAttendant] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isEditMessageOpen, setIsEditMessageOpen] = useState(false);
  const [endMessage, setEndMessage] = useState("Atendimento finalizado");
  const { toast } = useToast();

  const sortedAttendants = [...attendants].sort((a, b) => {
    if (a.isOnline === b.isOnline) return 0;
    return (a.isOnline ? -1 : 1);
  });

  const filteredAttendants = sortedAttendants.filter((attendant) =>
    attendant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchDepartmentTerm.toLowerCase())
  );

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

  const handleEndSupport = () => {
    onEndSupport();
    toast({
      title: "Atendimento finalizado",
      description: "O atendimento foi encerrado com sucesso.",
    });
  };

  const handleSaveEndMessage = () => {
    setIsEditMessageOpen(false);
    toast({
      title: "Mensagem atualizada",
      description: "A mensagem de finalização foi atualizada com sucesso.",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setIsTransferOpen(true)}
            >
              Transferir conversa
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Transferir conversa</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setIsDepartmentOpen(true)}
            >
              Enviar para outro setor
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enviar para outro setor</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={handleEndSupport}
              >
                <XOctagon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditMessageOpen(true);
                }}
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Finalizar atendimento</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Sheet open={isTransferOpen} onOpenChange={setIsTransferOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
          <SheetHeader className="mb-6 border-b pb-4">
            <SheetTitle className="text-xl font-semibold">Transferir conversa</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar atendente"
                className="pl-9 bg-muted/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2 flex-1">
              {filteredAttendants.length === 0 ? (
                <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-muted/50">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Nenhum atendente encontrado</span>
                </div>
              ) : (
                <div className="grid gap-2">
                  {filteredAttendants.map((attendant) => (
                    <div
                      key={attendant.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200",
                        "hover:bg-muted/80",
                        selectedAttendant === attendant.id ? "bg-muted ring-2 ring-primary ring-offset-2" : "bg-muted/50"
                      )}
                      onClick={() => setSelectedAttendant(attendant.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10 border-2 border-background">
                            {attendant.avatar ? (
                              <AvatarImage src={attendant.avatar} alt={attendant.name} />
                            ) : (
                              <AvatarFallback className="bg-primary/10">
                                <User className="h-5 w-5 text-primary" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className={cn(
                            "absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
                            attendant.isOnline ? "bg-green-500" : "bg-gray-300"
                          )} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{attendant.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {attendant.isOnline ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>
                      {selectedAttendant === attendant.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t mt-auto">
            <Button 
              className="w-full"
              size="lg"
              disabled={!selectedAttendant}
              onClick={handleTransfer}
            >
              Transferir conversa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isDepartmentOpen} onOpenChange={setIsDepartmentOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
          <SheetHeader className="mb-6 border-b pb-4">
            <SheetTitle className="text-xl font-semibold">Enviar para outro setor</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar setor"
                className="pl-9 bg-muted/50"
                value={searchDepartmentTerm}
                onChange={(e) => setSearchDepartmentTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2 flex-1">
              {filteredDepartments.length === 0 ? (
                <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-muted/50">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Nenhum setor encontrado</span>
                </div>
              ) : (
                <div className="grid gap-2">
                  {filteredDepartments.map((department) => (
                    <div
                      key={department.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200",
                        "hover:bg-muted/80",
                        selectedDepartment === department.id ? "bg-muted ring-2 ring-primary ring-offset-2" : "bg-muted/50"
                      )}
                      onClick={() => setSelectedDepartment(department.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{department.name}</span>
                      </div>
                      {selectedDepartment === department.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t mt-auto">
            <Button 
              className="w-full"
              size="lg"
              disabled={!selectedDepartment}
              onClick={handleDepartmentTransfer}
            >
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
            <Textarea
              value={endMessage}
              onChange={(e) => setEndMessage(e.target.value)}
              placeholder="Digite a mensagem de finalização"
              className="min-h-[100px]"
            />
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
    </div>
  );
}