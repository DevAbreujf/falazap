import { Button } from "./ui/button";
import { ArrowRight, Users, TrendingUp, Clock } from "lucide-react";
export function HighScale() {
  return <section className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Disponível 24/7</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Altíssima escala para seu negócio
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              O FalaZAP atende uma quantia ilimitada de clientes simultâneos,
              multiplicando a produtividade e os seus resultados de vendas,
              fechando diversos negócios ao mesmo tempo.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-500">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Atendimento Simultâneo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Atenda centenas de clientes ao mesmo tempo
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-500">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Crescimento Exponencial</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Aumente suas vendas de forma escalável
                </p>
              </div>
            </div>
            
            <Button size="lg" className="rounded-full group animate-fade-up bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700" style={{
            animationDelay: "0.2s"
          }}>
              QUERO VENDER MAIS
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="lg:w-1/2 animate-fade-up" style={{
          animationDelay: "0.3s"
        }}>
            <div className="relative">
              <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full"></div>
              <div className="relative bg-gradient-to-br from-background/80 to-background p-2 rounded-2xl border border-white/10 shadow-2xl">
                <img src="/lovable-uploads/70cbc251-19a9-42a6-bc5c-68bf2da9312f.png" alt="Dashboard do FalaZAP" className="w-full rounded-xl shadow-lg" />
                <div className="absolute -bottom-4 -right-4 bg-teal-500/10 backdrop-blur-sm border border-teal-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-teal-500">Sistema ativo 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}