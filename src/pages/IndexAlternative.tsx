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
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <HeroTitle />
          <ChatPreview />
        </div>

        <div className="text-center text-sm text-muted-foreground mt-12">
          + de 60 mil empresas confiam na Umbler
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Amplie sua equipe, não os custos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            Icon={MessageSquare}
            title="Conversas naturais e inteligentes"
            description="Sua inteligência artificial será capaz de qualificar leads, agendar reuniões e direcionar clientes ao checkout."
          />
          <FeatureCard
            Icon={Users2}
            title="Enquanto sua equipe está Off os Agentes IA estão On"
            description="Com IA, sua empresa pode crescer sem limites e sem comprometer o orçamento."
          />
          <FeatureCard
            Icon={Target}
            title="Tráfego Pago + Agente IA"
            description="Aumente suas conversões substituindo landing pages por Agentes IA em suas campanhas."
          />
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