
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function UsersHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient-primary">
          Usuários
        </h1>
        <p className="text-muted-foreground mt-1">
          Gerencie os usuários e suas permissões
        </p>
      </div>
      <Button className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Novo Usuário
      </Button>
    </div>
  );
}
