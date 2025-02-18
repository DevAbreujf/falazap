
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Plan } from "@/types/pricing";
import { useState } from "react";

interface PricingCardProps {
  plan: Plan;
  index: number;
  onShowMore: () => void;
}

export function PricingCard({
  plan,
  index,
  onShowMore
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const featuresToShow = Object.entries(plan.features).slice(0, 6);
  
  return (
    <div 
      className="relative group h-full animate-fade-up" 
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-teal-500/10 via-teal-500/5 to-transparent rounded-xl blur-xl transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
      
      <div className={`glass-card relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-teal-500/20 p-8 rounded-2xl backdrop-blur-sm
        ${plan.popular ? 'border-teal-500/50 bg-gradient-to-b from-teal-500/10 to-transparent' : 'border border-white/10 bg-black/20'}
      `}>
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-1.5 rounded-full shadow-lg shadow-teal-500/20">
              <span className="text-sm font-semibold text-white whitespace-nowrap">
                Mais Popular
              </span>
            </div>
          </div>
        )}
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/50 to-transparent rounded-t-xl z-[1]" />
        
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold group-hover:text-teal-400 transition-colors duration-300">
            {plan.name}
          </h3>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm text-muted-foreground">R$</span>
            <span className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
              {plan.price}
            </span>
            <span className="text-muted-foreground self-end mb-1.5">/mês</span>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {featuresToShow.map(([feature, value]) => (
            <div key={feature} className="flex items-center gap-3 group/item hover:bg-teal-500/5 p-2 rounded-lg transition-colors">
              <div className="rounded-full p-1.5 bg-teal-500/10 group-hover/item:bg-teal-500/20 transition-colors">
                <Check className="w-3.5 h-3.5 text-teal-500" />
              </div>
              <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                {typeof value === 'boolean' ? feature : `${value}`}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <Button 
            className={`w-full rounded-full ${
              plan.popular 
                ? 'bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white shadow-lg shadow-teal-500/20' 
                : 'bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20'
            } font-semibold transition-all duration-300 hover:scale-[1.02]`}
          >
            Começar Agora
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-sm text-muted-foreground hover:text-teal-400 transition-colors"
            onClick={onShowMore}
          >
            Ver todos os recursos
          </Button>
        </div>
      </div>
    </div>
  );
}
