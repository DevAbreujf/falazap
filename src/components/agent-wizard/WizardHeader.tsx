import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function WizardHeader() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Agentes de IA</h1>
          <p className="text-muted-foreground mt-1">
            Aqui você consegue criar, configurar e treinar os seus agentes de IA. Lembrando que o agente IA é um especialista; portanto, se a tarefa dele for mais específica, provavelmente ele terá um nível de acertos em um tempo menor.
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={() => navigate("/agentes")}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}