import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight, ArrowUp, XOctagon, X, Search, User, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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

  // Sort attendants by online status
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
            <Button
              variant="outline"
              size="icon"
              onClick={onEndSupport}
            >
              <XOctagon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Finalizar atendimento</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Sheet open={isTransferOpen} onOpenChange={setIsTransferOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
          <SheetHeader className="mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-left">Transferir conversa</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsTransferOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar atendente"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2 flex-1">
              {filteredAttendants.length === 0 ? (
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Nenhum atendente encontrado</span>
                </div>
              ) : (
                filteredAttendants.map((attendant) => (
                  <div
                    key={attendant.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted",
                      selectedAttendant === attendant.id && "bg-muted"
                    )}
                    onClick={() => setSelectedAttendant(attendant.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          {attendant.avatar ? (
                            <AvatarImage src={attendant.avatar} alt={attendant.name} />
                          ) : (
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="absolute -top-1 -right-1">
                          {attendant.isOnline ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted stroke-[1.5]" />
                          )}
                        </div>
                      </div>
                      <span className="text-sm">{attendant.name}</span>
                    </div>
                    {selectedAttendant === attendant.id && (
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button 
              className="w-full" 
              disabled={!selectedAttendant}
              onClick={handleTransfer}
            >
              Transferir
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isDepartmentOpen} onOpenChange={setIsDepartmentOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
          <SheetHeader className="mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-left">Enviar para outro setor</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDepartmentOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar setor"
                className="pl-8"
                value={searchDepartmentTerm}
                onChange={(e) => setSearchDepartmentTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2 flex-1">
              {filteredDepartments.length === 0 ? (
                <div className="flex items-center gap-2 p-2">
                  <span className="text-sm">Nenhum setor encontrado</span>
                </div>
              ) : (
                filteredDepartments.map((department) => (
                  <div
                    key={department.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted",
                      selectedDepartment === department.id && "bg-muted"
                    )}
                    onClick={() => setSelectedDepartment(department.id)}
                  >
                    <span className="text-sm">{department.name}</span>
                    {selectedDepartment === department.id && (
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button 
              className="w-full" 
              disabled={!selectedDepartment}
              onClick={handleDepartmentTransfer}
            >
              Transferir
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
