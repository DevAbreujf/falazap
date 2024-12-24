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
    <section id="how-it-works" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
          <p className="text-muted-foreground">O passo-a-passo é simples</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="glass-card p-6 h-full">
                <span className="text-primary text-4xl font-bold mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}