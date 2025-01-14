import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, ArrowRight, XOctagon, Search, ArrowUp } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChatActionsProps {
  onAddAttendant: (attendantId: string) => void;
  onChangeDepartment: (departmentId: string) => void;
  onEndSupport: () => void;
  onTransferChat: (attendantId: string) => void;
  attendants: Array<{ id: string; name: string; departmentId: string }>;
  departments: Array<{ id: string; name: string }>;
}

export function ChatActions({
  onAddAttendant,
  onChangeDepartment,
  onEndSupport,
  onTransferChat,
  attendants,
  departments,
}: ChatActionsProps) {
  const [searchAttendant, setSearchAttendant] = useState("");
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);

  const filteredAttendants = attendants.filter(attendant =>
    attendant.name.toLowerCase().includes(searchAttendant.toLowerCase())
  );

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar atendente</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent className="w-56">
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar atendente..."
                  value={searchAttendant}
                  onChange={(e) => setSearchAttendant(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            {filteredAttendants.map((attendant) => (
              <DropdownMenuItem
                key={attendant.id}
                onClick={() => onAddAttendant(attendant.id)}
              >
                {attendant.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsTransferDialogOpen(true)}
            >
              <ArrowUp className="h-4 w-4" />
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
              size="icon"
              onClick={() => setIsDepartmentDialogOpen(true)}
            >
              <ArrowRight className="h-4 w-4" />
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

      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transferir conversa</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar atendente..."
                value={searchAttendant}
                onChange={(e) => setSearchAttendant(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-2">
              {filteredAttendants.map((attendant) => (
                <Button
                  key={attendant.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    onTransferChat(attendant.id);
                    setIsTransferDialogOpen(false);
                  }}
                >
                  {attendant.name}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDepartmentDialogOpen} onOpenChange={setIsDepartmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar Setor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  onChangeDepartment(dept.id);
                  setIsDepartmentDialogOpen(false);
                }}
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