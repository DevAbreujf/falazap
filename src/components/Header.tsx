
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
    pricingSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#03201E]/80 backdrop-blur-md shadow-lg shadow-black/5" : ""}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text text-slate-50">Fala</span>
          <span className="text-2xl font-bold text-teal-300">ZAP</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-teal-300 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-teal-300 transition-colors duration-300"
          >
            Recursos
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-teal-300 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-teal-300 transition-colors duration-300"
          >
            Como Funciona
          </a>
          <a 
            href="#transform-results" 
            className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-teal-300 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-teal-300 transition-colors duration-300"
          >
            Resultados
          </a>
          <a 
            href="#pricing" 
            className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-teal-300 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-teal-300 transition-colors duration-300"
          >
            Planos
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button 
              variant="ghost" 
              className="hidden md:inline-flex text-white hover:text-teal-300 hover:bg-teal-400/20 hover:scale-105 transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg hover:shadow-teal-500/10"
            >
              Acessar
            </Button>
          </Link>
          <Button 
            onClick={() => navigate("/auth")} 
            className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </header>;
}
