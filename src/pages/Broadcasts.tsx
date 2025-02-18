import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ContactsTable } from "@/components/app/contacts/ContactsTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Menu, Filter, Send, Users, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
export default function Broadcasts() {
  const {
    toast
  } = useToast();
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<string>("");
  const [isContactsDialogOpen, setIsContactsDialogOpen] = useState(false);
  const [contacts] = useState([{
    id: 1,
    phone: "+55 11 99999-9999",
    name: "João Silva",
    date: "2024-03-20",
    funnelName: "Funil de Vendas Principal",
    funnelStatus: "in_progress"
  }, {
    id: 2,
    phone: "+55 11 98888-8888",
    name: "Maria Santos",
    date: "2024-03-19",
    funnelName: "Funil de Captação de Leads",
    funnelStatus: "completed"
  }]);
  const toggleContactSelection = (contactId: number) => {
    setSelectedContacts(prev => prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]);
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
      toast({
        title: "Erro ao iniciar disparo",
        description: "Selecione um funil e pelo menos um contato para continuar.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Disparo iniciado com sucesso!",
      description: `Iniciando disparo para ${selectedContacts.length} contatos no funil selecionado.`
    });
    console.log('Iniciando disparo em massa:', {
      contacts: selectedContacts,
      funnel: selectedFunnel
    });
    setSelectedContacts([]);
    setSelectedFunnel("");
  };
  return <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-end p-4 lg:hidden">
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/20 bg-black/50">
              <SidebarTrigger>
                <Menu className="h-6 w-6 text-primary" />
              </SidebarTrigger>
            </Button>
          </div>
          
          <main className="container mx-auto px-8 py-10 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Disparos em Massa
              </h1>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <p className="text-lg text-muted-foreground">
                Configure e inicie seus disparos em massa para grupos de contatos
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Funnel Selection Card */}
              <Card className="p-6 hover:shadow-lg transition-all duration-200 bg-white/50 backdrop-blur-sm border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Filter className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Selecione o Funil</h2>
                      <p className="text-sm text-slate-500">Escolha o funil para iniciar o disparo</p>
                    </div>
                  </div>
                  
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
              </Card>

              {/* Contacts Selection Card */}
              <Card className="p-6 hover:shadow-lg transition-all duration-200 bg-white/50 backdrop-blur-sm border-primary/20">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">Contatos</h2>
                        <p className="text-sm text-slate-500">
                          {selectedContacts.length} contatos selecionados
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" onClick={() => setIsContactsDialogOpen(true)} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Selecionar Contatos
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Centered Action Button */}
            <div className="flex justify-center pt-8">
              <Button onClick={handleSendBroadcast} disabled={!selectedFunnel || selectedContacts.length === 0} className="w-full max-w-md gap-2 py-6 text-lg bg-emerald-400 hover:bg-emerald-300 pointer-click">
                <Send className="h-5 w-5" />
                Iniciar Disparo
              </Button>
            </div>

            {/* Contacts Selection Dialog */}
            <Dialog open={isContactsDialogOpen} onOpenChange={setIsContactsDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Selecionar Contatos</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <ContactsTable contacts={contacts} selectedContacts={selectedContacts} onToggleContact={toggleContactSelection} onToggleAll={toggleSelectAll} filteredContacts={contacts} />
                </div>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>;
}