import { PricingCard } from "./pricing/PricingCard";
import { PricingDialog } from "./pricing/PricingDialog";
import { Plan } from "@/types/pricing";
import { useState } from "react";
const plans: Plan[] = [{
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
}, {
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
}, {
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
}];
export function Pricing() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900/5 via-transparent to-transparent" id="pricing">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(28,216,182,0.2),rgba(255,255,255,0))]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-800/10 text-white text-sm font-medium mb-4 shadow-lg shadow-teal-500/10">
            PLANOS E PREÇOS
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Escolha o plano ideal para seu negócio
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-white">
            Comece agora mesmo a transformar seu atendimento com nossa solução completa de IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto">
          {plans.map((plan, index) => <PricingCard key={plan.name} plan={plan} index={index} onShowMore={() => setDialogOpen(true)} />)}
        </div>

        <PricingDialog plans={plans} open={dialogOpen} onOpenChange={setDialogOpen} />
      </div>
    </section>;
}