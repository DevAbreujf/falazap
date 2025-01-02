import { Users, MessageSquare, Phone, Workflow, Clock, PhoneCall, Brain } from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: Users,
    title: "Gestão de Equipe",
    description: "Vincule sua equipe de atendimento e gerencie todos os atendimentos em um só lugar. Acompanhe métricas e performance em tempo real.",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    icon: Workflow,
    title: "Funis Personalizados",
    description: "Crie funis de atendimento e vendas automatizados, personalizados para cada tipo de cliente ou produto, maximizando suas conversões.",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: MessageSquare,
    title: "Mensagens Programadas",
    description: "Configure e agende mensagens automáticas para sua base de clientes, mantendo-os sempre engajados com sua marca.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Brain,
    title: "Agente IA Treinado",
    description: "Utilize nosso agente de IA treinado para automatizar atendimentos e interações com seus clientes de forma inteligente e personalizada.",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: Clock,
    title: "Venda 24/7",
    description: "Mantenha seu negócio vendendo 24 horas por dia, 7 dias por semana, com automação inteligente e atendimento contínuo.",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    icon: PhoneCall,
    title: "Conecte vários números",
    description: "Gerencie múltiplos números de WhatsApp em uma única plataforma, organizando seus atendimentos de forma eficiente.",
    color: "from-cyan-500/20 to-blue-500/20"
  }
];

export function TransformResults() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/80"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-primary text-sm font-medium mb-4">
            TRANSFORME SEU NEGÓCIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O FalaZAP transforma os resultados dos seus
            <br />
            <span className="text-gradient-primary">
              funis de venda
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa para automatizar e potencializar seu atendimento, 
            vendas e relacionamento com clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card p-8 relative overflow-hidden hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10`}></div>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
              
              <div className="relative z-10 flex gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-4 rounded-full backdrop-blur-sm border border-white/5">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground/90 leading-relaxed">
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
            className="rounded-full px-12 py-7 h-auto text-lg font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Começar Agora</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-500 transition-all ease-out"></div>
          </Button>
        </div>
      </div>
    </section>
  );
}