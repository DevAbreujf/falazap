import { useState } from "react";
import { Play, Pause, MessageSquare } from "lucide-react";

export function ChatPreview() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex-1 hidden lg:block relative h-[500px]">
      <div className="glass-card p-6 rounded-[32px] h-full backdrop-blur-lg border border-white/10 relative bg-[#7C3AED]/10">
        <div className="space-y-4">
          {/* Messages Container */}
          <div className="space-y-3">
            {/* First message */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] w-fit">Agente IA</span>
              </div>
              <div className="bg-[#dcf8c7]/10 p-3 rounded-2xl w-fit max-w-[80%] ml-auto">
                <p className="text-xs">Boa tarde, Pedro, tudo certinho?</p>
                <span className="text-[8px] text-muted-foreground text-right block mt-1">14:28</span>
              </div>
            </div>

            {/* Client response */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9C27B0]/20 text-[#9C27B0] w-fit">Cliente</span>
              </div>
              <div className="bg-[#dcf8c7]/10 p-3 rounded-2xl w-fit max-w-[80%]">
                <p className="text-xs">Oi, tudo ótimo!</p>
                <span className="text-[8px] text-muted-foreground text-right block mt-1">14:28</span>
              </div>
            </div>

            {/* Agent follow up */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] w-fit">Agente IA</span>
              </div>
              <div className="bg-[#dcf8c7]/10 p-3 rounded-2xl w-fit max-w-[80%] ml-auto">
                <p className="text-xs">Aqui é o Matheus da Umbler, você acabou de se cadastrar no nosso site, né?</p>
                <span className="text-[8px] text-muted-foreground text-right block mt-1">14:29</span>
              </div>
            </div>

            {/* Audio message */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] w-fit">Agente IA</span>
              </div>
              <div className="bg-[#dcf8c7]/10 p-3 rounded-2xl w-fit ml-auto">
                <div className="flex items-center gap-2 min-w-[200px]">
                  <button 
                    onClick={toggleAudio}
                    className="hover:bg-white/10 rounded-full p-1 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                  </button>
                  <div className="bg-white/10 h-1 flex-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? "100%" : "0%" }}
                    />
                  </div>
                  <span className="text-[10px] font-medium">0:12</span>
                </div>
              </div>
            </div>

            {/* Agent message */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] w-fit">Agente IA</span>
              </div>
              <div className="bg-[#dcf8c7]/10 p-3 rounded-2xl w-fit max-w-[80%] ml-auto">
                <p className="text-xs">Como te falei, essas são as informações que preciso:</p>
                <span className="text-[8px] text-muted-foreground text-right block mt-1">14:31</span>
              </div>
            </div>

            {/* Chatbot questions */}
            {[
              "Quantos funcionários tem sua empresa?",
              "Qual setor vocês atuam?",
              "Qual é o seu site?"
            ].map((question, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00BCD4]/20 text-[#00BCD4] w-fit">Chatbot</span>
                </div>
                <div className="bg-[#dcf8c7]/10 p-3 rounded-2xl w-fit max-w-[80%]">
                  <p className="text-xs">{question}</p>
                  <span className="text-[8px] text-muted-foreground text-right block mt-1">14:31</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}