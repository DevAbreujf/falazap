import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Auth() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Animated background circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main content container */}
      <div className="flex w-full">
        {/* Left side - Auth form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center p-8 pt-16">
          <div className="w-full max-w-md">
            <div 
              className={`
                glass-card relative transition-all duration-1000 transform-gpu w-full
                ${isFlipped ? "rotate-y-180" : ""}
                perspective-1000 preserve-3d
              `}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                minHeight: "600px"
              }}
            >
              {/* Login side */}
              <div 
                className={`
                  absolute inset-0 backface-hidden transition-opacity duration-500
                  ${isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
              >
                <LoginForm onFlip={() => setIsFlipped(true)} />
              </div>

              {/* Register side */}
              <div 
                className={`
                  absolute inset-0 backface-hidden rotate-y-180 transition-opacity duration-500
                  ${isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
                <RegisterForm onFlip={() => setIsFlipped(false)} />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Images */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 items-center justify-center p-8">
          <div className="relative w-full max-w-2xl">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Pessoa usando computador"
              className="w-full h-auto rounded-2xl shadow-xl glass-card p-2"
            />
            <div className="absolute -bottom-4 -left-4 w-32 h-32">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Tecnologia"
                className="w-full h-full object-cover rounded-lg shadow-lg glass-card p-1"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                alt="Circuito"
                className="w-full h-full object-cover rounded-lg shadow-lg glass-card p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}