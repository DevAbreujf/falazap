
import { Check, Zap, Users, Building } from "lucide-react";
import { Button } from "../ui/button";
import { Plan } from "@/types/pricing";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const PlanIcon = plan.name === "Enterprise" 
    ? Building 
    : plan.name === "Profissional" 
      ? Users 
      : Zap;
  
  return (
    <div 
      className="relative group h-full animate-fade-up" 
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Effects */}
      <div className={`absolute inset-0 bg-gradient-to-b from-teal-500/20 via-teal-500/10 to-transparent rounded-2xl blur-2xl transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
      
      <div className={`relative transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-teal-500/30 p-6 rounded-2xl backdrop-blur-sm bg-white/95 shadow-xl
        ${plan.popular ? 'border-2 border-teal-500 shadow-teal-500/20 scale-105' : 'border border-gray-100/80 shadow-gray-100/30'}
      `}>
        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-slow">
            <div className="bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-1.5 rounded-full shadow-lg shadow-teal-500/30">
              <span className="text-sm font-semibold text-white whitespace-nowrap">
                Mais Popular
              </span>
            </div>
          </div>
        )}
        
        {/* Top Border Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/50 via-teal-400/30 to-transparent rounded-t-2xl z-[1]" />
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <div className={`rounded-full p-2 ${plan.popular ? 'bg-teal-50' : 'bg-gray-50'}`}>
              <PlanIcon className={`w-6 h-6 ${plan.popular ? 'text-teal-500' : 'text-gray-500'}`} />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:text-teal-600 transition-colors duration-300">
              {plan.name}
            </h3>
          </div>
          
          {/* Price Section */}
          <div className="relative">
            <div className="flex items-center justify-center gap-1">
              <span className="text-base font-medium text-gray-400 mt-2">R$</span>
              <span className="text-4xl font-bold bg-gradient-to-br from-teal-600 to-teal-400 bg-clip-text text-transparent">
                {plan.price}
              </span>
              <span className="text-gray-400 self-end mb-2">/mês</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-teal-100/20 to-transparent blur-xl -z-10 rounded-full" />
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-teal-200/60 to-transparent" />

        {/* Features List */}
        <div className="space-y-2">
          {featuresToShow.map(([feature, value]) => (
            <TooltipProvider key={feature}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-3 group/item hover:bg-teal-50/80 p-2 rounded-lg transition-all duration-200 cursor-help">
                    <div className={`rounded-full p-1.5 ${plan.popular ? 'bg-teal-100/80 group-hover/item:bg-teal-100' : 'bg-gray-100/80 group-hover/item:bg-gray-100'} transition-colors`}>
                      <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-teal-600' : 'text-gray-600'}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-gray-700' : 'text-gray-600'} group-hover/item:text-gray-900 transition-colors font-medium`}>
                      {typeof value === 'boolean' ? feature : `${value}`}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    {typeof value === 'boolean' 
                      ? `Este plano ${value ? 'inclui' : 'não inclui'} ${feature}`
                      : `${feature}: ${value}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button 
            className={`w-full rounded-full ${
              plan.popular 
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/30' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-900 hover:text-gray-900 border border-gray-200'
            } font-semibold transition-all duration-300 hover:scale-[1.02] text-sm h-11`}
          >
            Começar Agora
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-sm text-gray-500 hover:text-teal-600 transition-colors h-9"
            onClick={onShowMore}
          >
            Ver todos os recursos
          </Button>
        </div>
      </div>
    </div>
  );
}
