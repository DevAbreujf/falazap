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
    <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="pt-8 pb-6 px-6 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 pr-4">
              <h3 className="text-2xl font-bold text-gradient-primary break-words">{funnel.name}</h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
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
        </div>
        <div className="space-y-3">
          <div className="flex flex-col space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-primary" />
              <span>
                Criado em:{" "}
                {format(funnel.createdAt, "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              <span>
                Última modificação:{" "}
                {format(funnel.updatedAt, "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between pt-4 pb-6 px-6">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(funnel.id)}
            className="hover:bg-primary/10"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMetrics(funnel.id)}
            className="hover:bg-primary/10"
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Métricas
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
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
      </CardFooter>
    </Card>
  );
}