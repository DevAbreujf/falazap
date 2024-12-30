import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export function SalesCTA() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background/80"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="glass-card p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Escale Agora</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Pronto para transformar seu atendimento no WhatsApp?
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Junte-se a milhares de empresas que já estão multiplicando suas vendas com automação inteligente
            </p>
            
            <div className="pt-4">
              <Button 
                onClick={scrollToPricing}
                size="lg" 
                className="rounded-full text-lg px-12 py-6 h-auto bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/20"
              >
                COMEÇAR AGORA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}