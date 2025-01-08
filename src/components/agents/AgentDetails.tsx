import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface AgentDetailsProps {
  selectedAgent: number | null;
  onClose: () => void;
}

export function AgentDetails({ selectedAgent, onClose }: AgentDetailsProps) {
  return (
    <Sheet open={selectedAgent !== null} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Detalhes do Agente</SheetTitle>
          <SheetDescription>
            Visualize e gerencie a configuração do agente
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Configuração</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Nome</label>
                <Input defaultValue="Suporte ao Cliente" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Descrição</label>
                <Input defaultValue="Assistente de suporte 24/7" />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}