import { Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Plan } from "@/types/pricing";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PricingDialogProps {
  plans: Plan[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingDialog({ plans, open, onOpenChange }: PricingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-8">
            Escolha o plano ideal para seu negócio
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-hidden overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <Carousel className="w-full">
            <CarouselContent>
              {plans.map((plan) => (
                <CarouselItem key={plan.name}>
                  <div
                    className={`relative rounded-xl p-6 min-h-[500px] mx-auto max-w-sm ${
                      plan.popular
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-black/20 border border-white/10"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                          Mais Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm text-muted-foreground">R$</span>
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {Object.entries(plan.features).map(([feature, value]) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="rounded-full p-1.5 bg-primary/20 flex-shrink-0">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm">
                            {typeof value === 'boolean' ? feature : value}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
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
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}