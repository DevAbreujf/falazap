import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
const plans = [{
  name: "Básico",
  price: 97,
  features: ["1 número de WhatsApp", "Atendimento automático 24/7", "Funis de venda ilimitados", "Suporte via chat", "Relatórios básicos", "Automações simples"]
}, {
  name: "Profissional",
  price: 197,
  popular: true,
  features: ["2 números de WhatsApp", "Atendimento automático 24/7", "Funis de venda ilimitados", "Suporte prioritário", "Relatórios avançados", "Automações avançadas"]
}, {
  name: "Enterprise",
  price: 297,
  features: ["4 números de WhatsApp", "Atendimento automático 24/7", "Funis de venda ilimitados", "Suporte VIP", "Relatórios personalizados", "Automações ilimitadas"]
}];
export function PricingDialog() {
  return <Dialog>
      <DialogTrigger asChild>
        
      </DialogTrigger>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95vw] max-w-4xl mx-auto p-3 sm:p-4 md:p-6 bg-white backdrop-blur-sm border border-primary/10 overflow-y-auto max-h-[90vh] box-border">
        <DialogHeader className="mb-4 md:mb-6 relative">
          <DialogTitle className="text-center text-lg sm:text-xl md:text-2xl font-bold text-gradient-primary px-8">
            Escolha o plano ideal para seu negócio
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center w-full overflow-x-hidden">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 w-full px-4">
            {plans.map(plan => <div key={plan.name} className={`relative rounded-xl p-6 lg:p-8 mt-4 min-h-[500px] flex flex-col ${plan.popular ? "bg-primary/10 border-2 border-primary" : "bg-black/20 border border-white/10"}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
                      Mais Popular
                    </span>
                  </div>}

                <div className="text-center mb-4 lg:mb-6">
                  <h3 className="text-base lg:text-lg font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="text-2xl lg:text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map(feature => <li key={feature} className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-primary/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm lg:text-base">{feature}</span>
                    </li>)}
                </ul>

                <div className="mt-auto">
                  <Button className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-white/5 hover:bg-white/10 border border-white/20"}`}>
                    Começar Agora
                  </Button>
                </div>
              </div>)}
          </div>

          {/* Mobile Carousel */}
          <div className="block md:hidden w-full px-4">
            <Carousel className="w-full">
              <CarouselContent>
                {plans.map(plan => <CarouselItem key={plan.name}>
                    <div className={`relative rounded-xl p-6 w-full mt-4 min-h-[500px] flex flex-col ${plan.popular ? "bg-primary/10 border-2 border-primary" : "bg-black/20 border border-white/10"}`}>
                      {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
                            Mais Popular
                          </span>
                        </div>}

                      <div className="text-center mb-6">
                        <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm text-muted-foreground">R$</span>
                          <span className="text-2xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">/mês</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map(feature => <li key={feature} className="flex items-center gap-2">
                            <div className="rounded-full p-1 bg-primary/20 flex-shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>)}
                      </ul>

                      <div className="mt-auto">
                        <Button className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-white/5 hover:bg-white/10 border border-white/20"}`}>
                          Começar Agora
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <div className="flex justify-center gap-6 mt-8">
                <CarouselPrevious className="static bg-primary hover:bg-primary/90 translate-x-0" />
                <CarouselNext className="static bg-primary hover:bg-primary/90 translate-x-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}