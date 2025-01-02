import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToPricing = () => {
    const pricingSection = document.querySelector('section:has(.glass-card)');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            AUTOMATIZE SUAS VENDAS NO WHATSAPP
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
            Multiplique suas vendas de forma automática com o chatbot que vende
            <span className="text-primary"> 24h por dia.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 animate-fade-up" style={{animationDelay: "0.1s"}}>
            Transforme seu negócio ainda hoje com o chatbot para WhatsApp capaz de conversar com um número ilimitado de clientes ao mesmo tempo.
          </p>
          
          <Button 
            size="lg" 
            className="animate-fade-up" 
            style={{animationDelay: "0.2s"}}
            onClick={scrollToPricing}
          >
            QUERO MULTIPLICAR MINHAS VENDAS
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
    </section>
  );
}