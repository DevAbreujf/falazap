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
import { Plus, ArrowRight, XOctagon, Search } from "lucide-react";
import { useState } from "react";

interface ChatActionsProps {
  onAddAttendant: (attendantId: string) => void;
  onChangeDepartment: (departmentId: string) => void;
  onEndSupport: () => void;
  attendants: Array<{ id: string; name: string; departmentId: string }>;
  departments: Array<{ id: string; name: string }>;
}

export function ChatActions({
  onAddAttendant,
  onChangeDepartment,
  onEndSupport,
  attendants,
  departments,
}: ChatActionsProps) {
  const [searchAttendant, setSearchAttendant] = useState("");

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

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Enviar para outro setor</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            {departments.map((department) => (
              <DropdownMenuItem
                key={department.id}
                onClick={() => onChangeDepartment(department.id)}
              >
                {department.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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