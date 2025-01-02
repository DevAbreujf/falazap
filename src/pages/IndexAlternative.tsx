import { MessageSquare, Target, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroTitle } from "@/components/alternative/HeroTitle";
import { ChatPreview } from "@/components/alternative/ChatPreview";
import { FeatureCard } from "@/components/alternative/FeatureCard";
import { SectorCard } from "@/components/alternative/SectorCard";

export function IndexAlternative() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 min-h-[700px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full">
          <HeroTitle />
          <ChatPreview />
        </div>

        <div className="text-center text-sm text-muted-foreground mt-12">
          + de 60 mil empresas confiam na Umbler
        </div>
      </section>

      {/* Features Section - Enhanced with better design and animations */}
      <section className="relative py-32 overflow-hidden">
        {/* Gradient background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 via-background to-background" />
        
        {/* Animated background circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl animate-pulse delay-700" />
        
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent mb-6">
              Amplie sua equipe, não os custos
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] mx-auto rounded-full" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in flex-1">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center mb-8">
                <MessageSquare className="w-8 h-8 text-[#9b87f5]" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent mb-4">
                Conversas naturais e inteligentes
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Sua inteligência artificial será capaz de qualificar leads, agendar reuniões, tirar dúvidas e direcionar clientes ao checkout ou ao vendedor adequado, sempre interagindo de forma precisa e empática.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in delay-150 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center mb-8">
                <Users2 className="w-8 h-8 text-[#9b87f5]" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent mb-4">
                Enquanto sua equipe está Off os Agentes IA estão On
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Com IA, sua empresa pode crescer sem limites e sem comprometer o orçamento. Seu novo time virtual opera incansavelmente 24/7, atendendo milhares de leads e clientes com bom humor e vontade de trabalhar.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in delay-300 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-[#9b87f5]" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent mb-4">
                Tráfego Pago + Agente IA
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Aumente suas conversões substituindo landing pages por Agentes IA em suas campanhas de tráfego pago. Na própria Umbler, a maior parte do nosso tráfego pago no Instagram já vai direto para o WhatsApp, onde nossos Agentes IA, treinados para atuar como SDRs, fazem o show.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="container mx-auto px-4 py-24 relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 to-transparent opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#6D28D9]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col lg:flex-row items-start gap-12 backdrop-blur-sm">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] bg-clip-text text-transparent">
                Diversos setores sendo transformados com IA
              </h2>
              <p className="text-lg text-muted-foreground">
                Descubra como a IA está revolucionando diferentes áreas de negócio
              </p>
            </div>

            <div className="space-y-6 relative">
              {/* Decorative line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#7C3AED] to-transparent" />
              
              {[
                {
                  title: "Saúde",
                  description: "Agentes IA podem realizar a triagem inicial de pacientes."
                },
                {
                  title: "Educação",
                  description: "Suporte 24/7 para alunos e gestão de matrículas."
                },
                {
                  title: "Infoproduto e SaaS",
                  description: "Qualificação de leads e suporte técnico automatizado."
                },
                {
                  title: "Times de vendas",
                  description: "Pré-qualificação e agendamento de demonstrações."
                },
                {
                  title: "Suporte ao cliente",
                  description: "Atendimento de primeiro nível e direcionamento."
                }
              ].map((sector) => (
                <SectorCard
                  key={sector.title}
                  title={sector.title}
                  description={sector.description}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 lg:sticky lg:top-8">
            <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <img 
                src="/placeholder.svg" 
                alt="Chat Interface" 
                className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass-card p-8 rounded-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A corrida da{" "}
            <span className="text-gradient-primary">Inteligência Artificial</span>
            {" "}já começou
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Não fique para trás, é hora de agir!
          </p>
          <Button size="lg" asChild>
            <Link to="/register">
              Teste grátis por 7 dias
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
