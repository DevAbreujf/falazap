
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ContactsTable } from "@/components/app/contacts/ContactsTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Broadcasts() {
  const navigate = useNavigate();
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<string>("");
  const [showContactSelection, setShowContactSelection] = useState(false);

  const [contacts] = useState([
    { 
      id: 1, 
      phone: "+55 11 99999-9999", 
      name: "João Silva", 
      date: "2024-03-20",
      funnelName: "Funil de Vendas Principal",
      funnelStatus: "in_progress"
    },
    { 
      id: 2, 
      phone: "+55 11 98888-8888", 
      name: "Maria Santos", 
      date: "2024-03-19",
      funnelName: "Funil de Captação de Leads",
      funnelStatus: "completed"
    },
  ]);

  const toggleContactSelection = (contactId: number) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(contact => contact.id));
    }
  };

  const handleSendBroadcast = () => {
    if (!selectedFunnel || selectedContacts.length === 0) {
      return;
    }
    
    console.log('Iniciando disparo em massa:', {
      contacts: selectedContacts,
      funnel: selectedFunnel
    });
    
    // Reset form after sending
    setSelectedContacts([]);
    setSelectedFunnel("");
    setShowContactSelection(false);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-end p-4 lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="hover:bg-primary/20 bg-black/50"
            >
              <SidebarTrigger>
                <Menu className="h-6 w-6 text-primary" />
              </SidebarTrigger>
            </Button>
          </div>
          <main className="container mx-auto px-8 py-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Disparos em Massa
                  </h1>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
                </div>
                <Button 
                  onClick={() => navigate("/disparos/lista")}
                  variant="outline"
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Ver Lista de Disparos
                </Button>
              </div>
              
              <div className="space-y-6">
                {!showContactSelection ? (
                  <Card 
                    className="p-6 cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => setShowContactSelection(true)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Send className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Novo Disparo em Massa</h3>
                        <p className="text-sm text-slate-500">Selecione os contatos e o funil para iniciar um novo disparo</p>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">Selecione os Contatos</h3>
                          <ContactsTable
                            contacts={contacts}
                            selectedContacts={selectedContacts}
                            onToggleContact={toggleContactSelection}
                            onToggleAll={toggleSelectAll}
                            filteredContacts={contacts}
                          />
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-900">Selecione o Funil</h3>
                          <Select value={selectedFunnel} onValueChange={setSelectedFunnel}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Escolha um funil para o disparo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="funil1">Funil de Vendas Principal</SelectItem>
                              <SelectItem value="funil2">Funil de Captação de Leads</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setShowContactSelection(false)}
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleSendBroadcast}
                            disabled={!selectedFunnel || selectedContacts.length === 0}
                            className="gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Iniciar Disparo
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
