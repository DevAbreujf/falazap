import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileSpreadsheet } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { useState } from "react";
import { Contact } from "@/types/contacts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Contacts() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFunnel, setSelectedFunnel] = useState<string>("all");
  const contactsPerPage = 20;

  const [contacts] = useState<Contact[]>([
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

  const uniqueFunnels = Array.from(new Set(contacts.map(contact => contact.funnelName)));

  const handleExportCSV = () => {
    let selectedData = contacts.filter(contact => selectedContacts.includes(contact.id));
    
    // Filtrar por funil selecionado se não for "all"
    if (selectedFunnel !== "all") {
      selectedData = selectedData.filter(contact => contact.funnelName === selectedFunnel);
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nome,Telefone,Data,Funil,Status\n"
      + selectedData.map(contact => 
          `${contact.name},${contact.phone},${contact.date},${contact.funnelName},${contact.funnelStatus === 'completed' ? 'Finalizado' : 'Em andamento'}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contatos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleContactSelection = (contactId: number) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm);
    const matchesFunnel = selectedFunnel === "all" || contact.funnelName === selectedFunnel;
    return matchesSearch && matchesFunnel;
  });

  // Paginação
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
            <Card>
              <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-7">
                <div className="space-y-2">
                  <CardTitle className="text-xl md:text-2xl font-bold">Contatos</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Gerencie e exporte sua lista de contatos
                  </p>
                </div>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar contatos..." 
                      className="pl-8" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select
                    value={selectedFunnel}
                    onValueChange={setSelectedFunnel}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o funil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Funis</SelectItem>
                      {uniqueFunnels.map((funnel) => (
                        <SelectItem key={funnel} value={funnel}>
                          {funnel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={handleExportCSV}
                    disabled={selectedContacts.length === 0}
                    className="flex items-center gap-2"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    Exportar CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>

                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                              onCheckedChange={toggleSelectAll}
                              id="select-all"
                            />
                            <label 
                              htmlFor="select-all" 
                              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                            >
                              Selecionar todos
                            </label>
                          </div>
                        </TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Data de Entrada</TableHead>
                        <TableHead>Funil</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {currentContacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedContacts.includes(contact.id)}
                              onCheckedChange={() => toggleContactSelection(contact.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>{new Date(contact.date).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>{contact.funnelName}</TableCell>
                          <TableCell>
                            <Badge variant={contact.funnelStatus === 'completed' ? 'default' : 'secondary'}>
                              {contact.funnelStatus === 'completed' ? 'Finalizado' : 'Em andamento'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
