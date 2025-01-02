import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plan } from "@/types/pricing";

interface PricingProps {
  plans: Plan[];
}

export function Pricing({ plans }: PricingProps) {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Planos que cabem no seu bolso</h2>
          <p className="text-xl text-muted-foreground">
            Escolha o plano ideal para o seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                {Object.entries(plan.features).map(([feature, value]) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )
                    ) : (
                      <>
                        <Check className="w-5 h-5 text-primary" />
                        <span>{value}</span>
                      </>
                    )}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full py-6 h-auto text-lg font-semibold ${
                  plan.popular
                    ? "bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
                    : "bg-white/5 hover:bg-white/10 border border-white/20 hover:border-primary/50"
                }`}
              >
                Comprar Plano
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
