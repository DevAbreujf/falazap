
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
    <Card className="w-full transition-all duration-300 hover:shadow-lg group animate-fade-up">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-bold text-primary">{funnel.name}</h3>
              <div className="flex items-center gap-3 ml-4">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {funnel.isActive ? 'Ativo' : 'Inativo'}
                </span>
                <Switch
                  checked={funnel.isActive}
                  onCheckedChange={() => onToggle(funnel.id)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary/60" />
                <span>
                  Criado em:{" "}
                  {format(funnel.createdAt, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary/60" />
                <span>
                  Última modificação:{" "}
                  {format(funnel.updatedAt, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col justify-end gap-2 mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(funnel.id)}
              className="flex-1 sm:flex-none hover:bg-primary/10 border-primary/20 hover:border-primary/40"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMetrics(funnel.id)}
              className="flex-1 sm:flex-none hover:bg-primary/10 border-primary/20 hover:border-primary/40"
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Métricas
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
        <div className="flex items-center justify-end w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/10"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDuplicate(funnel.id)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(funnel.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
