import { useState } from "react";

export function ChatPreview() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex-1 hidden lg:block relative h-[500px]">
      <div className="glass-card p-4 rounded-[32px] h-full backdrop-blur-lg border border-white/10 relative bg-[#7C3AED]/10 animate-float animate-subtle-pulse overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
          alt="AI Customer Service"
          className={`w-full h-full object-cover rounded-2xl transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}