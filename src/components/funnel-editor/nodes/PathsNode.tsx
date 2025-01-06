import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { PathsNodeData, Path } from "@/types/flow";

export function PathsNode({ data, id }: { data: PathsNodeData; id: string }) {
  const { setNodes } = useReactFlow();
  const [paths, setPaths] = useState<Path[]>(data.paths || []);
  const [variable, setVariable] = useState(data.variable || "");
  const [showFallback, setShowFallback] = useState(data.fallback || false);

  const addPath = () => {
    const newPath: Path = {
      id: `path-${paths.length + 1}`,
      term: "",
      condition: "exact"
    };
    setPaths([...paths, newPath]);
  };

  const updatePath = (id: string, updates: Partial<Path>) => {
    setPaths(paths.map(path => 
      path.id === id ? { ...path, ...updates } : path
    ));
  };

  const removePath = (id: string) => {
    setPaths(paths.filter(path => path.id !== id));
  };

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="flow-node">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />

      <div className="flow-node-header">
        <h3>Caminhos</h3>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-6 w-6 p-0 hover:bg-accent"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flow-node-content">
        <div className="space-y-2">
          <Label>Variável</Label>
          <Input
            placeholder="Escolha ou crie uma variável"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="bg-background border-input"
          />
        </div>

        <div className="space-y-2">
          <Label>Crie caminhos:</Label>
          
          {paths.map((path) => (
            <div key={path.id} className="space-y-2 border-t border-border pt-4 relative">
              <div className="flex justify-between items-center">
                <Label>Termo</Label>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removePath(path.id)}
                  className="hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <Input
                placeholder="Ex: 'Primeiro'"
                value={path.term}
                onChange={(e) => updatePath(path.id, { term: e.target.value })}
                className="bg-background border-input"
              />
              
              <Label>Condição</Label>
              <div className="flex gap-2">
                <Button
                  variant={path.condition === "exact" ? "default" : "outline"}
                  onClick={() => updatePath(path.id, { condition: "exact" })}
                  className="flex-1"
                >
                  Exata
                </Button>
                <Button
                  variant={path.condition === "contains" ? "default" : "outline"}
                  onClick={() => updatePath(path.id, { condition: "contains" })}
                  className="flex-1"
                >
                  Contém
                </Button>
              </div>

              <Handle
                type="source"
                position={Position.Right}
                id={path.id}
                className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full bg-background hover:bg-accent"
            onClick={addPath}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Caminho
          </Button>

          {!showFallback ? (
            <Button
              variant="outline"
              className="w-full bg-background hover:bg-accent"
              onClick={() => setShowFallback(true)}
            >
              Caso não se encaixe...
            </Button>
          ) : (
            <div className="border-t border-border pt-4 space-y-2 relative">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Caso não for nenhum dos caminhos, envie...
                </p>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="fallback"
                  className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-background hover:bg-accent"
                onClick={() => setShowFallback(false)}
              >
                Remover recuperação
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}