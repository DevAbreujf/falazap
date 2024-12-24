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
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Recursos Principais
          </h2>
          <p className="text-muted-foreground">Descubra como o FalaZAP pode transformar seu negócio</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100"></div>
              <div className="glass-card p-8 relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/20 animate-fade-up">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 rounded-t-2xl"></div>
                <feature.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}