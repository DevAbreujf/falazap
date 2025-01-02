import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-sm" : ""}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Fala</span>
          <span className="text-2xl font-bold">ZAP</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Recursos</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">Como Funciona</a>
          <a href="#transform-results" className="text-sm font-medium hover:text-primary transition-colors">Resultados</a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Planos</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" className="hidden md:inline-flex">
              Acessar
            </Button>
          </Link>
          <Button onClick={() => navigate("/auth")}>
            Começar Agora
          </Button>
        </div>
      </div>
    </header>
  );
}