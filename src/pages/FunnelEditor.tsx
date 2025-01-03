import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { ArrowLeft, Import, Export, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "start",
    type: "startNode",
    position: { x: 400, y: 100 },
    data: { 
      label: "Início",
      triggers: [],
      delay: {
        value: 0,
        unit: "minutes"
      }
    }
  }
];

export default function FunnelEditor() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isActive, setIsActive] = useState(false);
  const [funnelName, setFunnelName] = useState("Novo Funil");
  const [isEditing, setIsEditing] = useState(false);
  const [isManualTriggerOpen, setIsManualTriggerOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+55");
  const [selectedTrigger, setSelectedTrigger] = useState("");

  const handleManualTrigger = () => {
    // Implementar lógica de disparo manual
    setIsManualTriggerOpen(false);
  };

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log("Salvando funil...");
  };

  const handleExport = () => {
    const funnelData = {
      nodes,
      edges,
      name: funnelName,
      isActive
    };
    const jsonString = JSON.stringify(funnelData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${funnelName.toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setNodes(importedData.nodes);
          setEdges(importedData.edges);
          setFunnelName(importedData.name);
          setIsActive(importedData.isActive);
        } catch (error) {
          console.error("Erro ao importar funil:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/funnels")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <Input
                  value={funnelName}
                  onChange={(e) => setFunnelName(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                  className="h-9 w-[180px]"
                  autoFocus
                />
              ) : (
                <h2
                  className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  {funnelName}
                </h2>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setIsManualTriggerOpen(true)}
            >
              Disparo Manual
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <span className="text-sm font-medium">
                {isActive ? "Ativo" : "Inativo"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <Button variant="outline" asChild>
                  <span>
                    <Import className="h-4 w-4 mr-2" />
                    Importar
                  </span>
                </Button>
              </label>

              <Button variant="outline" onClick={handleExport}>
                <Export className="h-4 w-4 mr-2" />
                Exportar
              </Button>

              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 bg-zinc-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
          <Panel position="top-left" className="bg-background border rounded-lg p-4 m-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Adicionar Elementos</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Mensagens</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Texto
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Áudio
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Imagem
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Vídeo
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Arquivo
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Lógicas</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Caminhos
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Perguntas
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Tempo de espera
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Tags
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Variáveis
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Botões
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Manual Trigger Dialog */}
      <Dialog open={isManualTriggerOpen} onOpenChange={setIsManualTriggerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disparo Manual do Funil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Gatilho</Label>
              <select
                className="w-full p-2 rounded-md border"
                value={selectedTrigger}
                onChange={(e) => setSelectedTrigger(e.target.value)}
              >
                <option value="">Selecione um gatilho</option>
                {/* Adicionar opções de gatilho aqui */}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Número do Cliente</Label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+55 (99) 99999-9999"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManualTriggerOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleManualTrigger}>
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}