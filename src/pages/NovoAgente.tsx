import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NovoAgente() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/agentes")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Novo Agente de IA
            </h1>
            <p className="text-gray-600 mt-1">
              Aqui você consegue criar, configurar e treinar os seus agentes de IA. Lembrando que o agente IA é um especialista; portanto, se a tarefa dele for mais específica, provavelmente ele terá um nível de acertos em um tempo menor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full" />
            <div className="text-center">
              <h3 className="text-xl font-semibold">Standard</h3>
              <p className="text-gray-500 mt-2">
                Maior quantidade de respostas com menor qualidade
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-100" />
                Otimiza o atendimento da sua empresa
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-100" />
                Compreensão contextual
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-100" />
                Respostas mais diretas
              </li>
            </ul>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 inline-block px-3 py-1 rounded-full text-sm">
                400 créditos grátis
              </div>
              <p className="text-sm text-gray-500 mt-2">
                1 crédito por resposta
              </p>
            </div>
            <Button 
              className="w-full"
              onClick={() => navigate("/agentes/novo/configurar")}
            >
              Criar agente
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full relative">
              <div className="absolute -top-2 -right-2 bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">
                Recomendado
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">Expert</h3>
              <p className="text-gray-500 mt-2">
                Menor quantidade de resposta com maior qualidade
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-purple-100" />
                Eleva a qualidade do atendimento da sua empresa
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-purple-100" />
                Compreensão contextual avançada
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-purple-100" />
                Respostas mais profundas, criativas e sofisticadas
              </li>
            </ul>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 inline-block px-3 py-1 rounded-full text-sm">
                400 créditos grátis
              </div>
              <p className="text-sm text-gray-500 mt-2">
                10 créditos por resposta
              </p>
            </div>
            <Button 
              className="w-full"
              onClick={() => navigate("/agentes/novo/configurar")}
            >
              Criar agente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}