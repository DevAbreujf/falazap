import { MessageSquare, Users, Settings, FileText } from "lucide-react";

export function ChatIntro() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-card text-card-foreground animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-primary">Canal de Atendimento</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="p-6 bg-muted/50 rounded-lg hover:scale-105 transition-transform duration-300">
          <MessageSquare className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Atendimento Humanizado</h3>
          <p className="text-muted-foreground">
            Conecte-se com seus clientes de forma personalizada e eficiente.
          </p>
        </div>

        <div className="p-6 bg-muted/50 rounded-lg hover:scale-105 transition-transform duration-300">
          <Users className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Gestão de Leads</h3>
          <p className="text-muted-foreground">
            Organize e acompanhe todas as suas conversas em um só lugar.
          </p>
        </div>

        <div className="p-6 bg-muted/50 rounded-lg hover:scale-105 transition-transform duration-300">
          <FileText className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Histórico Completo</h3>
          <p className="text-muted-foreground">
            Acesse todo o histórico de interações com seus clientes.
          </p>
        </div>

        <div className="p-6 bg-muted/50 rounded-lg hover:scale-105 transition-transform duration-300">
          <Settings className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Configurações Avançadas</h3>
          <p className="text-muted-foreground">
            Personalize o atendimento de acordo com suas necessidades.
          </p>
        </div>
      </div>
    </div>
  );
}