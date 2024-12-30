import { Users, MessageSquare, Phone, Workflow } from "lucide-react";
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
    title: "SMS em Massa",
    description: "Envie mensagens SMS em massa ou programe envios automáticos para sua base de clientes, mantendo-os sempre engajados.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Phone,
    title: "Ligações Automáticas",
    description: "Configure lembretes e confirmações através de ligações automáticas, garantindo que seus clientes nunca percam um compromisso.",
    color: "from-orange-500/20 to-red-500/20"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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
            className="rounded-full px-8 py-6 h-auto bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/20"
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </section>
  );
}