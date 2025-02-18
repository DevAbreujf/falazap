import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-500 mb-6">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">DÚVIDAS FREQUENTES</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Perguntas</span>{" "}
            <span className="text-foreground">Frequentes</span>
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
                className="border-none group"
              >
                <AccordionTrigger className="glass-card px-8 py-6 rounded 2xl text-lg hover:no-underline data-[state=open]:rounded-b-none transition-all duration-300 group-data-[state=open]:bg-teal-500/10 hover:bg-teal-500/5">
                  <div className="flex items-center text-left gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/10">
                      <span className="text-teal-500 font-mono text-sm">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="pr-8 font-medium group-data-[state=open]:text-teal-500 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="glass-card border-t-0 px-8 py-6 mt-px rounded-b-2xl text-base leading-relaxed bg-teal-500/5 data-[state=open]:animate-accordion-down">
                  <div className="pl-12">
                    <p className="text-muted-foreground/90">
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
