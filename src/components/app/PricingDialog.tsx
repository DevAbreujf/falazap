import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const plans = [
  {
    name: "Básico",
    price: 97,
    features: [
      "1 número de WhatsApp",
      "Atendimento automático 24/7",
      "Funis de venda ilimitados",
      "Suporte via chat",
      "Relatórios básicos",
      "Automações simples",
      "1 usuário",
      "Treinamento básico",
      "Integrações básicas"
    ]
  },
  {
    name: "Profissional",
    price: 197,
    popular: true,
    features: [
      "2 números de WhatsApp",
      "Atendimento automático 24/7",
      "Funis de venda ilimitados",
      "Suporte prioritário",
      "Relatórios avançados",
      "Automações avançadas",
      "3 usuários",
      "Treinamento completo",
      "Integração com CRM"
    ]
  },
  {
    name: "Enterprise",
    price: 297,
    features: [
      "4 números de WhatsApp",
      "Atendimento automático 24/7",
      "Funis de venda ilimitados",
      "Suporte VIP",
      "Relatórios personalizados",
      "Automações ilimitadas",
      "Usuários ilimitados",
      "Treinamento VIP",
      "Integrações premium"
    ]
  }
];

export function PricingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="hover-glow bg-primary/90 hover:bg-primary transition-all duration-300 mb-2">
          Upgrade de Plano
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] p-4 md:p-8 bg-[#1A1F2C]/95 backdrop-blur-sm border border-primary/10">
        <DialogHeader className="mb-4 md:mb-8">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gradient-primary text-center px-2">
            Escolha o plano ideal para seu negócio
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center w-full">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 w-full">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                  plan.popular
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-black/20 border border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="rounded-full p-1 bg-primary/20">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-white/5 hover:bg-white/10 border border-white/20"
                  }`}
                >
                  Começar Agora
                </Button>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="block md:hidden w-full">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {plans.map((plan) => (
                  <CarouselItem key={plan.name} className="pl-1 w-full flex items-center justify-center">
                    <div
                      className={`relative rounded-xl p-6 h-full mx-auto w-[90%] max-w-[320px] transition-all duration-300 ${
                        plan.popular
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-black/20 border border-white/10"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary px-4 py-1 rounded-full text-sm font-medium">
                            Mais Popular
                          </span>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm text-muted-foreground">R$</span>
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">/mês</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <div className="rounded-full p-1 bg-primary/20">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button 
                        className={`w-full ${
                          plan.popular
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-white/5 hover:bg-white/10 border border-white/20"
                        }`}
                      >
                        Começar Agora
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="static bg-primary hover:bg-primary/90 translate-x-0" />
                <CarouselNext className="static bg-primary hover:bg-primary/90 translate-x-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}