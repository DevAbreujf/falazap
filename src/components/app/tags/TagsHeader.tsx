
import { Button } from "@/components/ui/button";

export function TagsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient-primary">
          Etiquetas
        </h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as etiquetas para organizar seus contatos
        </p>
      </div>
      <Button>
        Nova Etiqueta
      </Button>
    </div>
  );
}
