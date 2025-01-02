import { useState } from "react";
import { Play, Pause } from "lucide-react";

export function ChatPreview() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex-1 hidden lg:block relative h-[500px]">
      <div className="glass-card p-4 rounded-[32px] space-y-2 h-full backdrop-blur-lg border border-white/10 relative overflow-hidden bg-[#7C3AED]/10 -translate-x-8">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background/80 to-transparent z-10" />
        
        {/* Messages container */}
        <div className="space-y-4 relative mt-4 px-2 h-[calc(100%-2rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* Agent message */}
          <div className="flex items-start gap-2 max-w-[85%] animate-fade-in">
            <div className="bg-[#E8FFE5] p-3 rounded-2xl rounded-tl-sm shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-800">Boa tarde, Pedro, tudo certinho?</p>
              <span className="text-[8px] text-gray-500 text-right block mt-1">14:28</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-medium whitespace-nowrap">Agente IA</span>
          </div>

          {/* Client response */}
          <div className="flex items-start gap-2 justify-end max-w-[85%] ml-auto animate-fade-in">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9C27B0]/20 text-[#9C27B0] font-medium whitespace-nowrap">Cliente</span>
            <div className="bg-[#E8FFE5] p-3 rounded-2xl rounded-tr-sm shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-800">Oi, tudo ótimo!</p>
              <span className="text-[8px] text-gray-500 text-right block mt-1">14:28</span>
            </div>
          </div>

          {/* Agent follow up */}
          <div className="flex items-start gap-2 max-w-[85%] animate-fade-in">
            <div className="bg-[#E8FFE5] p-3 rounded-2xl rounded-tl-sm shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-800">Aqui é o Matheus da Umbler, você acabou de se cadastrar no nosso site, né?</p>
              <span className="text-[8px] text-gray-500 text-right block mt-1">14:29</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-medium whitespace-nowrap">Agente IA</span>
          </div>

          {/* Audio message */}
          <div className="flex items-start gap-2 max-w-[85%] animate-fade-in">
            <div className="bg-[#E8FFE5] p-3 rounded-2xl rounded-tl-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleAudio}
                  className="hover:bg-gray-200/50 rounded-full p-1 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 text-gray-700" />
                  ) : (
                    <Play className="w-3 h-3 text-gray-700" />
                  )}
                </button>
                <div className="bg-gray-200/50 h-1 flex-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#4CAF50] h-full rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? "100%" : "0%" }}
                  />
                </div>
                <span className="text-[10px] text-gray-600 font-medium">0:12</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-medium whitespace-nowrap">Agente IA</span>
          </div>

          {/* Agent message */}
          <div className="flex items-start gap-2 max-w-[85%] animate-fade-in">
            <div className="bg-[#E8FFE5] p-3 rounded-2xl rounded-tl-sm shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-800">Como te falei, essas são as informações que preciso:</p>
              <span className="text-[8px] text-gray-500 text-right block mt-1">14:31</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-medium whitespace-nowrap">Agente IA</span>
          </div>

          {/* Chatbot questions */}
          {[
            "Quantos funcionários tem sua empresa?",
            "Qual setor vocês atuam?",
            "Qual é o seu site?"
          ].map((question, index) => (
            <div key={index} className="flex items-start gap-2 max-w-[85%] animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="bg-[#E8FFE5] p-3 rounded-2xl rounded-tl-sm shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs text-gray-800">{question}</p>
                <span className="text-[8px] text-gray-500 text-right block mt-1">14:31</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00BCD4]/20 text-[#00BCD4] font-medium whitespace-nowrap">Chatbot</span>
            </div>
          ))}
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
    </div>
  );
}