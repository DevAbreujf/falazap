import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NovoAgente() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Escolha o tipo do seu agente</h1>
          <p className="text-muted-foreground mt-2">
            Selecione o tipo de agente que melhor se adequa às suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Standard</h2>
            <p className="text-muted-foreground">
              Ideal para atendimentos básicos e respostas simples
            </p>
            <Button 
              onClick={() => navigate("/agentes/novo/configurar")}
              className="w-full"
            >
              Criar agente Standard
            </Button>
          </div>

          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Expert</h2>
            <p className="text-muted-foreground">
              Para atendimentos complexos e personalizados
            </p>
            <Button 
              onClick={() => navigate("/agentes/novo/configurar")}
              variant="outline"
              className="w-full"
            >
              Criar agente Expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}