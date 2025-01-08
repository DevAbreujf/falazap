import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Edit2, PlayCircle, MoreVertical } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";

export default function Agentes() {
  const [agents] = useState<any[]>([]);
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10">
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Agentes de IA</h1>
                <p className="text-gray-600 mt-2">
                  Aqui você consegue criar, configurar e treinar os seus agentes de IA. Para criar um agente de IA você vai consumir um atendente regular do seu plano, também será necessário contratar um plano de créditos específico para mensagens do seu agente de IA.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span>Você tem 19 atendentes disponíveis.</span>
                    <button className="text-blue-600 hover:underline text-sm">
                      Fazer upgrade do plano
                    </button>
                  </div>
                  <Button 
                    onClick={() => navigate("/agentes/novo")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Novo agente de IA
                  </Button>
                </div>

                {agents.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <PlusCircle className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Crie seu primeiro agente de IA!
                    </h3>
                  </div>
                ) : (
            <div className="mt-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="font-normal pb-4">Nome</th>
                    <th className="font-normal pb-4">Tipo</th>
                    <th className="font-normal pb-4">Status</th>
                    <th className="font-normal pb-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} className="border-t">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full" />
                          <span>{agent.name}</span>
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                            Standard
                          </span>
                        </div>
                      </td>
                      <td className="py-4">{agent.type}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                          Ativo
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button variant="ghost" size="sm">
                            <PlayCircle className="w-4 h-4" />
                            Testar
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
