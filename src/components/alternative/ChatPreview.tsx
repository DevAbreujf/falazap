import { useState } from "react";
import { Play, Pause } from "lucide-react";

export function ChatPreview() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex-1 hidden lg:block relative h-[500px]">
      <div className="glass-card p-4 rounded-[32px] h-full backdrop-blur-lg border border-white/10 relative bg-[#7C3AED]/10 -translate-x-8 -translate-y-6">
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-background/80 to-transparent z-10" />
        
        {/* Messages container */}
        <div className="grid auto-rows-min gap-2 relative mt-0 px-2 h-full">
          {/* Agent message */}
          <div className="flex items-start gap-2 max-w-[85%] animate-fade-in scale-95 hover:scale-100 transition-all duration-300">
            <div className="bg-gradient-to-br from-[#E8FFE5] to-[#D1FFE5] p-3 rounded-2xl rounded-tl-sm shadow-lg hover:shadow-xl transition-all">
              <p className="text-sm text-gray-800 font-medium">Boa tarde, Pedro, tudo certinho?</p>
              <span className="text-[10px] text-gray-500/80 text-right block mt-1">14:28</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-semibold whitespace-nowrap shadow-sm">Agente IA</span>
          </div>

          {/* Client response */}
          <div className="flex items-start gap-2 justify-end max-w-[85%] ml-auto animate-fade-in scale-95 hover:scale-100 transition-all duration-300">
            <span className="text-xs px-2 py-1 rounded-full bg-[#9C27B0]/20 text-[#9C27B0] font-semibold whitespace-nowrap shadow-sm">Cliente</span>
            <div className="bg-gradient-to-br from-[#E8FFE5] to-[#D1FFE5] p-3 rounded-2xl rounded-tr-sm shadow-lg hover:shadow-xl transition-all">
              <p className="text-sm text-gray-800 font-medium">Oi, tudo ótimo!</p>
              <span className="text-[10px] text-gray-500/80 text-right block mt-1">14:28</span>
            </div>
          </div>

          {/* Agent follow up */}
          <div className="flex items-start gap-2 max-w-[85%] animate-fade-in scale-95 hover:scale-100 transition-all duration-300">
            <div className="bg-gradient-to-br from-[#E8FFE5] to-[#D1FFE5] p-3 rounded-2xl rounded-tl-sm shadow-lg hover:shadow-xl transition-all">
              <p className="text-sm text-gray-800 font-medium">Aqui é o Matheus da Umbler, você acabou de se cadastrar no nosso site, né?</p>
              <span className="text-[10px] text-gray-500/80 text-right block mt-1">14:29</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-semibold whitespace-nowrap shadow-sm">Agente IA</span>
          </div>

          {/* Audio message */}
          <div className="flex items-start gap-2 max-w-[85%] animate-fade-in scale-95 hover:scale-100 transition-all duration-300">
            <div className="bg-gradient-to-br from-[#E8FFE5] to-[#D1FFE5] p-3 rounded-2xl rounded-tl-sm shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleAudio}
                  className="hover:bg-[#4CAF50]/20 rounded-full p-1.5 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-gray-700" />
                  ) : (
                    <Play className="w-4 h-4 text-gray-700" />
                  )}
                </button>
                <div className="bg-[#4CAF50]/20 h-2 flex-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#4CAF50] h-full rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? "100%" : "0%" }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-semibold">0:12</span>
              </div>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-semibold whitespace-nowrap shadow-sm">Agente IA</span>
          </div>

          {/* Agent message */}
          <div className="flex items-start gap-2 max-w-[85%] animate-fade-in scale-95 hover:scale-100 transition-all duration-300">
            <div className="bg-gradient-to-br from-[#E8FFE5] to-[#D1FFE5] p-3 rounded-2xl rounded-tl-sm shadow-lg hover:shadow-xl transition-all">
              <p className="text-sm text-gray-800 font-medium">Como te falei, essas são as informações que preciso:</p>
              <span className="text-[10px] text-gray-500/80 text-right block mt-1">14:31</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-semibold whitespace-nowrap shadow-sm">Agente IA</span>
          </div>

          {/* Chatbot questions */}
          {[
            "Quantos funcionários tem sua empresa?",
            "Qual setor vocês atuam?",
            "Qual é o seu site?"
          ].map((question, index) => (
            <div key={index} className="flex items-start gap-2 max-w-[85%] animate-fade-in scale-95 hover:scale-100 transition-all duration-300" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="bg-gradient-to-br from-[#E8FFE5] to-[#D1FFE5] p-3 rounded-2xl rounded-tl-sm shadow-lg hover:shadow-xl transition-all">
                <p className="text-sm text-gray-800 font-medium">{question}</p>
                <span className="text-[10px] text-gray-500/80 text-right block mt-1">14:31</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-[#00BCD4]/20 text-[#00BCD4] font-semibold whitespace-nowrap shadow-sm">Chatbot</span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
    </div>
  );
}
