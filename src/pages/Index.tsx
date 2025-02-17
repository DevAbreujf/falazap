
import { Header } from "@/components/Header";
import { Steps } from "@/components/Steps";
import { TransformResults } from "@/components/TransformResults";
import { HighScale } from "@/components/HighScale";
import { Functionalities } from "@/components/Functionalities";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { SalesCTA } from "@/components/SalesCTA";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { ComparisonSection } from "@/components/ComparisonSection";
import { PageBreadcrumb } from "@/components/app/navigation/PageBreadcrumb";
import { MessageSquare, Target, Users2, Brain, ScrollText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";

const Index = () => {
  const [role, setRole] = useState("vendedor");

  // Otimizado com useEffect e clearInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setRole(prev => prev === "vendedor" ? "atendente" : "vendedor");
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Usando useMemo para valores computados
  const heroTitle = useMemo(() => {
    return (
      <>
        Clone seu melhor{" "}
        <span className="relative">
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] bg-clip-text text-transparent transition-all duration-500 font-extrabold drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            {role}
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#7C3AED] shadow-[0_0_10px_2px_rgba(124,58,237,0.7)]"></span>
        </span>
        {" "}com AI
      </>
    );
  }, [role]);

  return (
    <div className="min-h-screen w-full">
      <Helmet>
        <title>FalaZAP - Clone seu melhor vendedor com AI</title>
        <meta name="description" content="Transforme seu atendimento com nossa solução de IA. Atenda mais clientes, qualifique leads e aumente suas vendas 24/7." />
        <meta name="keywords" content="AI, atendimento, vendas, automação, chatbot, whatsapp" />
        <meta property="og:title" content="FalaZAP - Clone seu melhor vendedor com AI" />
        <meta property="og:description" content="Transforme seu atendimento com nossa solução de IA. Atenda mais clientes, qualifique leads e aumente suas vendas 24/7." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />
      <main className="w-full" role="main">
        <div className="container mx-auto px-4">
          <PageBreadcrumb />
        </div>
        
        <section 
          className="container mx-auto px-4 pt-32 pb-16 min-h-[700px] bg-[#135454]"
          aria-label="Hero Section"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                {heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                Transforme seu atendimento com nossa solução de IA. Atenda mais clientes, 
                qualifique leads e aumente suas vendas 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] w-full sm:w-auto"
                  onClick={() => console.log('Começar Agora clicked')}
                  aria-label="Começar Agora"
                >
                  Começar Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => console.log('Ver Demonstração clicked')}
                  aria-label="Ver Demonstração"
                >
                  Ver Demonstração
                </Button>
              </div>
            </div>
            <div className="relative w-full aspect-square p-8">
              <img 
                src="/placeholder.svg" 
                alt="AI Assistant Illustration" 
                className="w-4/5 h-4/5 object-contain animate-float mx-auto" 
                loading="lazy"
                width="500"
                height="500"
              />
            </div>
          </div>
        </section>

        <ComparisonSection />
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
