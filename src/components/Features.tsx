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
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
          <p className="text-muted-foreground">Descubra como o FalaZAP pode transformar seu negócio</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card p-6 transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}