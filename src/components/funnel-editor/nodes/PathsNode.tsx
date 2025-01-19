import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { PathsNodeData, Path } from "@/types/flow";

export function PathsNode({ id, data }: { id: string; data: PathsNodeData }) {
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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px] relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 left-1/2 -translate-x-1/2"
      />

      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <h3 className="text-sm font-medium text-zinc-900">Caminhos</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleDelete}
          className="text-zinc-400 hover:text-zinc-500"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          <Label className="text-zinc-700">Variável</Label>
          <Input
            placeholder="Escolha ou crie uma variável"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="bg-white border-zinc-200"
          />
        </div>

        <div className="space-y-2 mt-4">
          <Label className="text-zinc-700">Crie caminhos:</Label>
          
          {paths.map((path) => (
            <div key={path.id} className="space-y-2 border-t border-zinc-200 pt-4 relative">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-700">Termo</Label>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removePath(path.id)}
                  className="text-zinc-400 hover:text-zinc-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <Input
                placeholder="Ex: 'Primeiro'"
                value={path.term}
                onChange={(e) => updatePath(path.id, { term: e.target.value })}
                className="bg-white border-zinc-200"
              />
              
              <Label className="text-zinc-700">Condição</Label>
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
                className="w-3 h-3 !bg-zinc-300"
                style={{ transform: 'translateX(3em) !important' }}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2 mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addPath}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Caminho
          </Button>

          {!showFallback ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowFallback(true)}
            >
              Caso não se encaixe...
            </Button>
          ) : (
            <div className="border-t border-zinc-200 pt-4 space-y-2 relative">
              <p className="text-sm text-zinc-600">
                Caso não for nenhum dos caminhos, envie...
              </p>
              <Handle
                type="source"
                position={Position.Right}
                id="fallback"
                className="w-3 h-3 !bg-zinc-300"
                style={{ transform: 'translateX(3em) !important' }}
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
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