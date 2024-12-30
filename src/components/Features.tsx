import { Bookmark, Zap, MessageSquare, PiggyBank, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Bookmark,
    title: "Simplicidade",
    description: "Pensado para uso de quem não é profissional com tecnologia"
  },
  {
    icon: Zap,
    title: "Praticidade",
    description: "Rápido de configurar e já começar a vender."
  },
  {
    icon: Sparkles,
    title: "Eficiência",
    description: "Aumento exponencial de suas vendas por WhatsApp."
  },
  {
    icon: MessageSquare,
    title: "Conexão",
    description: "A inteligência artificial reconhece as necessidades do seu cliente e gera conexão para converter mais vendas."
  },
  {
    icon: PiggyBank,
    title: "Custo benefício",
    description: "O chatbot mais avançado do mercado, e com o menor preço."
  },
  {
    icon: Clock,
    title: "Automatização 24h/dia",
    description: "O chatbot vende de forma ininterrupta e permite você focar nas atividades que precisa fazer."
  }
];

export function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(28,216,182,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-primary text-sm font-medium mb-4 hover:scale-105 transition-transform duration-300">
            RECURSOS PRINCIPAIS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Descubra como o FalaZAP pode
            <br />
            <span className="text-gradient-primary animate-pulse">
              transformar seu negócio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa para automatizar e potencializar suas vendas no WhatsApp
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative perspective-1000"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100 animate-pulse"></div>
              
              {/* Card container */}
              <div className="glass-card relative h-full p-8 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-primary/20 animate-fade-up group-hover:rotate-y-[-5deg]">
                {/* Gradient border top */}
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon container */}
                  <div className="mb-6 relative transform-gpu transition-all duration-500 group-hover:scale-110">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg transform-gpu group-hover:scale-125 group-hover:blur-xl transition-all duration-500"></div>
                    <feature.icon className="w-12 h-12 text-primary relative z-10 transform-gpu group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-gradient-primary transition-all duration-300 transform-gpu group-hover:scale-105">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed transition-all duration-300 group-hover:text-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}