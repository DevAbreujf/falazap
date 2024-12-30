import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Básico",
    price: 97,
    features: [
      "1 número de WhatsApp",
      "Atendimento automático 24/7",
      "Funis de venda ilimitados",
      "Suporte via chat",
      "Relatórios básicos",
      "Automações simples",
      "1 usuário",
      "Treinamento básico",
      "Integrações básicas"
    ]
  },
  {
    name: "Profissional",
    price: 197,
    popular: true,
    features: [
      "2 números de WhatsApp",
      "Atendimento automático 24/7",
      "Funis de venda ilimitados",
      "Suporte prioritário",
      "Relatórios avançados",
      "Automações avançadas",
      "3 usuários",
      "Treinamento completo",
      "Integração com CRM"
    ]
  },
  {
    name: "Enterprise",
    price: 297,
    features: [
      "4 números de WhatsApp",
      "Atendimento automático 24/7",
      "Funis de venda ilimitados",
      "Suporte VIP",
      "Relatórios personalizados",
      "Automações ilimitadas",
      "Usuários ilimitados",
      "Treinamento VIP",
      "Integrações premium"
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            PLANOS E PREÇOS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Planos que cabem no seu{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              bolso
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio crescer com o FalaZAP
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className="relative group h-full"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100"></div>
              <div className={`glass-card h-full p-8 relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/20 animate-fade-up flex flex-col ${plan.popular ? 'border-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full flex items-center justify-center">
                    <div className="h-[0.5px] flex-1 bg-primary max-w-[120px] mr-2"></div>
                    <span className="bg-primary text-primary-foreground px-8 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
                      Mais Popular
                    </span>
                    <div className="h-[0.5px] flex-1 bg-primary max-w-[120px] ml-2"></div>
                  </div>
                )}
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 rounded-t-2xl"></div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="rounded-full p-1 bg-primary/10">
                          <Check className="text-primary w-4 h-4" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-primary/10 hover:bg-primary/20'}`}
                  variant={plan.popular ? "default" : "ghost"}
                >
                  Começar Agora
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}