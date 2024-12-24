import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Não sou programador. Consigo utilizar o chatbot?",
    answer: "Sim! O FalaZAP foi desenvolvido pensando em pessoas que não são técnicas. Nossa interface é intuitiva e fácil de usar, permitindo que você configure seus funis de venda sem conhecimento em programação."
  },
  {
    question: "Quantas conversas posso ter ao mesmo tempo?",
    answer: "Você pode ter conversas ilimitadas simultaneamente! Nossa plataforma foi desenvolvida para suportar alto volume de mensagens sem perder qualidade no atendimento."
  },
  {
    question: "Quando chega o meu acesso?",
    answer: "Seu acesso é liberado imediatamente após a confirmação do pagamento. Você receberá as credenciais de acesso no seu e-mail em poucos minutos."
  },
  {
    question: "Preciso estar conectado o tempo todo no WhatsApp para o bot operar?",
    answer: "Não! Uma vez configurado, o bot funciona de forma totalmente automática, 24 horas por dia, 7 dias por semana, mesmo com seu celular desligado."
  },
  {
    question: "Como o robô funciona?",
    answer: "O FalaZAP utiliza inteligência artificial avançada para interagir com seus clientes de forma natural e eficiente. Você configura os funis de venda e as respostas, e o bot se encarrega de conduzir as conversas automaticamente."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre o FalaZAP
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="glass-card animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-lg font-semibold px-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}