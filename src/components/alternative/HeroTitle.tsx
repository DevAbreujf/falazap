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
  );
}