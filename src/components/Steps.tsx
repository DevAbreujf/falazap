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
              className="relative animate-fade-up group perspective-1000"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100 animate-pulse"></div>
              
              {/* Card container */}
              <div className="glass-card p-8 h-full transition-all duration-500 hover:translate-y-[-8px] group-hover:rotate-y-[-5deg] hover:shadow-2xl hover:shadow-primary/20">
                {/* Gradient border top */}
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                  {/* Icon container with animated background */}
                  <div className="relative transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg transform-gpu group-hover:scale-125 group-hover:blur-xl transition-all duration-500"></div>
                    <span className="text-4xl relative z-10">{step.icon}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-primary text-2xl font-bold group-hover:text-gradient-primary transition-all duration-300">
                        Passo {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground/90 group-hover:text-gradient-primary transition-all duration-300 transform-gpu group-hover:scale-105">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-lg text-foreground/80 leading-relaxed transition-all duration-300 group-hover:text-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-primary/50 animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}