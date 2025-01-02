import { useState } from "react";
import { Play, Pause } from "lucide-react";

export function ChatPreview() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex-1 hidden lg:block h-full">
      <div className="glass-card p-6 rounded-2xl space-y-4 h-full backdrop-blur-lg border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background/80 to-transparent z-10" />
        
        {/* Chat Header */}
        <div className="sticky top-0 z-20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Chat Assistente</h3>
              <p className="text-xs text-muted-foreground">Online agora</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* First message */}
          <div className="flex items-start gap-2">
            <div className="flex flex-col max-w-[80%]">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary w-fit font-medium">Agente IA</span>
              <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1 shadow-sm">
                <p className="text-sm text-gray-800">Boa tarde, Pedro, tudo certinho?</p>
                <span className="text-[10px] text-gray-500 text-right block mt-1">14:25</span>
              </div>
            </div>
          </div>

          {/* Client response */}
          <div className="flex items-start gap-2 justify-end">
            <div className="flex flex-col max-w-[80%]">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary w-fit self-end font-medium">Cliente</span>
              <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1 shadow-sm">
                <p className="text-sm text-gray-800">Oi, tudo ótimo!</p>
                <span className="text-[10px] text-gray-500 text-right block mt-1">14:25</span>
              </div>
            </div>
          </div>

          {/* Agent follow up */}
          <div className="flex items-start gap-2">
            <div className="flex flex-col max-w-[80%]">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary w-fit font-medium">Agente IA</span>
              <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1 shadow-sm">
                <p className="text-sm text-gray-800">Aqui é o Matheus da Umbler, você acabou de se cadastrar no nosso site, né?</p>
                <span className="text-[10px] text-gray-500 text-right block mt-1">14:25</span>
              </div>
            </div>
          </div>

          {/* Audio message */}
          <div className="flex items-start gap-2">
            <div className="flex flex-col w-full max-w-[80%]">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary w-fit font-medium">Cliente</span>
              <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1 shadow-sm">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleAudio}
                    className="hover:bg-gray-200/50 rounded-full p-1.5 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-gray-700" />
                    ) : (
                      <Play className="w-4 h-4 text-gray-700" />
                    )}
                  </button>
                  <div className="bg-gray-200/50 h-1.5 flex-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? "100%" : "0%" }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">0:12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chatbot questions */}
          {[
            "Quantos funcionários tem sua empresa?",
            "Qual setor vocês atuam?",
            "Qual é o seu site?"
          ].map((question, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex flex-col max-w-[80%]">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary w-fit font-medium">Chatbot</span>
                <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1 shadow-sm">
                  <p className="text-sm text-gray-800">{question}</p>
                  <span className="text-[10px] text-gray-500 text-right block mt-1">14:25</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
    </div>
  );
}