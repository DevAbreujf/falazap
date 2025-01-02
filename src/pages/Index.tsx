import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Steps } from "@/components/Steps";
import { TransformResults } from "@/components/TransformResults";
import { HighScale } from "@/components/HighScale";
import { Functionalities } from "@/components/Functionalities";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { SalesCTA } from "@/components/SalesCTA";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { HeroTitle } from "@/components/alternative/HeroTitle";
import { ChatPreview } from "@/components/alternative/ChatPreview";
import { MessageSquare, Target, Users2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full">
        <section className="container mx-auto px-4 pt-32 pb-16 min-h-[700px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full">
            <HeroTitle />
            <ChatPreview />
          </div>
        </section>
        
        {/* Features Section - Moved from IndexAlternative */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 via-background to-background" />
          
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

        <Hero />
        <Features />
        <Steps />
        <TransformResults />
        <HighScale />
        <Functionalities />
        <Pricing />
        <FAQ />
        <SalesCTA />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;