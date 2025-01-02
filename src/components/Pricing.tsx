import { PricingCard } from "./pricing/PricingCard";
import { PricingDialog } from "./pricing/PricingDialog";
import { Plan } from "@/types/pricing";

const plans: Plan[] = [
  {
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
  },
  {
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
  },
  {
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
  }
];

export function Pricing() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(28,216,182,0.15),rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center mb-8">
          <PricingDialog plans={plans} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}