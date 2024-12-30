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
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background/80"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              <span className="text-gradient-primary">Perguntas</span>{" "}
              <span className="text-foreground">Frequentes</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre o FalaZAP
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-none group"
              >
                <AccordionTrigger className="glass-card px-8 py-6 rounded-2xl text-lg hover:no-underline data-[state=open]:rounded-b-none transition-all duration-300 group-data-[state=open]:bg-primary/10">
                  <div className="flex items-center text-left gap-4">
                    <span className="text-primary opacity-60 font-mono">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="pr-8 font-medium group-data-[state=open]:text-primary">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="glass-card border-t-0 px-8 py-6 mt-px rounded-b-2xl text-base leading-relaxed bg-primary/5 data-[state=open]:animate-accordion-down">
                  <div className="pl-14">
                    <p className="text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}