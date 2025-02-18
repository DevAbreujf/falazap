
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export function SalesCTA() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,#29958D_0%,rgba(233,128,252,0)_40%),radial-gradient(ellipse_at_50%_0%,#005C55_25%,#03201E_75%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="dark-glass-card p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-teal-500/10"></div>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500/30 to-transparent"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10">
              <Rocket className="w-4 h-4 text-teal-300" />
              <span className="text-sm font-medium text-teal-300">Escale Agora</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Pronto para transformar seu atendimento no WhatsApp?
            </h2>
            
            <p className="text-lg text-gray-300/90 max-w-2xl mx-auto">
              Junte-se a milhares de empresas que já estão multiplicando suas vendas com automação inteligente
            </p>
            
            <div className="pt-4">
              <Button 
                onClick={scrollToPricing}
                size="lg" 
                className="rounded-full text-lg px-12 py-6 h-auto bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
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
