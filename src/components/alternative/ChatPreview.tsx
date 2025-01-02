import { useState } from "react";
import { Play, Pause } from "lucide-react";

export function ChatPreview() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex-1 hidden lg:block">
      <div className="glass-card p-6 rounded-2xl space-y-4">
        {/* First message */}
        <div className="flex items-start gap-2">
          <div className="flex flex-col max-w-[80%]">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-200 text-purple-700 w-fit">Agente IA</span>
            <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1">
              <p className="text-sm">Boa tarde, Pedro, tudo certinho?</p>
              <span className="text-[10px] text-gray-500 text-right block">14:25</span>
            </div>
          </div>
        </div>

        {/* Client response */}
        <div className="flex items-start gap-2 justify-end">
          <div className="flex flex-col max-w-[80%]">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-200 text-purple-700 w-fit self-end">Cliente</span>
            <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1">
              <p className="text-sm">Oi, tudo ótimo!</p>
              <span className="text-[10px] text-gray-500 text-right block">14:25</span>
            </div>
          </div>
        </div>

        {/* Agent follow up */}
        <div className="flex items-start gap-2">
          <div className="flex flex-col max-w-[80%]">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-200 text-purple-700 w-fit">Agente IA</span>
            <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1">
              <p className="text-sm">Aqui é o Matheus da Umbler, você acabou de se cadastrar no nosso site, né?</p>
              <span className="text-[10px] text-gray-500 text-right block">14:25</span>
            </div>
          </div>
        </div>

        {/* Audio message */}
        <div className="flex items-start gap-2">
          <div className="flex flex-col w-full max-w-[80%]">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-200 text-purple-700 w-fit">Cliente</span>
            <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1">
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleAudio}
                  className="hover:bg-gray-100 rounded-full p-1"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Play className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                <div className="bg-gray-300 h-1 flex-1 rounded-full">
                  <div 
                    className="bg-gray-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? "100%" : "0%" }}
                  />
                </div>
                <span className="text-xs text-gray-500">0:12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent response */}
        <div className="flex items-start gap-2">
          <div className="flex flex-col max-w-[80%]">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-200 text-purple-700 w-fit">Agente IA</span>
            <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1">
              <p className="text-sm">Como te falei, essas são as informações que preciso:</p>
              <span className="text-[10px] text-gray-500 text-right block">14:25</span>
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
              <span className="text-xs px-2 py-1 rounded-full bg-blue-200 text-blue-700 w-fit">Chatbot</span>
              <div className="bg-[#dcf8c7] p-3 rounded-xl mt-1">
                <p className="text-sm">{question}</p>
                <span className="text-[10px] text-gray-500 text-right block">14:25</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}