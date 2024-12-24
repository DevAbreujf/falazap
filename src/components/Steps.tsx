const steps = [
  {
    number: "01",
    title: "Captação",
    description: "A partir da sua captação por anúncios ou qualquer estratégia, o cliente é direcionado diretamente ao WhatsApp."
  },
  {
    number: "02",
    title: "Engajamento",
    description: "O FalaZAP possui diversas combinações inteligentes e formulários automatizados para realçar o interesse e fornecer argumentos sobre a sua oferta."
  },
  {
    number: "03",
    title: "Conversão",
    description: "De forma automática, a qualquer momento do dia, o seu cliente fecha a venda diretamente pelo WhatsApp."
  },
  {
    number: "04",
    title: "Resultado",
    description: "E pronto. Com a venda concluída, o dinheiro cai na sua conta."
  }
];

export function Steps() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">
            O FalaZAP transforma os resultados dos seus funis de venda
          </h2>
          <p className="text-xl text-muted-foreground">O passo-a-passo é simples:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative animate-fade-up"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="glass-card p-6 h-full border-t-2 border-t-primary">
                <span className="text-primary text-2xl font-bold mb-4 block">
                  Passo {step.number}
                </span>
                <p className="text-lg text-foreground/90">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-primary"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}