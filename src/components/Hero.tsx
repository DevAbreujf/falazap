import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToPricing = () => {
    const pricingSection = document.querySelector('section:has(.glass-card)');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in backdrop-blur-sm border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>LIBERTE O PODER DO MARKETING DIGITAL</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-up">
            Multiplique suas vendas de forma automática com o chatbot que vende
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"> 24h por dia.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up max-w-2xl mx-auto" style={{animationDelay: "0.1s"}}>
            Transforme seu negócio hoje mesmo com o chatbot para WhatsApp capaz de 
            <span className="text-primary font-semibold"> conversar com milhares de clientes simultaneamente.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{animationDelay: "0.2s"}}>
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 py-6 text-lg h-auto rounded-full group relative overflow-hidden"
              onClick={scrollToPricing}
            >
              <span className="relative z-10 flex items-center gap-2">
                QUERO MULTIPLICAR MINHAS VENDAS
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 group-hover:scale-110 transition-transform duration-300"></div>
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center animate-fade-up" style={{animationDelay: "0.3s"}}>
            {[
              { number: "1000+", label: "Clientes Satisfeitos" },
              { number: "24/7", label: "Atendimento Automático" },
              { number: "300%", label: "Aumento em Vendas" }
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-gradient-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}