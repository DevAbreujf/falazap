import { Button } from "@/components/ui/button";
import { ShoppingCart, Users, Rocket } from "lucide-react";

export function SalesCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background/80"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="glass-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Escale Agora</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Pronto para transformar seu
              <span className="text-gradient-primary block mt-2">atendimento no WhatsApp?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground">
              Junte-se a milhares de empresas que já estão multiplicando suas vendas com automação inteligente
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="glass-card p-6 text-center space-y-3">
                <div className="inline-flex p-3 rounded-full bg-primary/10">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Aumente suas Vendas</h3>
                <p className="text-muted-foreground">Automatize seu processo de vendas e multiplique seus resultados</p>
              </div>
              
              <div className="glass-card p-6 text-center space-y-3">
                <div className="inline-flex p-3 rounded-full bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Atendimento 24/7</h3>
                <p className="text-muted-foreground">Nunca mais perca uma oportunidade de venda</p>
              </div>
            </div>
            
            <div className="pt-8">
              <Button size="lg" className="rounded-full text-lg px-8 py-6 h-auto hover:scale-105 transition-transform duration-300">
                COMEÇAR AGORA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}