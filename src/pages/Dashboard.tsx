import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Fala</span>
            <span className="text-2xl font-bold">ZAP</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-card rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Mensagens Enviadas</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Contatos</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Campanhas Ativas</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo ao FalaZAP!</h2>
          <p className="text-muted-foreground">
            Comece configurando seu primeiro número do WhatsApp para enviar mensagens.
          </p>
          <Button className="mt-4">
            Configurar WhatsApp
          </Button>
        </div>
      </main>
    </div>
  );
}