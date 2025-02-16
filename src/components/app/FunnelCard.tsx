
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Copy, Pencil, Trash2, BarChart2, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FunnelCardProps {
  funnel: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  };
  onEdit: (id: number) => void;
  onMetrics: (id: number) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export function FunnelCard({
  funnel,
  onEdit,
  onMetrics,
  onDuplicate,
  onDelete,
  onToggle,
}: FunnelCardProps) {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md group animate-fade-up border-primary/5">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-primary truncate">{funnel.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                  funnel.isActive 
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}>
                  {funnel.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary/60" />
                      <span>Criado em {format(funnel.createdAt, "dd/MM/yyyy", { locale: ptBR })}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Data de criação: {format(funnel.createdAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary/60" />
                      <span>Modificado em {format(funnel.updatedAt, "dd/MM/yyyy", { locale: ptBR })}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Última modificação: {format(funnel.updatedAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={funnel.isActive}
              onCheckedChange={() => onToggle(funnel.id)}
              className="data-[state=checked]:bg-primary"
            />

            <div className="flex items-center gap-1.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(funnel.id)}
                      className="h-8 w-8 p-0 hover:bg-primary/5"
                    >
                      <Pencil className="h-4 w-4 text-primary/70" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar funil</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMetrics(funnel.id)}
                      className="h-8 w-8 p-0 hover:bg-primary/5"
                    >
                      <BarChart2 className="h-4 w-4 text-primary/70" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ver métricas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-primary/5"
                        >
                          <MoreVertical className="h-4 w-4 text-primary/70" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mais opções</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onDuplicate(funnel.id)} className="text-primary">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(funnel.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
