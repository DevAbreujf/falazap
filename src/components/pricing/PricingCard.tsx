import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Plan } from "@/types/pricing";

interface PricingCardProps {
  plan: Plan;
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <div
      className="relative group h-full"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100"></div>
      <div 
        className={`glass-card h-full relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/20 animate-fade-up flex flex-col
          ${plan.popular ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-transparent' : 'bg-black/20'}
        `}
      >
        {plan.popular && (
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-primary to-primary/80 backdrop-blur-sm px-8 py-2 rounded-full shadow-lg shadow-primary/20">
              <span className="text-sm font-semibold text-primary-foreground whitespace-nowrap">
                Mais Popular
              </span>
            </div>
          </div>
        )}
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-t-2xl z-[1]"></div>
        
        <div className="text-center mb-8 p-8 bg-gradient-to-b from-black/20 to-transparent">
          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
            {plan.name}
          </h3>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm text-muted-foreground">R$</span>
            <span className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {plan.price}
            </span>
            <span className="text-muted-foreground self-end mb-3">/mês</span>
          </div>
        </div>

        <div className="flex-grow px-8">
          <ul className="space-y-4 mb-8">
            {Object.entries(plan.features).map(([feature, value]) => (
              <li key={feature} className="flex items-center gap-3 group/item hover:bg-primary/5 p-2 rounded-lg transition-colors">
                <div className="rounded-full p-1.5 bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                  <Check className="text-primary w-4 h-4" />
                </div>
                <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                  {typeof value === 'boolean' ? feature : `${value}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 pt-0">
          <Button 
            className={`w-full h-12 ${
              plan.popular 
                ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' 
                : 'bg-primary/10 hover:bg-primary/20 border border-primary/20'
            } rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]`}
            variant={plan.popular ? "default" : "ghost"}
            size="lg"
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </div>
  );
}