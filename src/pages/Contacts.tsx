import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileSpreadsheet } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { useState } from "react";
import { Contact } from "@/types/contacts";
import { CategoryManagement } from "@/components/contacts/CategoryManagement";
import { ContactsTable } from "@/components/contacts/ContactsTable";

export default function Contacts() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>(["Geral"]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, phone: "+55 11 99999-9999", name: "João Silva", date: "2024-03-20", category: "Geral" },
    { id: 2, phone: "+55 11 98888-8888", name: "Maria Santos", date: "2024-03-19", category: "Geral" },
  ]);

  const handleExportCSV = () => {
    const selectedData = contacts.filter(contact => selectedContacts.includes(contact.id));
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nome,Telefone,Data,Categoria\n"
      + selectedData.map(contact => 
          `${contact.name},${contact.phone},${contact.date},${contact.category}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contatos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleBulkCategoryUpdate = (newCategory: string) => {
    setContacts(contacts.map(contact => {
      if (selectedContacts.includes(contact.id)) {
        return { ...contact, category: newCategory };
      }
      return contact;
    }));
  };

  const handleContactCategoryChange = (contactId: number, newCategory: string) => {
    setContacts(contacts.map(contact => {
      if (contact.id === contactId) {
        return { ...contact, category: newCategory };
      }
      return contact;
    }));
  };

  const toggleContactSelection = (contactId: number) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                <CategoryManagement
                  categories={categories}
                  selectedContacts={selectedContacts}
                  newCategory={newCategory}
                  selectedCategory={selectedCategory}
                  onAddCategory={handleAddCategory}
                  onNewCategoryChange={setNewCategory}
                  onBulkCategoryUpdate={handleBulkCategoryUpdate}
                  onCategoryFilterChange={setSelectedCategory}
                />
                <ContactsTable
                  contacts={filteredContacts}
                  categories={categories}
                  selectedContacts={selectedContacts}
                  onContactSelect={toggleContactSelection}
                  onContactCategoryChange={handleContactCategoryChange}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}