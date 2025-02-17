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
  return <div className="relative group h-full" style={{
    animationDelay: `${index * 0.1}s`
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-xl blur-xl transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
      
      <div className={`glass-card relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/20 animate-fade-up flex flex-col max-w-sm mx-auto
          ${plan.popular ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-transparent' : 'bg-black/20'}
        `}>
        {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-primary to-primary/80 backdrop-blur-sm px-6 py-1.5 rounded-full shadow-lg shadow-primary/20">
              <span className="text-sm font-semibold text-primary-foreground whitespace-nowrap">
                Mais Popular
              </span>
            </div>
          </div>}
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-t-xl z-[1]" />
        
        <div className="text-center p-6 bg-gradient-to-b from-black/20 to-transparent bg-zinc-50">
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
            {plan.name}
          </h3>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm text-muted-foreground">R$</span>
            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {plan.price}
            </span>
            <span className="text-muted-foreground self-end mb-2">/mês</span>
          </div>
        </div>

        <div className="flex-grow px-6 bg-zinc-300 hover:bg-zinc-200">
          <ul className="space-y-3 mb-6">
            {featuresToShow.map(([feature, value]) => <li key={feature} className="flex items-center gap-2 group/item hover:bg-primary/5 p-1.5 rounded-lg transition-colors">
                <div className="rounded-full p-1 bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                  <Check className="text-primary w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                  {typeof value === 'boolean' ? feature : `${value}`}
                </span>
              </li>)}
          </ul>
        </div>

        <div className="p-6 pt-0 space-y-3 bg-gray-400 hover:bg-gray-300">
          <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-primary/10 hover:bg-primary/20 border border-primary/20'} rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]`} variant={plan.popular ? "default" : "ghost"}>
            Começar Agora
          </Button>
          
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary transition-colors" onClick={onShowMore}>
            Ver todos os recursos
          </Button>
        </div>
      </div>
    </div>;
}