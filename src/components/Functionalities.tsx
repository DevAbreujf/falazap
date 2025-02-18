
import { Filter, Users, Calendar, Sparkles } from "lucide-react";

const functionalities = [
  {
    icon: Filter,
    title: "Diferentes funis de venda",
    description: "Você pode construir diferentes funis, da forma que preferir! Seja com arquivos de texto, áudio, imagem, vídeo, música ou outros documentos; além de programar o tempo de espera entre mensagens.",
    image: "/lovable-uploads/f30643bb-4119-4734-bd82-26a17b964e92.png"
  },
  {
    icon: Users,
    title: "Gestão de contatos em tempo real",
    description: "As interações com funis registram os contatos com seus clientes, as progressões das conversas e permitem analisar em tempo real a efetividade das suas campanhas.",
    image: "/lovable-uploads/8cb633a2-08b8-4352-9da1-c6e65b5bc705.png"
  },
  {
    icon: Sparkles,
    title: "Até quatro atendentes automáticos",
    description: "Além do número principal, você pode cadastrar até 3 números adicionais para aumentar a eficiência do atendimento e os seus resultados.",
    image: "/lovable-uploads/7e694688-73de-4396-aa14-a0596423120c.png"
  },
  {
    icon: Calendar,
    title: "Programação de campanhas",
    description: "Explore as infinitas combinações dos seus funis de venda com diferentes gatilhos de ação, para ampliar as possibilidades de interação e o engajamento dos clientes.",
    image: "/lovable-uploads/07a2a22b-8328-4e18-ba7d-1d5123ff83c6.png"
  }
];

export function Functionalities() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background/80"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-500 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">FUNCIONALIDADES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Confira algumas das funcionalidades que
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
              desenvolvemos para atender às suas necessidades
            </span>
          </h2>
        </div>

        <div className="space-y-32">
          {functionalities.map((item, index) => (
            <div 
              key={item.title}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 animate-fade-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10">
                  <item.icon className="w-5 h-5 text-teal-500" />
                  <span className="text-sm font-medium text-teal-500">{item.title}</span>
                </div>
                
                <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">{item.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="lg:w-1/2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full transition-all duration-500 group-hover:blur-[120px]"></div>
                  <div className="relative bg-gradient-to-br from-background/80 to-background p-2 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-teal-500/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full rounded-xl shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-teal-500/10 backdrop-blur-sm border border-teal-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
                        <span className="text-sm font-medium text-teal-500">Ativo 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
