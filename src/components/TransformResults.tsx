import { Users, MessageSquare, Phone, Workflow, Clock, PhoneCall, Brain } from "lucide-react";
import { Button } from "./ui/button";
const features = [{
  icon: Users,
  title: "Gestão de Equipe",
  description: "Vincule sua equipe de atendimento e gerencie todos os atendimentos em um só lugar. Acompanhe métricas e performance em tempo real.",
  color: "from-teal-500/30 to-teal-600/30"
}, {
  icon: Workflow,
  title: "Funis Personalizados",
  description: "Crie funis de atendimento e vendas automatizados, personalizados para cada tipo de cliente ou produto, maximizando suas conversões.",
  color: "from-teal-500/30 to-teal-600/30"
}, {
  icon: MessageSquare,
  title: "Mensagens Programadas",
  description: "Configure e agende mensagens automáticas para sua base de clientes, mantendo-os sempre engajados com sua marca.",
  color: "from-teal-500/30 to-teal-600/30"
}, {
  icon: Brain,
  title: "Agente IA Treinado",
  description: "Utilize nosso agente de IA treinado para automatizar atendimentos e interações com seus clientes de forma inteligente e personalizada.",
  color: "from-teal-500/30 to-teal-600/30"
}, {
  icon: Clock,
  title: "Venda 24/7",
  description: "Mantenha seu negócio vendendo 24 horas por dia, 7 dias por semana, com automação inteligente e atendimento contínuo.",
  color: "from-teal-500/30 to-teal-600/30"
}, {
  icon: PhoneCall,
  title: "Conecte vários números",
  description: "Gerencie múltiplos números de WhatsApp em uma única plataforma, organizando seus atendimentos de forma eficiente.",
  color: "from-teal-500/30 to-teal-600/30"
}];
export function TransformResults() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900/10 via-gray-900/5 to-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(28,216,182,0.3),rgba(255,255,255,0))]"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-800/10 text-sm font-medium mb-4 shadow-xl shadow-teal-500/10 text-slate-50">
            TRANSFORME SEU NEGÓCIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-800 text-slate-50">
            O FalaZAP transforma os resultados dos seus
            <br />
            <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text drop-shadow-lg text-transparent">
              funis de venda
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-slate-50">
            Uma plataforma completa para automatizar e potencializar seu atendimento, 
            vendas e relacionamento com clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => <div key={feature.title} className="bg-white rounded-2xl p-6 relative overflow-hidden hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 hover:translate-y-[-4px]" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent"></div>
              
              <div className="relative z-10 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-teal-500/30 to-teal-600/20 p-3 rounded-full backdrop-blur-sm border border-teal-500/20 shadow-lg">
                      <feature.icon className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>)}
        </div>

        
      </div>
    </section>;
}