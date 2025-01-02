import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroTitle } from "@/components/alternative/HeroTitle";
import { ChatPreview } from "@/components/alternative/ChatPreview";
import { FeatureCard } from "@/components/alternative/FeatureCard";
import { SectorCard } from "@/components/alternative/SectorCard";

export function IndexAlternative() {
  return (
    <div className="min-h-screen bg-background">
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