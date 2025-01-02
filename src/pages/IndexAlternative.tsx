import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Zap, Users, ChartBar, Clock, Shield } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: MessageSquare,
    title: "Atendimento Inteligente",
    description: "Automatize suas conversas com clientes usando IA avançada que entende e responde naturalmente."
  },
  {
    icon: Zap,
    title: "Velocidade nas Vendas",
    description: "Aumente suas conversões com respostas instantâneas e acompanhamento automático de leads."
  },
  {
    icon: Users,
    title: "Multiusuários",
    description: "Gerencie sua equipe com diferentes níveis de acesso e monitore o desempenho em tempo real."
  },
  {
    icon: ChartBar,
    title: "Métricas Detalhadas",
    description: "Acompanhe todos os indicadores importantes do seu negócio em dashboards intuitivos."
  },
  {
    icon: Clock,
    title: "24/7 Disponível",
    description: "Seu negócio funcionando e vendendo mesmo enquanto você descansa."
  },
  {
    icon: Shield,
    title: "Total Segurança",
    description: "Proteção de dados e conformidade com as principais regulamentações de privacidade."
  }
];

const testimonials = [
  {
    name: "Carlos Silva",
    role: "CEO / Tech Solutions",
    content: "O FalaZAP transformou completamente nossa maneira de fazer vendas. Aumentamos em 300% nossa taxa de conversão.",
    avatar: "CS"
  },
  {
    name: "Ana Beatriz",
    role: "Marketing Manager / E-commerce",
    content: "Impressionante como conseguimos escalar nosso atendimento sem perder qualidade. Ferramenta sensacional!",
    avatar: "AB"
  },
  {
    name: "Roberto Santos",
    role: "Diretor Comercial / Imobiliária",
    content: "Nossos corretores adoraram! A automação inteligente nos ajuda a não perder nenhuma oportunidade.",
    avatar: "RS"
  }
];

export default function IndexAlternative() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in backdrop-blur-sm border border-primary/20">
              <Zap className="w-4 h-4" />
              <span>REVOLUCIONE SEU ATENDIMENTO</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-up">
              Transforme conversas em
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent block mt-2">
                vendas automáticas
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground animate-fade-up" style={{animationDelay: "0.1s"}}>
              Automatize seu WhatsApp com inteligência artificial e 
              <span className="text-primary font-semibold"> multiplique seus resultados em piloto automático.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{animationDelay: "0.2s"}}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 text-lg h-auto rounded-full group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  COMEÇAR AGORA
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 group-hover:scale-110 transition-transform duration-300"></div>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Recursos que fazem a
              <span className="text-primary"> diferença</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa para automatizar e escalar seu atendimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card p-8 relative group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <feature.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "300%", label: "Aumento em Vendas" },
              { number: "24/7", label: "Disponibilidade" },
              { number: "1000+", label: "Clientes Satisfeitos" }
            ].map((stat) => (
              <div key={stat.label} className="text-center space-y-4">
                <div className="text-5xl font-bold text-primary">{stat.number}</div>
                <div className="text-xl text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              O que nossos clientes
              <span className="text-primary"> dizem</span>
            </h2>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.name} className="md:basis-1/2 lg:basis-1/3">
                  <div className="glass-card p-6 h-full">
                    <div className="flex flex-col h-full">
                      <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.content}"</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background/80"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">
              Pronto para transformar seu
              <span className="text-primary"> atendimento?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Junte-se a milhares de empresas que já estão usando o FalaZAP
            </p>
            <Button 
              size="lg"
              className="rounded-full px-12 py-6 text-lg h-auto bg-primary hover:bg-primary/90"
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}