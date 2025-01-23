export function ChatIntro() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-card text-card-foreground animate-fade-in">
      <img 
        src="/lovable-uploads/acad7287-ce34-4a27-b0be-1323769d9083.png" 
        alt="Chat" 
        className="w-64 h-64 opacity-50"
      />
      <p className="text-lg text-muted-foreground mt-6">
        Selecione uma conversa
      </p>
    </div>
  );
}