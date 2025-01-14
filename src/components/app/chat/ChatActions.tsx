import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, ArrowRight, XOctagon, ArrowUp } from "lucide-react";

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
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onAddAttendant(attendants[0]?.id)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adicionar atendente</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onTransferChat(attendants[0]?.id)}
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
              onClick={() => onChangeDepartment(departments[0]?.id)}
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
    </div>
  );
}