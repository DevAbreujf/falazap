import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Contact } from "@/types/contacts";
import { ContactsHeader } from "@/components/app/contacts/ContactsHeader";
import { ContactsTable } from "@/components/app/contacts/ContactsTable";
import { ContactsPagination } from "@/components/app/contacts/ContactsPagination";

export default function Contacts() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFunnel, setSelectedFunnel] = useState<string>("all");
  const contactsPerPage = 20;
  const [contacts] = useState<Contact[]>([{
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
  const uniqueFunnels = Array.from(new Set(contacts.map(contact => contact.funnelName)));

  const handleExportCSV = () => {
    let selectedData = contacts.filter(contact => selectedContacts.includes(contact.id));
    if (selectedFunnel !== "all") {
      selectedData = selectedData.filter(contact => contact.funnelName === selectedFunnel);
    }
    const csvContent = "data:text/csv;charset=utf-8," + "Nome,Telefone,Data,Funil,Status\n" + selectedData.map(contact => `${contact.name},${contact.phone},${contact.date},${contact.funnelName},${contact.funnelStatus === 'completed' ? 'Finalizado' : 'Em andamento'}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contatos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleContactSelection = (contactId: number) => {
    setSelectedContacts(prev => prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]);
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phone.includes(searchTerm);
    const matchesFunnel = selectedFunnel === "all" || contact.funnelName === selectedFunnel;
    return matchesSearch && matchesFunnel;
  });

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

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
          <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-0 space-y-6">
                <ContactsHeader 
                  searchTerm={searchTerm} 
                  onSearchChange={setSearchTerm}
                  selectedFunnel={selectedFunnel}
                  onFunnelChange={setSelectedFunnel}
                  onExportCSV={handleExportCSV}
                  uniqueFunnels={uniqueFunnels}
                  hasSelectedContacts={selectedContacts.length > 0}
                />
                
                <ContactsTable 
                  contacts={currentContacts}
                  selectedContacts={selectedContacts}
                  onToggleContact={toggleContactSelection}
                  onToggleAll={toggleSelectAll}
                  filteredContacts={filteredContacts}
                />

                <ContactsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>;
}
