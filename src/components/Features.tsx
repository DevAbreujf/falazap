import { Bookmark, Zap, MessageSquare, PiggyBank, Clock, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const features = [
  {
    icon: Bookmark,
    title: "Simplicidade Absoluta",
    description: "Interface intuitiva pensada para todos, independente do nível técnico",
    bgColor: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: Zap,
    title: "Praticidade Instantânea",
    description: "Configure em minutos e comece a vender automaticamente",
    bgColor: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Sparkles,
    title: "Resultados Exponenciais",
    description: "Multiplique suas vendas com automação inteligente e personalizada",
    bgColor: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: MessageSquare,
    title: "Conexão Inteligente",
    description: "IA avançada que entende e se conecta com seus clientes para máxima conversão",
    bgColor: "from-orange-500/20 to-amber-500/20"
  },
  {
    icon: PiggyBank,
    title: "Investimento Inteligente",
    description: "O melhor custo-benefício do mercado para automatização de vendas",
    bgColor: "from-rose-500/20 to-red-500/20"
  },
  {
    icon: Clock,
    title: "Disponibilidade Total",
    description: "Vendas automáticas 24/7 enquanto você foca no crescimento do negócio",
    bgColor: "from-indigo-500/20 to-violet-500/20"
  }
];

export function Features() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [autoplayPlugin] = useState(() =>
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
    })
  );

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(28,216,182,0.3),rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>RECURSOS REVOLUCIONÁRIOS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Descubra como o FalaZAP pode
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              transformar seu negócio
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa para automatizar e potencializar suas vendas no WhatsApp
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplayPlugin]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {features.map((feature, index) => (
                <CarouselItem key={feature.title} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="glass-card p-8 h-full min-h-[300px] relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
                    
                    <div className="relative z-10">
                      <div className="mb-8">
                        <div className="relative inline-block">
                          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                          <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-4 rounded-full backdrop-blur-sm border border-white/5 group-hover:border-primary/20 transition-all duration-300">
                            <feature.icon className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                        {feature.title}
                      </h3>
                      
                      <p className="text-lg text-muted-foreground/90 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              <CarouselPrevious className="static translate-y-0 mx-4" />
              
              <div className="flex gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      current === index 
                        ? "bg-primary w-8" 
                        : "bg-primary/20 hover:bg-primary/40"
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
              
              <CarouselNext className="static translate-y-0 mx-4" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}