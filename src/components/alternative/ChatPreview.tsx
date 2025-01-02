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
        <div className="flex items-start gap-4 bg-[#dcf8c7] p-4 rounded-xl">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Agente IA</span>
            <p className="text-sm">Boa tarde! Como posso ajudar?</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 bg-[#dcf8c7] p-4 rounded-xl ml-8">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Cliente</span>
            <p className="text-sm">Oi, tudo ótimo!</p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-[#dcf8c7] p-4 rounded-xl">
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-600">Agente IA</span>
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
              <span className="text-xs text-gray-600">0:12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}