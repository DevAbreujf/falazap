
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up">
      <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-lg border-t border-white/10">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <Cookie className="h-6 w-6 text-teal-400" />
                </div>
              </div>
              <p className="text-sm text-white/90">
                A FALAZAP utiliza cookies para melhorar a sua experiência, segurança e lhe entregar um conteúdo personalizado. Para saber mais acesse a nossa{" "}
                <Link to="/privacy" className="text-teal-400 hover:text-teal-300 underline decoration-teal-400/30">
                  política de privacidade
                </Link>
                .
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Button 
                onClick={acceptCookies} 
                size="sm"
                className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white shadow-lg shadow-teal-500/20 rounded-full px-6"
              >
                Aceitar
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={acceptCookies}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
