import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { X } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          A FALAZAP utiliza cookies para melhorar a sua experiência, segurança e lhe entregar um conteúdo personalizado. Para saber mais acesse a nossa{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            política de privacidade
          </Link>
          .
        </p>
        <div className="flex items-center gap-4">
          <Button onClick={acceptCookies} size="sm">
            Aceitar
          </Button>
          <Button variant="ghost" size="icon" onClick={acceptCookies}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}