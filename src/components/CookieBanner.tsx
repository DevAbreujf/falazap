
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-up">
      <div className="container mx-auto">
        <div className="bg-[#1A2C38] backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl flex items-center justify-between gap-8">
          <p className="text-white/90 text-sm">
            Utilizamos cookies para melhorar sua experiência em nosso site. 
            Ao continuar navegando, você concorda com nossa{" "}
            <a href="/privacy" className="text-teal-400 hover:text-teal-300 underline">
              Política de Privacidade
            </a>
            .
          </p>
          
          <div className="flex items-center gap-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => setIsVisible(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="bg-gradient-to-r from-[#047C6B] to-[#06A693] hover:from-[#06A693] hover:to-[#03D6BC] text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 whitespace-nowrap"
            >
              Aceitar Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
