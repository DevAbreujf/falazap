import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { PricingDialog } from "@/components/app/PricingDialog";
import { Plan } from "@/types/pricing";

const plans: Plan[] = [
  {
    name: "Básico",
    price: 97,
    features: {
      "Números WhatsApp": "1 número",
      "Atendimento 24/7": true,
      "Funis de venda": "Ilimitados",
      "Suporte": "Chat",
      "Relatórios": "Básicos",
      "Automações": "Simples",
      "Usuários": "1 usuário",
      "Treinamento": "Básico",
      "Integrações": "Básicas",
      "API Personalizada": false,
      "Consultoria": false,
      "White Label": false
    }
  },
  {
    name: "Profissional",
    price: 197,
    popular: true,
    features: {
      "Números WhatsApp": "2 números",
      "Atendimento 24/7": true,
      "Funis de venda": "Ilimitados",
      "Suporte": "Prioritário",
      "Relatórios": "Avançados",
      "Automações": "Avançadas",
      "Usuários": "3 usuários",
      "Treinamento": "Completo",
      "Integrações": "Com CRM",
      "API Personalizada": true,
      "Consultoria": false,
      "White Label": false
    }
  },
  {
    name: "Enterprise",
    price: 297,
    features: {
      "Números WhatsApp": "4 números",
      "Atendimento 24/7": true,
      "Funis de venda": "Ilimitados",
      "Suporte": "VIP",
      "Relatórios": "Personalizados",
      "Automações": "Ilimitadas",
      "Usuários": "Ilimitados",
      "Treinamento": "VIP",
      "Integrações": "Premium",
      "API Personalizada": true,
      "Consultoria": true,
      "White Label": true
    }
  }
];

export default function Auth() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Animated background circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Navigation header - Ajustado com flex-col no mobile */}
      <div className="absolute top-8 left-8 right-8 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-0">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <Home className="w-4 h-4 transition-transform group-hover:animate-bounce" />
          Voltar para página inicial
        </Link>

        <div className="w-full sm:w-auto flex justify-center">
          <PricingDialog 
            plans={plans}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        </div>
      </div>

      {/* Main content container */}
      <div className="flex w-full">
        {/* Left side - Auth form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center p-8 pt-32 sm:pt-24">
          <div className="w-full max-w-md">
            <div 
              className="glass-card relative w-full"
              style={{
                minHeight: "600px",
                transformStyle: "preserve-3d",
                perspective: "1000px",
                transition: "transform 1s"
              }}
            >
              {/* Login side */}
              <div 
                className={`absolute inset-0 w-full transition-all duration-500`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  opacity: isFlipped ? "0" : "1",
                  pointerEvents: isFlipped ? "none" : "auto"
                }}
              >
                <LoginForm onFlip={() => setIsFlipped(true)} />
              </div>

              {/* Register side */}
              <div 
                className={`absolute inset-0 w-full transition-all duration-500`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
                  opacity: isFlipped ? "1" : "0",
                  pointerEvents: isFlipped ? "auto" : "none"
                }}
              >
                <RegisterForm onFlip={() => setIsFlipped(false)} />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Images */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 items-center justify-center p-8">
          <div className="relative w-full max-w-2xl">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Pessoa usando computador"
              className="w-full h-auto rounded-2xl shadow-xl glass-card p-2"
            />
            <div className="absolute -bottom-4 -left-4 w-32 h-32">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Tecnologia"
                className="w-full h-full object-cover rounded-lg shadow-lg glass-card p-1"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                alt="Circuito"
                className="w-full h-full object-cover rounded-lg shadow-lg glass-card p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
