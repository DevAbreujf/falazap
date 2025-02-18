
import { Users, MessageSquare, Phone, Workflow, Clock, PhoneCall, Brain } from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: Users,
    title: "Gestão de Equipe",
    description: "Vincule sua equipe de atendimento e gerencie todos os atendimentos em um só lugar. Acompanhe métricas e performance em tempo real.",
    color: "from-teal-500/30 to-teal-600/30"
  },
  {
    icon: Workflow,
    title: "Funis Personalizados",
    description: "Crie funis de atendimento e vendas automatizados, personalizados para cada tipo de cliente ou produto, maximizando suas conversões.",
    color: "from-teal-500/30 to-teal-600/30"
  },
  {
    icon: MessageSquare,
    title: "Mensagens Programadas",
    description: "Configure e agende mensagens automáticas para sua base de clientes, mantendo-os sempre engajados com sua marca.",
    color: "from-teal-500/30 to-teal-600/30"
  },
  {
    icon: Brain,
    title: "Agente IA Treinado",
    description: "Utilize nosso agente de IA treinado para automatizar atendimentos e interações com seus clientes de forma inteligente e personalizada.",
    color: "from-teal-500/30 to-teal-600/30"
  },
  {
    icon: Clock,
    title: "Venda 24/7",
    description: "Mantenha seu negócio vendendo 24 horas por dia, 7 dias por semana, com automação inteligente e atendimento contínuo.",
    color: "from-teal-500/30 to-teal-600/30"
  },
  {
    icon: PhoneCall,
    title: "Conecte vários números",
    description: "Gerencie múltiplos números de WhatsApp em uma única plataforma, organizando seus atendimentos de forma eficiente.",
    color: "from-teal-500/30 to-teal-600/30"
  }
];

export function TransformResults() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900/10 via-gray-900/5 to-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(28,216,182,0.3),rgba(255,255,255,0))]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-800/10 text-teal-500 text-sm font-medium mb-4 shadow-xl shadow-teal-500/10">
            TRANSFORME SEU NEGÓCIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            O FalaZAP transforma os resultados dos seus
            <br />
            <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent drop-shadow-lg">
              funis de venda
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma completa para automatizar e potencializar seu atendimento, 
            vendas e relacionamento com clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card p-8 relative overflow-hidden hover-scale shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20`}></div>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent"></div>
              
              <div className="relative z-10 flex gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-teal-500/30 to-teal-600/20 p-4 rounded-full backdrop-blur-sm border border-teal-500/20 shadow-lg">
                      <feature.icon className="w-8 h-8 text-teal-600" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 drop-shadow-sm">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up">
          <Button 
            onClick={scrollToPricing}
            size="lg"
            className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 relative overflow-hidden group w-64"
          >
            <span className="relative z-10">Começar Agora</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-500 transition-all ease-out"></div>
          </Button>
        </div>
      </div>
    </section>
  );
}
