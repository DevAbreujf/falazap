import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroTitle() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["vendedor", "atendente"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 space-y-8 relative">
      <div className="inline-flex items-center gap-3 glass-card px-6 py-3 hover:scale-105 transition-transform duration-300">
        <span className="text-primary font-semibold tracking-wide">Umbler Talk</span>
        <div className="h-4 w-[1px] bg-white/10" />
        <span className="glass-card px-3 py-1.5 text-xs font-medium rounded-full bg-white/5">Meta Business Partner</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        Clone seu melhor{" "}
        <span className="text-gradient-primary min-w-[200px] inline-block relative">
          {words[currentWord]}
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-violet-300 opacity-50 blur-sm" />
        </span>{" "}
        com IA
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
        Tenha Agentes IA treinados para sua empresa, atendendo no WhatsApp, 
        incansavelmente <span className="text-primary font-medium">24 horas por dia</span>.
      </p>

      <Button 
        size="lg" 
        asChild 
        className="bg-[#7C3AED] hover:bg-[#6D28D9] hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/20"
      >
        <Link to="/register" className="gap-2">
          Experimente grátis
          <span className="animate-pulse">→</span>
        </Link>
      </Button>

      <div className="absolute -z-10 top-20 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-0 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
    </div>
  );
}