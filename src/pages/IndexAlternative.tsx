import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const IndexAlternative = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 bg-black/10 backdrop-blur-sm w-fit px-4 py-2 rounded-full">
              <img src="/lovable-uploads/7d11ad3e-b69e-45c8-afa1-e838c02888cb.png" alt="Umbler Talk" className="h-8" />
              <span className="text-sm font-medium">Meta Business Partner</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold">
              Clone seu melhor{" "}
              <span className="text-gradient-primary">atendente</span> com IA
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Tenha Agentes IA treinados para sua empresa, atendendo no WhatsApp, incansavelmente 24 horas por dia.
            </p>
            
            <Button size="lg" asChild>
              <Link to="/register">
                Experimente grátis
              </Link>
            </Button>
          </div>
          
          <div className="flex-1">
            <img 
              src="/lovable-uploads/7d11ad3e-b69e-45c8-afa1-e838c02888cb.png" 
              alt="Chat Interface"
              className="w-full max-w-[500px] mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16">
          Amplie sua equipe, não os custos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 space-y-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Conversas naturais e inteligentes</h3>
            <p className="text-muted-foreground">
              Sua inteligência artificial será capaz de qualificar leads, agendar reuniões, tirar dúvidas e direcionar clientes ao checkout ou ao vendedor adequado.
            </p>
          </div>
          
          <div className="glass-card p-6 space-y-4">
            <Users className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Enquanto sua equipe está Off os Agentes IA estão On</h3>
            <p className="text-muted-foreground">
              Com IA, sua empresa pode crescer sem limites e sem comprometer o orçamento. Seu novo time virtual opera incansavelmente 24/7.
            </p>
          </div>
          
          <div className="glass-card p-6 space-y-4">
            <Target className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Tráfego Pago + Agente IA</h3>
            <p className="text-muted-foreground">
              Aumente suas conversões substituindo landing pages por Agentes IA em suas campanhas de tráfego pago.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Diversos setores sendo transformados com IA
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Saúde</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Educação</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Infoproduto e SaaS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Times de vendas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Suporte ao cliente</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Mercado Imobiliário</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <img 
              src="/lovable-uploads/6c457b92-0187-4c6f-a209-33b6b6ab913b.png" 
              alt="Chat Example"
              className="w-full max-w-[400px] mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Pague por mês ou ano e cancele quando quiser
            </h2>
            <p className="text-lg text-muted-foreground">
              Sem amarras e sem precisar dar explicações
            </p>
          </div>
          
          <div className="flex-1">
            <div className="glass-card p-8 space-y-6">
              <div>
                <div className="text-2xl font-bold">R$ 109 <span className="text-lg font-normal">por agente/mês no plano anual</span></div>
                <div className="text-sm text-muted-foreground">R$ 129 no plano mensal</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Agentes IA (2.000 mensagens GPT4 incluídas em novas contas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Até 3 números de WhatsApp + 1 por agente</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>ChatBot de fluxos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Relatórios de conversas de humanos e IAs</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Iniciar com 7 dias grátis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h2 className="text-3xl lg:text-5xl font-bold">
            A corrida da{" "}
            <span className="text-gradient-primary">Inteligência Artificial</span>
            {" "}já começou
          </h2>
          <p className="text-lg text-muted-foreground">
            Não fique para trás, é hora de agir!
          </p>
          <Button size="lg">
            Teste grátis por 7 dias
          </Button>
        </div>
      </section>
    </div>
  );
};

export default IndexAlternative;