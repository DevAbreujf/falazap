
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg shadow-teal-500/5" : ""
    }`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">Fala</span>
          <span className="text-2xl font-bold text-[#047C6B]">ZAP</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-[#047C6B] transition-colors">
            Recursos
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-[#047C6B] transition-colors">
            Como Funciona
          </a>
          <a href="#transform-results" className="text-sm font-medium text-gray-600 hover:text-[#047C6B] transition-colors">
            Resultados
          </a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-[#047C6B] transition-colors">
            Planos
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" className="hidden md:inline-flex hover:text-[#047C6B] hover:bg-[#047C6B]/5">
              Acessar
            </Button>
          </Link>
          <Button 
            onClick={() => navigate("/auth")} 
            className="bg-gradient-to-r from-[#047C6B] to-[#06A693] hover:from-[#06A693] hover:to-[#03D6BC] text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </header>
  );
}
