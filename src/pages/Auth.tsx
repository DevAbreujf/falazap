import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Auth() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Animated background circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-8 flex min-h-screen items-center">
        <div 
          className={`
            glass-card relative transition-all duration-1000 transform-gpu w-full
            ${isFlipped ? "rotate-y-180" : ""}
            perspective-1000 preserve-3d
          `}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          {/* Login side */}
          <div 
            className={`
              absolute inset-0 backface-hidden transition-opacity duration-500
              ${isFlipped ? "opacity-0" : "opacity-100"}
            `}
          >
            <LoginForm onFlip={() => setIsFlipped(true)} />
          </div>

          {/* Register side */}
          <div 
            className={`
              absolute inset-0 backface-hidden rotate-y-180 transition-opacity duration-500
              ${isFlipped ? "opacity-100" : "opacity-0"}
            `}
          >
            <RegisterForm onFlip={() => setIsFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}