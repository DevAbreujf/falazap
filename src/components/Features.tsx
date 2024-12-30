import { Bookmark, Zap, MessageSquare, PiggyBank, Clock, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState, useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";

const features = [
  {
    icon: Bookmark,
    title: "Simplicidade",
    description: "Pensado para uso de quem não é profissional com tecnologia",
    bgColor: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: Zap,
    title: "Praticidade",
    description: "Rápido de configurar e já começar a vender.",
    bgColor: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Sparkles,
    title: "Eficiência",
    description: "Aumento exponencial de suas vendas por WhatsApp.",
    bgColor: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: MessageSquare,
    title: "Conexão",
    description: "A inteligência artificial reconhece as necessidades do seu cliente e gera conexão para converter mais vendas.",
    bgColor: "from-orange-500/20 to-amber-500/20"
  },
  {
    icon: PiggyBank,
    title: "Custo benefício",
    description: "O chatbot mais avançado do mercado, e com o menor preço.",
    bgColor: "from-rose-500/20 to-red-500/20"
  },
  {
    icon: Clock,
    title: "Automatização 24h/dia",
    description: "O chatbot vende de forma ininterrupta e permite você focar nas atividades que precisa fazer.",
    bgColor: "from-indigo-500/20 to-violet-500/20"
  }
];

export function Features() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const plugin = useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: true }),
    []
  );

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-primary text-sm font-medium mb-4">
            RECURSOS PRINCIPAIS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Descubra como o FalaZAP pode
            <br />
            <span className="text-gradient-primary">
              transformar seu negócio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa para automatizar e potencializar suas vendas no WhatsApp
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={feature.title} className="md:basis-1/1 lg:basis-1/1">
                  <div className="glass-card p-8 h-full min-h-[300px] transition-all duration-500 hover:translate-y-[-8px] relative group overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
                          <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-full backdrop-blur-sm border border-white/5">
                            <feature.icon className="w-12 h-12 text-primary" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6 text-center">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-muted-foreground/90 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="mt-8 flex items-center justify-center">
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
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
