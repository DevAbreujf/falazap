const steps = [{
  number: "01",
  title: "Captação",
  description: "A partir da sua captação por anúncios ou qualquer estratégia, o cliente é direcionado diretamente ao WhatsApp.",
  icon: "📱"
}, {
  number: "02",
  title: "Engajamento",
  description: "O FalaZAP possui diversas combinações inteligentes e formulários automatizados para realçar o interesse e fornecer argumentos sobre a sua oferta.",
  icon: "🎯"
}, {
  number: "03",
  title: "Conversão",
  description: "De forma automática, a qualquer momento do dia, o seu cliente fecha a venda diretamente pelo WhatsApp.",
  icon: "💰"
}, {
  number: "04",
  title: "Resultado",
  description: "E pronto. Com a venda concluída, o dinheiro cai na sua conta.",
  icon: "🚀"
}];
export function Steps() {
  return <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-background/80 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            O FalaZAP transforma os resultados dos seus funis de venda
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            O passo-a-passo é simples e eficiente para maximizar suas vendas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {steps.map((step, index) => <div key={step.number} className="relative group">
              <div className="glass-card p-8 h-full transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent rounded-t-2xl"></div>
                
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-sm"></div>
                    <span className="text-4xl relative z-10">{step.icon}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-primary/90 text-xl font-semibold">
                        Passo {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground/90">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-base text-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && index % 2 === 0 && <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
                </div>}
            </div>)}
        </div>
      </div>
    </section>;
}