export interface PlanFeatures {
  "Números WhatsApp": string;
  "Atendimento 24/7": boolean;
  "Funis de venda": string;
  "Suporte": string;
  "Relatórios": string;
  "Automações": string;
  "Usuários": string;
  "Treinamento": string;
  "Integrações": string;
  "API Personalizada": boolean;
  "Consultoria": boolean;
  "White Label": boolean;
}

export interface Plan {
  name: string;
  price: number;
  popular?: boolean;
  features: PlanFeatures;
}