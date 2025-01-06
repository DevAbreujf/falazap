import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { PathsNodeData, Path } from "@/types/flow";

export function PathsNode({ data }: { data: PathsNodeData }) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <Handle type="target" position={Position.Top} />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Caminhos</h3>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Caminho
          </Button>
        </div>

        {data.paths && data.paths.map((path: Path) => (
          <div key={path.id} className="space-y-2 border-t pt-4">
            <Input
              placeholder="Ex: 'Primeiro'"
              value={path.term}
              className="bg-[#333] border-[#444] text-white"
            />
            
            <div className="flex gap-2">
              <Button
                variant={path.condition === "exact" ? "default" : "outline"}
                className="flex-1"
              >
                Exata
              </Button>
              <Button
                variant={path.condition === "contains" ? "default" : "outline"}
                className="flex-1"
              >
                Contém
              </Button>
            </div>

            <Handle type="source" position={Position.Right} id={path.id} />
          </div>
        ))}

        {!data.showFallback ? (
          <Button
            variant="outline"
            className="w-full bg-[#333] hover:bg-[#444] text-white"
          >
            Caso não se encaixe...
          </Button>
        ) : (
          <div className="border-t border-[#333] pt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Caso não for nenhum dos caminhos, envie...
            </p>
            <Handle type="source" position={Position.Right} id="fallback" />
          </div>
        )}
      </div>
    </div>
  );
}