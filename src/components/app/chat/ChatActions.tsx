import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight, ArrowUp, XOctagon, X, Search } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatActionsProps {
  onEndSupport: () => void;
  onTransferChat: (attendantId: string) => void;
  onChangeDepartment: (departmentId: string) => void;
  attendants: Array<{ id: string; name: string; departmentId: string }>;
  departments: Array<{ id: string; name: string }>;
}

export function ChatActions({
  onEndSupport,
  onTransferChat,
  attendants,
}: ChatActionsProps) {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttendant, setSelectedAttendant] = useState<string | null>(null);

  const filteredAttendants = attendants.filter((attendant) =>
    attendant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTransfer = () => {
    if (selectedAttendant) {
      onTransferChat(selectedAttendant);
      setIsTransferOpen(false);
      setSelectedAttendant(null);
      setSearchTerm("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsTransferOpen(true)}
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

      <Sheet open={isTransferOpen} onOpenChange={setIsTransferOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-left">Transferir conversa</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar atendente"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {filteredAttendants.length === 0 ? (
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8" />
                  <span className="text-sm">Nenhum</span>
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
                      <Avatar className="h-8 w-8" />
                      <span className="text-sm">{attendant.name}</span>
                    </div>
                    {selectedAttendant === attendant.id && (
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                ))
              )}
            </div>

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
    </div>
  );
}