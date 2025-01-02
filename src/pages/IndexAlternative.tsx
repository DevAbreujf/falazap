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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 bg-white/5 backdrop-blur-sm">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          Amplie sua equipe, não os custos
        </h2>

        <div className="grid md:grid-cols-3 gap-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center mb-8">
              <MessageSquare className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Conversas naturais e inteligentes
            </h3>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Sua inteligência artificial será capaz de qualificar leads, agendar reuniões, tirar dúvidas e direcionar clientes ao checkout ou ao vendedor adequado, sempre interagindo de forma precisa e empática.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center mb-8">
              <Users2 className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Enquanto sua equipe está Off os Agentes IA estão On
            </h3>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Com IA, sua empresa pode crescer sem limites e sem comprometer o orçamento. Seu novo time virtual opera incansavelmente 24/7, atendendo milhares de leads e clientes com bom humor e vontade de trabalhar.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center mb-8">
              <Target className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Tráfego Pago + Agente IA
            </h3>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Aumente suas conversões substituindo landing pages por Agentes IA em suas campanhas de tráfego pago. Na própria Umbler, a maior parte do nosso tráfego pago no Instagram já vai direto para o WhatsApp, onde nossos Agentes IA, treinados para atuar como SDRs, fazem o show.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Diversos setores sendo transformados com IA
            </h2>

            <div className="space-y-6">
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

          <div className="flex-1">
            <div className="glass-card p-6 rounded-2xl">
              <img 
                src="/placeholder.svg" 
                alt="Chat Interface" 
                className="w-full rounded-lg"
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