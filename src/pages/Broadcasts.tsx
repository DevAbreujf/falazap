import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Contact } from "@/types/chat";
import { Search, Users } from "lucide-react";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
export default function Broadcasts() {
  const {
    toast
  } = useToast();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedFlow, setSelectedFlow] = useState("");
  const [isContactsDialogOpen, setIsContactsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const mockContacts: Contact[] = [{
    id: 1,
    phone: "+55 11 99999-9999",
    name: "João Silva",
    date: "2024-02-20",
    funnelName: "Venda Ativa",
    funnelStatus: "in_progress"
  }, {
    id: 2,
    phone: "+55 11 88888-8888",
    name: "Maria Santos",
    date: "2024-02-19",
    funnelName: "Pós-Venda",
    funnelStatus: "completed"
  }, {
    id: 3,
    phone: "+55 11 77777-7777",
    name: "Pedro Oliveira",
    date: "2024-02-18",
    funnelName: "Recuperação",
    funnelStatus: "pending"
  }, {
    id: 4,
    phone: "+55 11 66666-6666",
    name: "Ana Costa",
    date: "2024-02-17",
    funnelName: "Venda Ativa",
    funnelStatus: "in_progress"
  }, {
    id: 5,
    phone: "+55 11 55555-5555",
    name: "Lucas Ferreira",
    date: "2024-02-16",
    funnelName: "Pós-Venda",
    funnelStatus: "completed"
  }];
  const mockFlows = [{
    id: "1",
    name: "Funil de Vendas"
  }, {
    id: "2",
    name: "Pós-Venda"
  }, {
    id: "3",
    name: "Reativação"
  }];
  const filteredContacts = mockContacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phone.includes(searchTerm));
  const handleSelectAllContacts = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(filteredContacts.map(contact => contact.id.toString()));
    } else {
      setSelectedContacts([]);
    }
  };
  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      }
      return [...prev, contactId];
    });
  };
  const handleSendBroadcast = () => {
    if (!selectedFlow) {
      toast({
        title: "Selecione um fluxo",
        description: "É necessário selecionar um fluxo para enviar o disparo.",
        variant: "destructive"
      });
      return;
    }
    if (selectedContacts.length === 0) {
      toast({
        title: "Selecione contatos",
        description: "É necessário selecionar pelo menos um contato para enviar o disparo.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Disparo iniciado",
      description: `Iniciando disparo para ${selectedContacts.length} contatos.`
    });
  };
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Disparos em Massa</h1>
              
              <div className="space-y-4">
                <div>
                  <Button onClick={() => setIsContactsDialogOpen(true)} variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    {selectedContacts.length > 0 ? `${selectedContacts.length} contatos selecionados` : "Selecionar contatos"}
                  </Button>
                </div>

                <div>
                  <Select value={selectedFlow} onValueChange={setSelectedFlow}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um fluxo" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockFlows.map(flow => <SelectItem key={flow.id} value={flow.id}>
                          {flow.name}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSendBroadcast} disabled={selectedContacts.length === 0 || !selectedFlow} className="w-full bg-emerald-400 hover:bg-emerald-300">
                  Enviar Disparo
                </Button>
              </div>
            </div>
          </div>

          <Dialog open={isContactsDialogOpen} onOpenChange={setIsContactsDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Selecionar Contatos</DialogTitle>
              </DialogHeader>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Buscar contatos..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={selectedContacts.length === filteredContacts.length} onCheckedChange={handleSelectAllContacts} />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Selecionar todos
                    </label>
                  </div>

                  <div className="space-y-2">
                    {filteredContacts.map(contact => <div key={contact.id} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg">
                        <Checkbox checked={selectedContacts.includes(contact.id.toString())} onCheckedChange={() => handleContactSelect(contact.id.toString())} />
                        <div>
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {selectedContacts.length} contatos selecionados
                </p>
                <Button onClick={() => setIsContactsDialogOpen(false)}>
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>;
}