
import { Check } from "lucide-react";
export function ComparisonSection() {
  return <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          Compare as Soluções
        </h2>
        <p className="text-muted-foreground mt-4">
          Escolha a solução ideal para o seu negócio
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Agentes IA Column */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-400/20 via-teal-500/10 to-transparent rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100"></div>
          <div className="space-y-8 glass-card p-8 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-teal-500/20 relative overflow-hidden bg-gray-800 hover:bg-gray-700">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400/50 to-transparent"></div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative -ml-6 animate-subtle-pulse bg-gradient-to-br from-teal-400/20 to-teal-500/20 p-0.5">
                    <img src="/lovable-uploads/41ad85ee-2649-404e-b052-3d5690900beb.png" alt="Agente IA" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden absolute -right-6 top-0 animate-subtle-pulse delay-75 bg-gradient-to-br from-teal-400/20 to-teal-500/20 p-0.5">
                    <img src="/lovable-uploads/41ad85ee-2649-404e-b052-3d5690900beb.png" alt="Agente IA" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden absolute left-3 -top-3 animate-subtle-pulse delay-150 bg-gradient-to-br from-teal-400/20 to-teal-500/20 p-0.5">
                    <img src="/lovable-uploads/41ad85ee-2649-404e-b052-3d5690900beb.png" alt="Agente IA" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-12 bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent pb-1">Agentes IA</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-lg hover:bg-teal-400/5 transition-colors duration-300">
                <Check className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <p className="text-gray-200">Perfeito para ampliar seu time de vendas e suporte, com menor custo.</p>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-teal-400/5 transition-colors duration-300">
                <Check className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <p className="text-gray-200">Treinado usando conteúdo sobre sua empresa e seus processos de trabalho.</p>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-teal-400/5 transition-colors duration-300">
                <Check className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <p className="text-gray-200">Conversas flexíveis, ajustando-se às necessidades e perguntas do cliente em tempo real.</p>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-teal-400/5 transition-colors duration-300">
                <Check className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <p className="text-gray-200">Exemplo de uso: Pré-vendedores (SDR) virtuais, tirando dúvidas e qualificando leads 24/7.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbots Column */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-400/20 via-teal-500/10 to-transparent rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100"></div>
          <div className="space-y-8 glass-card p-8 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-teal-500/20 relative overflow-hidden bg-gray-800 hover:bg-gray-700">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400/50 to-transparent"></div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative -ml-6 animate-subtle-pulse bg-gradient-to-br from-teal-400/20 to-teal-500/20 p-0.5">
                    <img src="/lovable-uploads/70cbc251-19a9-42a6-bc5c-68bf2da9312f.png" alt="Chatbot" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden absolute -right-6 top-0 animate-subtle-pulse delay-75 bg-gradient-to-br from-teal-400/20 to-teal-500/20 p-0.5">
                    <img src="/lovable-uploads/70cbc251-19a9-42a6-bc5c-68bf2da9312f.png" alt="Chatbot" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden absolute left-3 -top-3 animate-subtle-pulse delay-150 bg-gradient-to-br from-teal-400/20 to-teal-500/20 p-0.5">
                    <img src="/lovable-uploads/70cbc251-19a9-42a6-bc5c-68bf2da9312f.png" alt="Chatbot" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-12 bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent">Chatbots</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-lg hover:bg-teal-400/5 transition-colors duration-300">
                <Check className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <p className="text-gray-200">Perfeito para automatizar tarefas repetitivas e fluxos pré definidos.</p>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-teal-400/5 transition-colors duration-300">
                <Check className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <p className="text-gray-200">Construído em uma interface visual intuitiva de fluxos, arrastar e soltar.</p>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-teal-400/5 transition-colors duration-300">
                <Check className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <p className="text-gray-200">Conversas e processos lineares e padronizados.</p>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-teal-400/5 transition-colors duration-300">
                <Check className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <p className="text-gray-200">Exemplo de uso: Coleta de informações iniciais, direcionamento para setores, automação de processos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
