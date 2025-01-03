import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface PathCondition {
  term: string;
  type: "exact" | "contains";
}

interface PathRule {
  variable: string;
  conditions: PathCondition[];
}

export function PathNode({ data }: { data: { rules: PathRule[]; hasDefaultPath: boolean } }) {
  const [rules, setRules] = useState<PathRule[]>(data.rules || []);
  const [hasDefaultPath, setHasDefaultPath] = useState(data.hasDefaultPath || false);

  const addRule = () => {
    setRules([...rules, { variable: "", conditions: [] }]);
  };

  const removeRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const addCondition = (ruleIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex].conditions.push({ term: "", type: "exact" });
    setRules(newRules);
  };

  const removeCondition = (ruleIndex: number, conditionIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex].conditions.splice(conditionIndex, 1);
    setRules(newRules);
  };

  const updateVariable = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index].variable = value;
    setRules(newRules);
  };

  const updateCondition = (ruleIndex: number, conditionIndex: number, field: keyof PathCondition, value: string) => {
    const newRules = [...rules];
    if (field === "type") {
      newRules[ruleIndex].conditions[conditionIndex][field] = value as "exact" | "contains";
    } else {
      newRules[ruleIndex].conditions[conditionIndex][field] = value;
    }
    setRules(newRules);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border min-w-[300px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Caminhos</h3>
          <Button variant="outline" size="sm" onClick={addRule}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar caminho
          </Button>
        </div>

        {rules.map((rule, ruleIndex) => (
          <div key={ruleIndex} className="space-y-3 border rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Variável</label>
                <Input
                  value={rule.variable}
                  onChange={(e) => updateVariable(ruleIndex, e.target.value)}
                  placeholder="Nome da variável"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-6"
                onClick={() => removeRule(ruleIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {rule.conditions.map((condition, conditionIndex) => (
              <div key={conditionIndex} className="space-y-2 pl-4 border-l-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Termo</label>
                    <Input
                      value={condition.term}
                      onChange={(e) => updateCondition(ruleIndex, conditionIndex, "term", e.target.value)}
                      placeholder="Digite o termo"
                    />
                  </div>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant={condition.type === "exact" ? "default" : "outline"}
                      onClick={() => updateCondition(ruleIndex, conditionIndex, "type", "exact")}
                    >
                      Exata
                    </Button>
                    <Button
                      size="sm"
                      variant={condition.type === "contains" ? "default" : "outline"}
                      onClick={() => updateCondition(ruleIndex, conditionIndex, "type", "contains")}
                    >
                      Contém
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCondition(ruleIndex, conditionIndex)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => addCondition(ruleIndex)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar condição
            </Button>
          </div>
        ))}

        {!hasDefaultPath ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setHasDefaultPath(true)}
          >
            + Caso não se encaixe...
          </Button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Caminho padrão</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setHasDefaultPath(false)}
            >
              Remover recuperação
            </Button>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      {hasDefaultPath && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="default"
          className="w-2 h-2"
          style={{ left: "75%" }}
        />
      )}
    </div>
  );
}