import { Button } from "@/components/ui/button";
import { MessageSquare, Target, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

export function IndexAlternative() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2">
              <span className="text-primary font-medium">FalaZAP</span>
              <span className="glass-card px-2 py-1 text-xs">Business Partner</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              Clone seu melhor{" "}
              <span className="text-gradient-primary">atendente</span> com IA
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Tenha Agentes IA treinados para sua empresa, atendendo no WhatsApp, 
              incansavelmente 24 horas por dia.
            </p>

            <Button size="lg" asChild>
              <Link to="/register">
                Experimente grátis
              </Link>
            </Button>
          </div>

          <div className="flex-1">
            <div className="glass-card p-6 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-start gap-4 glass-card p-4 rounded-xl">
                  <span className="text-primary">Agente IA</span>
                  <p className="text-sm">Boa tarde! Como posso ajudar?</p>
                </div>
                <div className="flex items-start gap-4 glass-card p-4 rounded-xl ml-8">
                  <span className="text-primary">Cliente</span>
                  <p className="text-sm">Gostaria de saber mais sobre os planos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Amplie sua equipe, não os custos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <MessageSquare className="text-primary h-8 w-8" />
            <h3 className="text-xl font-semibold">Conversas naturais e inteligentes</h3>
            <p className="text-muted-foreground">
              Sua inteligência artificial será capaz de qualificar leads, agendar reuniões e 
              direcionar clientes ao checkout.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <Users2 className="text-primary h-8 w-8" />
            <h3 className="text-xl font-semibold">Enquanto sua equipe está Off os Agentes IA estão On</h3>
            <p className="text-muted-foreground">
              Com IA, sua empresa pode crescer sem limites e sem comprometer o orçamento.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <Target className="text-primary h-8 w-8" />
            <h3 className="text-xl font-semibold">Tráfego Pago + Agente IA</h3>
            <p className="text-muted-foreground">
              Aumente suas conversões substituindo landing pages por Agentes IA em suas campanhas.
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
                <div key={sector.title} className="glass-card p-4 rounded-xl hover:bg-primary/5 transition-colors">
                  <h3 className="text-lg font-semibold text-primary">{sector.title}</h3>
                  <p className="text-muted-foreground">{sector.description}</p>
                </div>
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