const steps = [
  {
    number: "01",
    title: "Captação",
    description: "A partir da sua captação por anúncios ou qualquer estratégia, o cliente é direcionado diretamente ao WhatsApp.",
    icon: "📱"
  },
  {
    number: "02",
    title: "Engajamento",
    description: "O FalaZAP possui diversas combinações inteligentes e formulários automatizados para realçar o interesse e fornecer argumentos sobre a sua oferta.",
    icon: "🎯"
  },
  {
    number: "03",
    title: "Conversão",
    description: "De forma automática, a qualquer momento do dia, o seu cliente fecha a venda diretamente pelo WhatsApp.",
    icon: "💰"
  },
  {
    number: "04",
    title: "Resultado",
    description: "E pronto. Com a venda concluída, o dinheiro cai na sua conta.",
    icon: "🚀"
  }
];

export function Steps() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            O FalaZAP transforma os resultados dos seus funis de venda
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            O passo-a-passo é simples e eficiente para maximizar suas vendas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative animate-fade-up group"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="glass-card p-8 h-full border-t-2 border-t-primary transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/20">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{step.icon}</span>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-primary text-2xl font-bold">
                        Passo {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground/90">{step.title}</h3>
                    </div>
                    <p className="text-lg text-foreground/80 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-primary/50"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}