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
    <div className="bg-[#1f1f2a] rounded-2xl w-[300px] shadow-lg shadow-black/20">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />

      <div className="bg-[#1f1f2a] px-4 py-2 flex items-center justify-between border-b border-[#434358]/50">
        <h3 className="text-sm font-medium text-zinc-100">Caminhos</h3>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-6 w-6 p-0 text-zinc-400 hover:text-white hover:bg-white/5"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          <Label className="text-zinc-100">Variável</Label>
          <Input
            placeholder="Escolha ou crie uma variável"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="bg-[#272733] border-[#434358] text-white"
          />
        </div>

        <div className="space-y-2 mt-4">
          <Label className="text-zinc-100">Crie caminhos:</Label>
          
          {paths.map((path) => (
            <div key={path.id} className="space-y-2 border-t border-[#434358] pt-4 relative" style={{ overflow: 'visible' }}>
              <div className="flex justify-between items-center">
                <Label className="text-zinc-100">Termo</Label>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removePath(path.id)}
                  className="text-zinc-400 hover:text-white hover:bg-white/5"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <Input
                placeholder="Ex: 'Primeiro'"
                value={path.term}
                onChange={(e) => updatePath(path.id, { term: e.target.value })}
                className="bg-[#272733] border-[#434358] text-white"
              />
              
              <Label className="text-zinc-100">Condição</Label>
              <div className="flex gap-2">
                <Button
                  variant={path.condition === "exact" ? "default" : "outline"}
                  onClick={() => updatePath(path.id, { condition: "exact" })}
                  className="flex-1 bg-[#272733] border-[#434358] text-white hover:bg-[#323244]"
                >
                  Exata
                </Button>
                <Button
                  variant={path.condition === "contains" ? "default" : "outline"}
                  onClick={() => updatePath(path.id, { condition: "contains" })}
                  className="flex-1 bg-[#272733] border-[#434358] text-white hover:bg-[#323244]"
                >
                  Contém
                </Button>
              </div>

              <Handle
                type="source"
                position={Position.Right}
                id={path.id}
                className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[4.5em]"
              />
            </div>
          ))}
        </div>

        <div className="space-y-2 mt-4">
          <Button 
            variant="outline" 
            className="w-full bg-[#272733] hover:bg-[#323244] text-white border-[#434358]"
            onClick={addPath}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Caminho
          </Button>

          {!showFallback ? (
            <Button
              variant="outline"
              className="w-full bg-[#272733] hover:bg-[#323244] text-white border-[#434358]"
              onClick={() => setShowFallback(true)}
            >
              Caso não se encaixe...
            </Button>
          ) : (
            <div className="border-t border-[#434358] pt-4 space-y-2 relative">
              <p className="text-sm text-zinc-400">
                Caso não for nenhum dos caminhos, envie...
              </p>
              <Handle
                type="source"
                position={Position.Right}
                id="fallback"
                className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[4.5em]"
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-[#272733] hover:bg-[#323244] text-white border-[#434358]"
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
