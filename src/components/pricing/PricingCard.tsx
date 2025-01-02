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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100"></div>
      <div className={`glass-card h-full p-8 relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/20 animate-fade-up flex flex-col ${plan.popular ? 'border-primary/50' : ''}`}>
        {plan.popular && (
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-primary backdrop-blur-sm px-8 py-2 rounded-full shadow-lg shadow-primary/20">
              <span className="text-sm font-semibold text-primary-foreground whitespace-nowrap">
                Mais Popular
              </span>
            </div>
          </div>
        )}
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-t-2xl z-[1]"></div>
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
            {plan.name}
          </h3>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm text-muted-foreground">R$</span>
            <span className="text-5xl font-bold text-gradient-primary">{plan.price}</span>
            <span className="text-muted-foreground">/mês</span>
          </div>
        </div>

        <div className="flex-grow">
          <ul className="space-y-4 mb-8">
            {Object.entries(plan.features).map(([feature, value]) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="rounded-full p-1.5 bg-primary/10">
                  <Check className="text-primary w-4 h-4" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {typeof value === 'boolean' ? feature : `${value}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button 
          className={`w-full ${
            plan.popular 
              ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' 
              : 'bg-primary/10 hover:bg-primary/20 border border-primary/20'
          }`}
          variant={plan.popular ? "default" : "ghost"}
          size="lg"
        >
          Começar Agora
        </Button>
      </div>
    </div>
  );
}