import { Button } from "@/components/ui/button";
import { MessageSquare, Target, Users2, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function IndexAlternative() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const words = ["vendedor", "atendente", "SDR"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2">
              <span className="text-primary font-medium">Umbler Talk</span>
              <span className="glass-card px-2 py-1 text-xs">Meta Business Partner</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              Clone seu melhor{" "}
              <span className="text-gradient-primary min-w-[200px] inline-block">
                {words[currentWord]}
              </span>{" "}
              com IA
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Tenha Agentes IA treinados para sua empresa, atendendo no WhatsApp, 
              incansavelmente 24 horas por dia.
            </p>

            <Button size="lg" asChild className="bg-[#7C3AED] hover:bg-[#6D28D9]">
              <Link to="/register">
                Experimente grátis →
              </Link>
            </Button>
          </div>

          <div className="flex-1 hidden lg:block">
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex items-start gap-4 bg-[#dcf8c7] p-4 rounded-xl">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Agente IA</span>
                  <p className="text-sm">Boa tarde! Como posso ajudar?</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-[#dcf8c7] p-4 rounded-xl ml-8">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Cliente</span>
                  <p className="text-sm">Oi, tudo ótimo!</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#dcf8c7] p-4 rounded-xl">
                <div className="flex flex-col w-full">
                  <span className="text-xs text-gray-600">Agente IA</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleAudio}
                      className="hover:bg-gray-100 rounded-full p-1"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Play className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <div className="bg-gray-300 h-1 flex-1 rounded-full">
                      <div 
                        className="bg-gray-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: isPlaying ? "100%" : "0%" }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">0:12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
