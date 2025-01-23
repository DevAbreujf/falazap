export function ChatIntro() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-card text-card-foreground animate-fade-in">
      <img 
        src="/lovable-uploads/07a2a22b-8328-4e18-ba7d-1d5123ff83c6.png" 
        alt="Chat" 
        className="w-64 h-64 opacity-50"
      />
      <p className="text-lg text-muted-foreground mt-6">
        Selecione uma conversa
      </p>
    </div>
  );
}